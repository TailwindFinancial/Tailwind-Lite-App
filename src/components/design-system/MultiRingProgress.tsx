/**
 * Multi-Ring Progress Component - Apple Watch Activity Rings Style
 * 
 * Beautiful nested circular progress rings for displaying multiple metrics.
 * Perfect for category breakdowns and goal tracking.
 * 
 * @module Components/DesignSystem/MultiRingProgress
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * Ring Data Interface
 */
export interface RingData {
  /** Progress value 0-1 */
  progress: number;
  
  /** Ring color */
  color: string;
  
  /** Optional label */
  label?: string;
}

/**
 * Multi-Ring Progress Props
 */
export interface MultiRingProgressProps {
  /** Array of ring data (inner to outer) */
  rings: RingData[];
  
  /** Size of the outermost circle */
  size?: number;
  
  /** Width of each ring */
  strokeWidth?: number;
  
  /** Gap between rings */
  ringGap?: number;
  
  /** Animation duration */
  animationDuration?: number;
}

/**
 * Multi-Ring Progress Component
 * 
 * Renders nested circular progress rings with smooth animations.
 * 
 * @param {MultiRingProgressProps} props - Component props
 * @returns {React.ReactElement} Multi-ring circular progress
 */
export const MultiRingProgress: React.FC<MultiRingProgressProps> = ({
  rings,
  size = 200,
  strokeWidth = 12,
  ringGap = 8,
  animationDuration = 1200,
}) => {
  const center = size / 2;
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {rings.map((ring, index) => {
          // Calculate radius for this ring (innermost is smallest)
          const ringOffset = index * (strokeWidth + ringGap);
          const radius = (size - strokeWidth) / 2 - ringOffset;
          const circumference = 2 * Math.PI * radius;
          
          // Shared value for animation
          const progress = useSharedValue(0);
          
          useEffect(() => {
            progress.value = withTiming(ring.progress, {
              duration: animationDuration,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            });
          }, [ring.progress]);
          
          const animatedProps = useAnimatedProps(() => {
            const offset = circumference * (1 - progress.value);
            return { strokeDashoffset: offset };
          });
          
          return (
            <React.Fragment key={index}>
              {/* Background track */}
              <Circle
                cx={center}
                cy={center}
                r={radius}
                stroke={ring.color + '20'}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
              />
              
              {/* Progress ring */}
              <AnimatedCircle
                cx={center}
                cy={center}
                r={radius}
                stroke={ring.color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
                strokeLinecap="round"
                rotation="-90"
                origin={`${center}, ${center}`}
                animatedProps={animatedProps}
              />
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MultiRingProgress;

