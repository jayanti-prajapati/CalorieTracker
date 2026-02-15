# CalorieTracker Design System

A comprehensive design system for the CalorieTracker React Native application, providing consistent styling, components, and design patterns.

## Overview

The design system is built around design tokens that define the core visual language of the application. It includes:

- **Design Tokens**: Core values for colors, typography, spacing, shadows, and more
- **Component Library**: Reusable UI components built with consistent styling
- **Layout Patterns**: Common layout structures and patterns
- **Nutrition-Specific Styles**: Specialized styles for calorie tracking features

## Design Tokens

### Colors

#### Brand Colors
- **Primary**: `#4CAF50` - Main brand color (green)
- **Secondary**: `#FF9800` - Secondary accent color (orange)
- **Accent**: `#03DAC6` - Tertiary accent color (teal)

#### Semantic Colors
- **Success**: `#4CAF50`
- **Warning**: `#FF9800`
- **Error**: `#F44336`
- **Info**: `#2196F3`

#### Nutrition Colors
- **Calories**: `#FF6B35`
- **Protein**: `#E91E63`
- **Carbs**: `#FF9800`
- **Fat**: `#2196F3`
- **Water**: `#03DAC6`

#### Neutral Colors
- Gray scale from `gray50` (#FAFAFA) to `gray900` (#212121)
- Pure `white` and `black`

### Typography

#### Font Sizes
- `xs`: 12px
- `sm`: 14px
- `base`: 16px
- `lg`: 18px
- `xl`: 20px
- `2xl`: 24px
- `3xl`: 30px
- `4xl`: 36px
- `5xl`: 48px
- `6xl`: 60px

#### Font Weights
- `light`: 300
- `normal`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700
- `extrabold`: 800

### Spacing

Based on a 4px grid system:
- `1`: 4px
- `2`: 8px
- `3`: 12px
- `4`: 16px
- `5`: 20px
- `6`: 24px
- `8`: 32px
- `10`: 40px
- `12`: 48px
- `16`: 64px
- `20`: 80px
- `24`: 96px
- `32`: 128px

### Border Radius
- `sm`: 4px
- `base`: 8px
- `md`: 12px
- `lg`: 16px
- `xl`: 20px
- `2xl`: 24px
- `3xl`: 32px
- `full`: 9999px (circular)

### Shadows

Five levels of elevation:
- `sm`: Subtle shadow for cards
- `base`: Standard shadow for buttons
- `md`: Medium shadow for elevated cards
- `lg`: Large shadow for modals
- `xl`: Extra large shadow for floating elements

## Component Library

### Button
Versatile button component with multiple variants and sizes.

```tsx
import { Button } from '../components/ui';

<Button
  title="Get Started"
  variant="primary"
  size="lg"
  onPress={handlePress}
/>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`
**Sizes**: `sm`, `md`, `lg`, `xl`

### Input
Form input component with labels, validation, and icons.

```tsx
import { Input } from '../components/ui';

<Input
  label="Email"
  placeholder="Enter your email"
  error={emailError}
  leftIcon={<EmailIcon />}
/>
```

**Variants**: `default`, `filled`, `outline`
**Sizes**: `sm`, `md`, `lg`

### Card
Container component for grouping related content.

```tsx
import { Card } from '../components/ui';

<Card variant="elevated" padding={6}>
  <Text>Card content</Text>
</Card>
```

**Variants**: `default`, `elevated`, `outlined`

### Typography
Text component with semantic variants and styling options.

```tsx
import { Typography } from '../components/ui';

<Typography variant="h1" color="primary" align="center">
  Welcome to CalorieTracker
</Typography>
```

**Variants**: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `body1`, `body2`, `caption`, `overline`

### CircularProgress
Progress indicator for displaying completion percentages.

```tsx
import { CircularProgress } from '../components/ui';

<CircularProgress
  progress={75}
  size={120}
  color={tokens.colors.brand.primary}
  showPercentage
/>
```

## Usage

### Importing Design Tokens

```tsx
import { tokens } from '../theme/tokens';
import { designSystem } from '../theme/designSystem';

// Use tokens directly
const styles = StyleSheet.create({
  container: {
    padding: tokens.spacing[4],
    backgroundColor: tokens.colors.neutral.white,
    borderRadius: tokens.borderRadius.lg,
  },
});

// Use design system utilities
const styles = StyleSheet.create({
  container: {
    ...designSystem.layouts.screen,
    ...designSystem.utils.shadow('md'),
  },
});
```

### Using Components

```tsx
import { Button, Card, Typography } from '../components/ui';

const MyScreen = () => (
  <Card variant="elevated">
    <Typography variant="h2" color="primary">
      Welcome
    </Typography>
    <Button
      title="Get Started"
      variant="primary"
      size="lg"
      onPress={handlePress}
    />
  </Card>
);
```

## Nutrition-Specific Patterns

### Calorie Display Card
```tsx
const calorieCardStyle = {
  ...designSystem.nutrition.calorieCard,
};
```

### Macro Progress Rings
```tsx
const proteinColor = designSystem.nutrition.progressRing.protein;
const carbsColor = designSystem.nutrition.progressRing.carbs;
const fatColor = designSystem.nutrition.progressRing.fat;
```

### Meal Cards
```tsx
const mealCardStyle = {
  ...designSystem.components.cards.meal,
};
```

## Best Practices

1. **Use Design Tokens**: Always use design tokens instead of hardcoded values
2. **Component Consistency**: Use the provided UI components for consistent styling
3. **Semantic Colors**: Use semantic color names (success, error, warning) instead of specific colors
4. **Spacing Scale**: Stick to the 4px spacing scale for consistent layouts
5. **Typography Hierarchy**: Use the defined typography variants for proper content hierarchy
6. **Shadow Consistency**: Use the predefined shadow levels for consistent elevation

## Extending the Design System

When adding new components or patterns:

1. Define new design tokens in `tokens.ts`
2. Create reusable components in `components/ui/`
3. Add component variants to `designSystem.ts`
4. Update this documentation
5. Ensure TypeScript types are properly defined

## File Structure

```
src/theme/
├── tokens.ts           # Core design tokens
├── designSystem.ts     # Component variants and utilities
├── colors.ts          # Legacy color definitions
├── typography.ts      # Legacy typography definitions
├── spacing.ts         # Legacy spacing definitions
├── index.ts          # Theme exports
└── README.md         # This documentation

src/components/ui/
├── Button.tsx        # Button component
├── Input.tsx         # Input component
├── Card.tsx          # Card component
├── Typography.tsx    # Typography component
├── CircularProgress.tsx # Progress component
└── index.ts          # Component exports
```
