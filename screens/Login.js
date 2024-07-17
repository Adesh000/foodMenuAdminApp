import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Logo from '../assets/logo.png';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const registerUser = async () => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User registered and signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          setError(error.code);
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setError(error.code);
        }

        console.error(error);
      });
    // navigation.navigate('Home');
  };

  const loginUser = async () => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User is Logged in!');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          console.log('That email address is already in use!');
          setError(error.code);
        }
        console.error(error);
      });
    // navigation.navigate('Home');
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Image
        source={Logo}
        style={{
          width: 100,
          height: 100,
          resizeMode: 'contain',
          alignSelf: 'center',
          marginBottom: 50,
        }}
      />
      <CustomInput value={email} onUpdate={setEmail} />
      <CustomInput value={password} onUpdate={setPassword} />
      <Text style={{color: 'red', fontSize: 20}}>{error ? error : ''}</Text>
      <CustomButton title="Login" onPress={loginUser} />
      <CustomButton title="Register" onPress={registerUser} />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#0C0C0C',
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
  },
});
