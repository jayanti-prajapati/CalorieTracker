import { User } from "../features/auth";

export const mockUsers: User[] = [
    {
        id: '1',
        name: 'Jayy P',
        username: '@jayy_p',
        email: 'jayy.p@example.com',
        isPremium: true,
        age: 28,
        weight: 70,
        avatar: 'JP',
        goalWeight: 54.4,
        currentWeight: 77.8,
        height: 172,
        dateOfBirth: '9/6/1987',
        gender: 'male' as const,
        dailyStepGoal: 10000,
        activityLevel: 'moderate' as const,
        goal: 'lose' as const,
        bmr: 1650,
        tdee: 2200,
        targetCalories: 1700,
        isOnboarded: true,
        createdAt: new Date().toISOString(),
    }]
