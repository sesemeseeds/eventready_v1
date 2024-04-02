// interceptorConfig.jsx
import fetchClerkToken from "../components/ClerkToken";

export const configureAxiosInterceptor = (AxiosInstance) => {
  AxiosInstance.interceptors.request.use(
    async (config) => {
      try {
        const token = await fetchClerkToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error fetching Clerk token:', error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};