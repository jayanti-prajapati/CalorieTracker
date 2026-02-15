import { create } from 'zustand';
import { storage } from '../../../utils/storage';
import { AuthState, User } from '../types';
import { calculateUserCalories } from '../../../utils/calculateCalories';
import { authService, isApiError, getErrorMessage } from '../services/auth-service';

// Using safe storage wrapper that handles AsyncStorage errors

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,

    login: async (username: string, password: string) => {
        set({ isLoading: true });
        try {
            const response = await authService.login(username, password);
            const { user, token } = response.data;

            console.log('Login successful, setting state:', { user: user.name, isAuthenticated: true, isOnboarded: user.isOnboarded });

            // Persist to AsyncStorage
            await storage.setItem('user', JSON.stringify(user));
            await storage.setItem('token', token);

            set({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
            });

            console.log('Auth state updated after login');
        } catch (error) {
            console.error('Login failed:', error);
            set({ isLoading: false });

            // Use auth service error handling
            const errorMessage = getErrorMessage(error);
            throw new Error(errorMessage);
        }
    },

    register: async (userData: Partial<User>) => {
        set({ isLoading: true });
        try {
            // Prepare registration data for auth service
            const registerData = {
                username: userData.email?.split('@')[0] || `user_${Date.now()}`, // Generate username from email
                email: userData.email || '',
                password: 'password', // In a real app, this would come from the form
                name: userData.name || '',
                ...(userData.age && { age: userData.age }),
                ...(userData.height && { height: userData.height }),
                ...(userData.weight && { weight: userData.weight }),
                ...(userData.gender && { gender: userData.gender }),
                ...(userData.activityLevel && { activityLevel: userData.activityLevel }),
                ...(userData.goal && { goal: userData.goal }),
            };

            const response = await authService.register(registerData);
            let { user, token } = response.data;

            // Calculate calories if we have enough data and they weren't calculated by the service
            if (user.weight && user.height && user.age && user.gender && user.activityLevel && user.goal) {
                if (user.bmr === 0 || user.tdee === 0 || user.targetCalories === 0) {
                    const calories = calculateUserCalories(user);
                    user = {
                        ...user,
                        bmr: calories.bmr,
                        tdee: calories.tdee,
                        targetCalories: calories.targetCalories,
                        isOnboarded: true,
                    };
                }
            }

            // Persist to AsyncStorage
            await storage.setItem('user', JSON.stringify(user));
            await storage.setItem('token', token);

            set({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            console.error('Registration failed:', error);
            set({ isLoading: false });

            // Use auth service error handling
            const errorMessage = getErrorMessage(error);
            throw new Error(errorMessage);
        }
    },

    logout: async () => {
        try {
            // Call auth service logout
            await authService.logout();

            // Clear AsyncStorage
            await storage.removeItem('user');
            await storage.removeItem('token');

            set({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            });
        } catch (error) {
            console.error('Logout error:', error);
            // Even if service call fails, clear local state
            await storage.removeItem('user');
            await storage.removeItem('token');

            set({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            });
        }
    },

    updateUser: async (userData: Partial<User>) => {
        const currentUser = get().user;
        if (!currentUser) return;

        try {
            // Update user profile via auth service
            const response = await authService.updateProfile(currentUser.id, userData);
            let updatedUser = response.data;

            // Recalculate calories if relevant data changed
            if (userData.weight || userData.height || userData.age || userData.gender || userData.activityLevel || userData.goal) {
                try {
                    const calories = calculateUserCalories(updatedUser);
                    updatedUser = {
                        ...updatedUser,
                        bmr: calories.bmr,
                        tdee: calories.tdee,
                        targetCalories: calories.targetCalories,
                        isOnboarded: true,
                    };
                } catch (error) {
                    console.warn('Failed to calculate calories:', error);
                }
            }

            // Persist to AsyncStorage
            await storage.setItem('user', JSON.stringify(updatedUser));

            set({ user: updatedUser });
        } catch (error) {
            console.error('Update user failed:', error);

            // Fallback to local update if service fails
            const updatedUser = { ...currentUser, ...userData };

            // Recalculate calories if relevant data changed
            if (userData.weight || userData.height || userData.age || userData.gender || userData.activityLevel || userData.goal) {
                try {
                    const calories = calculateUserCalories(updatedUser);
                    updatedUser.bmr = calories.bmr;
                    updatedUser.tdee = calories.tdee;
                    updatedUser.targetCalories = calories.targetCalories;
                    updatedUser.isOnboarded = true;
                } catch (error) {
                    console.warn('Failed to calculate calories:', error);
                }
            }

            // Persist to AsyncStorage
            await storage.setItem('user', JSON.stringify(updatedUser));
            set({ user: updatedUser });

            // Re-throw error for UI handling
            const errorMessage = getErrorMessage(error);
            throw new Error(errorMessage);
        }
    },
}));

// Initialize store from persisted data
const initializeAuthStore = async (): Promise<void> => {
    try {
        const userString = await storage.getItem('user');
        const token = await storage.getItem('token');

        if (userString && token) {
            const user = JSON.parse(userString) as User;

            try {
                // Verify token with auth service
                const response = await authService.verifyToken(token);
                const verifiedUser = response.data.user;

                useAuthStore.setState({
                    user: verifiedUser,
                    token,
                    isAuthenticated: true,
                    isLoading: false,
                });

                console.log('Auth store initialized with verified token');
            } catch (tokenError) {
                console.warn('Token verification failed, clearing auth data:', tokenError);
                // Clear invalid token data
                await storage.removeItem('user');
                await storage.removeItem('token');

                useAuthStore.setState({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            }
        } else {
            // No stored auth data
            useAuthStore.setState({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            });
        }
    } catch (error) {
        console.warn('Failed to initialize auth store from storage:', error);
        // Clear corrupted data
        await storage.removeItem('user');
        await storage.removeItem('token');

        useAuthStore.setState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
        });
    }
};

// Initialize on module load
initializeAuthStore();
