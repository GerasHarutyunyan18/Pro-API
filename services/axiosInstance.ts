import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://pro-api-be.onrender.com',
    timeout: 5000,
});
