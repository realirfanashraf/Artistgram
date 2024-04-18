import axios from 'axios';
import { store } from '../redux/store.js';

const Axios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || 'https://artistgram.online',
  withCredentials: true
});

Axios.interceptors.request.use(
  function(config) {
    const userInfo = store.getState().userInfo.user;
    if (userInfo) {
      const { email, _id: userId } = userInfo; // Destructure _id as userId
      config.params = {
        ...config.params,
        email: email,
        userId: userId // Include userId here
      };
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export { Axios };
