/* import axios from 'axios';
const Hyrequest = axios.create({

  baseURL: 'http://127.0.0.1:7001',
  timeout: 5000,
});
Hyrequest.interceptors.request.use(config => {
  return config;
});
export default Hyrequest; */
import {BASE_URL, TIMEOUT} from './config';
import HYrequest from './request/index';
export default new HYrequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptor: {
    requestSuccessFn(config) {
      console.log('InternalAxiosRequestConfig拦截器');
      return config;
    },
    requestFailFn: err => {
      return err;
    },
    responseSuccessFn: res => {
      return res;
    },
    responseFailFn(err) {
      return err;
    },
  },
});
