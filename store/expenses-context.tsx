import React, { createContext, useContext, useReducer } from 'react';

import { Expense } from '../components/ExpensesOutput/types';

import {
  ActionType,
  ExpensesContextProviderProps,
  ExpensesContextType,
  ExpensesState
} from './expense-context.types';

const DUMMY_EXPENSES: Expense[] = [
  { id: '1', description: 'A Pair of shoes', amount: 59.99, date: new Date('2021-10-2') },
  { id: '2', description: 'A Pair of trousers', amount: 40.59, date: new Date('2021-11-11') },
  { id: '3', description: 'Banana', amount: 10, date: new Date('2021-05-05') },
  { id: '4', description: 'Orange', amount: 12.9, date: new Date('2021-04-04') },
  { id: '5', description: 'Book', amount: 99.99, date: new Date('2024-02-14') }
];

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {}
});

export const useExpensesContext = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpensesContext can be used only with ExpensesContextProvider');
  }
  return context;
};

function expensesReducer(state: ExpensesState, action: ActionType) {
  switch (action.type) {
    case 'ADD':
      return [
        { ...action.payload, id: new Date().toString() + Math.random().toString() },
        ...state
      ];
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id ? { ...expense, ...action.payload.data } : expense
      );
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

export const ExpensesContextProvider = ({ children }: ExpensesContextProviderProps) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expense: Expense) {
    dispatch({ type: 'ADD', payload: expense });
  }

  function deleteExpense(expenseId: string) {
    dispatch({ type: 'DELETE', payload: expenseId });
  }

  function updateExpense(expenseId: string, expense: Partial<Expense>) {
    dispatch({ type: 'UPDATE', payload: { id: expenseId, data: expense } });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
};
