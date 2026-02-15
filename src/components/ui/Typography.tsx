import React from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';
import { tokens } from '../../theme/tokens';

export interface TypographyProps extends TextProps {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'overline';
  color?:
    | keyof typeof tokens.colors.neutral
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info';
  align?: 'left' | 'center' | 'right' | 'justify';
  weight?: keyof typeof tokens.typography.fontWeight;
  style?: TextStyle;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body1',
  color = 'gray900',
  align = 'left',
  weight,
  style,
  ...textProps
}) => {
  const getColor = () => {
    switch (color) {
      case 'primary':
        return tokens.colors.brand.primary;
      case 'secondary':
        return tokens.colors.brand.secondary;
      case 'success':
        return tokens.colors.semantic.success;
      case 'warning':
        return tokens.colors.semantic.warning;
      case 'error':
        return tokens.colors.semantic.error;
      case 'info':
        return tokens.colors.semantic.info;
      default:
        return tokens.colors.neutral[
          color as keyof typeof tokens.colors.neutral
        ];
    }
  };

  const textStyles = [
    styles[variant],
    {
      color: getColor(),
      textAlign: align,
      ...(weight && { fontWeight: tokens.typography.fontWeight[weight] }),
    },
    style,
  ];

  return (
    <Text style={textStyles} {...textProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: tokens.typography.fontSize['5xl'],
    fontWeight: tokens.typography.fontWeight.bold,
    lineHeight:
      tokens.typography.fontSize['5xl'] * tokens.typography.lineHeight.tight,
  },
  h2: {
    fontSize: tokens.typography.fontSize['4xl'],
    fontWeight: tokens.typography.fontWeight.bold,
    lineHeight:
      tokens.typography.fontSize['4xl'] * tokens.typography.lineHeight.tight,
  },
  h3: {
    fontSize: tokens.typography.fontSize['3xl'],
    fontWeight: tokens.typography.fontWeight.semibold,
    lineHeight:
      tokens.typography.fontSize['3xl'] * tokens.typography.lineHeight.tight,
  },
  h4: {
    fontSize: tokens.typography.fontSize['2xl'],
    fontWeight: tokens.typography.fontWeight.semibold,
    lineHeight:
      tokens.typography.fontSize['2xl'] * tokens.typography.lineHeight.snug,
  },
  h5: {
    fontSize: tokens.typography.fontSize.xl,
    fontWeight: tokens.typography.fontWeight.semibold,
    lineHeight:
      tokens.typography.fontSize.xl * tokens.typography.lineHeight.snug,
  },
  h6: {
    fontSize: tokens.typography.fontSize.lg,
    fontWeight: tokens.typography.fontWeight.semibold,
    lineHeight:
      tokens.typography.fontSize.lg * tokens.typography.lineHeight.snug,
  },
  body1: {
    fontSize: tokens.typography.fontSize.base,
    fontWeight: tokens.typography.fontWeight.normal,
    lineHeight:
      tokens.typography.fontSize.base * tokens.typography.lineHeight.normal,
  },
  body2: {
    fontSize: tokens.typography.fontSize.sm,
    fontWeight: tokens.typography.fontWeight.normal,
    lineHeight:
      tokens.typography.fontSize.sm * tokens.typography.lineHeight.normal,
  },
  caption: {
    fontSize: tokens.typography.fontSize.xs,
    fontWeight: tokens.typography.fontWeight.normal,
    lineHeight:
      tokens.typography.fontSize.xs * tokens.typography.lineHeight.normal,
  },
  overline: {
    fontSize: tokens.typography.fontSize.xs,
    fontWeight: tokens.typography.fontWeight.medium,
    lineHeight:
      tokens.typography.fontSize.xs * tokens.typography.lineHeight.normal,
    textTransform: 'uppercase',
    letterSpacing: tokens.typography.letterSpacing.wide,
  },
});

export default Typography;
