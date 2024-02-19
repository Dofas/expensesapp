import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../utils/date';
import { Expense } from '../ExpensesOutput/types';
import Button from '../ui/Button/Button';

import Input from './Input';

type FormFieldType = {
  value: string;
  isValid: boolean;
};

type ExpenseFormInputs = {
  amount: FormFieldType;
  date: FormFieldType;
  description: FormFieldType;
};

type ExpenseFormProps = {
  onCancel: () => void;
  onSubmit: (expense: Omit<Expense, 'id'>) => void;
  submitButtonLabel: string;
  defaultValue?: Expense;
};

const ExpenseForm = ({ onCancel, onSubmit, submitButtonLabel, defaultValue }: ExpenseFormProps) => {
  const [inputs, setInputs] = useState<ExpenseFormInputs>({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : '',
      isValid: true
    },
    date: {
      value: defaultValue ? getFormattedDate(defaultValue.date) : '',
      isValid: true
    },
    description: { value: defaultValue ? defaultValue.description : '', isValid: true }
  });

  function changeInputValuesHandler(inputIdentifier: keyof ExpenseFormInputs, inputValue: string) {
    setInputs((currentInputsState) => {
      return {
        ...currentInputsState,
        [inputIdentifier]: { value: inputValue, isValid: true }
      };
    });
  }

  function submitHandler() {
    const expenseData: Omit<Expense, 'id'> = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value
    };

    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date.toString() !== 'Invalid Date';
    const isDescriptionValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: isAmountValid },
          date: { value: currentInputs.date.value, isValid: isDateValid },
          description: { value: currentInputs.description.value, isValid: isDescriptionValid }
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          isInvalid={!inputs.amount.isValid}
          textConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: (amountValue) => changeInputValuesHandler('amount', amountValue),
            value: inputs.amount.value
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          isInvalid={!inputs.date.isValid}
          textConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: (dateValue) => changeInputValuesHandler('date', dateValue),
            value: inputs.date.value
          }}
        />
      </View>
      <Input
        label="Description"
        isInvalid={!inputs.description.isValid}
        textConfig={{
          multiline: true,
          // autoCorrect: false,
          // autoCapitalize: 'none',
          onChangeText: (descriptionValue) =>
            changeInputValuesHandler('description', descriptionValue),
          value: inputs.description.value
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid input values. Please check your entered data</Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button onPress={onCancel} mode="flat" style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GlobalStyles.colors.white,
    marginVertical: 24,
    textAlign: 'center'
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
});
