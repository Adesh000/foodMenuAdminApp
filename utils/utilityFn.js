import firestore from '@react-native-firebase/firestore';

export const deleteItem = (type, id) => {
  firestore()
    .collection(type)
    .doc(id)
    .delete()
    .then(() => {
      console.log('Item deleted successfully');
    });
};

// export const addItem = async (type, title, tag, status) => {
//   await firestore()
//     .collection(type)
//     .add({
//       title: title,
//       tags: tag,
//       status: status,
//     })
//     .then(() => {
//       console.log('Food item added');
//       setIsOpen(false);
//     });
// };

export const editItem = async (type, id, title, tags, status) => {
  console.log('Data Edit: ', type, id, title, tags, status);
  await firestore()
    .collection(type)
    .doc(id)
    .update({
      title,
      tags,
      status,
    })
    .then(() => {
      console.log('Item updated');
    });
};
