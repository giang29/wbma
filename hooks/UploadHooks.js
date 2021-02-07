import {useState} from 'react';

const useUploadForm = () => {
  const [inputs, setInputs] = useState({
    'title': '',
    'description': '',
    'image': require('../assets/placeholder.png'),
  });

  const handleInputChange = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  return {
    handleInputChange,
    inputs,
  };
};

export default useUploadForm;
