import React, {useContext} from 'react';
import Home from '../views/Home';
import Single from '../views/Single';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../views/Login';
import {NavigationContainer} from '@react-navigation/native';
import {MainContext} from '../contexts/MainContext';
import Profile from '../views/Profile';
import {
  createMaterialBottomTabNavigator,
} from '@react-navigation/material-bottom-tabs';
// eslint-disable-next-line max-len
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen/>
    </NavigationContainer>
  );
};

const TabScreen = () => {
  return (
    <Tab.Navigator
      activeColor='black'
      barStyle={{backgroundColor: '#ffff'}}>
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: 'Home',
          // eslint-disable-next-line react/prop-types,react/display-name
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}/>
      <Tab.Screen name="Profile" component={Profile}
        options={{
          tabBarLabel: 'Profile',
          // eslint-disable-next-line react/prop-types,react/display-name
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="face" color={color} size={26} />
          ),
        }}/>
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Tab" component={TabScreen}
            options={{headerShown: false}}/>
          <Stack.Screen name="Single" component={Single}/>
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
