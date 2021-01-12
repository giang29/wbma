import {FlatList} from 'react-native';
import ListItem from './ListItem';
import React, {useEffect, useState} from 'react';

const url = 'http://media.mw.metropolia.fi/wbma/media';

const List = () => {
  const [mediaArray, setMediaArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        return await response.json();
      } catch (e) {
        console.log(e);
      }
    };
    const enrichImageData = async (item) => {
      const response = await fetch(`${url}/${item.file_id}`);
      const json = await response.json();
      item.thumbnails = {w160: json.thumbnails.w160};
      return item;
    };
    fetchData()
        .then((items) => Promise.all(items.map((i) => enrichImageData(i))))
        .then((items) => setMediaArray(items));
  }, []);

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem singleMedia={item}/>}
    />
  );
};

export default List;
