/**
 * Welcome Screen - Ultra-Executive Launch Experience
 * 
 * Refined, integrated design. Every element feels part of the page.
 * No sticker buttons - everything flows naturally.
 * CEO-level sophistication.
 * 
 * @module Screens/Welcome
 */

import React from 'react';
import { View, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Typography } from '@components/design-system';
import { AuthStackParamList } from '@types';
import { colors, spacing, borderRadius } from '@constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

type WelcomeScreenProps = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

/**
 * Feature Card - Ultra-refined
 */
interface FeatureCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color }) => {
  return (
    <Pressable style={styles.featureCard}>
      <LinearGradient
        colors={[color + '08', 'transparent']}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.featureIconContainer, { backgroundColor: color + '12' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Typography variant="label" color="text" style={styles.featureTitle}>
        {title}
      </Typography>
      <Typography variant="caption" color="secondary" style={styles.featureDesc}>
        {description}
      </Typography>
    </Pressable>
  );
};

/**
 * Welcome Screen - Ultra-Executive
 */
export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Sophisticated Hero */}
        <View style={styles.hero}>
          <LinearGradient
            colors={[colors.primary + '15', 'transparent']}
            style={styles.heroGradient}
          >
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Ionicons name="flash" size={40} color={colors.primary} />
              </View>
            </View>
            
            <Typography variant="display" color="text" align="center" style={styles.appName}>
              Tailwind
            </Typography>
            <Typography variant="body" color="secondary" align="center" style={styles.tagline}>
              Split expenses. Stay balanced.
            </Typography>
          </LinearGradient>
        </View>
        
        {/* Features Grid - Elegant */}
        <View style={styles.featuresSection}>
          <View style={styles.featuresRow}>
            <FeatureCard
              icon="people-circle-outline"
              title="Group Expenses"
              description="Track shared costs"
              color={colors.primary}
            />
            <FeatureCard
              icon="camera-outline"
              title="Smart Scanning"
              description="OCR receipts instantly"
              color="#9B59B6"
            />
          </View>
          <View style={styles.featuresRow}>
            <FeatureCard
              icon="analytics-outline"
              title="Insights"
              description="Trip summaries"
              color="#3498DB"
            />
            <FeatureCard
              icon="wallet-outline"
              title="Easy Settle"
              description="One-tap payments"
              color="#E74C3C"
            />
          </View>
        </View>
        
        {/* Refined Sign In - Integrated, NOT a sticker */}
        <View style={styles.authSection}>
          <Pressable
            style={styles.signInContainer}
            onPress={() => navigation.navigate('Login')}
          >
            <View style={styles.signInContent}>
              <View>
                <Typography variant="label" color="text">
                  Already have an account?
                </Typography>
                <Typography variant="body" color="primary" style={styles.signInLabel}>
                  Sign in to continue
                </Typography>
              </View>
              <Ionicons name="arrow-forward-circle" size={32} color={colors.primary} />
            </View>
          </Pressable>
          
          {/* Create Account */}
          <Pressable
            style={styles.createAccountContainer}
            onPress={() => navigation.navigate('Register')}
          >
            <View style={styles.createAccountContent}>
              <View>
                <Typography variant="label" color="secondary">
                  New to Tailwind?
                </Typography>
                <Typography variant="body" color="text" style={styles.createLabel}>
                  Create a free account
                </Typography>
              </View>
              <Ionicons name="person-add-outline" size={28} color={colors.text} />
            </View>
          </Pressable>
        </View>
        
        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLinks}>
            <Pressable>
              <Typography variant="caption" color="tertiary">
                About
              </Typography>
            </Pressable>
            <Typography variant="caption" color="tertiary">
              •
            </Typography>
            <Pressable>
              <Typography variant="caption" color="tertiary">
                Privacy
              </Typography>
            </Pressable>
            <Typography variant="caption" color="tertiary">
              •
            </Typography>
            <Pressable>
              <Typography variant="caption" color="tertiary">
                Terms
              </Typography>
            </Pressable>
          </View>
          <Typography variant="caption" color="tertiary" align="center" style={styles.version}>
            Tailwind v1.0.0
          </Typography>
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
    paddingTop: SCREEN_HEIGHT * 0.08,
    paddingBottom: spacing.xxxl,
  },
  heroGradient: {
    alignItems: 'center',
    paddingTop: spacing.xl,
  },
  logoContainer: {
    marginBottom: spacing.lg,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary + '30',
  },
  appName: {
    marginBottom: spacing.xs,
  },
  tagline: {
    marginTop: spacing.xs,
  },
  featuresSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  featureCard: {
    flex: 1,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minHeight: 130,
    overflow: 'hidden',
  },
  featureIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  featureTitle: {
    marginBottom: 4,
  },
  featureDesc: {
    lineHeight: 16,
  },
  authSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  signInContainer: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.primary + '40',
    backgroundColor: colors.primary + '08',
    marginBottom: spacing.base,
    overflow: 'hidden',
  },
  signInContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  signInLabel: {
    marginTop: 2,
  },
  createAccountContainer: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  createAccountContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  createLabel: {
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: spacing.xxxl,
    paddingHorizontal: spacing.lg,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  version: {
    opacity: 0.5,
  },
});

export default WelcomeScreen;
