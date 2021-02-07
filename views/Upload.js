import React, {useContext, useState} from 'react';
import {ActivityIndicator, Image, SafeAreaView, StyleSheet} from 'react-native';
import FormTextInput from '../components/FormTextInput';
import {Button} from 'react-native-elements';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import {uploadImage} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';

const IDLE = 0;
const LOADING = 1;
const SUCCESS = 2;
const FAILURE = 3;

const Upload = ({navigation}) => {
  const [uiState, setUiState] = useState(IDLE);
  const {handleInputChange, inputs} = useUploadForm();
  const {refresh, setRefresh} = useContext(MainContext);
  const titleInput = React.useRef();
  const descInput = React.useRef();
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      handleInputChange('image', {uri: result.uri});
    }
  };

  const upload= () => {
    setUiState(LOADING);
    uploadImage(inputs)
        .then((r) => {
          handleInputChange('title', '');
          handleInputChange('description', '');
          handleInputChange('image', require('../assets/placeholder.png'));
          setUiState(SUCCESS);
        })
        .catch((e) => setUiState(FAILURE));
  };

  const reset = () => {
    titleInput.current.clear();
    descInput.current.clear();
  };

  let bottomView;
  if (uiState === LOADING) {
    bottomView = (<><ActivityIndicator size="small" color="#0000ff"/></>);
  } else if (uiState === SUCCESS) {
    setTimeout(() => {
      reset();
      setUiState(IDLE);
      navigation.navigate('Home');
      setRefresh(refresh + 1);
    }, 2000);
    bottomView = (<><ActivityIndicator size="small" color="#0000ff"/></>);
  } else {
    const uploadEnabled = inputs['title'].length > 3 &&
      inputs['description'].length > 3 &&
      inputs['image'].uri !== undefined;
    bottomView = (
      <>
        <Button title="Pick Image" onPress={pickImage}/>
        <Button title="Upload" onPress={upload} disabled={!uploadEnabled}/>
        <Button title="Reset" onPress={reset}/>
      </>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image source={inputs['image']} style={{width: '100%', height: 300}}/>
      <FormTextInput
        ref={titleInput}
        autoCapitalize="none"
        placeholder="title"
        onChangeText={(txt) => handleInputChange('title', txt)}
      />
      <FormTextInput
        ref={descInput}
        autoCapitalize="none"
        placeholder="description"
        onChangeText={(txt) => handleInputChange('description', txt)}
      />
      {bottomView}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

Upload.propTypes = {
  navigation: PropTypes.any,
};

export default Upload;
