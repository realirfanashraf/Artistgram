import axios from "axios";
import {store} from '../redux/store.js'

const Axios =  axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL_ADMIN || 'https://artistgram.online/admin',
    withCredentials:true
  });

  Axios.interceptors.request.use(
    function(config) {
      const email = store.getState().adminInfo?.admin; 
      if (email) {
        config.params = {
          ...config.params,
          email: email
        };
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );
  
  export { Axios };