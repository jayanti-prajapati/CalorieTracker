import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { tokens } from '../../theme/tokens';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: keyof typeof tokens.spacing;
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 4,
  style,
}) => {
  const cardStyles = [
    styles.base,
    styles[variant],
    { padding: tokens.spacing[padding] },
    style,
  ];

  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: tokens.borderRadius.lg,
    backgroundColor: tokens.colors.neutral.white,
  },

  default: {
    ...tokens.shadows.sm,
  },

  elevated: {
    ...tokens.shadows.md,
  },

  outlined: {
    borderWidth: 1,
    borderColor: tokens.colors.neutral.gray200,
    ...tokens.shadows.sm,
  },
});

export default Card;
