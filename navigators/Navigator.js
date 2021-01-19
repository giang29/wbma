import React, {useContext} from 'react';
import Home from '../views/Home';
import Single from '../views/Single';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../views/Login';
import {NavigationContainer} from '@react-navigation/native';
import {MainContext} from '../contexts/MainContext';
import Profile from '../views/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen/>
    </NavigationContainer>
  );
};

const StackScreen = () => {
  const [isLoggedIn] = useContext(MainContext);
  return (

    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Tab.Screen name="Home" component={Home}/>
          <Tab.Screen name="Single" component={Single}/>
          <Tab.Screen name="Profile" component={Profile}/>
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
