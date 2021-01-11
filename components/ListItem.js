import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({singleMedia}) => {
  return (
    <TouchableOpacity style={styles.item}>
      <Image style={styles.image} source={{uri: singleMedia.thumbnails.w160}}/>
      <View style={styles.textsContainer}>
        <Text style={styles.title}>{singleMedia.title}</Text>
        <Text style={styles.description}>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1, flexDirection: 'row',
    padding: 16, alignItems: 'stretch',
    backgroundColor: '#cccccc',
    marginBottom: 2,
  },
  image: {width: 150, height: 250},
  textsContainer: {
    marginStart: 16, flexDirection: 'column',
    flexShrink: 1,
  },
  title: {fontWeight: 'bold', flex: 1},
  description: {flex: 1},
});

ListItem.propTypes = {
  singleMedia: PropTypes.exact({
    key: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    thumbnails: PropTypes.exact({w160: PropTypes.string}),
    filename: PropTypes.string,
  }),
};

export default ListItem;
