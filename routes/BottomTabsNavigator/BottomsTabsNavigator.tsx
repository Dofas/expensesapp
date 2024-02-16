import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import IconButton from '../../components/ui/IconButton/IconButton';
import { GlobalStyles } from '../../constants/styles';
import AllExpenses from '../../screens/AllExpenses';
import RecentExpenses from '../../screens/RecentExpenses';
import { StackNavigatorNavigationProp } from '../StackNavigator/StackNavigator.types';

import { BottomTabsParamList } from './BottomTabsNavigator.types';

const BottomTabs = createBottomTabNavigator<BottomTabsParamList>();

const BottomsTabsNavigator = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }: { navigation: StackNavigatorNavigationProp }) => {
        return {
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: GlobalStyles.colors.white,
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate('ManageExpenses');
              }}
            />
          )
        };
      }}>
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIcon: ({ size, color }) => <Ionicons name="hourglass" size={size} color={color} />
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIcon: ({ size, color }) => <Ionicons name="calendar" size={size} color={color} />
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default BottomsTabsNavigator;
