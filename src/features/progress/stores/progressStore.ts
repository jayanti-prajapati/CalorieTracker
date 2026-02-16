import { create } from 'zustand';
import { ProgressState, ProgressActions, ProgressData } from '../types';

// Mock data for development
const mockProgressData: ProgressData = {
    dayStreak: 2,
    badgesEarned: [
        {
            id: '1',
            name: 'First Week',
            icon: '🏆',
            color: '#EC4899',
            earnedDate: new Date('2024-01-15'),
            description: 'Completed your first week of tracking',
        },
        {
            id: '2',
            name: 'Consistency',
            icon: '⭐',
            color: '#8B5CF6',
            earnedDate: new Date('2024-01-20'),
            description: 'Logged meals for 5 consecutive days',
        },
        {
            id: '3',
            name: 'Goal Setter',
            icon: '🎯',
            color: '#06B6D4',
            earnedDate: new Date('2024-01-25'),
            description: 'Set your first nutrition goal',
        },
    ],
    weightProgress: {
        currentWeight: 77.8,
        startWeight: 77.8,
        goalWeight: 54.4,
        goalDate: new Date('2027-02-11'),
        nextWeighIn: 7,
        progressPercentage: 0,
        weightHistory: [
            { date: new Date('2024-01-01'), weight: 77.8 },
            { date: new Date('2024-01-15'), weight: 77.8 },
            { date: new Date('2024-02-01'), weight: 77.8 },
        ],
    },
    weightChanges: [
        { period: '3 day', change: 0.0, trend: 'no-change' },
        { period: '7 day', change: 0.0, trend: 'no-change' },
        { period: '14 day', change: 0.0, trend: 'no-change' },
        { period: '30 day', change: 0.0, trend: 'no-change' },
        { period: '90 day', change: 0.0, trend: 'no-change' },
        { period: 'All Time', change: 0.0, trend: 'no-change' },
    ],
    dailyCalories: [
        {
            date: new Date('2024-02-11'),
            calories: 650,
            protein: 25,
            carbs: 45,
            fat: 15,
        },
        {
            date: new Date('2024-02-10'),
            calories: 480,
            protein: 20,
            carbs: 35,
            fat: 12,
        },
        {
            date: new Date('2024-02-09'),
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
        },
        {
            date: new Date('2024-02-08'),
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
        },
        {
            date: new Date('2024-02-07'),
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
        },
        {
            date: new Date('2024-02-06'),
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
        },
        {
            date: new Date('2024-02-05'),
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
        },
    ],
    weeklyEnergy: {
        totalBurned: 261,
        totalConsumed: 1191,
        netEnergy: 930,
        dailyData: [
            { date: new Date('2024-02-11'), burned: 150, consumed: 650 },
            { date: new Date('2024-02-10'), burned: 80, consumed: 480 },
            { date: new Date('2024-02-09'), burned: 0, consumed: 0 },
            { date: new Date('2024-02-08'), burned: 0, consumed: 0 },
            { date: new Date('2024-02-07'), burned: 0, consumed: 0 },
            { date: new Date('2024-02-06'), burned: 0, consumed: 0 },
            { date: new Date('2024-02-05'), burned: 0, consumed: 0 },
        ],
        expenditureChanges: [
            { period: '3 day', change: -47.3, trend: 'decrease' },
            { period: '7 day', change: -16.6, trend: 'decrease' },
            { period: '14 day', change: -21.4, trend: 'decrease' },
            { period: '30 day', change: -74.2, trend: 'decrease' },
            { period: '90 day', change: 81.9, trend: 'increase' },
        ],
    },
    bmi: {
        currentBMI: 26.3,
        category: 'overweight',
        height: 170,
        weight: 77.8,
    },
};

type ProgressStore = ProgressState & ProgressActions;

export const useProgressStore = create<ProgressStore>((set, get) => ({
    // State
    data: null,
    isLoading: false,
    error: null,
    lastUpdated: null,

    // Actions
    fetchProgressData: async () => {
        set({ isLoading: true, error: null });

        try {
            // Simulate API call delay
            await new Promise<void>(resolve => setTimeout(resolve, 1000));

            // In a real app, this would be an API call
            set({
                data: mockProgressData,
                isLoading: false,
                lastUpdated: new Date(),
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch progress data',
                isLoading: false,
            });
        }
    },

    updateWeightEntry: async (weight: number, date = new Date()) => {
        const currentData = get().data;
        if (!currentData) return;

        set({ isLoading: true, error: null });

        try {
            // Simulate API call
            await new Promise<void>(resolve => setTimeout(resolve, 500));

            // Update weight progress
            const updatedWeightProgress = {
                ...currentData.weightProgress,
                currentWeight: weight,
                weightHistory: [
                    ...currentData.weightProgress.weightHistory,
                    { date, weight },
                ],
            };

            // Calculate new BMI
            const heightInMeters = currentData.bmi.height / 100;
            const newBMI = weight / (heightInMeters * heightInMeters);

            let category: 'underweight' | 'healthy' | 'overweight' | 'obese' = 'healthy';
            if (newBMI < 18.5) category = 'underweight';
            else if (newBMI >= 25 && newBMI < 30) category = 'overweight';
            else if (newBMI >= 30) category = 'obese';

            const updatedBMI = {
                ...currentData.bmi,
                currentBMI: newBMI,
                category,
                weight,
            };

            set({
                data: {
                    ...currentData,
                    weightProgress: updatedWeightProgress,
                    bmi: updatedBMI,
                },
                isLoading: false,
                lastUpdated: new Date(),
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to update weight',
                isLoading: false,
            });
        }
    },

    refreshProgress: async () => {
        await get().fetchProgressData();
    },

    setError: (error: string | null) => {
        set({ error });
    },
}));

// Initialize store with mock data on first load
useProgressStore.getState().fetchProgressData();
