import axios from 'axios';
import Constants from '../config/Constants';

const apiRequest = axios.create({
    baseURL: Constants.apiBaseUrl(),
});

apiRequest.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiRequest;
