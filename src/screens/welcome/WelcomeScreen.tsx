/**
 * Welcome Screen - Executive Launch Experience
 * 
 * Beautiful onboarding screen shown on first app launch.
 * Inspired by modern banking apps (RBC style).
 * 
 * Features:
 * - Hero section with app name
 * - Sign In CTA
 * - Feature previews
 * - Account creation link
 * - Clean, executive, CEO-level design
 * 
 * @module Screens/Welcome
 */

import React from 'react';
import { View, StyleSheet, ScrollView, Pressable, Dimensions, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Typography, Button } from '@components/design-system';
import { AuthStackParamList } from '@types';
import { colors, spacing, borderRadius } from '@constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type WelcomeScreenProps = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

/**
 * Feature Preview Item
 */
interface FeatureProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIcon}>
        <Ionicons name={icon} size={28} color={colors.primary} />
      </View>
      <View style={styles.featureContent}>
        <Typography variant="label" color="text">
          {title}
        </Typography>
        <Typography variant="bodySmall" color="secondary" style={styles.featureDesc}>
          {description}
        </Typography>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
    </View>
  );
};

/**
 * Welcome Screen Component
 */
export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section with Gradient */}
        <LinearGradient
          colors={[colors.primary + '20', colors.background]}
          style={styles.hero}
        >
          {/* Logo */}
          <Image
            source={require('../../../assets/transparant-bg-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          
          {/* App Name */}
          <Typography variant="display" color="text" align="center" style={styles.appName}>
            Tailwind
          </Typography>
          <Typography variant="body" color="secondary" align="center" style={styles.tagline}>
            Split expenses effortlessly
          </Typography>
        </LinearGradient>
        
        {/* Primary Sign In Button - STUNNING */}
        <View style={styles.ctaSection}>
          <Pressable
            style={styles.signInButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Typography variant="label" color="text" style={styles.signInText}>
              Sign In
            </Typography>
            <Ionicons name="arrow-forward" size={20} color={colors.background} style={styles.signInArrow} />
          </Pressable>
        </View>
        
        {/* Features Preview */}
        <View style={styles.previewSection}>
          <Typography variant="h3" color="text" style={styles.previewTitle}>
            Features
          </Typography>
          
          <View style={styles.featuresList}>
            <FeatureItem
              icon="people-outline"
              title="Split with Friends"
              description="Track shared expenses on trips and events"
            />
            <FeatureItem
              icon="camera-outline"
              title="Scan Receipts"
              description="Auto-add expenses with OCR scanning"
            />
            <FeatureItem
              icon="stats-chart-outline"
              title="Trip Wrapped"
              description="Beautiful expense summaries"
            />
            <FeatureItem
              icon="swap-horizontal-outline"
              title="Easy Settlements"
              description="Settle up with integrated payment links"
            />
          </View>
        </View>
        
        {/* Footer Links */}
        <View style={styles.footer}>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Typography variant="label" color="primary" align="center">
              Create Account
            </Typography>
          </Pressable>
          
          <View style={styles.footerLinks}>
            <Pressable>
              <Typography variant="caption" color="tertiary">
                Privacy Policy
              </Typography>
            </Pressable>
            <Typography variant="caption" color="tertiary">
              •
            </Typography>
            <Pressable>
              <Typography variant="caption" color="tertiary">
                Terms of Service
              </Typography>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  hero: {
    alignItems: 'center',
    paddingTop: SCREEN_HEIGHT * 0.12,
    paddingBottom: spacing.xxl,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: spacing.lg,
  },
  appName: {
    marginBottom: spacing.sm,
  },
  tagline: {
    marginTop: spacing.xs,
  },
  ctaSection: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  signInButton: {
    backgroundColor: colors.primary,
    height: 58,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  signInText: {
    fontSize: 18,
    letterSpacing: 0.5,
  },
  signInArrow: {
    marginLeft: spacing.sm,
  },
  previewSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  previewTitle: {
    marginBottom: spacing.base,
    paddingHorizontal: spacing.sm,
  },
  featuresList: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border + '30',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.base,
  },
  featureContent: {
    flex: 1,
  },
  featureDesc: {
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: spacing.xxxl,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.base,
  },
});

export default WelcomeScreen;

