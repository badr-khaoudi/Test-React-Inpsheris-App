import axios from 'axios';

const API = axios.create({ baseURL: 'api' });
API.interceptors.response.use(
  response => {
    if (response.data.code) {
      return Promise.reject(response.data);
    }
    return response;
  },
  error => Promise.reject(error),
);

export default API;
