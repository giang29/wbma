import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterForm from '../components/RegisterForm';
import LogInForm from '../components/LogInForm';

const Login = ({navigation}) => { // props is needed for navigation
  const {setIsLoggedIn} = useContext(MainContext);
  const getToken = () => {
    AsyncStorage.getItem('userToken')
        .then((userToken) => {
          return fetch('http://media.mw.metropolia.fi/wbma/users/usere', {
            headers: {
              'x-access-token': userToken,
            },
          }).json();
        })
        .then((r) => {
          setIsLoggedIn(r.status !== 401);
        })
        .catch(() => setIsLoggedIn(false));
  };
  useEffect(() => {
    getToken();
  }, []);
  const [showLoginView, setShowLoginView] = useState(true);
  let form;

  if (showLoginView) {
    form = <LogInForm navigation={navigation} onCreateAccountClick={(e) => {
      setShowLoginView(false);
    }}/>;
  } else {
    form = <RegisterForm navigation={navigation} onLoginClick={(e) => {
      setShowLoginView(true);
    }}/>;
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {form}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
