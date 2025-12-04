/**
 * More Screen - Settings & Additional Options
 * 
 * This screen provides access to profile, settings, help, and other app features.
 * Similar to the "More" tab in banking apps.
 * 
 * @module Screens/More
 */

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Typography, CustomAlert } from '@components/design-system';
import { useAuthStore } from '@store/authStore';
import { colors, spacing, borderRadius } from '@constants/theme';
import { Ionicons } from '@expo/vector-icons';

/**
 * Menu Item Component
 * Reusable component for menu list items
 */
interface MenuItemProps {
  /** Icon name from Ionicons */
  icon: keyof typeof Ionicons.glyphMap;
  
  /** Menu item title */
  title: string;
  
  /** Optional subtitle/description */
  subtitle?: string;
  
  /** On press handler */
  onPress: () => void;
  
  /** Icon color (optional) */
  iconColor?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  iconColor = colors.primary,
}) => {
  return (
    <Pressable
      style={styles.menuItem}
      onPress={onPress}
      android_ripple={{ color: colors.surface }}
    >
      {/* Icon */}
      <View style={[styles.iconContainer, { backgroundColor: iconColor + '15' }]}>
        <Ionicons name={icon} size={24} color={iconColor} />
      </View>
      
      {/* Content */}
      <View style={styles.menuContent}>
        <Typography variant="body" color="text">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="tertiary" style={styles.menuSubtitle}>
            {subtitle}
          </Typography>
        )}
      </View>
      
      {/* Chevron */}
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </Pressable>
  );
};

/**
 * More Screen Component
 * 
 * @returns {React.ReactElement} More screen UI
 */
export const MoreScreen: React.FC = () => {
  // Get user and logout from store
  const { user, logout } = useAuthStore();
  
  // Alert state
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  
  /**
   * Handle logout with confirmation
   */
  const handleLogout = () => {
    setShowLogoutAlert(true);
  };
  
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header with User Info */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            {/* User Avatar */}
            <View style={styles.avatar}>
              <Ionicons name="person" size={32} color={colors.primary} />
            </View>
            
            {/* User Details */}
            <View style={styles.userDetails}>
              <Typography variant="h2" color="text">
                {user?.name}
              </Typography>
              <Typography variant="body" color="secondary" style={styles.userEmail}>
                {user?.email}
              </Typography>
            </View>
          </View>
        </View>
        
        {/* Account Section */}
        <View style={styles.section}>
          <Typography variant="label" color="tertiary" style={styles.sectionTitle}>
            ACCOUNT
          </Typography>
          
          <MenuItem
            icon="person-outline"
            title="Profile"
            subtitle="View and edit your profile"
            onPress={() => {}}
          />
          
          <MenuItem
            icon="settings-outline"
            title="Settings"
            subtitle="App preferences and privacy"
            onPress={() => {}}
          />
          
          <MenuItem
            icon="notifications-outline"
            title="Notifications"
            subtitle="Manage notification preferences"
            onPress={() => {}}
          />
        </View>
        
        {/* Support Section */}
        <View style={styles.section}>
          <Typography variant="label" color="tertiary" style={styles.sectionTitle}>
            SUPPORT
          </Typography>
          
          <MenuItem
            icon="help-circle-outline"
            title="Help & FAQ"
            subtitle="Get answers to common questions"
            onPress={() => {}}
          />
          
          <MenuItem
            icon="shield-checkmark-outline"
            title="Security Tips"
            subtitle="Keep your account secure"
            onPress={() => {}}
          />
          
          <MenuItem
            icon="mail-outline"
            title="Contact Support"
            subtitle="Get help from our team"
            onPress={() => {}}
          />
        </View>
        
        {/* Legal Section */}
        <View style={styles.section}>
          <Typography variant="label" color="tertiary" style={styles.sectionTitle}>
            LEGAL
          </Typography>
          
          <MenuItem
            icon="document-text-outline"
            title="Terms of Service"
            subtitle="Our terms and conditions"
            onPress={() => {}}
          />
          
          <MenuItem
            icon="lock-closed-outline"
            title="Privacy Policy"
            subtitle="How we protect your data"
            onPress={() => {}}
          />
        </View>
        
        {/* Sign Out */}
        <View style={styles.section}>
          <Pressable
            style={styles.signOutButton}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color={colors.error} />
            <Typography variant="label" color="error" style={styles.signOutText}>
              Sign Out
            </Typography>
          </Pressable>
        </View>
        
        {/* App Version */}
        <View style={styles.footer}>
          <Typography variant="caption" color="tertiary" align="center">
            Tailwind v1.0.0
          </Typography>
        </View>
      </ScrollView>
      
      {/* Custom Logout Alert */}
      <CustomAlert
        visible={showLogoutAlert}
        title="Sign Out"
        message="Are you sure you want to sign out?"
        buttons={[
          { text: 'Cancel', style: 'cancel' },
          { text: 'Sign Out', style: 'destructive', onPress: logout },
        ]}
        onDismiss={() => setShowLogoutAlert(false)}
      />
    </View>
  );
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  /** Main container */
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  /** Header with user info */
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  
  /** User info container */
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  /** User avatar */
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary + '30',
  },
  
  /** User details */
  userDetails: {
    marginLeft: spacing.base,
    flex: 1,
  },
  
  /** User email */
  userEmail: {
    marginTop: spacing.xs,
  },
  
  /** Section container */
  section: {
    paddingTop: spacing.lg,
  },
  
  /** Section title */
  sectionTitle: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  
  /** Menu item */
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border + '30',
  },
  
  /** Icon container */
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  /** Menu content */
  menuContent: {
    flex: 1,
    marginLeft: spacing.base,
  },
  
  /** Menu subtitle */
  menuSubtitle: {
    marginTop: 2,
  },
  
  /** Sign out button */
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.base,
    marginHorizontal: spacing.lg,
    marginTop: spacing.base,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: colors.error + '30',
    backgroundColor: colors.error + '05',
  },
  
  /** Sign out text */
  signOutText: {
    marginLeft: spacing.sm,
  },
  
  /** Footer */
  footer: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
});

export default MoreScreen;

