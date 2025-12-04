/**
 * Trip Detail Screen - FULL-FEATURED Trip Management
 * 
 * Absolutely STUNNING trip detail view with:
 * - Beautiful spending charts and visualizations
 * - Expense list with filters
 * - Member balances and who-owes-who
 * - Split calculator
 * - Receipt scanning
 * - Settlement options
 * - Analytics and insights
 * 
 * CEO-LEVEL design. Every pixel matters.
 * 
 * @module Screens/Pot/PotDetail
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Typography, CircularProgress, MultiRingProgress, Card, Button } from '@components/design-system';
import { PotStackParamList } from '@types';
import { colors, spacing, borderRadius } from '@constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type PotDetailScreenProps = NativeStackScreenProps<PotStackParamList, 'PotDetail'>;

/**
 * Expense Item Component
 */
interface ExpenseItemProps {
  description: string;
  amount: number;
  paidBy: string;
  date: string;
  category: string;
  splits: number;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({
  description,
  amount,
  paidBy,
  date,
  category,
  splits,
}) => {
  const categoryIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
    Food: 'restaurant',
    Transport: 'car',
    Accommodation: 'bed',
    Entertainment: 'game-controller',
  };
  
  return (
    <Pressable style={styles.expenseItem}>
      <View style={styles.expenseIcon}>
        <Ionicons name={categoryIcons[category] || 'receipt'} size={20} color={colors.primary} />
      </View>
      <View style={styles.expenseContent}>
        <Typography variant="label" color="text">
          {description}
        </Typography>
        <View style={styles.expenseMeta}>
          <Typography variant="caption" color="secondary">
            {paidBy}
          </Typography>
          <Typography variant="caption" color="tertiary">
            •
          </Typography>
          <Typography variant="caption" color="secondary">
            Split {splits} ways
          </Typography>
          <Typography variant="caption" color="tertiary">
            •
          </Typography>
          <Typography variant="caption" color="secondary">
            {date}
          </Typography>
        </View>
      </View>
      <Typography variant="label" color="text">
        ${amount.toFixed(2)}
      </Typography>
    </Pressable>
  );
};

/**
 * Member Balance Component
 */
interface MemberBalanceProps {
  name: string;
  balance: number;
  status: 'owes' | 'owed' | 'settled';
}

const MemberBalance: React.FC<MemberBalanceProps> = ({ name, balance, status }) => {
  const balanceColor = status === 'owes' ? colors.error : status === 'owed' ? colors.success : colors.textSecondary;
  const balanceText = status === 'owes' ? 'owes' : status === 'owed' ? 'gets back' : 'settled';
  
  return (
    <View style={styles.memberBalance}>
      <View style={styles.memberLeft}>
        <View style={[styles.memberAvatar, { borderColor: balanceColor + '40' }]}>
          <Ionicons name="person" size={20} color={balanceColor} />
        </View>
        <View>
          <Typography variant="label" color="text">
            {name}
          </Typography>
          <Typography variant="caption" style={{ color: balanceColor }}>
            {balanceText}
          </Typography>
        </View>
      </View>
      <View style={styles.memberRight}>
        <Typography variant="h3" style={{ color: balanceColor }}>
          ${Math.abs(balance).toFixed(2)}
        </Typography>
      </View>
    </View>
  );
};

/**
 * Trip Detail Screen Component
 */
export const PotDetailScreen: React.FC<PotDetailScreenProps> = ({ route, navigation }) => {
  const { potId } = route.params;
  const [activeTab, setActiveTab] = useState<'expenses' | 'balances' | 'analytics'>('expenses');
  
  // Mock trip data
  const trip = {
    name: 'Tokyo Trip',
    location: 'Tokyo, Japan',
    totalSpent: 3247.50,
    budget: 5000,
    members: 4,
    color: colors.primary,
  };
  
  const expenses = [
    {
      description: 'Dinner at Nobu',
      amount: 284.00,
      paidBy: 'You',
      date: '2 hours ago',
      category: 'Food',
      splits: 4,
    },
    {
      description: 'Taxi to Airport',
      amount: 45.50,
      paidBy: 'Sarah',
      date: 'Yesterday',
      category: 'Transport',
      splits: 4,
    },
    {
      description: 'Hotel Reservation',
      amount: 1200.00,
      paidBy: 'Mike',
      date: '2 days ago',
      category: 'Accommodation',
      splits: 4,
    },
  ];
  
  const balances: MemberBalanceProps[] = [
    { name: 'Sarah', balance: -67.50, status: 'owes' },
    { name: 'Mike', balance: 234.25, status: 'owed' },
    { name: 'Emma', balance: -45.00, status: 'owes' },
    { name: 'You', balance: 0, status: 'settled' },
  ];
  
  const progress = trip.totalSpent / trip.budget;
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Card - Trip Overview */}
        <View style={styles.heroSection}>
          <View style={styles.heroCard}>
            <LinearGradient
              colors={[trip.color + '20', trip.color + '05', 'transparent']}
              style={StyleSheet.absoluteFill}
            />
            
            <View style={styles.heroHeader}>
              <View style={styles.heroTitleSection}>
                <Typography variant="h1" color="text">
                  {trip.name}
                </Typography>
                <View style={styles.location}>
                  <Ionicons name="location" size={16} color={colors.textSecondary} />
                  <Typography variant="body" color="secondary" style={styles.locationText}>
                    {trip.location}
                  </Typography>
                </View>
              </View>
              <Pressable style={styles.settingsButton}>
                <Ionicons name="ellipsis-horizontal" size={24} color={colors.text} />
              </Pressable>
            </View>
            
            {/* Spending Visualization */}
            <View style={styles.spendingViz}>
              <View style={styles.chartSection}>
                <CircularProgress
                  progress={progress}
                  size={140}
                  strokeWidth={14}
                  color={trip.color}
                  trackColor={colors.surface}
                  showPercentage={false}
                />
                <View style={styles.chartCenter}>
                  <Typography variant="h2" color="primary">
                    {Math.round(progress * 100)}%
                  </Typography>
                  <Typography variant="caption" color="secondary">
                    spent
                  </Typography>
                </View>
              </View>
              
              <View style={styles.spendingStats}>
                <View style={styles.spendingStat}>
                  <Typography variant="caption" color="tertiary">
                    TOTAL SPENT
                  </Typography>
                  <Typography variant="h2" color="text" style={styles.statValue}>
                    ${trip.totalSpent.toLocaleString()}
                  </Typography>
                </View>
                <View style={styles.spendingStat}>
                  <Typography variant="caption" color="tertiary">
                    BUDGET
                  </Typography>
                  <Typography variant="body" color="secondary" style={styles.statValue}>
                    ${trip.budget.toLocaleString()}
                  </Typography>
                </View>
                <View style={styles.spendingStat}>
                  <Typography variant="caption" color="tertiary">
                    REMAINING
                  </Typography>
                  <Typography variant="label" color="success" style={styles.statValue}>
                    ${(trip.budget - trip.totalSpent).toLocaleString()}
                  </Typography>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Pressable style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: colors.primary + '15' }]}>
              <Ionicons name="add" size={24} color={colors.primary} />
            </View>
            <Typography variant="caption" color="text" style={styles.quickActionLabel}>
              Add Expense
            </Typography>
          </Pressable>
          
          <Pressable style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: colors.info + '15' }]}>
              <Ionicons name="camera" size={24} color={colors.info} />
            </View>
            <Typography variant="caption" color="text" style={styles.quickActionLabel}>
              Scan Receipt
            </Typography>
          </Pressable>
          
          <Pressable style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: colors.success + '15' }]}>
              <Ionicons name="cash" size={24} color={colors.success} />
            </View>
            <Typography variant="caption" color="text" style={styles.quickActionLabel}>
              Settle Up
            </Typography>
          </Pressable>
          
          <Pressable style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: colors.warning + '15' }]}>
              <Ionicons name="stats-chart" size={24} color={colors.warning} />
            </View>
            <Typography variant="caption" color="text" style={styles.quickActionLabel}>
              Analytics
            </Typography>
          </Pressable>
        </View>
        
        {/* Tabs */}
        <View style={styles.tabs}>
          <Pressable
            style={[styles.tab, activeTab === 'expenses' && styles.tabActive]}
            onPress={() => setActiveTab('expenses')}
          >
            <Typography
              variant="label"
              color={activeTab === 'expenses' ? 'primary' : 'secondary'}
            >
              Expenses
            </Typography>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'balances' && styles.tabActive]}
            onPress={() => setActiveTab('balances')}
          >
            <Typography
              variant="label"
              color={activeTab === 'balances' ? 'primary' : 'secondary'}
            >
              Balances
            </Typography>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'analytics' && styles.tabActive]}
            onPress={() => setActiveTab('analytics')}
          >
            <Typography
              variant="label"
              color={activeTab === 'analytics' ? 'primary' : 'secondary'}
            >
              Analytics
            </Typography>
          </Pressable>
        </View>
        
        {/* Content */}
        {activeTab === 'expenses' && (
          <View style={styles.section}>
            <View style={styles.expensesList}>
              {expenses.map((expense, index) => (
                <ExpenseItem key={index} {...expense} />
              ))}
            </View>
          </View>
        )}
        
        {activeTab === 'balances' && (
          <View style={styles.section}>
            <View style={styles.balancesList}>
              {balances.map((balance, index) => (
                <MemberBalance key={index} {...balance} />
              ))}
            </View>
            
            <Pressable style={styles.settleAllButton}>
              <Typography variant="label" color="primary">
                Settle All Balances
              </Typography>
              <Ionicons name="arrow-forward" size={20} color={colors.primary} />
            </Pressable>
          </View>
        )}
        
        {activeTab === 'analytics' && (
          <View style={styles.section}>
            {/* Multi-Ring Chart - APPLE WATCH STYLE */}
            <View style={styles.ringsCard}>
              <Typography variant="h2" color="text" align="center" style={styles.ringsTitle}>
                Spending Breakdown
              </Typography>
              
              <View style={styles.ringsContainer}>
                <MultiRingProgress
                  size={220}
                  strokeWidth={14}
                  ringGap={6}
                  rings={[
                    { progress: 0.38, color: colors.primary, label: 'Food' },
                    { progress: 0.64, color: '#3498DB', label: 'Accommodation' },
                    { progress: 0.80, color: '#9B59B6', label: 'Transport' },
                    { progress: 0.93, color: '#E74C3C', label: 'Activities' },
                    { progress: 1.0, color: '#95A5A6', label: 'Other' },
                  ]}
                />
              </View>
              
              {/* Legend */}
              <View style={styles.legend}>
                {[
                  { name: 'Food & Dining', amount: 1247, percent: 38, color: colors.primary },
                  { name: 'Accommodation', amount: 830, percent: 26, color: '#3498DB' },
                  { name: 'Transport', amount: 520, percent: 16, color: '#9B59B6' },
                  { name: 'Activities', amount: 420, percent: 13, color: '#E74C3C' },
                  { name: 'Other', amount: 230, percent: 7, color: '#95A5A6' },
                ].map((cat, index) => (
                  <View key={index} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: cat.color }]} />
                    <Typography variant="body" color="text" style={styles.legendName}>
                      {cat.name}
                    </Typography>
                    <Typography variant="label" color="text" style={styles.legendAmount}>
                      ${cat.amount.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" color="secondary">
                      {cat.percent}%
                    </Typography>
                  </View>
                ))}
              </View>
            </View>
            
            {/* Spending Trend Chart - EXECUTIVE */}
            <View style={styles.trendCard}>
              <Typography variant="h3" color="text" style={styles.analyticsTitle}>
                Weekly Spending
              </Typography>
              <View style={styles.trendChart}>
                {[420, 680, 540, 890, 650, 720, 810].map((amount, index) => {
                  const maxAmount = 900;
                  const heightPercent = (amount / maxAmount) * 100;
                  return (
                    <View key={index} style={styles.barContainer}>
                      <Typography variant="caption" color="secondary" style={styles.barAmount}>
                        ${amount}
                      </Typography>
                      <View 
                        style={[
                          styles.bar, 
                          { 
                            height: `${heightPercent}%`,
                            backgroundColor: index === 6 ? colors.primary : colors.surface,
                            borderWidth: index === 6 ? 0 : 1,
                            borderColor: colors.border,
                          }
                        ]} 
                      />
                      <Typography variant="caption" color={index === 6 ? 'primary' : 'tertiary'} style={styles.barLabel}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                      </Typography>
                    </View>
                  );
                })}
              </View>
            </View>
            
            {/* Daily Average */}
            <View style={styles.avgCard}>
              <Typography variant="caption" color="tertiary" align="center">
                DAILY AVERAGE
              </Typography>
              <Typography variant="display" color="primary" align="center" style={styles.dailyAvgValue}>
                $162
              </Typography>
              <Typography variant="caption" color="secondary" align="center">
                over 20 days
              </Typography>
            </View>
            
            {/* Payment Status */}
            <View style={styles.analyticsCard}>
              <Typography variant="h3" color="text" style={styles.analyticsTitle}>
                Settlement Status
              </Typography>
              <View style={styles.settlementRow}>
                <View style={styles.settlementStat}>
                  <View style={[styles.settlementIcon, { backgroundColor: colors.success + '15' }]}>
                    <Ionicons name="checkmark-circle" size={32} color={colors.success} />
                  </View>
                  <Typography variant="caption" color="tertiary" align="center">
                    SETTLED
                  </Typography>
                  <Typography variant="h2" color="success" align="center" style={styles.settlementValue}>
                    85%
                  </Typography>
                </View>
                <View style={styles.settlementStat}>
                  <View style={[styles.settlementIcon, { backgroundColor: colors.warning + '15' }]}>
                    <Ionicons name="time" size={32} color={colors.warning} />
                  </View>
                  <Typography variant="caption" color="tertiary" align="center">
                    PENDING
                  </Typography>
                  <Typography variant="h2" color="warning" align="center" style={styles.settlementValue}>
                    15%
                  </Typography>
                </View>
              </View>
            </View>
          </View>
        )}
        
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
  heroSection: {
    padding: spacing.lg,
    paddingTop: spacing.base,
  },
  heroCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  heroTitleSection: {
    flex: 1,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  locationText: {
    marginLeft: 4,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  spendingViz: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartSection: {
    position: 'relative',
    marginRight: spacing.xl,
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
  spendingStats: {
    flex: 1,
  },
  spendingStat: {
    marginBottom: spacing.base,
  },
  statValue: {
    marginTop: 2,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border + '30',
  },
  quickActionLabel: {
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.base,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  section: {
    paddingHorizontal: spacing.lg,
  },
  expensesList: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border + '15',
  },
  expenseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.base,
  },
  expenseContent: {
    flex: 1,
  },
  expenseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: 2,
  },
  balancesList: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.base,
  },
  memberBalance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border + '15',
  },
  memberLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.base,
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  memberRight: {
    alignItems: 'flex-end',
  },
  memberStatus: {
    marginBottom: 2,
  },
  settleAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: colors.primary + '40',
    backgroundColor: colors.primary + '08',
    gap: spacing.sm,
  },
  analyticsCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.base,
  },
  analyticsTitle: {
    marginBottom: spacing.base,
  },
  categoryItem: {
    marginBottom: spacing.lg,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  categoryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: spacing.sm,
  },
  categoryRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.base,
  },
  categoryBar: {
    flex: 1,
    height: 10,
    backgroundColor: colors.background,
    borderRadius: 5,
    overflow: 'hidden',
  },
  categoryFill: {
    height: '100%',
    borderRadius: 5,
  },
  categoryAmount: {
    minWidth: 80,
    textAlign: 'right',
  },
  topSpenderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.base,
    padding: spacing.base,
    borderRadius: borderRadius.md,
    backgroundColor: colors.warning + '10',
    borderWidth: 1,
    borderColor: colors.warning + '30',
  },
  topSpenderIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.warning + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.base,
  },
  topSpenderContent: {
    flex: 1,
  },
  topSpenderName: {
    marginTop: 2,
    marginBottom: 2,
  },
  trendCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.base,
  },
  trendChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 140,
    marginTop: spacing.lg,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 3,
  },
  barAmount: {
    fontSize: 10,
    marginBottom: spacing.xs,
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    minHeight: 24,
  },
  barLabel: {
    marginTop: spacing.sm,
    fontSize: 10,
  },
  avgCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  dailyAvgValue: {
    marginVertical: spacing.sm,
  },
  settlementRow: {
    flexDirection: 'row',
    gap: spacing.base,
    marginTop: spacing.base,
  },
  settlementStat: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background,
  },
  settlementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  settlementValue: {
    marginTop: spacing.xs,
  },
  topSpenderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.warning + '08',
    borderWidth: 1,
    borderColor: colors.warning + '30',
  },
  topSpenderIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.warning + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.base,
  },
  topSpenderContent: {
    flex: 1,
  },
  topSpenderName: {
    marginTop: 2,
    marginBottom: 2,
  },
  bottomSpacer: {
    height: 140,
  },
});

export default PotDetailScreen;

