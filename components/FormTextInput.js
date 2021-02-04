import React from 'react';
import PropTypes from 'prop-types';
import {Input} from 'react-native-elements';

const FormTextInput = ({style, error, ...otherProps}) => {
  return (
    <Input
      style={[style]}
      errorStyle={{color: 'red'}}
      errorMessage={error}
      {...otherProps}
    />
  );
};

FormTextInput.propTypes = {
  style: PropTypes.object,
  error: PropTypes.string,
};

export default FormTextInput;
