// Axios.jsx
import axios from 'axios';
import { configureAxiosInterceptor } from './interceptorConfig.jsx';

const baseUrl = 'http://127.0.0.1:8000/';
const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Apply the interceptor configuration
configureAxiosInterceptor(AxiosInstance);

export default AxiosInstance;