import { DashboardData, DashboardStats, RecentMeal, DashboardFilters } from '../types';
import { ApiResponse } from '../../../types';
import { mockMeals } from '../../../mock/meals';
import { useAuthStore } from '../../auth/stores/authStore';

// Simulate network delay
const simulateNetworkDelay = (ms: number = 800): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Dashboard Service Interface
export interface DashboardService {
    getDashboardData(date: string, userId?: string): Promise<ApiResponse<DashboardData>>;
    getDashboardStats(date: string, userId?: string): Promise<ApiResponse<DashboardStats>>;
    updateStreakCount(userId: string): Promise<ApiResponse<{ streakCount: number }>>;
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

// Mock Dashboard Service Implementation
class MockDashboardService implements DashboardService {
    async getDashboardData(date: string, userId?: string): Promise<ApiResponse<DashboardData>> {
        console.log('📊 Dashboard Service: Loading dashboard data', { date, userId });

        await simulateNetworkDelay(600);

        try {
            // Get user data for target calories
            const user = useAuthStore.getState().user;
            const targetCalories = user?.targetCalories || 2712;

            // Calculate stats from recent meals
            const totalCalories = mockMeals.reduce((sum, meal) => sum + meal.calories, 0);
            const totalProtein = mockMeals.reduce((sum, meal) => sum + meal.protein, 0);
            const totalCarbs = mockMeals.reduce((sum, meal) => sum + meal.carbs, 0);
            const totalFat = mockMeals.reduce((sum, meal) => sum + meal.fat, 0);

            // Calculate macro targets (example ratios)
            const targetProtein = Math.round((targetCalories * 0.25) / 4); // 25% protein
            const targetCarbs = Math.round((targetCalories * 0.45) / 4); // 45% carbs
            const targetFat = Math.round((targetCalories * 0.30) / 9); // 30% fat

            const totalFiber = mockMeals.reduce((sum, meal) => sum + meal.fiber, 0);
            const totalSugar = mockMeals.reduce((sum, meal) => sum + meal.sugar, 0);
            const totalSodium = mockMeals.reduce((sum, meal) => sum + meal.sodium, 0);

            const stats: DashboardStats = {
                totalCalories,
                targetCalories,
                remainingCalories: Math.max(0, targetCalories - totalCalories),
                totalProtein,
                totalCarbs,
                totalFat,
                targetProtein,
                targetCarbs,
                targetFat,
                calorieProgress: targetCalories > 0 ? (totalCalories / targetCalories) * 100 : 0,
                proteinProgress: targetProtein > 0 ? (totalProtein / targetProtein) * 100 : 0,
                carbsProgress: targetCarbs > 0 ? (totalCarbs / targetCarbs) * 100 : 0,
                fatProgress: targetFat > 0 ? (totalFat / targetFat) * 100 : 0,
                totalFiber,
                totalSugar,
                totalSodium,
            };

            const dashboardData: DashboardData = {
                stats,
                recentMeals: mockMeals,
                streakCount: 1,
                currentWeight: user?.weight || 70,
                lastUpdated: new Date().toISOString(),
            };

            console.log('✅ Dashboard Service: Dashboard data loaded successfully');

            return {
                data: dashboardData,
                message: 'Dashboard data loaded successfully',
                success: true,
            };
        } catch (error) {
            console.error('❌ Dashboard Service: Failed to load dashboard data', error);
            throw new ApiError('Failed to load dashboard data', 'DASHBOARD_LOAD_ERROR');
        }
    }



    async getDashboardStats(date: string, userId?: string): Promise<ApiResponse<DashboardStats>> {
        console.log('📈 Dashboard Service: Loading dashboard stats', { date, userId });

        await simulateNetworkDelay(300);

        try {
            const user = useAuthStore.getState().user;
            const targetCalories = user?.targetCalories || 2712;

            const totalCalories = mockMeals.reduce((sum, meal) => sum + meal.calories, 0);
            const totalProtein = mockMeals.reduce((sum, meal) => sum + meal.protein, 0);
            const totalCarbs = mockMeals.reduce((sum, meal) => sum + meal.carbs, 0);
            const totalFat = mockMeals.reduce((sum, meal) => sum + meal.fat, 0);
            const totalFiber = mockMeals.reduce((sum, meal) => sum + meal.fiber, 0);
            const totalSugar = mockMeals.reduce((sum, meal) => sum + meal.sugar, 0);
            const totalSodium = mockMeals.reduce((sum, meal) => sum + meal.sodium, 0);

            const targetProtein = Math.round((targetCalories * 0.25) / 4);
            const targetCarbs = Math.round((targetCalories * 0.45) / 4);
            const targetFat = Math.round((targetCalories * 0.30) / 9);

            const healthScore = 75; // TODO: Calculate  formula


            const stats: DashboardStats = {
                totalCalories,
                targetCalories,
                remainingCalories: Math.max(0, targetCalories - totalCalories),
                totalProtein,
                totalCarbs,
                totalFat,
                targetProtein,
                targetCarbs,
                targetFat,
                calorieProgress: targetCalories > 0 ? (totalCalories / targetCalories) * 100 : 0,
                proteinProgress: targetProtein > 0 ? (totalProtein / targetProtein) * 100 : 0,
                carbsProgress: targetCarbs > 0 ? (totalCarbs / targetCarbs) * 100 : 0,
                fatProgress: targetFat > 0 ? (totalFat / targetFat) * 100 : 0,
                totalFiber,
                totalSugar,
                totalSodium,
                healthScore,
            };

            return {
                data: stats,
                message: 'Dashboard stats loaded successfully',
                success: true,
            };
        } catch (error) {
            console.error('❌ Dashboard Service: Failed to load dashboard stats', error);
            throw new ApiError('Failed to load dashboard stats', 'STATS_LOAD_ERROR');
        }
    }

    async updateStreakCount(userId: string): Promise<ApiResponse<{ streakCount: number }>> {
        console.log('🔥 Dashboard Service: Updating streak count', { userId });

        await simulateNetworkDelay(200);

        try {
            // In a real app, this would calculate the actual streak
            const streakCount = 1;

            return {
                data: { streakCount },
                message: 'Streak count updated successfully',
                success: true,
            };
        } catch (error) {
            console.error('❌ Dashboard Service: Failed to update streak count', error);
            throw new ApiError('Failed to update streak count', 'STREAK_UPDATE_ERROR');
        }
    }
}

// Export singleton instance
export const dashboardService = new MockDashboardService();

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
