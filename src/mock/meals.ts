import { MealEntry } from './../features/meal/types';




// Mock recent meals data
export const mockMeals: MealEntry[] = [
    {
        id: '1',
        name: 'Whole Pomegranate',
        calories: 105,
        protein: 1,
        carbs: 26,
        fat: 0,
        quantity: 100,
        mealType: 'lunch',
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Pomegranate_fruit_-_whole_and_piece_with_arils.jpg/1200px-Pomegranate_fruit_-_whole_and_piece_with_arils.jpg',
        fiber: 0,
        sugar: 0,
        sodium: 0,
    },
    {
        id: '2',
        name: 'Half Banana',
        calories: 51,
        protein: 1,
        carbs: 13,
        fat: 0,
        quantity: 100,
        mealType: 'lunch',
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=120&h=120&fit=crop',
        fiber: 0,
        sugar: 0,
        sodium: 0,
    },
    {
        id: '3',
        name: 'Tea',
        calories: 50,
        protein: 1,
        carbs: 0,
        fat: 1,
        quantity: 100,
        mealType: 'lunch',
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=120&h=120&fit=crop',
        fiber: 0,
        sugar: 0,
        sodium: 0,
    },
    {
        id: '4',
        name: 'Frothed Milk',
        calories: 220,
        protein: 11,
        carbs: 16,
        fat: 12,
        quantity: 100,
        mealType: 'lunch',
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=120&h=120&fit=crop',
        fiber: 0,
        sugar: 0,
        sodium: 0,
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
