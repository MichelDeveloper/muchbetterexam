import React from 'react';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';
//@ts-ignore
import { vw } from 'react-native-expo-viewport-units';

const Input = ({ ...rest }) => {
  return (
    <SafeAreaView>
      <TextInput style={styles.input} {...rest} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 32,
    height: 50,
    width: vw(90),
    margin: 12,
    borderWidth: 1.25,
    padding: 10,
    backgroundColor: '#ddd',
  },
});

export default Input;
