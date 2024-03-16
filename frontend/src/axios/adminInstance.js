import axios from "axios";
import {store} from '../redux/store.js'

const Axios =  axios.create({
    baseURL: "http://localhost:3000/admin",
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