import AsyncStorage from '@react-native-async-storage/async-storage';

// Safe storage wrapper that handles iOS Simulator directory issues
class SafeStorage {
    private fallbackStorage: Map<string, string> = new Map();
    private useAsyncStorage = true;

    async setItem(key: string, value: string): Promise<void> {
        if (this.useAsyncStorage) {
            try {
                await AsyncStorage.setItem(key, value);
                return;
            } catch (error) {
                console.warn('AsyncStorage failed, falling back to in-memory storage:', error);
                this.useAsyncStorage = false;
            }
        }

        // Fallback to in-memory storage
        this.fallbackStorage.set(key, value);
    }

    async getItem(key: string): Promise<string | null> {
        if (this.useAsyncStorage) {
            try {
                const value = await AsyncStorage.getItem(key);
                return value;
            } catch (error) {
                console.warn('AsyncStorage failed, falling back to in-memory storage:', error);
                this.useAsyncStorage = false;
            }
        }

        // Fallback to in-memory storage
        return this.fallbackStorage.get(key) || null;
    }

    async removeItem(key: string): Promise<void> {
        if (this.useAsyncStorage) {
            try {
                await AsyncStorage.removeItem(key);
                return;
            } catch (error) {
                console.warn('AsyncStorage failed, falling back to in-memory storage:', error);
                this.useAsyncStorage = false;
            }
        }

        // Fallback to in-memory storage
        this.fallbackStorage.delete(key);
    }

    async clear(): Promise<void> {
        if (this.useAsyncStorage) {
            try {
                await AsyncStorage.clear();
                return;
            } catch (error) {
                console.warn('AsyncStorage failed, falling back to in-memory storage:', error);
                this.useAsyncStorage = false;
            }
        }

        // Fallback to in-memory storage
        this.fallbackStorage.clear();
    }
}

export const storage = new SafeStorage();
