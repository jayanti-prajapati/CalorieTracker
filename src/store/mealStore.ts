import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MealState, MealEntry, DailyNutrition } from '../types';
import { calculateFoodNutrition, calculateMacroTargets } from '../utils/calculateCalories';
import { useAuthStore } from '../features/auth/stores/authStore';

// Using AsyncStorage temporarily - will switch to MMKV after native setup
const storage = {
    setItem: async (key: string, value: string): Promise<void> => {
        await AsyncStorage.setItem(key, value);
    },
    getItem: async (key: string): Promise<string | null> => {
        return await AsyncStorage.getItem(key);
    },
    removeItem: async (key: string): Promise<void> => {
        await AsyncStorage.removeItem(key);
    },
};

export const useMealStore = create<MealState>((set, get) => ({
    meals: [],
    dailyNutrition: {},
    isLoading: false,

    addMeal: async (meal: Omit<MealEntry, 'id' | 'createdAt'>) => {
        const newMeal: MealEntry = {
            ...meal,
            id: `meal_${Date.now()}`,
            createdAt: new Date().toISOString(),
        };

        const currentMeals = get().meals;
        const updatedMeals = [...currentMeals, newMeal];

        // Update state
        set({ meals: updatedMeals });

        // Persist to storage
        await storage.setItem('meals', JSON.stringify(updatedMeals));

        // Recalculate daily nutrition
        get().getDailyNutrition(meal.date);
    },

    removeMeal: async (mealId: string) => {
        const currentMeals = get().meals;
        const updatedMeals = currentMeals.filter(meal => meal.id !== mealId);

        // Update state
        set({ meals: updatedMeals });

        // Persist to storage
        await storage.setItem('meals', JSON.stringify(updatedMeals));

        // Recalculate daily nutrition for affected date
        const removedMeal = currentMeals.find(meal => meal.id === mealId);
        if (removedMeal) {
            get().getDailyNutrition(removedMeal.date);
        }
    },

    updateMeal: async (mealId: string, updates: Partial<MealEntry>) => {
        const currentMeals = get().meals;
        const updatedMeals = currentMeals.map(meal =>
            meal.id === mealId ? { ...meal, ...updates } : meal
        );

        // Update state
        set({ meals: updatedMeals });

        // Persist to storage
        await storage.setItem('meals', JSON.stringify(updatedMeals));

        // Recalculate daily nutrition cache
        const updatedMeal = updatedMeals.find(meal => meal.id === mealId);
        if (updatedMeal) {
            get().updateDailyNutritionCache(updatedMeal.date);
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
            const nutrition = calculateFoodNutrition(meal.food, meal.quantity);
            totalCalories += nutrition.calories;
            totalProtein += nutrition.protein;
            totalCarbs += nutrition.carbs;
            totalFat += nutrition.fat;
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
