export interface DashboardStats {
    totalCalories: number;
    targetCalories: number;
    remainingCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    targetProtein: number;
    targetCarbs: number;
    targetFat: number;
    calorieProgress: number;
    proteinProgress: number;
    carbsProgress: number;
    fatProgress: number;
}

export interface RecentMeal {
    id: string;
    name: string;
    time: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    imageUrl?: string;
}

export interface DashboardData {
    stats: DashboardStats;
    recentMeals: RecentMeal[];
    streakCount: number;
    currentWeight: number;
    lastUpdated: string;
}

export interface DashboardState {
    data: DashboardData | null;
    selectedDate: string;
    isLoading: boolean;
    isRefreshing: boolean;
    error: string | null;

    // Actions
    loadDashboard: (date: string) => Promise<void>;
    refreshDashboard: () => Promise<void>;
    setSelectedDate: (date: string) => void;
    clearError: () => void;
}

export interface DashboardFilters {
    dateRange?: {
        start: string;
        end: string;
    };
    mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}
