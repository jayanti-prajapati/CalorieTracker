import { Food, MealEntry, DailyNutrition } from '../types';
import { ApiResponse } from '../../../types';
import { mockFoods } from '../../../mock/foods';
import { mockMeals } from '../../../mock/meals';
import { calculateFoodNutrition } from '../../../utils/calculateCalories';
import { useAuthStore } from '../../auth/stores/authStore';

// Simulate network delay
const simulateNetworkDelay = (ms: number = 600): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Meal Service Interface
export interface MealService {
    searchFoods(query: string): Promise<ApiResponse<Food[]>>;
    getFoodById(foodId: string): Promise<ApiResponse<Food>>;
    getFoodByBarcode(barcode: string): Promise<ApiResponse<Food>>;
    addMeal(meal: Omit<MealEntry, 'id' | 'createdAt'>): Promise<ApiResponse<MealEntry>>;
    updateMeal(mealId: string, updates: Partial<MealEntry>): Promise<ApiResponse<MealEntry>>;
    deleteMeal(mealId: string): Promise<ApiResponse<null>>;
    getMealsForDate(date: string, userId?: string): Promise<ApiResponse<MealEntry[]>>;
    getDailyNutrition(date: string, userId?: string): Promise<ApiResponse<DailyNutrition>>;
    getMealHistory(userId?: string, days?: number): Promise<ApiResponse<MealEntry[]>>;
}

// Custom error class for API errors
class ApiError extends Error {
    constructor(
        message: string,
        public code: string,
        public details?: Record<string, unknown>
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

// Mock Meal Service Implementation
class MockMealService implements MealService {
    private meals: MealEntry[] = [...mockMeals];

    async searchFoods(query: string): Promise<ApiResponse<Food[]>> {
        console.log('🔍 Meal Service: Searching foods', { query });

        await simulateNetworkDelay(400);

        try {
            const searchResults = mockFoods.filter(food =>
                food.name.toLowerCase().includes(query.toLowerCase()) ||
                food.brand?.toLowerCase().includes(query.toLowerCase()) ||
                food.category?.toLowerCase().includes(query.toLowerCase())
            );

            // Limit results to 20 for performance
            const limitedResults = searchResults.slice(0, 20);

            console.log('✅ Meal Service: Food search completed', {
                query,
                resultsCount: limitedResults.length
            });

            return {
                data: limitedResults,
                message: `Found ${limitedResults.length} foods`,
                success: true,
            };
        } catch (error) {
            console.error('❌ Meal Service: Food search failed', error);
            throw new ApiError('Failed to search foods', 'FOOD_SEARCH_ERROR');
        }
    }

    async getFoodById(foodId: string): Promise<ApiResponse<Food>> {
        console.log('🍎 Meal Service: Getting food by ID', { foodId });

        await simulateNetworkDelay(200);

        try {
            const food = mockFoods.find(f => f.id === foodId);
            if (!food) {
                throw new ApiError('Food not found', 'FOOD_NOT_FOUND');
            }

            return {
                data: food,
                message: 'Food retrieved successfully',
                success: true,
            };
        } catch (error) {
            console.error('❌ Meal Service: Get food by ID failed', error);
            if (error instanceof ApiError) throw error;
            throw new ApiError('Failed to get food', 'FOOD_GET_ERROR');
        }
    }

    async getFoodByBarcode(barcode: string): Promise<ApiResponse<Food>> {
        console.log('📱 Meal Service: Getting food by barcode', { barcode });

        await simulateNetworkDelay(800);

        try {
            const food = mockFoods.find(f => f.barcode === barcode);
            if (!food) {
                throw new ApiError('Food not found for barcode', 'BARCODE_NOT_FOUND');
            }

            return {
                data: food,
                message: 'Food found by barcode',
                success: true,
            };
        } catch (error) {
            console.error('❌ Meal Service: Get food by barcode failed', error);
            if (error instanceof ApiError) throw error;
            throw new ApiError('Failed to get food by barcode', 'BARCODE_SCAN_ERROR');
        }
    }

    async addMeal(meal: Omit<MealEntry, 'id' | 'createdAt'>): Promise<ApiResponse<MealEntry>> {
        console.log('➕ Meal Service: Adding meal', {
            foodName: meal.food.name,
            quantity: meal.quantity,
            mealType: meal.mealType,
            date: meal.date
        });

        await simulateNetworkDelay(500);

        try {
            const newMeal: MealEntry = {
                ...meal,
                id: `meal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                createdAt: new Date().toISOString(),
            };

            // Add to mock database
            this.meals.push(newMeal);

            console.log('✅ Meal Service: Meal added successfully', { mealId: newMeal.id });

            return {
                data: newMeal,
                message: 'Meal added successfully',
                success: true,
            };
        } catch (error) {
            console.error('❌ Meal Service: Add meal failed', error);
            throw new ApiError('Failed to add meal', 'MEAL_ADD_ERROR');
        }
    }

    async updateMeal(mealId: string, updates: Partial<MealEntry>): Promise<ApiResponse<MealEntry>> {
        console.log('✏️ Meal Service: Updating meal', { mealId, updates });

        await simulateNetworkDelay(400);

        try {
            const mealIndex = this.meals.findIndex(m => m.id === mealId);
            if (mealIndex === -1) {
                throw new ApiError('Meal not found', 'MEAL_NOT_FOUND');
            }

            const updatedMeal = { ...this.meals[mealIndex], ...updates } as MealEntry;
            this.meals[mealIndex] = updatedMeal;

            console.log('✅ Meal Service: Meal updated successfully', { mealId });

            return {
                data: updatedMeal,
                message: 'Meal updated successfully',
                success: true,
            };
        } catch (error) {
            console.error('❌ Meal Service: Update meal failed', error);
            if (error instanceof ApiError) throw error;
            throw new ApiError('Failed to update meal', 'MEAL_UPDATE_ERROR');
        }
    }

    async deleteMeal(mealId: string): Promise<ApiResponse<null>> {
        console.log('🗑️ Meal Service: Deleting meal', { mealId });

        await simulateNetworkDelay(300);

        try {
            const mealIndex = this.meals.findIndex(m => m.id === mealId);
            if (mealIndex === -1) {
                throw new ApiError('Meal not found', 'MEAL_NOT_FOUND');
            }

            this.meals.splice(mealIndex, 1);

            console.log('✅ Meal Service: Meal deleted successfully', { mealId });

            return {
                data: null,
                message: 'Meal deleted successfully',
                success: true,
            };
        } catch (error) {
            console.error('❌ Meal Service: Delete meal failed', error);
            if (error instanceof ApiError) throw error;
            throw new ApiError('Failed to delete meal', 'MEAL_DELETE_ERROR');
        }
    }

    async getMealsForDate(date: string, userId?: string): Promise<ApiResponse<MealEntry[]>> {
        console.log('📅 Meal Service: Getting meals for date', { date, userId });

        await simulateNetworkDelay(300);

        try {
            const dateMeals = this.meals.filter(meal => meal.date === date);

            return {
                data: dateMeals,
                message: `Found ${dateMeals.length} meals for ${date}`,
                success: true,
            };
        } catch (error) {
            console.error('❌ Meal Service: Get meals for date failed', error);
            throw new ApiError('Failed to get meals for date', 'MEALS_GET_ERROR');
        }
    }

    async getDailyNutrition(date: string, userId?: string): Promise<ApiResponse<DailyNutrition>> {
        console.log('📊 Meal Service: Calculating daily nutrition', { date, userId });

        await simulateNetworkDelay(400);

        try {
            const user = useAuthStore.getState().user;
            const targetCalories = user?.targetCalories || 2000;

            const dateMeals = this.meals.filter(meal => meal.date === date);

            let totalCalories = 0;
            let totalProtein = 0;
            let totalCarbs = 0;
            let totalFat = 0;

            dateMeals.forEach(meal => {
                const nutrition = calculateFoodNutrition(meal.food, meal.quantity);
                totalCalories += nutrition.calories;
                totalProtein += nutrition.protein;
                totalCarbs += nutrition.carbs;
                totalFat += nutrition.fat;
            });

            const dailyNutrition: DailyNutrition = {
                date,
                totalCalories: Math.round(totalCalories),
                totalProtein: Math.round(totalProtein * 10) / 10,
                totalCarbs: Math.round(totalCarbs * 10) / 10,
                totalFat: Math.round(totalFat * 10) / 10,
                targetCalories,
                remainingCalories: targetCalories - totalCalories,
                meals: dateMeals,
            };

            console.log('✅ Meal Service: Daily nutrition calculated', {
                date,
                totalCalories: dailyNutrition.totalCalories,
                mealsCount: dateMeals.length
            });

            return {
                data: dailyNutrition,
                message: 'Daily nutrition calculated successfully',
                success: true,
            };
        } catch (error) {
            console.error('❌ Meal Service: Daily nutrition calculation failed', error);
            throw new ApiError('Failed to calculate daily nutrition', 'NUTRITION_CALC_ERROR');
        }
    }

    async getMealHistory(userId?: string, days: number = 7): Promise<ApiResponse<MealEntry[]>> {
        console.log('📈 Meal Service: Getting meal history', { userId, days });

        await simulateNetworkDelay(500);

        try {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(endDate.getDate() - days);

            const historyMeals = this.meals.filter(meal => {
                const mealDate = new Date(meal.date);
                return mealDate >= startDate && mealDate <= endDate;
            });

            // Sort by date descending (most recent first)
            historyMeals.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            return {
                data: historyMeals,
                message: `Found ${historyMeals.length} meals in the last ${days} days`,
                success: true,
            };
        } catch (error) {
            console.error('❌ Meal Service: Get meal history failed', error);
            throw new ApiError('Failed to get meal history', 'MEAL_HISTORY_ERROR');
        }
    }
}

// Export singleton instance
export const mealService = new MockMealService();

// Export types and utilities
export { ApiError };

// Helper function to check if error is ApiError
export const isApiError = (error: unknown): error is ApiError => {
    return error instanceof ApiError;
};

// Helper function to get error message
export const getErrorMessage = (error: unknown): string => {
    if (isApiError(error)) {
        return error.message;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unexpected error occurred';
};
