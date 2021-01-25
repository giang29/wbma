import React from 'react';
import {Avatar, Button, ListItem as RNEListItem} from 'react-native-elements';
import PropTypes from 'prop-types';

const ListItem = ({singleMedia, navigation}) => {
  return (
    <RNEListItem bottomDivider>
      <Avatar source={{uri: `http://media.mw.metropolia.fi/wbma/uploads/${singleMedia.thumbnails.w160}`}} />
      <RNEListItem.Content>
        <RNEListItem.Title>{singleMedia.title}</RNEListItem.Title>
        <RNEListItem.Subtitle>{singleMedia.description}</RNEListItem.Subtitle>
      </RNEListItem.Content>
      <Button
        buttonStyle={{width: 70, height: 30, backgroundColor: '#137afe'}}
        onPress={() => {
          navigation.navigate('Single', singleMedia);
        }}
        title='View'
        titleStyle={{fontSize: 13}}/>
    </RNEListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    thumbnails: PropTypes.exact({w160: PropTypes.string}),
    filename: PropTypes.string,
  }),
  navigation: PropTypes.any,
};

export default ListItem;
