//import AxiosJwtHandler from 'vue-axios-jwt';
import axios from 'axios';
import constants from "../constants.js";
const axiosInstance = axios.create({
    baseURL: constants.API_ENDPOINT,
    timeout: 1500,
    //headers: {'X-Custom-Header': 'foobar'}
});
//const handler = new AxiosJwtHandler({refresh_endpoint: constants.JWT_REFRESH_TOKEN_ENDPOINT, axiosInstance});
export default axiosInstance;