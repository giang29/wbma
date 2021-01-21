import {useState} from 'react';

const useSignUpForm = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    email: '',
    full_name: '',
  });

  const handleInputChange = (name, text) => {
    setInputs({
      ...inputs,
      [name]: text,
    });
  };
  return {
    handleInputChange,
    inputs,
  };
};

export default useSignUpForm;
