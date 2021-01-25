import React, {useState} from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';

const RatioAwareImage = ({style, uri, ...otherProps}) => {
  const [imageRatio, setImageRatio] = useState(1);
  Image.getSize(uri, (w, h) => {
    setImageRatio(w/h);
  });
  return (
    <Image
      style={[{aspectRatio: imageRatio}, style]}
      source={{uri: uri}}
      {...otherProps}
    />
  );
};

RatioAwareImage.propTypes = {
  style: PropTypes.any,
  uri: PropTypes.string,
};

export default RatioAwareImage;
