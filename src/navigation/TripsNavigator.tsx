/**
 * Trips Navigator - Trip Management Stack
 * 
 * Stack navigator for trips/pots feature.
 * Handles trip list, detail, creation, and settings.
 * 
 * @module Navigation/TripsNavigator
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PotStackParamList } from '@types';
import { PotListScreen } from '@screens/pot/PotListScreen';
import { PotDetailScreen } from '@screens/pot/PotDetailScreen';
import { colors } from '@constants/theme';

const Stack = createNativeStackNavigator<PotStackParamList>();

/**
 * Trips Navigator Component
 */
export const TripsNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontFamily: 'Fraunces_600SemiBold',
          color: colors.text,
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="PotList"
        component={PotListScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="PotDetail"
        component={PotDetailScreen}
        options={{
          title: 'Trip Details',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
};

export default TripsNavigator;

