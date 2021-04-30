import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL;

const http = axios.create({
    baseURL : baseURL,
})

const { request } = http.interceptors;

request.use(
    request => {
        let token;
        if(localStorage.getItem('token') !== null){
            token = localStorage.getItem('token');
            request.headers['Authorization'] = `Bearer ${token}`;
        }
        return request;
    },
    error => {
        Promise.reject(error);
    }
)

export default http;