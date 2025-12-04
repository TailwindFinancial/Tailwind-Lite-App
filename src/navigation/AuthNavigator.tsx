/**
 * Auth Navigator - Authentication Flow Navigation
 * 
 * This navigator handles the authentication flow screens:
 * - Login
 * - Register
 * - Forgot Password
 * 
 * Uses a stack navigator for linear authentication flow with back navigation.
 * 
 * @module Navigation/AuthNavigator
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@types';
import { WelcomeScreen } from '@screens/welcome/WelcomeScreen';
import { LoginScreen } from '@screens/auth/LoginScreen';
import { RegisterScreen } from '@screens/auth/RegisterScreen';
import { ForgotPasswordScreen } from '@screens/auth/ForgotPasswordScreen';
import { PotDetailScreen } from '@screens/pot/PotDetailScreen';
import { colors } from '@constants/theme';

/**
 * Create native stack navigator for auth flow
 * Stack navigator provides screen stacking with platform-specific transitions
 */
const Stack = createNativeStackNavigator<AuthStackParamList>();

/**
 * Auth Navigator Component
 * 
 * Renders the authentication stack navigator with:
 * - Login screen (initial route)
 * - Register screen
 * - Forgot Password screen
 * 
 * All screens use consistent dark theme styling.
 * 
 * @returns {React.ReactElement} Auth stack navigator
 */
export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      // Screen options applied to all screens in this navigator
      screenOptions={{
        // Use dark theme header
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.primary,      // Back button and header text color
        headerTitleStyle: {
          fontFamily: 'Fraunces_600SemiBold',  // Use Fraunces for header
          color: colors.text,                   // White header title
        },
        headerShadowVisible: false,            // Remove header shadow for flat design
        contentStyle: {
          backgroundColor: colors.background,   // Black background for screens
        },
        // Use slide animation on Android, default (modal) on iOS
        animation: 'slide_from_right',
      }}
    >
      {/* Welcome Screen - Initial route showing app overview */}
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false, // Full-screen onboarding experience
        }}
      />
      
      {/* Login Screen */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      
      {/* Register Screen - New user registration */}
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'Sign Up',               // Custom header title
          headerBackTitle: 'Back',        // Custom back button text (iOS)
        }}
      />
      
      {/* Forgot Password Screen - Password reset */}
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          title: 'Reset Password',        // Custom header title
          headerBackTitle: 'Back',        // Custom back button text (iOS)
        }}
      />
    </Stack.Navigator>
  );
};

/**
 * Default export for convenience
 */
export default AuthNavigator;


