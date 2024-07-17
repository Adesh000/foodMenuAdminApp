/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import Login from './screens/Login';
import auth from '@react-native-firebase/auth';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Snacks from './screens/Snacks';
import Beverages from './screens/Beverages';
import CustomButton from './components/CustomButton';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    <View>
      <ActivityIndicator />
    </View>;
  }
  const signOut = async () => {
    await auth()
      .signOut()
      .then(() => {
        console.log('User is signed out!');
      });
  };

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#DAA520',
            tabBarInactiveTintColor: '#0C0C0C',
            headerRight: () => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: 120,
                  marginRight: 20,
                }}>
                <View
                  style={{
                    backgroundColor: '#DAA520',
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textTransform: 'uppercase',
                      fontSize: 25,
                      fontWeight: '600',
                      color: '#FFF',
                    }}>
                    {user?.email[0]}
                  </Text>
                </View>
                <Button title="Logout" onPress={signOut} />
              </View>
            ),
          }}>
          <Tab.Screen name="Beverages" component={Beverages} />
          <Tab.Screen name="Snacks" component={Snacks} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
