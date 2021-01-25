import {useEffect, useState} from 'react';

const url = 'http://media.mw.metropolia.fi/wbma/';

const fetchData = async () => {
  try {
    const response = await fetch(`${url}media`);
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
  useEffect(() => {
    fetchData()
        .then((items) => Promise.all(items.map((i) => enrichImageData(i))))
        .then((items) => setMediaArray(items));
  }, []);
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

export {useLoadMedia, register, logIn, fetchAvatar};
