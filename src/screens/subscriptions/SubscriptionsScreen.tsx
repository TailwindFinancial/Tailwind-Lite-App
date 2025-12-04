/**
 * Subscriptions Screen - Recurring Payments Management
 * 
 * Track and manage all your subscriptions in one place.
 * Manual entry for v1 - users add their subscriptions with:
 * - Name, cost, payment schedule
 * - Upcoming payment reminders
 * - Total monthly cost overview
 * 
 * Executive, modern, absolutely beautiful.
 * 
 * @module Screens/Subscriptions
 */

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Typography, CircularProgress, Card } from '@components/design-system';
import { colors, spacing, borderRadius } from '@constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Subscription Item Component
 */
interface SubscriptionItemProps {
  name: string;
  cost: number;
  frequency: 'monthly' | 'yearly' | 'weekly';
  nextPayment: string;
  category: string;
  color: string;
}

const SubscriptionItem: React.FC<SubscriptionItemProps> = ({
  name,
  cost,
  frequency,
  nextPayment,
  category,
  color,
}) => {
  const categoryIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
    Entertainment: 'tv',
    Music: 'musical-notes',
    Storage: 'cloud',
    Productivity: 'briefcase',
    Fitness: 'fitness',
  };
  
  return (
    <Pressable style={styles.subItem}>
      <View style={[styles.subIcon, { backgroundColor: color + '15' }]}>
        <Ionicons name={categoryIcons[category] || 'apps'} size={24} color={color} />
      </View>
      <View style={styles.subContent}>
        <Typography variant="label" color="text">
          {name}
        </Typography>
        <Typography variant="caption" color="secondary" style={styles.subMeta}>
          Next payment {nextPayment}
        </Typography>
      </View>
      <View style={styles.subRight}>
        <Typography variant="label" color="text">
          ${cost.toFixed(2)}
        </Typography>
        <Typography variant="caption" color="tertiary">
          /{frequency === 'monthly' ? 'mo' : frequency === 'yearly' ? 'yr' : 'wk'}
        </Typography>
      </View>
    </Pressable>
  );
};

/**
 * Subscriptions Screen Component
 */
export const SubscriptionsScreen: React.FC = () => {
  // Mock subscriptions data
  const subscriptions: SubscriptionItemProps[] = [
    {
      name: 'Netflix',
      cost: 15.99,
      frequency: 'monthly',
      nextPayment: 'Dec 15',
      category: 'Entertainment',
      color: '#E50914',
    },
    {
      name: 'Spotify',
      cost: 9.99,
      frequency: 'monthly',
      nextPayment: 'Dec 20',
      category: 'Music',
      color: '#1DB954',
    },
    {
      name: 'iCloud Storage',
      cost: 2.99,
      frequency: 'monthly',
      nextPayment: 'Dec 10',
      category: 'Storage',
      color: '#007AFF',
    },
  ];
  
  const totalMonthly = subscriptions.reduce((sum, sub) => {
    if (sub.frequency === 'monthly') return sum + sub.cost;
    if (sub.frequency === 'yearly') return sum + (sub.cost / 12);
    if (sub.frequency === 'weekly') return sum + (sub.cost * 4.33);
    return sum;
  }, 0);
  
  return (
    <View style={styles.container}>
      {/* Top padding */}
      <View style={styles.headerSpacer} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Typography variant="h1" color="text">
              Subscriptions
            </Typography>
            <Typography variant="body" color="secondary" style={styles.subtitle}>
              {subscriptions.length} active subscriptions
            </Typography>
          </View>
          <Pressable style={styles.addButton}>
            <View style={styles.addButtonInner}>
              <Ionicons name="add" size={24} color={colors.primary} />
            </View>
          </Pressable>
        </View>
        
        {/* Overview Card */}
        <View style={styles.overviewSection}>
          <View style={styles.overviewCard}>
            <LinearGradient
              colors={[colors.primary + '15', colors.primary + '05', 'transparent']}
              style={StyleSheet.absoluteFill}
            />
            
            <View style={styles.overviewContent}>
              <View style={styles.overviewLeft}>
                <Typography variant="caption" color="tertiary">
                  TOTAL MONTHLY COST
                </Typography>
                <Typography variant="display" color="primary" style={styles.totalCost}>
                  ${totalMonthly.toFixed(2)}
                </Typography>
                <Typography variant="caption" color="secondary">
                  per month
                </Typography>
              </View>
              
              <View style={styles.overviewChart}>
                <CircularProgress
                  progress={totalMonthly / 100}
                  size={100}
                  strokeWidth={10}
                  color={colors.primary}
                  trackColor={colors.surface}
                  showPercentage={false}
                />
              </View>
            </View>
          </View>
        </View>
        
        {/* Upcoming Payments */}
        <View style={styles.section}>
          <Typography variant="h3" color="text" style={styles.sectionTitle}>
            Active Subscriptions
          </Typography>
          
          <View style={styles.subsList}>
            {subscriptions.map((sub, index) => (
              <SubscriptionItem key={index} {...sub} />
            ))}
          </View>
        </View>
        
        {/* Insights */}
        <View style={styles.section}>
          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <Ionicons name="bulb" size={24} color={colors.warning} />
            </View>
            <View style={styles.insightContent}>
              <Typography variant="label" color="text">
                You could save $12/month
              </Typography>
              <Typography variant="caption" color="secondary" style={styles.insightText}>
                Cancel unused subscriptions
              </Typography>
            </View>
          </View>
        </View>
        
        {/* Bottom spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerSpacer: {
    height: spacing.base,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  addButton: {
    padding: spacing.xs,
  },
  addButtonInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary + '30',
  },
  overviewSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  overviewCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  overviewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overviewLeft: {
    flex: 1,
  },
  totalCost: {
    marginVertical: spacing.xs,
  },
  overviewChart: {
    marginLeft: spacing.lg,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.base,
  },
  subsList: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  subItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border + '15',
  },
  subIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.base,
  },
  subContent: {
    flex: 1,
  },
  subMeta: {
    marginTop: 2,
  },
  subRight: {
    alignItems: 'flex-end',
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.warning + '10',
    borderWidth: 1,
    borderColor: colors.warning + '30',
  },
  insightIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.warning + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.base,
  },
  insightContent: {
    flex: 1,
  },
  insightText: {
    marginTop: 2,
  },
  bottomSpacer: {
    height: 120,
  },
});

export default SubscriptionsScreen;

