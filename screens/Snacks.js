import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../components/CustomButton';
import ListItem from '../components/ListItem';
import firestore from '@react-native-firebase/firestore';
import CustomModal from '../components/CustomModal';

const Snacks = () => {
  const [snacks, setSnacks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  //   function to get data from collection
  useEffect(() => {
    return firestore()
      .collection('Snacks')
      .onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          const {title, tags, status} = doc?.data();
          console.log('Snapshot data: ', title, tags, status);
          list.push({
            id: doc.id,
            title,
            tags,
            status,
          });
        });
        setSnacks(list);

        if (loading) {
          setLoading(false);
        }
      });
  }, []);

  // const getSnacksData = async () => {
  //   const items = await firestore().collection('Snacks').get();
  //   console.log('Snacks: ', items?.docs);
  //   setSnacks(items?.docs);
  // };
  // useEffect(() => {
  //   getSnacksData();
  // }, [isOpen]);

  const addSnacks = async (title, tag, status) => {
    await firestore()
      .collection('Snacks')
      .add({
        title: title,
        tags: tag,
        status: status,
      })
      .then(() => {
        console.log('Food item added');
        setIsOpen(false);
      });
  };

  return (
    <View style={styles.mainContainer}>
      {/* <Text style={styles.headingStyle}>Snacks</Text> */}
      <FlatList
        data={snacks}
        keyExtractor={item => item?.id}
        renderItem={item => <ListItem item={item} type={'Snacks'} />}
      />
      <CustomButton
        title={'Add Snacks'}
        type="primary"
        onPress={() => {
          setIsOpen(true);
        }}
      />

      {/* Form to add new item */}
      <CustomModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={addSnacks}
        title={'Add new snacks'}
      />
    </View>
  );
};

export default Snacks;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#0C0C0C',
    flex: 1,
    padding: 20,
  },
  headingStyle: {
    color: '#FFF',
    fontSize: 25,
    textTransform: 'uppercase',
    marginVertical: 10,
  },
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
