import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const CustomButton = ({title, onPress, type, style}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonStyle,
        {
          width: type === 'secondary' ? 50 : '100%',
          paddingVertical: type === 'secondary' ? 5 : 10,
        },
        style,
      ]}>
      <Text
        style={[
          styles.buttonTitle,
          {
            fontSize: type === 'secondary' ? 12 : 20,
            textTransform: type === 'secondary' ? 'capitalize' : 'uppercase',
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonTitle: {
    color: '#505050',
    fontSize: 20,
    textTransform: 'uppercase',
  },
});
