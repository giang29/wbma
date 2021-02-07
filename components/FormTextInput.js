import React from 'react';
import PropTypes from 'prop-types';
import {Input} from 'react-native-elements';

const FormTextInput = React.forwardRef(({style, error, ...otherProps}, ref) => {
  return (
    <Input
      ref={ref}
      style={[style]}
      errorStyle={{color: 'red'}}
      errorMessage={error}
      {...otherProps}
    />
  );
});

FormTextInput.propTypes = {
  style: PropTypes.object,
  error: PropTypes.string,
};

FormTextInput.displayName = 'FormTextInput';

export default FormTextInput;
