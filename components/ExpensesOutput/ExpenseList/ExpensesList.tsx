import React from 'react';

import { FlatList, ListRenderItem } from 'react-native';

import { Expense } from '../types';

import ExpenseItem from './ExpenseItem';

type ExpensesListProps = {
  expenses: Expense[];
};

const renderExpenseItem: ListRenderItem<Expense> = ({ item: expenseItem }) => {
  return <ExpenseItem {...expenseItem} />;
};

const ExpensesList = ({ expenses }: ExpensesListProps) => {
  return (
    <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} />
  );
};

export default ExpensesList;
