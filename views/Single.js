import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {Card, Text} from 'react-native-elements';
import RatioAwareImage from '../components/RatioAwareImage';

const Single = ({route}) => {
  const singleMedia = route.params;
  const uri = `http://media.mw.metropolia.fi/wbma/uploads/${singleMedia.filename}`;
  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <RatioAwareImage
          uri={uri}
          resizeMode="cover"/>
        <Text style={{marginTop: 40, fontSize: 24}}>{singleMedia.title}</Text>
        <Text>{singleMedia.description}</Text>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

Single.propTypes = {
  route: PropTypes.any,
};

export default Single;
