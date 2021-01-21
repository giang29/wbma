import React from 'react';
import {
  View,
  Button, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import {register} from '../hooks/ApiHooks';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';

const RegisterForm = ({navigation}) => { // props is needed for navigation
  const {handleInputChange, inputs} = useSignUpForm();

  const doRegister = async () => {
    const serverResponse = await register(inputs);
    if (serverResponse) {
      Alert.alert(serverResponse.message);
    } else {
      Alert.alert('register failed');
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
      <FormTextInput
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
      />
      <Button title="Register!" onPress={doRegister}/>
    </View>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterForm;
