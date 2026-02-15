import { TextStyle } from 'react-native';

export const fontSizes = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
} as const;

export const fontWeights = {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
} as const;

export const lineHeights = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    '2xl': 36,
    '3xl': 42,
    '4xl': 48,
    '5xl': 64,
} as const;

export const typography = {
    // Headers
    h1: {
        fontSize: fontSizes['4xl'],
        fontWeight: fontWeights.bold,
        lineHeight: lineHeights['4xl'],
    } as TextStyle,

    h2: {
        fontSize: fontSizes['3xl'],
        fontWeight: fontWeights.bold,
        lineHeight: lineHeights['3xl'],
    } as TextStyle,

    h3: {
        fontSize: fontSizes['2xl'],
        fontWeight: fontWeights.semibold,
        lineHeight: lineHeights['2xl'],
    } as TextStyle,

    h4: {
        fontSize: fontSizes.xl,
        fontWeight: fontWeights.semibold,
        lineHeight: lineHeights.xl,
    } as TextStyle,

    h5: {
        fontSize: fontSizes.lg,
        fontWeight: fontWeights.medium,
        lineHeight: lineHeights.lg,
    } as TextStyle,

    h6: {
        fontSize: fontSizes.md,
        fontWeight: fontWeights.medium,
        lineHeight: lineHeights.md,
    } as TextStyle,

    // Body text
    body: {
        fontSize: fontSizes.md,
        fontWeight: fontWeights.normal,
        lineHeight: lineHeights.md,
    } as TextStyle,

    bodyLarge: {
        fontSize: fontSizes.lg,
        fontWeight: fontWeights.normal,
        lineHeight: lineHeights.lg,
    } as TextStyle,

    bodySmall: {
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.normal,
        lineHeight: lineHeights.sm,
    } as TextStyle,

    // Special text styles
    caption: {
        fontSize: fontSizes.xs,
        fontWeight: fontWeights.normal,
        lineHeight: lineHeights.xs,
    } as TextStyle,

    button: {
        fontSize: fontSizes.md,
        fontWeight: fontWeights.semibold,
        lineHeight: lineHeights.md,
    } as TextStyle,

    label: {
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.medium,
        lineHeight: lineHeights.sm,
    } as TextStyle,

    // Calorie tracking specific
    calorieNumber: {
        fontSize: fontSizes['5xl'],
        fontWeight: fontWeights.bold,
        lineHeight: lineHeights['5xl'],
    } as TextStyle,

    macroLabel: {
        fontSize: fontSizes.xs,
        fontWeight: fontWeights.medium,
        lineHeight: lineHeights.xs,
    } as TextStyle,

    macroValue: {
        fontSize: fontSizes.lg,
        fontWeight: fontWeights.semibold,
        lineHeight: lineHeights.lg,
    } as TextStyle,
} as const;

export type Typography = typeof typography;
