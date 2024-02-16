import React from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../utils/date';

const RecentExpenses = () => {
  const { expenses } = useExpensesContext();

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      period="Last 7 days"
      expenses={recentExpenses}
      fallBackText="No expenses for the last 7 days"
    />
  );
};

export default RecentExpenses;
