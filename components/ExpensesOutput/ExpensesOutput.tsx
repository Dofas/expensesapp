import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

import ExpensesList from './ExpenseList/ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { Expense } from './types';

type ExpensesOutputProps = {
  expenses: Expense[];
  period: string;
  fallBackText: string;
};

const ExpensesOutput = ({ expenses, period, fallBackText }: ExpensesOutputProps) => {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} period={period} />
      {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700
  },
  infoText: {
    color: GlobalStyles.colors.white,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32
  }
});
