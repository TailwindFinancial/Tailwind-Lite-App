/**
 * Design System Components - Central Export
 * 
 * This file provides a convenient way to import all design system components
 * from a single location.
 * 
 * Usage:
 * ```tsx
 * import { Typography, Button, Input, Card, LoadingSpinner } from '@components/design-system';
 * ```
 * 
 * @module Components/DesignSystem
 */

// Export all design system components
export { Typography } from './Typography';
export type { TypographyProps, TypographyVariant, TypographyColor } from './Typography';

export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';

export { Input } from './Input';
export type { InputProps, InputType, InputSize } from './Input';

export { Card } from './Card';
export type { CardProps, CardElevation, CardPadding } from './Card';

export { LoadingSpinner } from './LoadingSpinner';
export type { LoadingSpinnerProps, SpinnerSize, SpinnerColor } from './LoadingSpinner';

export { CircularProgress } from './CircularProgress';
export type { CircularProgressProps } from './CircularProgress';

export { CustomAlert } from './CustomAlert';
export type { CustomAlertProps } from './CustomAlert';


