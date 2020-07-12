import axios from 'axios';
import config from './config';

// axios.defaults.baseURL = config.baseURL + config.apiURL;

// axios.interceptors.request.use(req=>{
//      console.log(req);
//     return req;
// })

// axios.interceptors.response.use(res=>{
//     // console.log(res.data.data);
//     return res;    
// })

const axiosNS = axios.create({
    baseURL: config.baseURL + config.apiURL
});

axiosNS.interceptors.request.use(req => {
    // console.log(req);
    return req;
})

axiosNS.interceptors.response.use(res => {
    // console.log(res.data.data);
    return res;
})
export default axiosNS;