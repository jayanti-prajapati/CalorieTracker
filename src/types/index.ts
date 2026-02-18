
// Navigation types
export type RootStackParamList = {
    Auth: undefined;
    Onboarding: undefined;
    Main: undefined;
};

// API types (for future use)
export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

export interface ApiError {
    message: string;
    code: string;
    details?: Record<string, unknown>;
}
