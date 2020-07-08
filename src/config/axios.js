import axios from 'axios';
import config from './config';

axios.defaults.baseURL = config.baseURL + config.apiURL;

axios.interceptors.request.use(req=>{
    return req;
})

axios.interceptors.response.use(res=>{
    // console.log(res.data.data);
    return res;    
})

export default axios;