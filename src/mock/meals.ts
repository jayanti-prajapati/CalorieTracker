import { MealEntry } from './../features/meal/types';


// Mock recent meals data
export const mockMeals: MealEntry[] = [
    {
        id: '1',
        name: 'Whole Pomegranate',
        time: '3:31 PM',
        calories: 105,
        protein: 1,
        carbs: 26,
        fat: 0,
        quantity: 100,
        mealType: 'lunch',
        date: new Date().toISOString().split('T')[0] ?? '',
        createdAt: new Date().toISOString(),
        imageUrl: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=120&h=120&fit=crop',
    },
    {
        id: '2',
        name: 'Half Banana',
        time: '12:46 PM',
        calories: 51,
        protein: 1,
        carbs: 13,
        fat: 0,
        quantity: 100,
        mealType: 'lunch',
        date: new Date().toISOString().split('T')[0] ?? '',
        createdAt: new Date().toISOString(),
        imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=120&h=120&fit=crop',
    },
    {
        id: '3',
        name: 'Tea',
        time: '12:13 PM',
        calories: 50,
        protein: 1,
        carbs: 0,
        fat: 1,
        quantity: 100,
        mealType: 'lunch',
        date: new Date().toISOString().split('T')[0] ?? '',
        createdAt: new Date().toISOString(),
        imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=120&h=120&fit=crop',
    },
    {
        id: '4',
        name: 'Frothed Milk',
        time: '10:36 AM',
        calories: 220,
        protein: 11,
        carbs: 16,
        fat: 12,
        createdAt: new Date().toISOString(),
        quantity: 100,
        mealType: 'lunch',
        date: new Date().toISOString().split('T')[0] ?? '',
        imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=120&h=120&fit=crop',
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
