import React, { useLayoutEffect, useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { AxiosError } from 'axios';
import { StyleSheet, View } from 'react-native';

import { Expense } from '../components/ExpensesOutput/types';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import ErrorOverlay from '../components/ui/ErrorOverlay/ErrorOverlay';
import IconButton from '../components/ui/IconButton/IconButton';
import LoadingOverlay from '../components/ui/LoadingOverlay/LoadingOverlay';
import { GlobalStyles } from '../constants/styles';
import { BottomTabsNavigationProp } from '../routes/BottomTabsNavigator/BottomTabsNavigator.types';
import { ManageExpensesRouteProp } from '../routes/StackNavigator/StackNavigator.types';
import { deleteExpense, storeExpense, updateExpense } from '../services/http';
import { useExpensesContext } from '../store/expenses-context';

const ManageExpenses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    deleteExpense: deleteContextExpense,
    updateExpense: updateContextExpense,
    addExpense,
    expenses
  } = useExpensesContext();
  const { params } = useRoute<ManageExpensesRouteProp>();
  const { setOptions, goBack } = useNavigation<BottomTabsNavigationProp>();
  const isEditing = !!params?.id;

  const selectedExpense = expenses?.find((expense) => expense.id === params?.id);

  useLayoutEffect(() => {
    setOptions({
      title: isEditing ? 'Edit Expense' : 'Add expense'
    });
  }, [setOptions, isEditing]);

  async function deleteExpenseItemHandler() {
    setIsLoading(true);
    try {
      await deleteExpense(params.id);
      deleteContextExpense(params.id);
      goBack();
    } catch (error) {
      let errorMessage = 'Could not delete expense';
      if (error instanceof AxiosError) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      setIsLoading(false);
    }
  }

  function cancelHandler() {
    goBack();
  }

  async function confirmHandler(expense: Omit<Expense, 'id'>) {
    setIsLoading(true);
    try {
      if (isEditing) {
        updateContextExpense(params.id, expense);
        await updateExpense(params.id, expense);
      } else {
        const id = await storeExpense(expense);
        addExpense({ ...expense, id: id });
      }
      goBack();
    } catch (error) {
      let errorMessage = 'Could not update expense';
      if (error instanceof AxiosError) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      setIsLoading(false);
    }
  }

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
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        defaultValue={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseItemHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
});
