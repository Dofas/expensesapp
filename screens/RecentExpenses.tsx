import React, { useEffect, useState } from 'react';

import { AxiosError } from 'axios';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/ui/ErrorOverlay/ErrorOverlay';
import LoadingOverlay from '../components/ui/LoadingOverlay/LoadingOverlay';
import { getExpenses } from '../services/http';
import { useExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../utils/date';

const RecentExpenses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const { setExpenses, expenses } = useExpensesContext();

  useEffect(() => {
    async function fetchExpenses() {
      setIsLoading(true);
      try {
        const fetchedExpenses = await getExpenses();
        setExpenses(fetchedExpenses);
        setError('');
      } catch (error) {
        let errorMessage = 'Could not fetch expenses';
        if (error instanceof AxiosError) {
          errorMessage = error.message;
        }
        setError(errorMessage);
      }
      setIsLoading(false);
    }
    fetchExpenses();
  }, []);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  const errorHandler = () => {
    setError('');
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error.length > 0) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  return (
    <ExpensesOutput
      period="Last 7 days"
      expenses={recentExpenses}
      fallBackText="No expenses for the last 7 days"
    />
  );
};

export default RecentExpenses;
