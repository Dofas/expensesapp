import React, { createContext, useContext, useReducer } from 'react';

import { Expense } from '../components/ExpensesOutput/types';

import {
  ActionType,
  ExpensesContextProviderProps,
  ExpensesContextType,
  ExpensesState
} from './expense-context.types';

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  setExpenses: () => {},
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
      return [{ ...action.payload }, ...state];
    case 'SET':
      return action.payload.reverse();
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
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expense: Expense) {
    dispatch({ type: 'ADD', payload: expense });
  }

  function setExpenses(expenses: Expense[]) {
    dispatch({ type: 'SET', payload: expenses });
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
    setExpenses,
    deleteExpense,
    updateExpense
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
};
