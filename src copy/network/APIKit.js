import axios from 'axios';
import Constant from '../common/Constants';

// Create axios client, pre-configured with baseURL
let Axios = axios.create({
  baseURL: Constant.baseURL,
  timeout: 100000,
});

// Set JSON Web Token in Client to be included in all calls
// export const setClientToken = token => {
//   Axios.interceptors.request.use(function (config) {
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   });
// };

export default Axios;
