import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import List from '../components/List';
import PropTypes from 'prop-types';

const Home = ({navigation}) => (
  <SafeAreaView style={GlobalStyles.droidSafeArea}>
    <List navigation={navigation}/>
    <StatusBar style="auto"/>
  </SafeAreaView>
);

Home.propTypes = {
  navigation: PropTypes.any,
};

export default Home;
