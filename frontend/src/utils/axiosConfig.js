import axios from "axios";

const API_URL = "http://localhost:8080";

// Store reference - will be set lazily to avoid circular dependency
let storeRef = null;

export const setStoreRef = (store) => {
  storeRef = store;
};

// Create axios instance with credentials enabled
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This allows cookies to be sent with requests
});

// Token getter function - will be set from Redux store
let getToken = () => null;

export const setTokenGetter = (tokenGetter) => {
  getToken = tokenGetter;
};

// Request interceptor to add access token from memory/state
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from Redux store via getter function
    const token = getToken();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Don't retry refresh-token endpoint itself (prevents infinite loop)
    if (originalRequest.url?.includes("/refresh-token")) {
      return Promise.reject(error);
    }

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token using axiosInstance
        // Use a separate axios call to avoid interceptor loop
        const response = await axios.post(
          `${API_URL}/user/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );

        const { token, user } = response.data;
        
        // Update Redux store with new token (lazy import to avoid circular dependency)
        if (storeRef) {
          storeRef.dispatch({
            type: "auth/refreshUserToken/fulfilled",
            payload: { token, user },
          });
        }
        
        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear auth state and don't redirect (let app handle it)
        if (storeRef) {
          storeRef.dispatch({
            type: "auth/refreshUserToken/rejected",
          });
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
export { API_URL };

