import { create } from 'zustand';
import { storage } from '../../../utils/storage';
import { MealState, MealEntry, DailyNutrition } from '../types';
import { mealService, isApiError, getErrorMessage } from '../services/meal-service';
import { useAuthStore } from '../../auth/stores/authStore';
import { mockMeals } from '../../../mock/meals';

// Using safe storage wrapper that handles AsyncStorage errors

export const useMealStore = create<MealState>((set, get) => ({
    meals: [...mockMeals],
    dailyNutrition: {},
    isLoading: false,

    addMeal: async (meal: Omit<MealEntry, 'id' | 'createdAt'>) => {
        set({ isLoading: true });
        try {
            const response = await mealService.addMeal(meal);
            const newMeal = response.data;

            const currentMeals = get().meals;
            const updatedMeals = [...currentMeals, newMeal];

            // Update state
            set({ meals: updatedMeals, isLoading: false });

            // Persist to storage
            await storage.setItem('meals', JSON.stringify(updatedMeals));

            // Update daily nutrition cache
            get().updateDailyNutritionCache(meal.date);
        } catch (error) {
            console.error('Failed to add meal:', error);
            set({ isLoading: false });
            throw new Error(getErrorMessage(error));
        }
    },

    removeMeal: async (mealId: string) => {
        set({ isLoading: true });
        try {
            await mealService.deleteMeal(mealId);

            const currentMeals = get().meals;
            const removedMeal = currentMeals.find(meal => meal.id === mealId);
            const updatedMeals = currentMeals.filter(meal => meal.id !== mealId);

            // Update state
            set({ meals: updatedMeals, isLoading: false });

            // Persist to storage
            await storage.setItem('meals', JSON.stringify(updatedMeals));

            // Update daily nutrition cache for affected date
            if (removedMeal) {
                get().updateDailyNutritionCache(removedMeal.date);
            }
        } catch (error) {
            console.error('Failed to remove meal:', error);
            set({ isLoading: false });
            throw new Error(getErrorMessage(error));
        }
    },

    updateMeal: async (mealId: string, updates: Partial<MealEntry>) => {
        set({ isLoading: true });
        try {
            const response = await mealService.updateMeal(mealId, updates);
            const updatedMeal = response.data;

            const currentMeals = get().meals;
            const updatedMeals = currentMeals.map(meal =>
                meal.id === mealId ? updatedMeal : meal
            );

            // Update state
            set({ meals: updatedMeals, isLoading: false });

            // Persist to storage
            await storage.setItem('meals', JSON.stringify(updatedMeals));

            // Update daily nutrition cache
            get().updateDailyNutritionCache(updatedMeal.date);
        } catch (error) {
            console.error('Failed to update meal:', error);
            set({ isLoading: false });
            throw new Error(getErrorMessage(error));
        }
    },

    getDailyNutrition: (date: string): DailyNutrition => {
        const { meals, dailyNutrition } = get();
        const user = useAuthStore.getState().user;

        // Return cached data if available
        if (dailyNutrition[date]) {
            return dailyNutrition[date];
        }

        // Get meals for the specific date
        const dayMeals = meals.filter(meal => meal.date === date);

        // Calculate total nutrition
        let totalCalories = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFat = 0;

        dayMeals.forEach(meal => {
            // Calculate nutrition based on quantity (meal.quantity is in grams, food nutrition is per 100g)
            const multiplier = meal.quantity / 100;
            totalCalories += meal.calories * multiplier;
            totalProtein += meal.protein * multiplier;
            totalCarbs += meal.carbs * multiplier;
            totalFat += meal.fat * multiplier;
        });

        // Get target calories from user
        const targetCalories = user?.targetCalories || 2000;
        const remainingCalories = targetCalories - totalCalories;

        const dayNutrition: DailyNutrition = {
            date,
            totalCalories: Math.round(totalCalories),
            totalProtein: Math.round(totalProtein * 10) / 10,
            totalCarbs: Math.round(totalCarbs * 10) / 10,
            totalFat: Math.round(totalFat * 10) / 10,
            targetCalories,
            remainingCalories,
            meals: dayMeals,
        };

        return dayNutrition;
    },

    updateDailyNutritionCache: (date: string): void => {
        const { getDailyNutrition, dailyNutrition } = get();
        const dayNutrition = getDailyNutrition(date);

        const updatedDailyNutrition = {
            ...dailyNutrition,
            [date]: dayNutrition,
        };

        set({ dailyNutrition: updatedDailyNutrition });
    },
}));

// Initialize store from persisted data
const initializeMealStore = async (): Promise<void> => {
    try {
        const mealsString = await storage.getItem('meals');

        if (mealsString) {
            const meals = JSON.parse(mealsString) as MealEntry[];
            useMealStore.setState({
                meals,
                isLoading: false,
            });

            // Calculate daily nutrition for recent dates
            const today = new Date().toISOString().split('T')[0];
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayString = yesterday.toISOString().split('T')[0];

            useMealStore.getState().updateDailyNutritionCache(today ?? "");
            useMealStore.getState().updateDailyNutritionCache(yesterdayString ?? "");
        }
    } catch (error) {
        console.warn('Failed to initialize meal store from storage:', error);
        // Clear corrupted data
        await storage.removeItem('meals');
    }
};

// Initialize on module load
initializeMealStore();
