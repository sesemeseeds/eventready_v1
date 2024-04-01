import axios from 'axios'
import { clerkClient } from '@clerk/clerk-react';

const baseUrl = 'http://127.0.0.1:8000/'

// create event case
const AxiosInstance = axios.create({
    baseURL: baseUrl, 
    timeout: 5000, 
    headers: {
        "Content-Type": "application/json", 
        accept: "application/json"
    }
});

// Add an interceptor to include the Clerk JWT token in the request headers
AxiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const session = await clerkClient.sessions.getSession(); // Retrieve the session
            const accessToken = session.token; // Extract the access token from the session
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
                console.log("Clerk Auth token set in request headers:", accessToken);
            }
        } catch (error) {
            console.error("Error fetching Clerk token:", error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default AxiosInstance