import {Alert, StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomButton from './CustomButton';
import firestore from '@react-native-firebase/firestore';
import {deleteItem, editItem} from '../utils/utilityFn';
import CustomModal from './CustomModal';
const ListItem = ({item, type}) => {
  const [isActive, setIsActive] = useState(item?.item?.status);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSwitch = () => setIsActive(prevState => !prevState);
  console.log('List Item: ', item?.item);

  const editItem = async (title, tags, status) => {
    console.log('Data Edit: ', title, tags, status);
    await firestore()
      .collection(type)
      .doc(item?.item?.id)
      .update({
        title,
        tags,
        status,
      })
      .then(() => {
        console.log('Item updated');
        setIsOpen(false);
      });
  };

  const onClickDelete = () => {
    Alert.alert('Delete', 'Do you want to delete this item?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => deleteItem(type, item?.item?.id),
      },
    ]);
  };

  return (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemTitle}>{item?.item?.title}</Text>
        <Text style={styles.tags}>{item?.item?.tags}</Text>
      </View>
      <View>
        <Switch
          trackColor={{false: '#505050', true: '#DAA520'}}
          thumbColor={isActive ? '#F200DD' : '#2196F3'}
          onValueChange={toggleSwitch}
          value={isActive}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 105,
          }}>
          <CustomButton
            title={'Edit'}
            type="secondary"
            onPress={() => setIsOpen(true)}
          />
          <CustomButton
            title={'Delete'}
            type="secondary"
            onPress={onClickDelete}
          />
        </View>
      </View>
      <CustomModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={editItem}
        title={'Edit item'}
        data={item?.item}
      />
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 10,
    borderColor: '#DAA520',
    backgroundColor: '#0C0C0C',
    borderWidth: 1,
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    color: '#DAA520',
    fontSize: 17,
    fontWeight: '600',
  },
  tags: {
    color: '#505050',
  },
});
