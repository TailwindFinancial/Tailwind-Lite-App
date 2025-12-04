/**
 * Move Money Screen - Settlements & Transfers
 * 
 * Executive settlement interface with beautiful action buttons.
 * Integrated design - no sticker look.
 * 
 * @module Screens/MoveMoney
 */

import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Typography } from '@components/design-system';
import { colors, spacing, borderRadius } from '@constants/theme';
import { Ionicons } from '@expo/vector-icons';

/**
 * Action Button - Integrated Settlement Action
 */
interface ActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  iconColor: string;
  onPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, title, subtitle, iconColor, onPress }) => {
  return (
    <Pressable style={styles.actionButton} onPress={onPress}>
      <View style={[styles.actionIcon, { backgroundColor: iconColor + '15' }]}>
        <Ionicons name={icon} size={28} color={iconColor} />
      </View>
      <View style={styles.actionContent}>
        <Typography variant="label" color="text">
          {title}
        </Typography>
        <Typography variant="caption" color="secondary" style={styles.actionSubtitle}>
          {subtitle}
        </Typography>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </Pressable>
  );
};

/**
 * Balance Card - Outstanding Balance Display
 */
interface BalanceCardProps {
  friendName: string;
  amount: number;
  type: 'owe' | 'owed';
}

const BalanceCard: React.FC<BalanceCardProps> = ({ friendName, amount, type }) => {
  const isOwe = type === 'owe';
  const color = isOwe ? colors.error : colors.success;
  
  return (
    <Pressable style={styles.balanceCard}>
      <View style={styles.balanceLeft}>
        <View style={[styles.balanceAvatar, { borderColor: color + '30' }]}>
          <Ionicons name="person" size={24} color={color} />
        </View>
        <View>
          <Typography variant="label" color="text">
            {friendName}
          </Typography>
          <Typography variant="caption" color="secondary">
            {isOwe ? 'You owe' : 'Owes you'}
          </Typography>
        </View>
      </View>
      <View style={styles.balanceRight}>
        <Typography variant="h3" color={color}>
          ${amount.toFixed(2)}
        </Typography>
      </View>
    </Pressable>
  );
};

/**
 * Move Money Screen Component
 */
export const MoveMoneyScreen: React.FC = () => {
  // Mock balances
  const mockBalances: BalanceCardProps[] = [
    // Empty for demo
  ];
  
  return (
    <View style={styles.container}>
      {/* Top padding */}
      <View style={styles.headerSpacer} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Typography variant="h1" color="text">
            Settle Up
          </Typography>
          <Typography variant="body" color="secondary" style={styles.subtitle}>
            Manage payments and transfers
          </Typography>
        </View>
        
        {/* Actions Section */}
        <View style={styles.section}>
          <Typography variant="label" color="tertiary" style={styles.sectionTitle}>
            TRANSFER
          </Typography>
          
          <View style={styles.actionsContainer}>
            <ActionButton
              icon="swap-horizontal-outline"
              title="Transfer Between Trips"
              subtitle="Move funds between your trips"
              iconColor={colors.primary}
              onPress={() => {}}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Typography variant="label" color="tertiary" style={styles.sectionTitle}>
            SETTLE & REQUEST
          </Typography>
          
          <View style={styles.actionsContainer}>
            <ActionButton
              icon="people-outline"
              title="Settle with Friends"
              subtitle="Pay back what you owe"
              iconColor={colors.success}
              onPress={() => {}}
            />
            
            <View style={styles.actionDivider} />
            
            <ActionButton
              icon="cash-outline"
              title="Request Money"
              subtitle="Request payment from friends"
              iconColor={colors.info}
              onPress={() => {}}
            />
            
            <View style={styles.actionDivider} />
            
            <ActionButton
              icon="card-outline"
              title="Payment Methods"
              subtitle="Manage linked payment apps"
              iconColor={colors.warning}
              onPress={() => {}}
            />
          </View>
        </View>
        
        {/* Outstanding Balances */}
        {mockBalances.length > 0 && (
          <View style={styles.section}>
            <Typography variant="h3" color="text" style={styles.balancesTitle}>
              Outstanding Balances
            </Typography>
            
            <View style={styles.balancesList}>
              {mockBalances.map((balance, index) => (
                <BalanceCard key={index} {...balance} />
              ))}
            </View>
          </View>
        )}
        
        {/* Empty State */}
        {mockBalances.length === 0 && (
          <View style={styles.emptySection}>
            <View style={styles.emptyIcon}>
              <Ionicons name="checkmark-circle" size={64} color={colors.success} />
            </View>
            <Typography variant="h2" color="text" align="center" style={styles.emptyTitle}>
              All Settled Up!
            </Typography>
            <Typography variant="body" color="secondary" align="center">
              You have no outstanding balances
            </Typography>
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
  headerSpacer: {
    height: spacing.base,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  actionsContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.base,
  },
  actionContent: {
    flex: 1,
  },
  actionSubtitle: {
    marginTop: 2,
  },
  actionDivider: {
    height: 1,
    backgroundColor: colors.border + '20',
    marginLeft: 72,
  },
  balancesTitle: {
    marginBottom: spacing.base,
  },
  balancesList: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  balanceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border + '20',
  },
  balanceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.base,
  },
  balanceAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceRight: {
    alignItems: 'flex-end',
  },
  emptySection: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
  },
  emptyIcon: {
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    marginBottom: spacing.sm,
  },
  bottomSpacer: {
    height: 120,
  },
});

export default MoveMoneyScreen;
