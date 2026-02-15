import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { tokens } from '../../theme/tokens';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'primary'
              ? tokens.colors.neutral.white
              : tokens.colors.brand.primary
          }
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.borderRadius.md,
    ...tokens.shadows.base,
  },

  // Variants
  primary: {
    backgroundColor: tokens.colors.brand.primary,
  },
  secondary: {
    backgroundColor: tokens.colors.brand.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: tokens.colors.brand.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  // Sizes
  sm: {
    height: tokens.sizes.button.sm.height,
    paddingHorizontal: tokens.sizes.button.sm.paddingHorizontal,
  },
  md: {
    height: tokens.sizes.button.md.height,
    paddingHorizontal: tokens.sizes.button.md.paddingHorizontal,
  },
  lg: {
    height: tokens.sizes.button.lg.height,
    paddingHorizontal: tokens.sizes.button.lg.paddingHorizontal,
  },
  xl: {
    height: tokens.sizes.button.xl.height,
    paddingHorizontal: tokens.sizes.button.xl.paddingHorizontal,
  },

  // States
  disabled: {
    opacity: 0.5,
    ...tokens.shadows.sm,
  },
  fullWidth: {
    width: '100%',
  },

  // Text styles
  text: {
    fontWeight: tokens.typography.fontWeight.semibold,
    textAlign: 'center',
  },

  // Text variants
  primaryText: {
    color: tokens.colors.neutral.white,
  },
  secondaryText: {
    color: tokens.colors.neutral.white,
  },
  outlineText: {
    color: tokens.colors.brand.primary,
  },
  ghostText: {
    color: tokens.colors.brand.primary,
  },

  // Text sizes
  smText: {
    fontSize: tokens.typography.fontSize.sm,
  },
  mdText: {
    fontSize: tokens.typography.fontSize.base,
  },
  lgText: {
    fontSize: tokens.typography.fontSize.lg,
  },
  xlText: {
    fontSize: tokens.typography.fontSize.xl,
  },
});

export default Button;
