import React, {useContext} from 'react';
import {
  View,
  Button, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import {logIn} from '../hooks/ApiHooks';
import FormTextInput from './FormTextInput';
import useLogInForm from '../hooks/LoginHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const LogInForm = ({navigation}) => { // props is needed for navigation
  const {handleInputChange, inputs} = useLogInForm();
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const doLogIn = async () => {
    const serverResponse = await logIn(inputs);
    if (serverResponse) {
      await AsyncStorage.setItem('userToken', serverResponse['token']);
      setIsLoggedIn(true);
      setUser(serverResponse['user']);
    } else {
      Alert.alert('log in failed');
      setIsLoggedIn(true);
    }
  };

  return (
    <View style={{width: '100%', padding: 16}}>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Button title="LogIn!" onPress={doLogIn}/>
    </View>
  );
};

LogInForm.propTypes = {
  navigation: PropTypes.object,
};

export default LogInForm;
