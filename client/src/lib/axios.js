import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "http://localhost:1000/api/",
    withCredentials: true
})