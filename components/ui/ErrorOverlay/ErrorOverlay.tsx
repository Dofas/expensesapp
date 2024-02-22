import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../../constants/styles';
import Button from '../Button/Button';

type ErrorOverlayProps = {
  message: string;
  onConfirm: () => void;
};

const ErrorOverlay = ({ message, onConfirm }: ErrorOverlayProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
  },
  text: {
    color: GlobalStyles.colors.white,
    textAlign: 'center',
    marginBottom: 8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
