import {FlatList} from 'react-native';
import ListItem from './ListItem';
import React from 'react';
import {useLoadMedia} from '../hooks/ApiHooks';

const List = () => {
  const mediaArray = useLoadMedia();
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem singleMedia={item}/>}
    />
  );
};

export default List;
