

export interface MealEntry {
    id: string;
    quantity: number; // in grams
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    date: string; // ISO date string
    createdAt: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    barcode?: string;
    brand?: string;
    category?: string;
    imageUrl?: string;
}

export interface WaterEntry {
    id: string;
    amount: number; // in ml
    date: string; // ISO date string
    createdAt: string;
}

export interface WeightEntry {
    id: string;
    weight: number; // in kg
    date: string; // ISO date string
    createdAt: string;
}

export interface DailyNutrition {
    date: string;
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    targetCalories: number;
    remainingCalories: number;
    meals: MealEntry[];
}

export interface DailyWater {
    date: string;
    totalAmount: number; // in ml
    targetAmount: number; // in ml
    entries: WaterEntry[];
}

// Navigation types
export type RootStackParamList = {
    Auth: undefined;
    Onboarding: undefined;
    Main: undefined;
};

export type AuthStackParamList = {
    Landing: undefined;
    SignIn: undefined;
};

export type OnboardingStackParamList = {
    Welcome: undefined;
    PersonalInfo: undefined;
    Goals: undefined;
    Complete: undefined;
};

export type MainTabParamList = {
    Dashboard: undefined;
    AddMeal: undefined;
    Water: undefined;
    Groups: undefined;
    Profile: undefined;
};


export interface WaterState {
    entries: WaterEntry[];
    dailyWater: Record<string, DailyWater>;
    targetAmount: number;
    isLoading: boolean;
    addWaterEntry: (amount: number) => void;
    removeWaterEntry: (entryId: string) => void;
    getDailyWater: (date: string) => DailyWater;
    setTargetAmount: (amount: number) => void;
}

export interface WeightState {
    entries: WeightEntry[];
    isLoading: boolean;
    addWeightEntry: (weight: number) => void;
    removeWeightEntry: (entryId: string) => void;
    getWeightTrend: (days: number) => WeightEntry[];
}

export interface MealState {
    meals: MealEntry[];
    dailyNutrition: Record<string, DailyNutrition>;
    isLoading: boolean;
    addMeal: (meal: Omit<MealEntry, 'id' | 'createdAt'>) => void;
    removeMeal: (mealId: string) => void;
    updateMeal: (mealId: string, updates: Partial<MealEntry>) => void;
    getDailyNutrition: (date: string) => DailyNutrition;
    updateDailyNutritionCache: (date: string) => void;
}