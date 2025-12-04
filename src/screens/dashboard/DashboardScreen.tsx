/**
 * Dashboard Screen - CEO-LEVEL Executive Home
 * 
 * The most beautiful, modern, sexy dashboard you've ever seen.
 * Features:
 * - Animated circular progress rings (Apple Watch style)
 * - Real-time spending visualization
 * - Beautiful gradient cards
 * - Executive stats grid
 * - Modern, clean, absolutely STUNNING
 * 
 * @module Screens/Dashboard
 */

import React from 'react';
import { View, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { Typography, Card, CircularProgress, Button } from '@components/design-system';
import { useAuthStore } from '@store/authStore';
import { colors, spacing, borderRadius } from '@constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_SPACING = spacing.lg;
const CARD_WIDTH = (SCREEN_WIDTH - (CARD_SPACING * 3)) / 2;

/**
 * Stat Card - Beautiful integrated stat display
 */
interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  color: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color, trend }) => {
  return (
    <View style={[styles.statCard, { width: CARD_WIDTH }]}>
      <View style={[styles.statIconBg, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <Typography variant="caption" color="tertiary" style={styles.statLabel}>
        {label}
      </Typography>
      <Typography variant="h2" color="text" style={styles.statValue}>
        {value}
      </Typography>
      {trend && (
        <Typography variant="caption" color={trend.startsWith('+') ? 'success' : 'error'}>
          {trend}
        </Typography>
      )}
    </View>
  );
};

/**
 * Recent Activity Item
 */
interface ActivityItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  amount: string;
  time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ icon, title, subtitle, amount, time }) => {
  return (
    <Pressable style={styles.activityItem}>
      <View style={styles.activityIcon}>
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>
      <View style={styles.activityContent}>
        <Typography variant="label" color="text">
          {title}
        </Typography>
        <Typography variant="caption" color="secondary">
          {subtitle}
        </Typography>
      </View>
      <View style={styles.activityRight}>
        <Typography variant="label" color="text">
          {amount}
        </Typography>
        <Typography variant="caption" color="tertiary" align="right">
          {time}
        </Typography>
      </View>
    </Pressable>
  );
};

/**
 * Dashboard Screen - STUNNING Executive Design
 */
export const DashboardScreen: React.FC = () => {
  const { user } = useAuthStore();
  
  // Mock data - will be real later
  const monthlyBudget = 2000;
  const spent = 1247;
  const progress = spent / monthlyBudget;
  const remaining = monthlyBudget - spent;
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top padding under header */}
        <View style={styles.headerSpacer} />
        
        {/* Greeting */}
        <View style={styles.greeting}>
          <Typography variant="body" color="secondary">
            Good morning,
          </Typography>
          <Typography variant="display" color="text" style={styles.userName}>
            {user?.name?.split(' ')[0]}
          </Typography>
        </View>
        
        {/* Hero - Spending Overview with STUNNING Circular Chart */}
        <View style={styles.heroSection}>
          <View style={styles.heroCard}>
            <LinearGradient
              colors={[colors.primary + '25', colors.primary + '08', colors.background]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            
            <View style={styles.heroContent}>
              {/* Circular Progress - SEXY */}
              <View style={styles.chartContainer}>
                <CircularProgress
                  progress={progress}
                  size={160}
                  strokeWidth={16}
                  color={colors.primary}
                  trackColor={colors.surface}
                  showPercentage={false}
                />
                <View style={styles.chartCenter}>
                  <Typography variant="h1" color="primary">
                    ${spent}
                  </Typography>
                  <Typography variant="caption" color="secondary">
                    of ${monthlyBudget}
                  </Typography>
                </View>
              </View>
              
              {/* Spending Details */}
              <View style={styles.heroDetails}>
                <Typography variant="label" color="secondary">
                  MONTHLY SPENDING
                </Typography>
                <Typography variant="h2" color="text" style={styles.heroAmount}>
                  ${spent.toLocaleString()}
                </Typography>
                
                <View style={styles.remainingContainer}>
                  <View style={styles.remainingDot} />
                  <Typography variant="body" color="success">
                    ${remaining.toLocaleString()} remaining
                  </Typography>
                </View>
                
                {/* Mini Progress Bar */}
                <View style={styles.miniProgress}>
                  <View style={[styles.miniProgressFill, { width: `${progress * 100}%` }]} />
                </View>
                
                <Typography variant="caption" color="tertiary">
                  {Math.round((1 - progress) * 100)}% of budget left
                </Typography>
              </View>
            </View>
          </View>
        </View>
        
        {/* Stats Grid - EXECUTIVE & SYMMETRICAL */}
        <View style={styles.statsSection}>
          <View style={styles.statsRow}>
            <View style={styles.executiveStat}>
              <View style={[styles.execStatIcon, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name="calendar" size={28} color={colors.primary} />
              </View>
              <Typography variant="caption" color="tertiary" align="center" style={styles.execLabel}>
                THIS MONTH
              </Typography>
              <Typography variant="h1" color="text" align="center" style={styles.execValue}>
                $1,247
              </Typography>
              <View style={styles.execTrend}>
                <Ionicons name="trending-up" size={14} color={colors.success} />
                <Typography variant="caption" color="success" style={styles.execTrendText}>
                  +12.5%
                </Typography>
              </View>
            </View>
            
            <View style={styles.executiveStat}>
              <View style={[styles.execStatIcon, { backgroundColor: colors.success + '15' }]}>
                <Ionicons name="flash" size={28} color={colors.success} />
              </View>
              <Typography variant="caption" color="tertiary" align="center" style={styles.execLabel}>
                AVG PER DAY
              </Typography>
              <Typography variant="h1" color="text" align="center" style={styles.execValue}>
                $41
              </Typography>
              <View style={styles.execTrend}>
                <Ionicons name="remove" size={14} color={colors.textTertiary} />
                <Typography variant="caption" color="tertiary" style={styles.execTrendText}>
                  Steady
                </Typography>
              </View>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.executiveStat}>
              <View style={[styles.execStatIcon, { backgroundColor: colors.info + '15' }]}>
                <Ionicons name="airplane" size={28} color={colors.info} />
              </View>
              <Typography variant="caption" color="tertiary" align="center" style={styles.execLabel}>
                ACTIVE TRIPS
              </Typography>
              <Typography variant="h1" color="text" align="center" style={styles.execValue}>
                3
              </Typography>
              <View style={styles.execTrend}>
                <Ionicons name="add" size={14} color={colors.info} />
                <Typography variant="caption" color="info" style={styles.execTrendText}>
                  2 this month
                </Typography>
              </View>
            </View>
            
            <View style={styles.executiveStat}>
              <View style={[styles.execStatIcon, { backgroundColor: colors.warning + '15' }]}>
                <Ionicons name="people" size={28} color={colors.warning} />
              </View>
              <Typography variant="caption" color="tertiary" align="center" style={styles.execLabel}>
                FRIENDS
              </Typography>
              <Typography variant="h1" color="text" align="center" style={styles.execValue}>
                12
              </Typography>
              <View style={styles.execTrend}>
                <Ionicons name="checkmark" size={14} color={colors.success} />
                <Typography variant="caption" color="success" style={styles.execTrendText}>
                  All active
                </Typography>
              </View>
            </View>
          </View>
        </View>
        
        {/* Recent Activity - CLEAN */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography variant="h2" color="text">
              Recent Activity
            </Typography>
            <Pressable>
              <Typography variant="label" color="primary">
                See All
              </Typography>
            </Pressable>
          </View>
          
          <View style={styles.activityList}>
            <ActivityItem
              icon="restaurant-outline"
              title="Dinner at Nobu"
              subtitle="Split with 4 friends"
              amount="-$125.00"
              time="2h ago"
            />
            <ActivityItem
              icon="car-outline"
              title="Uber to Airport"
              subtitle="Tokyo Trip"
              amount="-$45.00"
              time="Yesterday"
            />
            <ActivityItem
              icon="home-outline"
              title="Airbnb Payment"
              subtitle="Bali Adventure"
              amount="-$850.00"
              time="2 days ago"
            />
          </View>
        </View>
        
        {/* Active Trips Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography variant="h2" color="text">
              Active Trips
            </Typography>
            <Pressable>
              <Typography variant="label" color="primary">
                View All
              </Typography>
            </Pressable>
          </View>
          
          {/* Trip Preview Cards */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tripsScroll}
          >
            <View style={styles.tripPreviewCard}>
              <LinearGradient
                colors={['#FF6B9D20', '#FF6B9D05']}
                style={StyleSheet.absoluteFill}
              />
              <Ionicons name="airplane" size={32} color="#FF6B9D" style={styles.tripPreviewIcon} />
              <Typography variant="h3" color="text" style={styles.tripPreviewName}>
                Tokyo Trip
              </Typography>
              <Typography variant="caption" color="secondary">
                4 members
              </Typography>
              <Typography variant="h3" color="text" style={styles.tripPreviewAmount}>
                $1,250
              </Typography>
            </View>
            
            <View style={styles.tripPreviewCard}>
              <LinearGradient
                colors={['#9B59B620', '#9B59B605']}
                style={StyleSheet.absoluteFill}
              />
              <Ionicons name="home" size={32} color="#9B59B6" style={styles.tripPreviewIcon} />
              <Typography variant="h3" color="text" style={styles.tripPreviewName}>
                House Bills
              </Typography>
              <Typography variant="caption" color="secondary">
                3 members
              </Typography>
              <Typography variant="h3" color="text" style={styles.tripPreviewAmount}>
                $450
              </Typography>
            </View>
          </ScrollView>
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
  greeting: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  userName: {
    marginTop: 4,
  },
  heroSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  heroCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  heroContent: {
    padding: spacing.xl,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    position: 'relative',
  },
  chartCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroDetails: {
    alignItems: 'center',
  },
  heroAmount: {
    marginTop: spacing.xs,
    marginBottom: spacing.base,
  },
  remainingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  remainingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    marginRight: spacing.sm,
  },
  miniProgress: {
    width: '100%',
    height: 6,
    backgroundColor: colors.surface,
    borderRadius: 3,
    marginVertical: spacing.sm,
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  statsSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.base,
    marginBottom: spacing.base,
  },
  executiveStat: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  execStatIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.base,
  },
  execLabel: {
    marginBottom: spacing.xs,
    letterSpacing: 0.5,
  },
  execValue: {
    marginBottom: spacing.xs,
  },
  execTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  execTrendText: {
    fontSize: 11,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  activityList: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border + '20',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.base,
  },
  activityContent: {
    flex: 1,
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  tripsScroll: {
    paddingRight: spacing.lg,
  },
  tripPreviewCard: {
    width: 200,
    height: 200,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginRight: spacing.base,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  tripPreviewIcon: {
    marginBottom: spacing.base,
  },
  tripPreviewName: {
    marginBottom: spacing.xs,
  },
  tripPreviewAmount: {
    marginTop: spacing.sm,
  },
  bottomSpacer: {
    height: 120,
  },
});

export default DashboardScreen;
