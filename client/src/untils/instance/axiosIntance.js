import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_URL_API,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});
