import { WaterEntry } from '../types';

const generateWaterEntries = (): WaterEntry[] => {
    const entries: WaterEntry[] = [];
    const today = new Date();

    // Generate some water entries for today
    const amounts = [250, 500, 250, 300, 200]; // ml

    amounts.forEach((amount, index) => {
        const entryTime = new Date(today);
        entryTime.setHours(8 + index * 2); // Spread throughout the day

        entries.push({
            id: `water_${index}`,
            amount,
            date: today.toISOString().split('T')[0],
            createdAt: entryTime.toISOString(),
        });
    });

    return entries;
};

export const mockWaterEntries: WaterEntry[] = generateWaterEntries();

export const getWaterEntriesForDate = async (date: string): Promise<WaterEntry[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const entriesForDate = mockWaterEntries.filter(entry => entry.date === date);
            resolve(entriesForDate);
        }, 200);
    });
};
