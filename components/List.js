import {FlatList} from 'react-native';
import ListItem from './ListItem';
import React from 'react';
import {useLoadMedia} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';

const List = ({navigation}) => {
  const mediaArray = useLoadMedia();
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => {
        return <ListItem navigation={navigation} singleMedia={item}/>;
      }}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.any,
};

export default List;
