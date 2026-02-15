import { MealEntry } from '../types';
import { mockFoods } from './foods';

export const mockMeals: MealEntry[] = [
    {
        id: '1',
        foodId: '1',
        food: mockFoods[0], // Chicken Breast
        quantity: 150,
        mealType: 'lunch',
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        foodId: '2',
        food: mockFoods[1], // Brown Rice
        quantity: 100,
        mealType: 'lunch',
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
    },
    {
        id: '3',
        foodId: '9',
        food: mockFoods[8], // Oatmeal
        quantity: 80,
        mealType: 'breakfast',
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
    },
    {
        id: '4',
        foodId: '3',
        food: mockFoods[2], // Banana
        quantity: 120,
        mealType: 'breakfast',
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
    },
];

export const getMealsForDate = async (date: string): Promise<MealEntry[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const mealsForDate = mockMeals.filter(meal => meal.date === date);
            resolve(mealsForDate);
        }, 300);
    });
};
