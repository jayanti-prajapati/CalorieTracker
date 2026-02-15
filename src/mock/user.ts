import { User } from "../features/auth";

export const mockUsers: User[] = [
    {
        id: '1',
        email: 'demo@example.com',
        name: 'Demo User',
        age: 28,
        height: 175, // cm
        weight: 70, // kg
        gender: 'male',
        activityLevel: 'moderate',
        goal: 'maintain',
        bmr: 1750,
        tdee: 2712,
        targetCalories: 2712,
        createdAt: '2024-01-01T00:00:00.000Z',
        isOnboarded: true,
    }]
