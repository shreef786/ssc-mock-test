import axios from 'axios';

// Create an axios instance to set the base URL for the API
const api = axios.create({
    baseURL: 'http://localhost:5000', // Backend server ka URL (yeh URL tumhare backend ke server ke hisab se change hoga)
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to include the JWT token in the headers if it's available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // LocalStorage se token ko fetch karna
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Token ko headers me add karna
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
