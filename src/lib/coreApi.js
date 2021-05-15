import AsyncStorage from '@react-native-community/async-storage';
import {Constants} from './constant';

let domainUrl = Constants.BASE_URL;

export default {
  GET: link =>
    new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      const url = domainUrl + link;

      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      })
        .then(response => response.json())
        .then(responseText => {
          resolve(responseText);
        })
        .catch(error => {
          reject(error);
        });
    }),

  POST: (link, data, qs) =>
    new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      const url = domainUrl + link;
      fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          type: qs ? type : '',
          'Content-type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseText => {
          resolve(responseText);
        })
        .catch(error => {
          reject(error);
        });
    }),

  POST_IMAGE: (link, data) =>
    new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      const url = domainUrl + link;
      let formData = new FormData();

      let keys = Object.keys(data);
      keys.map(key => {
        if (key === 'file') {
          formData.append(key, {
            name: data[key].fileName,
            type: data[key].type,
            uri: data[key].uri,
          });
        } else {
          formData.append(key, data[key]);
        }
      });

      fetch(url, {
        body: formData,
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseText => {
          resolve(responseText);
        })
        .catch(error => {
          reject(error);
        });
    }),
};
