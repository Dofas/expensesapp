import React from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useExpensesContext } from '../store/expenses-context';

const AllExpenses = () => {
  const { expenses } = useExpensesContext();

  return <ExpensesOutput period="Total" expenses={expenses} fallBackText="No expenses found" />;
};

export default AllExpenses;
