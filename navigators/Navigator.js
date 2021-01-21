import React, {useContext} from 'react';
import Home from '../views/Home';
import Single from '../views/Single';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../views/Login';
import {NavigationContainer} from '@react-navigation/native';
import {MainContext} from '../contexts/MainContext';
import Profile from '../views/Profile';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen/>
    </NavigationContainer>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (

    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Single" component={Single}/>
          <Stack.Screen name="Profile" component={Profile}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login}/>
        </>
      )}
    </Stack.Navigator>
  );
};

export default Navigator;
