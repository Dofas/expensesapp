import React, { useLayoutEffect } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import { Expense } from '../components/ExpensesOutput/types';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import IconButton from '../components/ui/IconButton/IconButton';
import { GlobalStyles } from '../constants/styles';
import { BottomTabsNavigationProp } from '../routes/BottomTabsNavigator/BottomTabsNavigator.types';
import { ManageExpensesRouteProp } from '../routes/StackNavigator/StackNavigator.types';
import { useExpensesContext } from '../store/expenses-context';

const ManageExpenses = () => {
  const { deleteExpense, updateExpense, addExpense, expenses } = useExpensesContext();
  const { params } = useRoute<ManageExpensesRouteProp>();
  const { setOptions, goBack } = useNavigation<BottomTabsNavigationProp>();
  const isEditing = !!params?.id;

  const selectedExpense = expenses?.find((expense) => expense.id === params?.id);

  useLayoutEffect(() => {
    setOptions({
      title: isEditing ? 'Edit Expense' : 'Add expense'
    });
  }, [setOptions, isEditing]);

  function deleteExpenseItemHandler() {
    deleteExpense(params.id);
    goBack();
  }

  function cancelHandler() {
    goBack();
  }

  function confirmHandler(expense: Omit<Expense, 'id'>) {
    if (isEditing) {
      updateExpense(params.id, expense);
    } else {
      addExpense(expense);
    }
    goBack();
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
