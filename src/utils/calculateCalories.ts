import { User } from '../types';

export interface CalorieCalculation {
    bmr: number;
    tdee: number;
    targetCalories: number;
}

/**
 * Calculate BMR using Mifflin-St Jeor Formula
 * Male: BMR = 10W + 6.25H - 5A + 5
 * Female: BMR = 10W + 6.25H - 5A - 161
 */
export const calculateBMR = (
    weight: number, // kg
    height: number, // cm
    age: number,
    gender: 'male' | 'female',
): number => {
    const baseBMR = 10 * weight + 6.25 * height - 5 * age;
    return gender === 'male' ? baseBMR + 5 : baseBMR - 161;
};

/**
 * Calculate TDEE by multiplying BMR with activity factor
 */
export const calculateTDEE = (
    bmr: number,
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active',
): number => {
    const activityFactors = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
    };

    return Math.round(bmr * activityFactors[activityLevel]);
};

/**
 * Calculate target calories based on goal
 */
export const calculateTargetCalories = (
    tdee: number,
    goal: 'lose' | 'maintain' | 'gain',
): number => {
    const goalAdjustments = {
        lose: -500,
        maintain: 0,
        gain: 300,
    };

    return Math.max(1200, tdee + goalAdjustments[goal]); // Minimum 1200 calories
};

/**
 * Calculate all calorie-related values for a user
 */
export const calculateUserCalories = (user: Partial<User>): CalorieCalculation => {
    if (!user.weight || !user.height || !user.age || !user.gender || !user.activityLevel || !user.goal) {
        throw new Error('Missing required user data for calorie calculation');
    }

    const bmr = calculateBMR(user.weight, user.height, user.age, user.gender);
    const tdee = calculateTDEE(bmr, user.activityLevel);
    const targetCalories = calculateTargetCalories(tdee, user.goal);

    return {
        bmr: Math.round(bmr),
        tdee,
        targetCalories,
    };
};

/**
 * Calculate macronutrient targets based on target calories
 * Standard distribution: 30% protein, 40% carbs, 30% fat
 */
export const calculateMacroTargets = (targetCalories: number) => {
    return {
        protein: Math.round((targetCalories * 0.3) / 4), // 4 calories per gram
        carbs: Math.round((targetCalories * 0.4) / 4), // 4 calories per gram
        fat: Math.round((targetCalories * 0.3) / 9), // 9 calories per gram
    };
};

/**
 * Calculate nutrition values for a given quantity of food
 */
export const calculateFoodNutrition = (
    food: { calories: number; protein: number; carbs: number; fat: number },
    quantity: number, // in grams
) => {
    const multiplier = quantity / 100; // nutrition values are per 100g

    return {
        calories: Math.round(food.calories * multiplier),
        protein: Math.round(food.protein * multiplier * 10) / 10, // 1 decimal place
        carbs: Math.round(food.carbs * multiplier * 10) / 10,
        fat: Math.round(food.fat * multiplier * 10) / 10,
    };
};

/**
 * Calculate remaining calories and macros for the day
 */
export const calculateRemainingNutrition = (
    targetCalories: number,
    consumedCalories: number,
    macroTargets: { protein: number; carbs: number; fat: number },
    consumedMacros: { protein: number; carbs: number; fat: number },
) => {
    return {
        calories: targetCalories - consumedCalories,
        protein: Math.round((macroTargets.protein - consumedMacros.protein) * 10) / 10,
        carbs: Math.round((macroTargets.carbs - consumedMacros.carbs) * 10) / 10,
        fat: Math.round((macroTargets.fat - consumedMacros.fat) * 10) / 10,
    };
};
