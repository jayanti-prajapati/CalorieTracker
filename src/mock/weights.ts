import { WeightEntry } from '../types';

const generateWeightEntries = (): WeightEntry[] => {
    const entries: WeightEntry[] = [];
    const today = new Date();

    // Generate 7 days of weight entries
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        // Simulate slight weight fluctuations around 70kg
        const baseWeight = 70;
        const variation = (Math.random() - 0.5) * 2; // ±1kg variation
        const weight = Math.round((baseWeight + variation) * 10) / 10;

        entries.push({
            id: `weight_${i}`,
            weight,
            date: date.toISOString().split('T')[0],
            createdAt: date.toISOString(),
        });
    }

    return entries;
};

export const mockWeights: WeightEntry[] = generateWeightEntries();

export const getWeightEntries = async (days: number = 7): Promise<WeightEntry[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const sortedEntries = mockWeights
                .slice(-days)
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            resolve(sortedEntries);
        }, 200);
    });
};
