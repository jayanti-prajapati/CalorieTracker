import { tokens } from './tokens';

// Enhanced Design System for CalorieTracker
export const designSystem = {
    // Core tokens
    tokens,

    // Component variants and presets
    components: {
        // Button variants
        buttons: {
            primary: {
                backgroundColor: tokens.colors.brand.primary,
                color: tokens.colors.neutral.white,
                borderRadius: tokens.borderRadius.md,
                ...tokens.shadows.base,
            },
            secondary: {
                backgroundColor: tokens.colors.brand.secondary,
                color: tokens.colors.neutral.white,
                borderRadius: tokens.borderRadius.md,
                ...tokens.shadows.base,
            },
            outline: {
                backgroundColor: 'transparent',
                color: tokens.colors.brand.primary,
                borderWidth: 1,
                borderColor: tokens.colors.brand.primary,
                borderRadius: tokens.borderRadius.md,
            },
            ghost: {
                backgroundColor: 'transparent',
                color: tokens.colors.brand.primary,
            },
        },

        // Card variants
        cards: {
            default: {
                backgroundColor: tokens.colors.neutral.white,
                borderRadius: tokens.borderRadius.lg,
                padding: tokens.spacing[4],
                ...tokens.shadows.sm,
            },
            elevated: {
                backgroundColor: tokens.colors.neutral.white,
                borderRadius: tokens.borderRadius.lg,
                padding: tokens.spacing[4],
                ...tokens.shadows.md,
            },
            meal: {
                backgroundColor: tokens.colors.neutral.white,
                borderRadius: tokens.borderRadius.lg,
                padding: tokens.spacing[4],
                ...tokens.shadows.base,
                marginBottom: tokens.spacing[4],
            },
        },

        // Input variants
        inputs: {
            default: {
                backgroundColor: tokens.colors.neutral.white,
                borderWidth: 1,
                borderColor: tokens.colors.neutral.gray300,
                borderRadius: tokens.borderRadius.md,
                padding: tokens.spacing[4],
                fontSize: tokens.typography.fontSize.base,
            },
            filled: {
                backgroundColor: tokens.colors.neutral.gray100,
                borderWidth: 0,
                borderRadius: tokens.borderRadius.md,
                padding: tokens.spacing[4],
                fontSize: tokens.typography.fontSize.base,
            },
        },
    },

    // Layout patterns
    layouts: {
        screen: {
            flex: 1,
            backgroundColor: tokens.colors.neutral.white,
            padding: tokens.spacing[6],
        },
        container: {
            paddingHorizontal: tokens.spacing[6],
        },
        section: {
            marginBottom: tokens.spacing[8],
        },
        row: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
        },
        column: {
            flexDirection: 'column' as const,
        },
    },

    // Nutrition-specific styles
    nutrition: {
        calorieCard: {
            backgroundColor: tokens.colors.neutral.white,
            borderRadius: tokens.borderRadius.xl,
            padding: tokens.spacing[6],
            alignItems: 'center' as const,
            ...tokens.shadows.md,
        },
        macroCard: {
            backgroundColor: tokens.colors.neutral.white,
            borderRadius: tokens.borderRadius.lg,
            padding: tokens.spacing[4],
            alignItems: 'center' as const,
            minWidth: 100,
            marginHorizontal: tokens.spacing[2],
            ...tokens.shadows.sm,
        },
        progressRing: {
            protein: tokens.colors.nutrition.protein,
            carbs: tokens.colors.nutrition.carbs,
            fat: tokens.colors.nutrition.fat,
            calories: tokens.colors.nutrition.calories,
        },
    },

    // Navigation styles
    navigation: {
        tabBar: {
            backgroundColor: tokens.colors.neutral.white,
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: tokens.colors.neutral.black,
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            height: 80,
            paddingBottom: 20,
            paddingTop: 10,
            borderRadius: tokens.borderRadius.xl,
            marginBottom: 10,
            marginHorizontal: 5,
        },
        tabIcon: {
            width: 40,
            height: 40,
            borderRadius: tokens.borderRadius.full,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
        },
        activeTabIcon: {
            backgroundColor: tokens.colors.neutral.black,
            ...tokens.shadows.md,
        },
    },

    // Utility functions
    utils: {
        // Get spacing value
        spacing: (key: keyof typeof tokens.spacing) => tokens.spacing[key],

        // Get color value
        color: (path: string) => {
            const keys = path.split('.');
            let value: any = tokens.colors;
            for (const key of keys) {
                value = value[key];
            }
            return value;
        },

        // Get typography style
        typography: (variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption') => {
            const variants = {
                h1: {
                    fontSize: tokens.typography.fontSize['5xl'],
                    fontWeight: tokens.typography.fontWeight.bold,
                    lineHeight: tokens.typography.fontSize['5xl'] * tokens.typography.lineHeight.tight,
                },
                h2: {
                    fontSize: tokens.typography.fontSize['4xl'],
                    fontWeight: tokens.typography.fontWeight.bold,
                    lineHeight: tokens.typography.fontSize['4xl'] * tokens.typography.lineHeight.tight,
                },
                h3: {
                    fontSize: tokens.typography.fontSize['3xl'],
                    fontWeight: tokens.typography.fontWeight.semibold,
                    lineHeight: tokens.typography.fontSize['3xl'] * tokens.typography.lineHeight.tight,
                },
                h4: {
                    fontSize: tokens.typography.fontSize['2xl'],
                    fontWeight: tokens.typography.fontWeight.semibold,
                    lineHeight: tokens.typography.fontSize['2xl'] * tokens.typography.lineHeight.snug,
                },
                h5: {
                    fontSize: tokens.typography.fontSize.xl,
                    fontWeight: tokens.typography.fontWeight.semibold,
                    lineHeight: tokens.typography.fontSize.xl * tokens.typography.lineHeight.snug,
                },
                h6: {
                    fontSize: tokens.typography.fontSize.lg,
                    fontWeight: tokens.typography.fontWeight.semibold,
                    lineHeight: tokens.typography.fontSize.lg * tokens.typography.lineHeight.snug,
                },
                body1: {
                    fontSize: tokens.typography.fontSize.base,
                    fontWeight: tokens.typography.fontWeight.normal,
                    lineHeight: tokens.typography.fontSize.base * tokens.typography.lineHeight.normal,
                },
                body2: {
                    fontSize: tokens.typography.fontSize.sm,
                    fontWeight: tokens.typography.fontWeight.normal,
                    lineHeight: tokens.typography.fontSize.sm * tokens.typography.lineHeight.normal,
                },
                caption: {
                    fontSize: tokens.typography.fontSize.xs,
                    fontWeight: tokens.typography.fontWeight.normal,
                    lineHeight: tokens.typography.fontSize.xs * tokens.typography.lineHeight.normal,
                },
            };
            return variants[variant];
        },

        // Create shadow style
        shadow: (level: keyof typeof tokens.shadows) => tokens.shadows[level],
    },
} as const;

export type DesignSystem = typeof designSystem;
