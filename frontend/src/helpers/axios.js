import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL;
let headers = {}

if(localStorage.token){
    headers.Authorization = `Bareer ${localStorage.token}`
}

const axiosInstance = axios.create({
    baseURL : baseURL,
    headers
})

export default axiosInstance;