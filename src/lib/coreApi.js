import {Constants} from './constant';

let domainUrl = Constants.BASE_URL;

export default {
  GET: link =>
    new Promise(async (resolve, reject) => {
      const url = domainUrl + link;

      fetch(url, {
        method: 'GET',
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
      const url = domainUrl + link;
      fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
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

  PUT: (link, data, qs) =>
    new Promise(async (resolve, reject) => {
      const url = domainUrl + link;
      fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
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
};
