import { mockUsers } from './../../../mock/user';
import { User } from '../types';
import { ApiResponse } from '@/types';


// Mock credentials for testing
const mockCredentials = [
    { username: 'demo_user', password: 'password', userId: '1' },
    { username: 'john_doe', password: 'password123', userId: '2' },
    { username: 'jane_smith', password: 'mypassword', userId: '3' },
];

// Simulate network delay
const simulateNetworkDelay = (ms: number = 1000): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Auth Service Interface
export interface AuthService {
    login(username: string, password: string): Promise<ApiResponse<{ user: User; token: string }>>;
    register(userData: RegisterData): Promise<ApiResponse<{ user: User; token: string }>>;
    logout(): Promise<ApiResponse<null>>;
    refreshToken(token: string): Promise<ApiResponse<{ token: string }>>;
    forgotPassword(email: string): Promise<ApiResponse<null>>;
    resetPassword(token: string, newPassword: string): Promise<ApiResponse<null>>;
    verifyToken(token: string): Promise<ApiResponse<{ user: User }>>;
    updateProfile(userId: string, userData: Partial<User>): Promise<ApiResponse<User>>;
    deleteAccount(userId: string): Promise<ApiResponse<null>>;
}

// Registration data interface
export interface RegisterData {
    username: string;
    email: string;
    password: string;
    name: string;
    age?: number;
    height?: number;
    weight?: number;
    gender?: 'male' | 'female';
    activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active';
    goal?: 'lose' | 'maintain' | 'gain';
}

// Generate mock JWT token (simplified for demo)
const generateMockToken = (userId: string): string => {
    const tokenData = {
        userId,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        iat: Date.now()
    };
    return `mock-jwt-token-${userId}-${Date.now()}`;
};

// Parse mock JWT token (simplified for demo)
const parseMockToken = (token: string): { userId: string; exp: number } | null => {
    try {
        // Extract userId from mock token format
        const parts = token.split('-');
        if (parts.length < 4 || parts[0] !== 'mock' || parts[1] !== 'jwt' || parts[2] !== 'token') {
            return null;
        }

        const userId = parts[3];
        if (!userId) return null;

        const exp = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now

        return { userId, exp };
    } catch {
        return null;
    }
};

// Mock Auth Service Implementation
class MockAuthService implements AuthService {
    async login(username: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
        console.log(' Auth Service: Login attempt', { username });
        console.log('🔐 Auth Service: Login attempt', { username });

        await simulateNetworkDelay(800);

        // Find matching credentials
        const credential = mockCredentials.find(
            cred => cred.username === username && cred.password === password
        );

        if (!credential) {
            throw new ApiError('Invalid username or password', 'AUTH_INVALID_CREDENTIALS');
        }

        // Find user by ID
        const user = mockUsers.find(u => u.id === credential.userId);
        if (!user) {
            throw new ApiError('User not found', 'USER_NOT_FOUND');
        }

        const token = generateMockToken(user.id);

        console.log('✅ Auth Service: Login successful', { userId: user.id, username: user.name });

        return {
            data: { user, token },
            message: 'Login successful',
            success: true,
        };
    }

    async register(userData: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> {
        console.log('📝 Auth Service: Registration attempt', { username: userData.username, email: userData.email });

        await simulateNetworkDelay(1200);

        // Check if username already exists
        const existingCredential = mockCredentials.find(cred => cred.username === userData.username);
        if (existingCredential) {
            throw new ApiError('Username already exists', 'AUTH_USERNAME_EXISTS');
        }

        // Check if email already exists
        const existingUser = mockUsers.find(user => user.email === userData.email);
        if (existingUser) {
            throw new ApiError('Email already registered', 'AUTH_EMAIL_EXISTS');
        }

        // Create new user
        const newUser: User = {
            id: Date.now().toString(),
            email: userData.email,
            name: userData.name,
            age: userData.age || 25,
            height: userData.height || 170,
            weight: userData.weight || 70,
            gender: userData.gender || 'male',
            activityLevel: userData.activityLevel || 'moderate',
            goal: userData.goal || 'maintain',
            bmr: 1750, // Would be calculated based on user data
            tdee: 2712, // Would be calculated based on user data
            targetCalories: 2712, // Would be calculated based on goal
            createdAt: new Date().toISOString(),
            isOnboarded: false,
        };

        // Add to mock database
        mockUsers.push(newUser);
        mockCredentials.push({
            username: userData.username,
            password: userData.password,
            userId: newUser.id,
        });

        const token = generateMockToken(newUser.id);

        console.log('✅ Auth Service: Registration successful', { userId: newUser.id, username: newUser.name });

        return {
            data: { user: newUser, token },
            message: 'Registration successful',
            success: true,
        };
    }

    async logout(): Promise<ApiResponse<null>> {
        console.log('👋 Auth Service: Logout');

        await simulateNetworkDelay(300);

        return {
            data: null,
            message: 'Logout successful',
            success: true,
        };
    }

    async refreshToken(token: string): Promise<ApiResponse<{ token: string }>> {
        console.log('🔄 Auth Service: Token refresh');

        await simulateNetworkDelay(500);

        const tokenData = parseMockToken(token);
        if (!tokenData) {
            throw new ApiError('Invalid token', 'AUTH_INVALID_TOKEN');
        }

        if (tokenData.exp < Date.now()) {
            throw new ApiError('Token expired', 'AUTH_TOKEN_EXPIRED');
        }

        const newToken = generateMockToken(tokenData.userId);

        return {
            data: { token: newToken },
            message: 'Token refreshed successfully',
            success: true,
        };
    }

    async forgotPassword(email: string): Promise<ApiResponse<null>> {
        console.log('🔑 Auth Service: Forgot password', { email });

        await simulateNetworkDelay(1000);

        const user = mockUsers.find(u => u.email === email);
        if (!user) {
            // Don't reveal if email exists for security
            console.log('⚠️ Auth Service: Email not found, but returning success for security');
        }

        return {
            data: null,
            message: 'If the email exists, a reset link has been sent',
            success: true,
        };
    }

    async resetPassword(token: string, newPassword: string): Promise<ApiResponse<null>> {
        console.log('🔐 Auth Service: Password reset');

        await simulateNetworkDelay(800);

        // In a real app, you'd verify the reset token
        // For mock, we'll just simulate success
        return {
            data: null,
            message: 'Password reset successful',
            success: true,
        };
    }

    async verifyToken(token: string): Promise<ApiResponse<{ user: User }>> {
        console.log('🔍 Auth Service: Token verification');

        await simulateNetworkDelay(400);

        const tokenData = parseMockToken(token);
        if (!tokenData) {
            throw new ApiError('Invalid token', 'AUTH_INVALID_TOKEN');
        }

        if (tokenData.exp < Date.now()) {
            throw new ApiError('Token expired', 'AUTH_TOKEN_EXPIRED');
        }

        const user = mockUsers.find(u => u.id === tokenData.userId);
        if (!user) {
            throw new ApiError('User not found', 'USER_NOT_FOUND');
        }

        return {
            data: { user },
            message: 'Token verified successfully',
            success: true,
        };
    }

    async updateProfile(userId: string, userData: Partial<User>): Promise<ApiResponse<User>> {
        console.log('👤 Auth Service: Profile update', { userId });

        await simulateNetworkDelay(600);

        const userIndex = mockUsers.findIndex(u => u.id === userId);

        // Update user data
        const updatedUser = { ...mockUsers[userIndex], ...userData } as User;
        mockUsers[userIndex] = updatedUser;

        return {
            data: updatedUser,
            message: 'Profile updated successfully',
            success: true,
        };
    }

    async deleteAccount(userId: string): Promise<ApiResponse<null>> {
        console.log(' Auth Service: Account deletion', { userId });

        await simulateNetworkDelay(1000);

        const userIndex = mockUsers.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            throw new ApiError('User not found', 'USER_NOT_FOUND');
        }

        // Remove user and credentials
        mockUsers.splice(userIndex, 1);
        const credentialIndex = mockCredentials.findIndex(c => c.userId === userId);
        if (credentialIndex !== -1) {
            mockCredentials.splice(credentialIndex, 1);
        }

        return {
            data: null,
            message: 'Account deleted successfully',
            success: true,
        };
    }
}

// Custom error class for API errors
class ApiError extends Error {
    constructor(
        message: string,
        public code: string,
        public details?: Record<string, unknown>
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

// Export singleton instance
export const authService = new MockAuthService();

// Export types and utilities
export { ApiError };

// Helper function to check if error is ApiError
export const isApiError = (error: unknown): error is ApiError => {
    return error instanceof ApiError;
};

// Helper function to get error message
export const getErrorMessage = (error: unknown): string => {
    if (isApiError(error)) {
        return error.message;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unexpected error occurred';
};