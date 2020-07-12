import axios from 'axios';
import config from './config';


const axiosNS = axios.create({
    baseURL: config.baseURL + config.apiURL
});

axiosNS.interceptors.request.use(req=>{
    if(!req.method === 'OPTIONS')
    req.headers.Authorization = 'Bearer ' + localStorage.getItem('Auth_token');
    
   return req;
})

axiosNS.interceptors.response.use(res=>{
//    console.log(res.data.data);
   return res;    
})
export default axiosNS;