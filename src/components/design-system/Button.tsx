/**
 * Button Component - Interactive Action Button
 * 
 * This component provides a fully-featured button for the Tailwind app.
 * It supports multiple variants (primary, secondary), sizes, loading states,
 * and smooth animations using React Native Reanimated.
 * 
 * Features:
 * - Multiple variants (primary cyan, secondary dark)
 * - Three sizes (small, medium, large)
 * - Loading state with spinner
 * - Disabled state with reduced opacity
 * - Press animation with scale effect
 * - Icon support (left/right)
 * - Full accessibility support
 * - Haptic feedback (optional)
 * 
 * Usage:
 * ```tsx
 * <Button 
 *   variant="primary" 
 *   onPress={() => console.log('Pressed')}
 * >
 *   Continue
 * </Button>
 * 
 * <Button 
 *   variant="secondary" 
 *   size="sm"
 *   loading={isLoading}
 * >
 *   Save
 * </Button>
 * ```
 * 
 * @module Components/DesignSystem/Button
 */

import React from 'react';
import {
  Pressable,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  View,
  PressableProps,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Typography } from './Typography';
import {
  colors,
  spacing,
  borderRadius,
  shadows,
  buttonHeight,
  animation,
} from '@constants/theme';

/**
 * Button variant types
 * Defines visual styles for different button purposes
 */
export type ButtonVariant = 
  | 'primary'      // Primary actions (cyan background)
  | 'secondary';   // Secondary actions (dark background)

/**
 * Button size types
 * Affects height, padding, and font size
 */
export type ButtonSize = 
  | 'sm'     // Small - 36px height
  | 'md'     // Medium - 48px height (default)
  | 'lg';    // Large - 56px height

/**
 * Button component props
 */
export interface ButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  /** Button text or content */
  children: React.ReactNode;
  
  /** Visual variant - determines color scheme */
  variant?: ButtonVariant;
  
  /** Button size - affects dimensions */
  size?: ButtonSize;
  
  /** Whether button is in loading state (shows spinner) */
  loading?: boolean;
  
  /** Whether button is disabled (not interactive) */
  disabled?: boolean;
  
  /** Optional icon to show on the left */
  iconLeft?: React.ReactNode;
  
  /** Optional icon to show on the right */
  iconRight?: React.ReactNode;
  
  /** Custom styles for the button container */
  style?: ViewStyle | ViewStyle[];
  
  /** Full width button (stretches to parent width) */
  fullWidth?: boolean;
  
  /** Test ID for testing */
  testID?: string;
  
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
}

/**
 * Button Component
 * 
 * A highly interactive button with smooth animations and multiple states.
 * Uses Reanimated for performant press animations that run on the UI thread.
 * 
 * @param {ButtonProps} props - Component props
 * @returns {React.ReactElement} Animated, interactive button
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  style,
  fullWidth = false,
  testID,
  accessibilityLabel,
  onPressIn,
  onPressOut,
  ...rest
}) => {
  // Shared values for animations (runs on UI thread for 60fps)
  const scale = useSharedValue(1);         // Scale animation for press effect
  const opacity = useSharedValue(1);       // Opacity animation for press feedback

  /**
   * Handle press in - animate button to pressed state
   * Creates a satisfying "push down" effect
   */
  const handlePressIn = (event: any) => {
    // Animate scale down to 0.96 (slightly smaller)
    scale.value = withSpring(0.96, {
      damping: 15,      // Less bouncy
      stiffness: 300,   // Faster response
    });
    
    // Reduce opacity slightly for additional feedback
    opacity.value = withTiming(0.8, {
      duration: animation.duration.fast, // 150ms
    });
    
    // Call original onPressIn if provided
    onPressIn?.(event);
  };

  /**
   * Handle press out - animate button back to normal state
   * Returns button to original size with a slight bounce
   */
  const handlePressOut = (event: any) => {
    // Animate scale back to 1 (original size)
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
    
    // Restore full opacity
    opacity.value = withTiming(1, {
      duration: animation.duration.fast, // 150ms
    });
    
    // Call original onPressOut if provided
    onPressOut?.(event);
  };

  /**
   * Animated style for press effect
   * Applies scale and opacity transformations
   */
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }], // Scale animation
      opacity: opacity.value,               // Opacity animation
    };
  });

  // Get styles based on variant and size
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  
  // Determine if button is interactive
  const isDisabled = disabled || loading;
  
  // Build container style
  const containerStyle = [
    styles.base,           // Base button styles
    variantStyle,          // Variant-specific styles (colors)
    sizeStyle,             // Size-specific styles (dimensions)
    fullWidth && styles.fullWidth, // Full width if specified
    isDisabled && styles.disabled, // Disabled styles if not interactive
    style,                 // Custom styles from props
  ];

  // Determine text color based on variant
  const textColor = variant === 'primary' ? 'text' : 'text';

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        style={containerStyle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{
          disabled: isDisabled,
          busy: loading,
        }}
        testID={testID || `button-${variant}-${size}`}
        {...rest}
      >
        {/* Loading spinner - shown when loading is true */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator 
              color={variant === 'primary' ? colors.background : colors.text} 
              size="small"
            />
          </View>
        )}

        {/* Button content - hidden when loading */}
        <View style={[styles.content, loading && styles.contentHidden]}>
          {/* Left icon */}
          {iconLeft && (
            <View style={styles.iconLeft}>
              {iconLeft}
            </View>
          )}

          {/* Button text */}
          <Typography
            variant="label"
            color={textColor}
            style={styles.text}
          >
            {children}
          </Typography>

          {/* Right icon */}
          {iconRight && (
            <View style={styles.iconRight}>
              {iconRight}
            </View>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
};

/**
 * Base Styles
 * Common styles applied to all buttons
 */
const styles = StyleSheet.create({
  /** Base button - executive, modern, CEO-level */
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,              // Refined radius
    paddingHorizontal: spacing.xl, // More generous padding
    overflow: 'hidden',
  },
  
  /** Full width button */
  fullWidth: {
    width: '100%', // Stretch to parent width
  },
  
  /** Disabled button state */
  disabled: {
    opacity: 0.5, // Reduced opacity to indicate disabled state
  },
  
  /** Content container (icon + text) */
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  /** Hidden content (when loading) */
  contentHidden: {
    opacity: 0, // Hide content but maintain layout
  },
  
  /** Loading spinner container */
  loadingContainer: {
    position: 'absolute', // Position over button content
    alignSelf: 'center',
  },
  
  /** Button text styling */
  text: {
    textAlign: 'center',
  },
  
  /** Left icon container */
  iconLeft: {
    marginRight: spacing.sm, // Space between icon and text (8px)
  },
  
  /** Right icon container */
  iconRight: {
    marginLeft: spacing.sm, // Space between text and icon (8px)
  },
});

/**
 * Variant Styles
 * CEO-level button design - executive, modern, absolutely stunning
 */
const variantStyles = StyleSheet.create({
  /** Primary button - bold, executive, makes a statement */
  primary: {
    backgroundColor: colors.primary,
    borderWidth: 0,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  
  /** Secondary button - sophisticated, integrated */
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
});

/**
 * Size Styles
 * Defines dimensions for different button sizes
 */
const sizeStyles = StyleSheet.create({
  /** Small button - compact size */
  sm: {
    height: buttonHeight.sm,              // 36px height
    paddingHorizontal: spacing.base,      // 16px horizontal padding
  },
  
  /** Medium button - default size */
  md: {
    height: buttonHeight.md,              // 48px height
    paddingHorizontal: spacing.lg,        // 24px horizontal padding
  },
  
  /** Large button - prominent size */
  lg: {
    height: buttonHeight.lg,              // 56px height
    paddingHorizontal: spacing.xl,        // 32px horizontal padding
  },
});

/**
 * Default export for convenience
 */
export default Button;
