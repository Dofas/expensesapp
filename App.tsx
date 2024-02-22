import 'react-native-gesture-handler';

import React from 'react';

import { REACT_APP_FIREBASE_ENDPOINT } from '@env';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

import RootNavigator from './routes/RootNavigator';
import { ExpensesContextProvider } from './store/expenses-context';

export default function App() {
  if (!REACT_APP_FIREBASE_ENDPOINT) {
    return <Text>Please provide firebase url in env file</Text>;
  }

  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <RootNavigator />
      </ExpensesContextProvider>
    </>
  );
}
