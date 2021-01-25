import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchAvatar} from '../hooks/ApiHooks';
import {Card, Button, Text} from 'react-native-elements';
// eslint-disable-next-line max-len
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RatioAwareImage from '../components/RatioAwareImage';

const Profile = (props) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    props.navigation.navigate('Login');
  };
  const [avatar, setAvatar] = useState('');
  useEffect(() => {
    fetchAvatar(user.user_id)
        .then((r) => {
          setAvatar(`http://media.mw.metropolia.fi/wbma/uploads/${r[0].filename}`);
        });
  });
  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={{width: '100%'}}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
          <MaterialCommunityIcons name="face" color={'#137afe'} size={26}/>
          <Text style={{
            marginStart: 16,
            fontSize: 16,
            color: 'black',
          }}>{user.username}</Text>
        </View>
        <Card.Divider style={{marginTop: 16}}/>
        <RatioAwareImage
          uri={avatar}
          resizeMode="cover" />
        <Text style={{marginTop: 40}}>Fullname: {user.full_name}</Text>
        <Text>Fullname: {user.email}</Text>
        <Card.Divider style={{marginTop: 16}}/>
        <Button title={'Logout'} onPress={logout} />
      </Card>
    </SafeAreaView>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Profile;
