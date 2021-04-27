import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL : baseURL,
})

axiosInstance.interceptors.request.use(
    (config : any)=>{
        let token = localStorage.getItem('token');
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    }
)

export default axiosInstance;