import axios from 'axios';
import {store} from "../store";

const API_BASE_URL = 'http://localhost:8000/api';

// Create Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach token from localStorage to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const {status} = error.response;

            if (status === 401) {
                // Unauthorized: Redirect to login page
                localStorage.removeItem("ACCESS_TOKEN");
                localStorage.removeItem("user");
               // store.dispatch(logout());
               // window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export default api;


