import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

export type BottomTabsParamList = {
  RecentExpenses: undefined;
  AllExpenses: undefined;
};

export type BottomTabsNavigationProp = BottomTabNavigationProp<BottomTabsParamList>;

export type RecentExpensesRouteProp = RouteProp<BottomTabsParamList, 'RecentExpenses'>;

export type AllExpensesRouteProp = RouteProp<BottomTabsParamList, 'AllExpenses'>;
