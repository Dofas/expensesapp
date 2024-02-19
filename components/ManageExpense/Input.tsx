import React from 'react';

import { Text, TextInput, TextInputProps, View, StyleSheet, ViewStyle } from 'react-native';

import { GlobalStyles } from '../../constants/styles';

type InputProps = {
  label?: string;
  style?: ViewStyle;
  textConfig?: TextInputProps;
  isInvalid?: boolean;
};

const Input = ({ label, style, textConfig, isInvalid }: InputProps) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, isInvalid && styles.invalidLabel]}>{label}</Text>}
      <TextInput
        style={[
          styles.textInput,
          textConfig?.multiline && styles.inputMultiline,
          isInvalid && styles.invalidInput
        ]}
        {...textConfig}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 16
  },
  label: {
    fontSize: 16,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4
  },
  textInput: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 8,
    fontSize: 18,
    lineHeight: 20,
    borderRadius: 6
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top'
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50
  }
});
