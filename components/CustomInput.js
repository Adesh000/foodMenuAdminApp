import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const CustomInput = ({value, onUpdate, type}) => {
  return (
    <TextInput
      cursorColor="#DAA520"
      style={[styles.input, {color: type === 'secondary' ? '#0C0C0C' : '#FFF'}]}
      value={value}
      onChangeText={text => onUpdate(text)}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    borderColor: '#DAA520',
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 5,
    color: '#FFF',
    width: '100%',
    paddingLeft: 20,
  },
});
