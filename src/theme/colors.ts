export const lightColors = {
    primary: '#1A1A1A',
    primaryDark: '#000000',
    primaryLight: '#424242',
    secondary: '#4CAF50',
    secondaryDark: '#388E3C',
    secondaryLight: '#81C784',

    background: '#FFFFFF',
    surface: '#F8F9FA',
    card: '#FFFFFF',

    text: '#1A1A1A',
    textSecondary: '#6C757D',
    textLight: '#ADB5BD',

    success: '#4CAF50',
    warning: '#FFC107',
    error: '#DC3545',
    info: '#6C757D',

    border: '#E9ECEF',
    divider: '#F1F3F4',

    // Calorie tracking specific colors
    calories: '#1A1A1A',
    protein: '#4CAF50',
    carbs: '#6C757D',
    fat: '#ADB5BD',
    water: '#4CAF50',

    // Progress colors
    progressBackground: '#E9ECEF',
    progressFill: '#1A1A1A',
} as const;

export const darkColors = {
    primary: '#FFFFFF',
    primaryDark: '#F8F9FA',
    primaryLight: '#E9ECEF',
    secondary: '#4CAF50',
    secondaryDark: '#388E3C',
    secondaryLight: '#81C784',

    background: '#1A1A1A',
    surface: '#2D2D2D',
    card: '#424242',

    text: '#FFFFFF',
    textSecondary: '#ADB5BD',
    textLight: '#6C757D',

    success: '#4CAF50',
    warning: '#FFC107',
    error: '#DC3545',
    info: '#ADB5BD',

    border: '#424242',
    divider: '#2D2D2D',

    // Calorie tracking specific colors
    calories: '#FFFFFF',
    protein: '#4CAF50',
    carbs: '#ADB5BD',
    fat: '#6C757D',
    water: '#4CAF50',

    // Progress colors
    progressBackground: '#424242',
    progressFill: '#FFFFFF',
} as const;

export interface Colors {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    secondaryDark: string;
    secondaryLight: string;

    background: string;
    surface: string;
    card: string;

    text: string;
    textSecondary: string;
    textLight: string;

    success: string;
    warning: string;
    error: string;
    info: string;

    border: string;
    divider: string;

    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    water: string;

    progressBackground: string;
    progressFill: string;
}
