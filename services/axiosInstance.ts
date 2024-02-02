import axios, { AxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 5000,
});
