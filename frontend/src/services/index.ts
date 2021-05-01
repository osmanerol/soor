import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL;

const http = axios.create({
    baseURL : baseURL,
})

const { request, response } = http.interceptors;

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

response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        if(localStorage.getItem('refresh') && error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            return http.post('/api/token/refresh',{
                'refresh' : localStorage.getItem('refresh')
            }).then(response => {
                if(response.status === 200){
                    localStorage.setItem('token', response.data.access);
                    http.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
                    return http(originalRequest);
                }
            })
        }
        return Promise.reject(error);
    }
)

export default http;