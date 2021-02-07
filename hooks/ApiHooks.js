import {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const url = 'http://media.mw.metropolia.fi/wbma/';

const fetchData = async () => {
  try {
    const response = await fetch(`${url}tags/wbma-giangp`);
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};
const enrichImageData = async (item) => {
  const response = await fetch(`${url}media/${item.file_id}`);
  const json = await response.json();
  item.thumbnails = {w160: json.thumbnails.w160};
  return item;
};

const useLoadMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const {refresh} = useContext(MainContext);
  useEffect(() => {
    fetchData()
        .then((items) => Promise.all(items.map((i) => enrichImageData(i))))
        .then((items) => setMediaArray(items));
  }, [refresh]);
  return mediaArray;
};

const register = async (inputs) => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(url + 'users', fetchOptions);
    return await response.json();
  } catch (e) {
    return false;
  }
};

const logIn = async (inputs) => {
  let formBody = [];
  // eslint-disable-next-line guard-for-in
  for (const property in inputs) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(inputs[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  try {
    const response = await fetch(`${url}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    });
    return await response.json();
  } catch (e) {
    return false;
  }
};

const fetchAvatar = async (userId) => {
  try {
    const response = await fetch(`${url}tags/avatar_${userId}`);
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

const checkUsernameAvailability = async (username) => {
  return fetch(`${url}users/username/${username}`)
      .then((v) => v.json())
      .then((v) => v.available);
};

const uploadImage = async (inputs) => {
  // ImagePicker saves the taken photo to disk and returns a local URI to it
  const localUri = inputs.image.uri;
  const filename = localUri.split('/').pop();

  // Infer the type of the image
  const match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  if (type === 'image/jpg') type = 'image/jpeg';

  // Upload the image using the fetch and FormData APIs
  const formData = new FormData();
  // Assume "photo" is the name of the form field the server expects
  formData.append('file', {uri: localUri, name: filename, type});
  formData.append('title', inputs['title']);
  formData.append('description', inputs['description']);
  AsyncStorage.getItem('userToken')
      .then((token) => {
        return fetch(`${url}media`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'x-access-token': token,
          },
          method: 'POST',
          body: formData,
        })
            .then((r) => r.json())
            .then((json) => json.file_id)
            .then((id) => {
              console.log(id);
              const fetchOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-access-token': token,
                },
                body: JSON.stringify({
                  file_id: id,
                  tag: 'wbma-giangp',
                }),
              };
              return fetch(url + 'tags', fetchOptions);
            });
      });
};

export {useLoadMedia, register, logIn, fetchAvatar,
  checkUsernameAvailability, uploadImage};
