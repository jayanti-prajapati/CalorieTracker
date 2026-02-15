import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { tokens } from '../../theme/tokens';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outline';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  size = 'md',
  variant = 'default',
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyles = [styles.container, containerStyle];

  const inputContainerStyles = [
    styles.inputContainer,
    styles[variant],
    styles[size],
    isFocused && styles.focused,
    error && styles.error,
  ];

  const textInputStyles = [styles.input, styles[`${size}Input`], inputStyle];

  return (
    <View style={containerStyles}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <View style={inputContainerStyles}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={textInputStyles}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={tokens.colors.neutral.gray500}
          {...textInputProps}
        />

        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {hint && !error && <Text style={styles.hintText}>{hint}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: tokens.spacing[4],
  },

  label: {
    fontSize: tokens.typography.fontSize.sm,
    fontWeight: tokens.typography.fontWeight.medium,
    color: tokens.colors.neutral.gray700,
    marginBottom: tokens.spacing[2],
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: tokens.borderRadius.md,
    borderWidth: 1,
  },

  // Variants
  default: {
    backgroundColor: tokens.colors.neutral.white,
    borderColor: tokens.colors.neutral.gray300,
  },
  filled: {
    backgroundColor: tokens.colors.neutral.gray100,
    borderColor: 'transparent',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: tokens.colors.neutral.gray300,
  },

  // Sizes
  sm: {
    height: tokens.sizes.input.sm.height,
    paddingHorizontal: tokens.sizes.input.sm.paddingHorizontal,
  },
  md: {
    height: tokens.sizes.input.md.height,
    paddingHorizontal: tokens.sizes.input.md.paddingHorizontal,
  },
  lg: {
    height: tokens.sizes.input.lg.height,
    paddingHorizontal: tokens.sizes.input.lg.paddingHorizontal,
  },

  // States
  focused: {
    borderColor: tokens.colors.brand.primary,
    ...tokens.shadows.base,
  },
  error: {
    borderColor: tokens.colors.semantic.error,
  },

  input: {
    flex: 1,
    fontSize: tokens.typography.fontSize.base,
    color: tokens.colors.neutral.gray900,
    paddingVertical: 0, // Remove default padding
  },

  // Input sizes
  smInput: {
    fontSize: tokens.typography.fontSize.sm,
  },
  mdInput: {
    fontSize: tokens.typography.fontSize.base,
  },
  lgInput: {
    fontSize: tokens.typography.fontSize.lg,
  },

  leftIcon: {
    marginRight: tokens.spacing[2],
  },
  rightIcon: {
    marginLeft: tokens.spacing[2],
  },

  errorText: {
    fontSize: tokens.typography.fontSize.xs,
    color: tokens.colors.semantic.error,
    marginTop: tokens.spacing[1],
  },
  hintText: {
    fontSize: tokens.typography.fontSize.xs,
    color: tokens.colors.neutral.gray500,
    marginTop: tokens.spacing[1],
  },
});

export default Input;
