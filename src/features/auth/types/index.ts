export interface User {
    id: string;
    email: string;
    name: string;
    age: number;
    height: number; // in cm
    weight: number; // in kg
    gender: 'male' | 'female';
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
    goal: 'lose' | 'maintain' | 'gain';
    bmr: number;
    tdee: number;
    targetCalories: number;
    createdAt: string;
    isOnboarded: boolean;
}

// Store types
export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
}