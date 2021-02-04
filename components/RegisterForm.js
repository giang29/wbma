import React, {useState} from 'react';
import {
  View, Alert,
} from 'react-native';
import {Button, Text} from 'react-native-elements';
import PropTypes from 'prop-types';
import {checkUsernameAvailability, register} from '../hooks/ApiHooks';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import {validator} from '../utils/validator';
import validation from '../utils/validation';

const RegisterForm = ({navigation, onLoginClick}) => {
  const {handleInputChange, inputs} = useSignUpForm();
  const [availableUsername, setAvailableUsername] = useState(true);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    username: '',
    confirmedPassword: '',
  });

  let error = availableUsername ? '' : 'This username is taken!';
  if (error === '') error = errors.username;

  const doRegister = async () => {
    const emailError = validator('email', inputs.email, validation);
    const passwordError = validator('password', inputs.password, validation);
    const usernameError = validator('username', inputs.username, validation);
    setErrors({
      email: emailError,
      password: passwordError,
      username: usernameError,
    });
    if (!(emailError || passwordError || usernameError)) {
      const serverResponse = await register(inputs);
      if (serverResponse) {
        Alert.alert(serverResponse.message);
      } else {
        Alert.alert('register failed');
      }
    }
  };

  return (
    <View style={{width: '100%'}}>
      <Text
        style={{alignSelf: 'center', fontSize: 24, fontWeight: 'bold'}}
      >
        Register
      </Text>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        error={error}
        onEndEditing={(event) => {
          const text = event.nativeEvent.text;
          checkUsernameAvailability(text)
              .then((available) => setAvailableUsername(available))
              .catch((e) => setAvailableUsername(false));
        }}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        error={errors.password}
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="confirm password"
        error={errors.confirmedPassword}
        onChangeText={(txt) => {
          if (txt !== inputs.password) {
            setErrors({
              confirmedPassword: 'Password mismatched!',
            });
          }
        }}
        secureTextEntry={true}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="email"
        error={errors.email}
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
      />
      <Button title="Register!" onPress={doRegister}/>
      <Text onPress={onLoginClick}>Already has an account?</Text>
    </View>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object,
  onLoginClick: PropTypes.func,
};

export default RegisterForm;
