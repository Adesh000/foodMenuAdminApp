import {
  Button,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
// import {Beverages, Snacks} from '../constants/data';
import ListItem from '../components/ListItem';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import firestore from '@react-native-firebase/firestore';
import CustomModal from '../components/CustomModal';
const Beverages = () => {
  // const navigation = useNavigation();
  const [formVisible, setFormVisible] = useState(false);
  const [beverages, setBeverages] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   //   function to get data from collection
  //   const getBeveragesData = async () => {
  //     const items = await firestore().collection('Beverages').get();
  //     setBeverages(items?.docs);
  //     console.log('Beverages: ', items?.docs);
  //   };
  //   getBeveragesData();
  // }, [formVisible]);

  useEffect(() => {
    return firestore()
      .collection('Beverages')
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
        setBeverages(list);

        if (loading) {
          setLoading(false);
        }
      });
  }, []);

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User is signed out!');
      });
  };

  // function to add new item in the collection
  const addItem = async (title, tag, status) => {
    await firestore()
      .collection('Beverages')
      .add({
        title: title,
        tags: tag,
        status: status,
      })
      .then(() => {
        console.log('Food item added');
        setFormVisible(false);
      });
  };

  return (
    <View style={styles.mainContainer}>
      {/* <Text style={styles.headingStyle}>Beverages</Text> */}
      <FlatList
        data={beverages}
        renderItem={item => (
          <ListItem
            item={item}
            type="Beverages"
            clickEdit={() => setFormVisible(true)}
          />
        )}
        keyExtractor={item => item?.id}
      />
      <CustomButton
        title={'Add Beverages'}
        type="primary"
        onPress={() => {
          setFormVisible(true);
        }}
      />
      {/* <Button title="Logout" onPress={signOut} /> */}
      {/* Form to add new item */}
      <CustomModal
        open={formVisible}
        onClose={() => setFormVisible(!formVisible)}
        onSubmit={addItem}
        title={'Add new beverage'}
        // setFoodTitle={setFoodItemName}
        // setFoodTag={setFoodItemTag}
        // setFoodStatus={setIsActive}
      />
    </View>
  );
};

export default Beverages;

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
    marginBottom: 20,
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
