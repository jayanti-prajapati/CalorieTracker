export interface User {
    id: string;

    username: string;
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
    dateOfBirth: string;
    goalWeight: number;
    currentWeight: number;
    dailyStepGoal: number;
    targetCalories: number;
    createdAt: string;
    isPremium: boolean;
    avatar: string;
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