import { lightColors, darkColors, Colors } from './colors';
import { typography, Typography } from './typography';
import { spacing, borderRadius, shadows, Spacing, BorderRadius, Shadows } from './spacing';

// New design system exports
export { tokens } from './tokens';
export { designSystem } from './designSystem';
export type { Tokens, ColorTokens, TypographyTokens, SpacingTokens, BorderRadiusTokens, ShadowTokens } from './tokens';
export type { DesignSystem } from './designSystem';

export interface Theme {
    colors: Colors;
    typography: Typography;
    spacing: Spacing;
    borderRadius: BorderRadius;
    shadows: Shadows;
    isDark: boolean;
}

export const lightTheme: Theme = {
    colors: lightColors,
    typography,
    spacing,
    borderRadius,
    shadows,
    isDark: false,
};

export const darkTheme: Theme = {
    colors: darkColors,
    typography,
    spacing,
    borderRadius,
    shadows,
    isDark: true,
};

// Legacy exports for backward compatibility
export * from './colors';
export * from './typography';
export * from './spacing';
