export interface ProgressData {
    dayStreak: number;
    badgesEarned: Badge[];
    weightProgress: WeightProgress;
    weightChanges: WeightChange[];
    dailyCalories: DailyCalorieData[];
    weeklyEnergy: WeeklyEnergyData;
    bmi: BMIData;
}

export interface Badge {
    id: string;
    name: string;
    icon: string;
    color: string;
    earnedDate: Date;
    description: string;
}

export interface WeightProgress {
    currentWeight: number;
    startWeight: number;
    goalWeight: number;
    goalDate: Date;
    nextWeighIn: number; // days
    progressPercentage: number;
    weightHistory: WeightEntry[];
}

export interface WeightEntry {
    date: Date;
    weight: number;
}

export interface WeightChange {
    period: string;
    change: number;
    trend: 'decrease' | 'increase' | 'no-change';
}

export interface DailyCalorieData {
    date: Date;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

export interface WeeklyEnergyData {
    totalBurned: number;
    totalConsumed: number;
    netEnergy: number;
    dailyData: DailyEnergyData[];
    expenditureChanges: ExpenditureChange[];
}

export interface DailyEnergyData {
    date: Date;
    burned: number;
    consumed: number;
}

export interface ExpenditureChange {
    period: string;
    change: number;
    trend: 'decrease' | 'increase';
}

export interface BMIData {
    currentBMI: number;
    category: 'underweight' | 'healthy' | 'overweight' | 'obese';
    height: number; // in cm
    weight: number; // in kg
}

export interface ProgressState {
    data: ProgressData | null;
    isLoading: boolean;
    error: string | null;
    lastUpdated: Date | null;
}

export interface ProgressActions {
    fetchProgressData: () => Promise<void>;
    updateWeightEntry: (weight: number, date?: Date) => Promise<void>;
    refreshProgress: () => Promise<void>;
    setError: (error: string | null) => void;
}
