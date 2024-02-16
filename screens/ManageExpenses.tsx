import React, { useLayoutEffect } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import Button from '../components/ui/Button/Button';
import IconButton from '../components/ui/IconButton/IconButton';
import { GlobalStyles } from '../constants/styles';
import { BottomTabsNavigationProp } from '../routes/BottomTabsNavigator/BottomTabsNavigator.types';
import { ManageExpensesRouteProp } from '../routes/StackNavigator/StackNavigator.types';
import { useExpensesContext } from '../store/expenses-context';

const ManageExpenses = () => {
  const { deleteExpense, updateExpense, addExpense } = useExpensesContext();
  const { params } = useRoute<ManageExpensesRouteProp>();
  const { setOptions, goBack } = useNavigation<BottomTabsNavigationProp>();
  const isEditing = !!params?.id;

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

  function confirmHandler() {
    if (isEditing) {
      // updateExpense(params.id, { date: new Date(), amount: 159, description: 'qweqwe32e' });
    } else {
      // addExpense({ id: '123', date: new Date(), amount: 20, description: 'asd' });
    }
    goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button onPress={cancelHandler} mode="flat" style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
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
