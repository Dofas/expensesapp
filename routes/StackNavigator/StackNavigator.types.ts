import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

export type StackNavigatorParamList = {
  BottomsTabsNavigator: undefined;
  ManageExpenses: { id: string };
};

export type StackNavigatorNavigationProp = NativeStackNavigationProp<StackNavigatorParamList>;

export type BottomsTabsNavigatorRouteProp = RouteProp<
  StackNavigatorParamList,
  'BottomsTabsNavigator'
>;

export type ManageExpensesRouteProp = RouteProp<StackNavigatorParamList, 'ManageExpenses'>;
