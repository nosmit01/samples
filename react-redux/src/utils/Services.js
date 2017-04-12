import axios from 'axios';
import { baseUrl } from './Base';

export const endpoint = params =>
  new Promise((resolve, reject) => {
    axios
      .get(baseUrl(), params)
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });