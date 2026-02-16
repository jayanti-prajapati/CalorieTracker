import { DailyNutrition } from '../../meal/types';

export interface HealthScoreResult {
    score: number;
    maxScore: number;
    recommendation: string;
}

export const calculateHealthScore = (
    dailyNutrition: DailyNutrition,
    userGoals?: {
        targetCalories: number;
        targetProtein: number;
        targetCarbs: number;
        targetFat: number;
    }
): HealthScoreResult => {
    let score = 0;
    const maxScore = 10;
    const recommendations: string[] = [];

    // Default goals if not provided
    const goals = userGoals || {
        targetCalories: dailyNutrition.targetCalories || 2000,
        targetProtein: 150, // grams
        targetCarbs: 250,   // grams
        targetFat: 67,      // grams
    };

    // Calorie balance (0-3 points)
    const calorieRatio = dailyNutrition.totalCalories / goals.targetCalories;
    if (calorieRatio >= 0.8 && calorieRatio <= 1.2) {
        score += 3; // Perfect calorie balance
    } else if (calorieRatio >= 0.6 && calorieRatio <= 1.4) {
        score += 2; // Good calorie balance
    } else if (calorieRatio >= 0.4 && calorieRatio <= 1.6) {
        score += 1; // Fair calorie balance
    } else {
        if (calorieRatio > 1.2) {
            recommendations.push('calorie intake is high for weight loss');
        } else {
            recommendations.push('calorie intake is low, consider eating more');
        }
    }

    // Protein intake (0-3 points)
    const proteinRatio = dailyNutrition.totalProtein / goals.targetProtein;
    if (proteinRatio >= 0.8 && proteinRatio <= 1.2) {
        score += 3; // Perfect protein
    } else if (proteinRatio >= 0.6 && proteinRatio <= 1.4) {
        score += 2; // Good protein
    } else if (proteinRatio >= 0.4) {
        score += 1; // Fair protein
    } else {
        recommendations.push('increase protein for better results');
    }

    // Carbohydrate balance (0-2 points)
    const carbRatio = dailyNutrition.totalCarbs / goals.targetCarbs;
    if (carbRatio >= 0.7 && carbRatio <= 1.3) {
        score += 2; // Good carb balance
    } else if (carbRatio >= 0.5 && carbRatio <= 1.5) {
        score += 1; // Fair carb balance
    } else {
        if (carbRatio > 1.3) {
            recommendations.push('carbohydrate intake is high');
        }
    }

    // Fat intake (0-2 points)
    const fatRatio = dailyNutrition.totalFat / goals.targetFat;
    if (fatRatio >= 0.7 && fatRatio <= 1.3) {
        score += 2; // Good fat balance
    } else if (fatRatio >= 0.5 && fatRatio <= 1.5) {
        score += 1; // Fair fat balance
    }

    // Generate recommendation text
    let recommendation = '';
    if (recommendations.length > 0) {
        const mainRecommendations = recommendations.slice(0, 2); // Take top 2 recommendations
        recommendation = `Your ${mainRecommendations.join(' and ')}.`;

        // Capitalize first letter
        recommendation = recommendation.charAt(0).toUpperCase() + recommendation.slice(1);
    } else {
        recommendation = 'Great job! Your nutrition is well balanced. Keep up the excellent work!';
    }

    return {
        score: Math.min(score, maxScore),
        maxScore,
        recommendation,
    };
};

export const getHealthScoreColor = (score: number, maxScore: number): string => {
    const percentage = (score / maxScore) * 100;

    if (percentage >= 80) return '#4CAF50'; // Green - Excellent
    if (percentage >= 60) return '#FF9800'; // Orange - Good
    if (percentage >= 40) return '#FFC107'; // Yellow - Fair
    return '#F44336'; // Red - Needs improvement
};
