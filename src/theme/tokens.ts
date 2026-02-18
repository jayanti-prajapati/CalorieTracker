// Design Tokens - Core design values for the CalorieTracker app

export const tokens = {
    // Color Palette
    colors: {
        // Brand Colors - Black/White/Gray with Green Accent
        brand: {
            primary: '#1A1A1A',
            primaryDark: '#000000',
            primaryLight: '#424242',
            secondary: '#4CAF50',
            accent: '#4CAF50',
        },

        // Semantic Colors - Monochromatic with Strategic Color
        semantic: {
            success: '#4CAF50',
            warning: '#6C757D',
            error: '#1A1A1A',
            info: '#ADB5BD',
        },

        // Nutrition Colors - Black/White/Gray Theme
        nutrition: {
            calories: '#1A1A1A',
            protein: '#4CAF50',
            carbs: '#6C757D',
            fat: '#ADB5BD',
            water: '#4CAF50',
        },

        // Neutral Colors - Enhanced Black/White/Gray Scale
        neutral: {
            white: '#FFFFFF',
            gray50: '#F8F9FA',
            gray100: '#F1F3F4',
            gray200: '#E9ECEF',
            gray300: '#DEE2E6',
            gray400: '#CED4DA',
            gray500: '#ADB5BD',
            gray600: '#6C757D',
            gray700: '#495057',
            gray800: '#343A40',
            gray900: '#1A1A1A',
            black: '#000000',
        },
    },

    // Typography Scale
    typography: {
        fontFamily: {
            primary: 'System',
            mono: 'Menlo',
        },

        fontSize: {
            xs: 12,
            sm: 14,
            base: 16,
            lg: 18,
            xl: 20,
            '2xl': 24,
            '3xl': 30,
            '4xl': 36,
            '5xl': 48,
            '6xl': 60,
        },

        fontWeight: {
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800',
        },

        lineHeight: {
            tight: 1.25,
            snug: 1.375,
            normal: 1.5,
            relaxed: 1.625,
            loose: 2,
        },

        letterSpacing: {
            tighter: -0.05,
            tight: -0.025,
            normal: 0,
            wide: 0.025,
            wider: 0.05,
            widest: 0.1,
        },
    },

    // Spacing Scale
    spacing: {
        0: 0,
        1: 4,
        2: 8,
        3: 12,
        4: 16,
        5: 20,
        6: 24,
        8: 32,
        10: 40,
        12: 48,
        16: 64,
        20: 80,
        24: 96,
        32: 128,
        40: 160,
        48: 192,
        56: 224,
        64: 256,
    },

    // Border Radius
    borderRadius: {
        none: 0,
        sm: 4,
        base: 8,
        md: 12,
        lg: 16,
        xl: 20,
        '2xl': 24,
        '3xl': 32,
        full: 9999,
    },

    // Shadows
    shadows: {
        sm: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
        },
        base: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },
        md: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 4,
        },
        lg: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 8,
        },
        xl: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.25,
            shadowRadius: 24,
            elevation: 12,
        },
    },

    // Animation
    animation: {
        duration: {
            fast: 150,
            normal: 300,
            slow: 500,
        },
        easing: {
            linear: 'linear',
            ease: 'ease',
            easeIn: 'ease-in',
            easeOut: 'ease-out',
            easeInOut: 'ease-in-out',
        },
    },

    // Layout
    layout: {
        container: {
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        },

        breakpoints: {
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        },
    },

    // Component Sizes
    sizes: {
        button: {
            sm: { height: 32, paddingHorizontal: 12 },
            md: { height: 40, paddingHorizontal: 16 },
            lg: { height: 48, paddingHorizontal: 20 },
            xl: { height: 56, paddingHorizontal: 24 },
        },

        input: {
            sm: { height: 32, paddingHorizontal: 12 },
            md: { height: 40, paddingHorizontal: 16 },
            lg: { height: 48, paddingHorizontal: 20 },
        },

        avatar: {
            xs: 24,
            sm: 32,
            md: 40,
            lg: 48,
            xl: 64,
            '2xl': 80,
        },

        icon: {
            xs: 12,
            sm: 16,
            md: 20,
            lg: 24,
            xl: 32,
        },
    },
} as const;

// Type definitions for tokens
export type Tokens = typeof tokens;
export type ColorTokens = typeof tokens.colors;
export type TypographyTokens = typeof tokens.typography;
export type SpacingTokens = typeof tokens.spacing;
export type BorderRadiusTokens = typeof tokens.borderRadius;
export type ShadowTokens = typeof tokens.shadows;
