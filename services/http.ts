import { Expense } from '../components/ExpensesOutput/types';

import api from './api';

export async function storeExpense(expense: Partial<Expense>) {
  const response = await api.post('expenses.json', expense);
  return response.data.name;
}

export async function getExpenses() {
  const response = await api.get('expenses.json');
  const expenses = [];
  for (const key in response.data) {
    const expenseObj: Expense = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(expenseId: string, expense: Partial<Expense>) {
  return api.put(`expenses/${expenseId}.json`, expense);
}

export function deleteExpense(expenseId: string) {
  return api.delete(`expenses/${expenseId}.json`);
}
