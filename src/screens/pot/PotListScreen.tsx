/**
 * Trips Screen - STUNNING Expense Groups
 * 
 * Beautiful, modern trip management with integrated styling.
 * No sticker look - everything stitched into the interface.
 * 
 * @module Screens/Pot/PotList
 */

import React from 'react';
import { View, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { Typography, CircularProgress } from '@components/design-system';
import { colors, spacing, borderRadius } from '@constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * Trip Card - Integrated, Beautiful
 */
interface TripCardProps {
  name: string;
  location: string;
  totalSpent: number;
  budget: number;
  members: number;
  color: string;
}

const TripCard: React.FC<TripCardProps & { onPress: () => void }> = ({
  name,
  location,
  totalSpent,
  budget,
  members,
  color,
  onPress,
}) => {
  const progress = totalSpent / budget;
  
  return (
    <Pressable style={styles.tripCard} onPress={onPress}>
      <LinearGradient
        colors={[color + '12', color + '03']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.tripHeader}>
        <View style={styles.tripTitleSection}>
          <Typography variant="h2" color="text">
            {name}
          </Typography>
          <View style={styles.tripLocation}>
            <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
            <Typography variant="caption" color="secondary" style={styles.locationText}>
              {location}
            </Typography>
          </View>
        </View>
        <View style={[styles.tripIconContainer, { backgroundColor: color + '20' }]}>
          <Ionicons name="airplane" size={24} color={color} />
        </View>
      </View>
      
      <View style={styles.tripBody}>
        <View style={styles.tripProgress}>
          <CircularProgress
            progress={progress}
            size={80}
            strokeWidth={8}
            color={color}
            trackColor={colors.surface}
            showPercentage={false}
          />
          <View style={styles.progressCenter}>
            <Typography variant="label" color="text">
              {Math.round(progress * 100)}%
            </Typography>
          </View>
        </View>
        
        <View style={styles.tripStats}>
          <View style={styles.tripStat}>
            <Typography variant="caption" color="tertiary">
              SPENT
            </Typography>
            <Typography variant="h3" color="text" style={styles.statValue}>
              ${totalSpent.toLocaleString()}
            </Typography>
          </View>
          <View style={styles.tripStat}>
            <Typography variant="caption" color="tertiary">
              BUDGET
            </Typography>
            <Typography variant="label" color="secondary" style={styles.statValue}>
              ${budget.toLocaleString()}
            </Typography>
          </View>
        </View>
      </View>
      
      <View style={styles.tripFooter}>
        <View style={styles.members}>
          <Ionicons name="people" size={16} color={colors.textSecondary} />
          <Typography variant="caption" color="secondary" style={styles.membersText}>
            {members} members
          </Typography>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      </View>
    </Pressable>
  );
};

/**
 * Trips Screen Component
 */
export const PotListScreen: React.FC<any> = ({ navigation }) => {
  // Mock trips data
  const mockTrips = [
    {
      name: 'Tokyo Trip',
      location: 'Tokyo, Japan',
      totalSpent: 3250,
      budget: 5000,
      members: 4,
      color: colors.primary,
    },
    {
      name: 'Bali Adventure',
      location: 'Bali, Indonesia',
      totalSpent: 1850,
      budget: 3000,
      members: 6,
      color: '#9B59B6',
    },
  ];
  
  return (
    <View style={styles.container}>
      {/* Top padding */}
      <View style={styles.headerSpacer} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Typography variant="h1" color="text">
              Trips
            </Typography>
            <Typography variant="body" color="secondary" style={styles.subtitle}>
              {mockTrips.length} active trips
            </Typography>
          </View>
          <Pressable style={styles.addButton}>
            <View style={styles.addButtonInner}>
              <Ionicons name="add" size={24} color={colors.primary} />
            </View>
          </Pressable>
        </View>
        
        {/* Trips List */}
        <View style={styles.tripsList}>
          {mockTrips.map((trip, index) => (
            <TripCard 
              key={index} 
              {...trip} 
              onPress={() => navigation.navigate('PotDetail', { potId: `trip-${index}` })}
            />
          ))}
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
  tripsList: {
    paddingHorizontal: spacing.lg,
  },
  tripCard: {
    borderRadius: borderRadius.xl,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    padding: spacing.lg,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  tripTitleSection: {
    flex: 1,
  },
  tripLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  locationText: {
    marginLeft: 4,
  },
  tripIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tripBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.base,
    paddingVertical: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.border + '20',
  },
  tripProgress: {
    position: 'relative',
    marginRight: spacing.lg,
  },
  progressCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tripStats: {
    flex: 1,
  },
  tripStat: {
    marginBottom: spacing.sm,
  },
  statValue: {
    marginTop: 2,
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.border + '20',
  },
  members: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  membersText: {
    marginLeft: spacing.xs,
  },
  bottomSpacer: {
    height: 120,
  },
});

export default PotListScreen;
