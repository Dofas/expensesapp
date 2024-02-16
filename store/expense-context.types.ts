import { JSX } from 'react';

import { Expense } from '../components/ExpensesOutput/types';

export type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
};

export type ExpensesContextProviderProps = {
  children: JSX.Element;
};

export type ActionType =
  | { type: 'ADD'; payload: Expense }
  | { type: 'DELETE'; payload: string }
  | { type: 'UPDATE'; payload: { id: string; data: Partial<Expense> } };

export type ExpensesState = Expense[];
