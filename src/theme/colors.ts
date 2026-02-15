export const lightColors = {
    primary: '#4CAF50',
    primaryDark: '#388E3C',
    primaryLight: '#81C784',
    secondary: '#FF9800',
    secondaryDark: '#F57C00',
    secondaryLight: '#FFB74D',

    background: '#FFFFFF',
    surface: '#F5F5F5',
    card: '#FFFFFF',

    text: '#212121',
    textSecondary: '#757575',
    textLight: '#BDBDBD',

    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',

    border: '#E0E0E0',
    divider: '#EEEEEE',

    // Calorie tracking specific colors
    calories: '#FF6B35',
    protein: '#4CAF50',
    carbs: '#2196F3',
    fat: '#FF9800',
    water: '#03DAC6',

    // Progress colors
    progressBackground: '#E0E0E0',
    progressFill: '#4CAF50',
} as const;

export const darkColors = {
    primary: '#66BB6A',
    primaryDark: '#4CAF50',
    primaryLight: '#81C784',
    secondary: '#FFB74D',
    secondaryDark: '#FF9800',
    secondaryLight: '#FFCC02',

    background: '#121212',
    surface: '#1E1E1E',
    card: '#2D2D2D',

    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    textLight: '#666666',

    success: '#66BB6A',
    warning: '#FFB74D',
    error: '#EF5350',
    info: '#42A5F5',

    border: '#333333',
    divider: '#2D2D2D',

    // Calorie tracking specific colors
    calories: '#FF8A65',
    protein: '#66BB6A',
    carbs: '#42A5F5',
    fat: '#FFB74D',
    water: '#4DD0E1',

    // Progress colors
    progressBackground: '#333333',
    progressFill: '#66BB6A',
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
