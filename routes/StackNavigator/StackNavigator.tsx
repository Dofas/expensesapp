import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { GlobalStyles } from '../../constants/styles';
import ManageExpenses from '../../screens/ManageExpenses';
import BottomsTabsNavigator from '../BottomTabsNavigator/BottomsTabsNavigator';

import { StackNavigatorParamList } from './StackNavigator.types';

const Stack = createStackNavigator<StackNavigatorParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: GlobalStyles.colors.white
      }}>
      <Stack.Screen
        name="BottomsTabsNavigator"
        options={{
          headerShown: false
        }}
        component={BottomsTabsNavigator}
      />
      <Stack.Screen
        name="ManageExpenses"
        component={ManageExpenses}
        options={{
          presentation: 'modal'
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
