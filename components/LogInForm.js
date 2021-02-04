import React, {useContext} from 'react';
import {
  View, Alert,
} from 'react-native';
import {
  Text, Button,
} from 'react-native-elements';
import PropTypes from 'prop-types';
import {logIn} from '../hooks/ApiHooks';
import FormTextInput from './FormTextInput';
import useLogInForm from '../hooks/LoginHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const LogInForm = ({navigation, onCreateAccountClick}) => {
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
    <View style={{width: '100%'}}>
      <Text
        style={{alignSelf: 'center', fontSize: 24, fontWeight: 'bold'}}
      >
        Login
      </Text>
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
      <Text onPress={onCreateAccountClick}>No account yet?</Text>
    </View>
  );
};

LogInForm.propTypes = {
  navigation: PropTypes.object,
  onCreateAccountClick: PropTypes.func,
};

export default LogInForm;
