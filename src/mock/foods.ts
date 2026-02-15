import { Food } from '../types';

export const mockFoods: Food[] = [
    {
        id: '1',
        name: 'Chicken Breast',
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6,
        barcode: '1234567890123',
        brand: 'Fresh',
        category: 'Meat',
    },
    {
        id: '2',
        name: 'Brown Rice',
        calories: 111,
        protein: 2.6,
        carbs: 23,
        fat: 0.9,
        category: 'Grains',
    },
    {
        id: '3',
        name: 'Broccoli',
        calories: 34,
        protein: 2.8,
        carbs: 7,
        fat: 0.4,
        category: 'Vegetables',
    },
    {
        id: '4',
        name: 'Banana',
        calories: 89,
        protein: 1.1,
        carbs: 23,
        fat: 0.3,
        category: 'Fruits',
    },
    {
        id: '5',
        name: 'Greek Yogurt',
        calories: 59,
        protein: 10,
        carbs: 3.6,
        fat: 0.4,
        brand: 'Chobani',
        category: 'Dairy',
    },
    {
        id: '6',
        name: 'Almonds',
        calories: 579,
        protein: 21,
        carbs: 22,
        fat: 50,
        category: 'Nuts',
    },
    {
        id: '7',
        name: 'Salmon',
        calories: 208,
        protein: 20,
        carbs: 0,
        fat: 13,
        category: 'Fish',
    },
    {
        id: '8',
        name: 'Sweet Potato',
        calories: 86,
        protein: 1.6,
        carbs: 20,
        fat: 0.1,
        category: 'Vegetables',
    },
    {
        id: '9',
        name: 'Oatmeal',
        calories: 68,
        protein: 2.4,
        carbs: 12,
        fat: 1.4,
        brand: 'Quaker',
        category: 'Grains',
    },
    {
        id: '10',
        name: 'Eggs',
        calories: 155,
        protein: 13,
        carbs: 1.1,
        fat: 11,
        category: 'Dairy',
    },
    {
        id: '11',
        name: 'Avocado',
        calories: 160,
        protein: 2,
        carbs: 9,
        fat: 15,
        category: 'Fruits',
    },
    {
        id: '12',
        name: 'Quinoa',
        calories: 120,
        protein: 4.4,
        carbs: 22,
        fat: 1.9,
        category: 'Grains',
    },
    {
        id: '13',
        name: 'Spinach',
        calories: 23,
        protein: 2.9,
        carbs: 3.6,
        fat: 0.4,
        category: 'Vegetables',
    },
    {
        id: '14',
        name: 'Apple',
        calories: 52,
        protein: 0.3,
        carbs: 14,
        fat: 0.2,
        category: 'Fruits',
    },
    {
        id: '15',
        name: 'Tuna',
        calories: 144,
        protein: 30,
        carbs: 0,
        fat: 1,
        brand: 'StarKist',
        category: 'Fish',
    },
    {
        id: '16',
        name: 'Whole Wheat Bread',
        calories: 247,
        protein: 13,
        carbs: 41,
        fat: 4.2,
        category: 'Grains',
    },
    {
        id: '17',
        name: 'Cottage Cheese',
        calories: 98,
        protein: 11,
        carbs: 3.4,
        fat: 4.3,
        category: 'Dairy',
    },
    {
        id: '18',
        name: 'Turkey Breast',
        calories: 135,
        protein: 30,
        carbs: 0,
        fat: 1,
        category: 'Meat',
    },
    {
        id: '19',
        name: 'Blueberries',
        calories: 57,
        protein: 0.7,
        carbs: 14,
        fat: 0.3,
        category: 'Fruits',
    },
    {
        id: '20',
        name: 'Peanut Butter',
        calories: 588,
        protein: 25,
        carbs: 20,
        fat: 50,
        brand: 'Jif',
        category: 'Nuts',
    },
    {
        id: '21',
        name: 'Carrots',
        calories: 41,
        protein: 0.9,
        carbs: 10,
        fat: 0.2,
        category: 'Vegetables',
    },
    {
        id: '22',
        name: 'Milk',
        calories: 42,
        protein: 3.4,
        carbs: 5,
        fat: 1,
        category: 'Dairy',
    },
    {
        id: '23',
        name: 'Pasta',
        calories: 131,
        protein: 5,
        carbs: 25,
        fat: 1.1,
        category: 'Grains',
    },
    {
        id: '24',
        name: 'Orange',
        calories: 47,
        protein: 0.9,
        carbs: 12,
        fat: 0.1,
        category: 'Fruits',
    },
    {
        id: '25',
        name: 'Lean Beef',
        calories: 250,
        protein: 26,
        carbs: 0,
        fat: 15,
        category: 'Meat',
    },
];

// Simulate async API call
export const getFoods = async (searchTerm?: string): Promise<Food[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (searchTerm) {
                const filtered = mockFoods.filter(food =>
                    food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    food.category?.toLowerCase().includes(searchTerm.toLowerCase())
                );
                resolve(filtered);
            } else {
                resolve(mockFoods);
            }
        }, 400);
    });
};

export const getFoodById = async (id: string): Promise<Food | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const food = mockFoods.find(f => f.id === id);
            resolve(food || null);
        }, 200);
    });
};

export const getFoodByBarcode = async (barcode: string): Promise<Food | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate random food for barcode scan
            const randomFood = mockFoods[Math.floor(Math.random() * mockFoods.length)];
            const foodWithBarcode: Food = {
                ...randomFood,
                barcode,
            };
            resolve(foodWithBarcode);
        }, 800);
    });
};
