import 'react-native-gesture-handler';

import React from 'react';

import { StatusBar } from 'expo-status-bar';

import RootNavigator from './routes/RootNavigator';
import { ExpensesContextProvider } from './store/expenses-context';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <RootNavigator />
      </ExpensesContextProvider>
    </>
  );
}
