import {Modal, StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';

const CustomModal = ({open, onClose, onSubmit, title, data}) => {
  const [foodItemName, setFoodItemName] = useState(data?.title ?? '');
  const [foodItemTag, setFoodItemTag] = useState(data?.tags ?? '');
  const [isActive, setIsActive] = useState(data?.status ?? false);
  const toggleSwitch = () => {
    setIsActive(prevState => !prevState);
    // setFoodStatus(isActive);
  };
  const submit = () => {
    if (data) {
      onSubmit(foodItemName, foodItemTag, isActive);
    } else {
      onSubmit(foodItemName, foodItemTag, isActive);
      setFoodItemName('');
      setFoodItemTag('');
      setIsActive(false);
    }
  };
  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.flexBetween}>
            <Text style={styles.modalText}>{title}</Text>
            <CustomButton
              title={'X'}
              type="secondary"
              onPress={onClose}
              style={{backgroundColor: '#DAA520'}}
            />
          </View>
          <CustomInput
            value={foodItemName}
            onUpdate={txt => {
              setFoodItemName(txt);
            }}
            type="secondary"
          />
          <CustomInput
            value={foodItemTag}
            onUpdate={txt => {
              setFoodItemTag(txt);
            }}
            type="secondary"
          />
          <View style={styles.flexBetween}>
            <Text>Status of food item : </Text>
            <Switch
              trackColor={{false: '#505050', true: '#DAA520'}}
              thumbColor={isActive ? '#F200DD' : '#2196F3'}
              onValueChange={toggleSwitch}
              value={isActive}
            />
          </View>
          <CustomButton
            title={data ? 'Edit' : 'Add'}
            style={{backgroundColor: '#DAA520'}}
            onPress={submit}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 62,
    backgroundColor: '#0C0C0C80',
    padding: 20,
  },
  modalView: {
    // margin: 20,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  flexBetween: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
