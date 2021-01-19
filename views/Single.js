import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import PropTypes from 'prop-types';

const Single = ({route}) => {
  const singleMedia = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{singleMedia.title}</Text>
      <Text style={styles.description}>{singleMedia.description}</Text>

      <Image
        style={{height: 500, width: 300, marginTop: 16}}
        source={{uri: `http://media.mw.metropolia.fi/wbma/uploads/${singleMedia.filename}`}}/>

    </SafeAreaView>
  );
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

Single.propTypes = {
  route: PropTypes.any,
};

export default Single;
