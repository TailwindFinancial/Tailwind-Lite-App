/**
 * Main Tab Navigator - Bottom Tab Navigation
 * 
 * This navigator provides the main app navigation with bottom tabs:
 * - Home (Dashboard with overview)
 * - Trips (Expense groups/Pots)
 * - Messages (Activity feed)
 * - Move Money (Settlements)
 * - More (Settings, profile, help)
 * 
 * Plus a center FAB for quick actions.
 * Uses Ionicons for clean, professional icon set.
 * 
 * @module Navigation/MainTabNavigator
 */

import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Modal } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from '@types';
import { DashboardScreen } from '@screens/dashboard/DashboardScreen';
import { PotListScreen } from '@screens/pot/PotListScreen';
import { MessagesScreen } from '@screens/messages/MessagesScreen';
import { MoveMoneyScreen } from '@screens/movemoney/MoveMoneyScreen';
import { MoreScreen } from '@screens/more/MoreScreen';
import { Typography, Button } from '@components/design-system';
import { colors, spacing, borderRadius } from '@constants/theme';

/**
 * Create bottom tab navigator
 * Tab navigator provides persistent bottom navigation bar
 */
const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * Floating Action Menu Component
 * Modal overlay with quick action buttons
 */
const FloatingActionMenu: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <Pressable style={fabStyles.backdrop} onPress={onClose}>
        {/* Action buttons panel */}
        <View style={fabStyles.panel}>
          <Typography variant="h3" color="text" style={fabStyles.panelTitle}>
            Quick Actions
          </Typography>
          
          <Pressable style={fabStyles.actionButton} onPress={() => {}}>
            <View style={[fabStyles.actionIcon, { backgroundColor: colors.primary }]}>
              <Ionicons name="add-circle-outline" size={24} color={colors.background} />
            </View>
            <Typography variant="label" color="text" style={fabStyles.actionText}>
              Add Expense
            </Typography>
          </Pressable>
          
          <Pressable style={fabStyles.actionButton} onPress={() => {}}>
            <View style={[fabStyles.actionIcon, { backgroundColor: colors.success + '20' }]}>
              <Ionicons name="people-outline" size={24} color={colors.success} />
            </View>
            <Typography variant="label" color="text" style={fabStyles.actionText}>
              Create Trip
            </Typography>
          </Pressable>
          
          <Pressable style={fabStyles.actionButton} onPress={() => {}}>
            <View style={[fabStyles.actionIcon, { backgroundColor: colors.info + '20' }]}>
              <Ionicons name="camera-outline" size={24} color={colors.info} />
            </View>
            <Typography variant="label" color="text" style={fabStyles.actionText}>
              Scan Receipt
            </Typography>
          </Pressable>
          
          <Pressable style={fabStyles.cancelButton} onPress={onClose}>
            <Typography variant="label" color="secondary">
              Cancel
            </Typography>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

/**
 * Main Tab Navigator Component
 * 
 * Renders modern tab navigator with:
 * - Home (dashboard and overview)
 * - Trips (expense groups)
 * - Center FAB (quick actions)
 * - Messages (activity feed)
 * - Move Money (settlements)
 * - More (settings, profile, help)
 * 
 * @returns {React.ReactElement} Bottom tab navigator with FAB
 */
export const MainTabNavigator: React.FC = () => {
  // State for FAB menu visibility
  const [fabVisible, setFabVisible] = useState(false);
  
  return (
    <>
      <Tab.Navigator
        // Screen options applied to all tabs
        screenOptions={{
          // Header styling - clean and modern
          headerStyle: {
            backgroundColor: colors.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontFamily: 'Fraunces_600SemiBold',
            fontSize: 28,
            color: colors.text,
          },
          
          // Tab bar styling - executive and modern
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            elevation: 0,
            shadowOpacity: 0,
            height: 88, // Increased height to prevent text cutoff
            paddingBottom: 24, // Extra padding at bottom for text
            paddingTop: 8,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarLabelStyle: {
            fontFamily: 'Inter_600SemiBold',
            fontSize: 11,
            marginTop: 4,
            marginBottom: 4,
          },
          tabBarIconStyle: {
            marginTop: 4,
          },
          headerShown: true,
        }}
      >
        {/* Home Tab */}
        <Tab.Screen
          name="Home"
          component={DashboardScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? 'home' : 'home-outline'} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        
        {/* Trips Tab */}
        <Tab.Screen
          name="Trips"
          component={PotListScreen}
          options={{
            title: 'Trips',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? 'airplane' : 'airplane-outline'} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        
        {/* Center FAB - Placeholder tab */}
        <Tab.Screen
          name="Messages"
          component={MessagesScreen}
          options={{
            title: '',
            tabBarButton: (props) => (
              <Pressable
                {...props}
                style={fabStyles.fab}
                onPress={() => setFabVisible(true)}
              >
                <View style={fabStyles.fabInner}>
                  <Ionicons name="add" size={32} color={colors.background} />
                </View>
              </Pressable>
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setFabVisible(true);
            },
          }}
        />
        
        {/* Move Money Tab */}
        <Tab.Screen
          name="MoveMoney"
          component={MoveMoneyScreen}
          options={{
            title: 'Settle',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? 'swap-horizontal' : 'swap-horizontal-outline'} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        
        {/* More Tab */}
        <Tab.Screen
          name="More"
          component={MoreScreen}
          options={{
            title: 'More',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? 'menu' : 'menu-outline'} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
      </Tab.Navigator>
      
      {/* Floating Action Menu */}
      <FloatingActionMenu 
        visible={fabVisible} 
        onClose={() => setFabVisible(false)} 
      />
    </>
  );
};

/**
 * FAB Styles
 * Styles for floating action button and menu
 */
const fabStyles = StyleSheet.create({
  /** Floating action button */
  fab: {
    top: -20, // Raise above tab bar
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  /** FAB inner circle */
  fabInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 4,
    borderColor: colors.background,
  },
  
  /** Modal backdrop */
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  
  /** Action buttons panel */
  panel: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  
  /** Panel title */
  panelTitle: {
    marginBottom: spacing.lg,
  },
  
  /** Action button - integrated, beautiful */
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  
  /** Action icon */
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.base,
  },
  
  /** Action text */
  actionText: {
    flex: 1,
  },
  
  /** Cancel button */
  cancelButton: {
    padding: spacing.base,
    alignItems: 'center',
    borderRadius: borderRadius.lg,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
});

/**
 * Default export for convenience
 */
export default MainTabNavigator;

