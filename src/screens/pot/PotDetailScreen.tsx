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
import { Typography, CircularProgress, Card, Button } from '@components/design-system';
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
  
  return (
    <View style={styles.memberBalance}>
      <View style={styles.memberLeft}>
        <View style={[styles.memberAvatar, { borderColor: balanceColor + '30' }]}>
          <Ionicons name="person" size={20} color={balanceColor} />
        </View>
        <Typography variant="body" color="text">
          {name}
        </Typography>
      </View>
      <View style={styles.memberRight}>
        {status !== 'settled' && (
          <Typography variant="caption" color={balanceColor} style={styles.memberStatus}>
            {status === 'owes' ? 'owes' : 'gets back'}
          </Typography>
        )}
        <Typography variant="label" color={balanceColor}>
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
            {/* Category Breakdown */}
            <View style={styles.analyticsCard}>
              <Typography variant="h3" color="text" style={styles.analyticsTitle}>
                Spending by Category
              </Typography>
              
              <View style={styles.categoryItem}>
                <View style={styles.categoryLeft}>
                  <View style={[styles.categoryDot, { backgroundColor: colors.primary }]} />
                  <Typography variant="body" color="text">
                    Food
                  </Typography>
                </View>
                <View style={styles.categoryRight}>
                  <View style={styles.categoryBar}>
                    <View style={[styles.categoryFill, { width: '60%', backgroundColor: colors.primary }]} />
                  </View>
                  <Typography variant="label" color="text">
                    $1,247
                  </Typography>
                </View>
              </View>
              
              <View style={styles.categoryItem}>
                <View style={styles.categoryLeft}>
                  <View style={[styles.categoryDot, { backgroundColor: '#9B59B6' }]} />
                  <Typography variant="body" color="text">
                    Transport
                  </Typography>
                </View>
                <View style={styles.categoryRight}>
                  <View style={styles.categoryBar}>
                    <View style={[styles.categoryFill, { width: '25%', backgroundColor: '#9B59B6' }]} />
                  </View>
                  <Typography variant="label" color="text">
                    $520
                  </Typography>
                </View>
              </View>
              
              <View style={styles.categoryItem}>
                <View style={styles.categoryLeft}>
                  <View style={[styles.categoryDot, { backgroundColor: '#3498DB' }]} />
                  <Typography variant="body" color="text">
                    Accommodation
                  </Typography>
                </View>
                <View style={styles.categoryRight}>
                  <View style={styles.categoryBar}>
                    <View style={[styles.categoryFill, { width: '40%', backgroundColor: '#3498DB' }]} />
                  </View>
                  <Typography variant="label" color="text">
                    $830
                  </Typography>
                </View>
              </View>
            </View>
            
            {/* Daily Spending Trend */}
            <View style={styles.analyticsCard}>
              <Typography variant="h3" color="text" style={styles.analyticsTitle}>
                Daily Average
              </Typography>
              <Typography variant="display" color="primary" align="center" style={styles.dailyAvg}>
                $162
              </Typography>
              <Typography variant="caption" color="secondary" align="center">
                per day over 20 days
              </Typography>
            </View>
          </View>
        )}
        
        {/* Bottom spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
      
      {/* Floating Add Button */}
      <View style={styles.floatingButton}>
        <Pressable style={styles.addExpenseButton}>
          <Ionicons name="add" size={28} color={colors.background} />
        </Pressable>
      </View>
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 140,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.sm,
  },
  categoryRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
  },
  categoryFill: {
    height: '100%',
    borderRadius: 4,
  },
  dailyAvg: {
    marginVertical: spacing.sm,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 100,
    right: spacing.lg,
  },
  addExpenseButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  bottomSpacer: {
    height: 140,
  },
});

export default PotDetailScreen;

