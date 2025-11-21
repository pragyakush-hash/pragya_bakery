import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8080";

let storeRef = null;

export const setStoreRef = (store) => {
  storeRef = store;
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let getToken = () => null;

export const setTokenGetter = (tokenGetter) => {
  getToken = tokenGetter;
};


const protectedRoutes = [
  "/user/profile",
  "/user/update",
  "/order",
  "/cart",
  "/seller",
  "/wishlist",
  "/address",
  "/payment",
];


axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    const isProtected = protectedRoutes.some((route) =>
      config.url?.startsWith(route)
    );

    //  NO TOKEN CASE
    if (isProtected && !token) {
      toast.error("Please login first!");
      return Promise.reject({
        message: "Unauthorized - login required",
        status: 401,
      });
    }

    // Add token
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Ignore refresh endpoint
    if (originalRequest.url?.includes("/refresh-token")) {
      toast.error("Session expired. Please login again.");
      return Promise.reject(error);
    }

 
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${API_URL}/user/refresh-token`,
          {},
          { withCredentials: true }
        );

        const { token, user } = response.data;

        if (storeRef) {
          storeRef.dispatch({
            type: "auth/refreshUserToken/fulfilled",
            payload: { token, user },
          });
        }

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        toast.error("You need to login again..");

        if (storeRef) {
          storeRef.dispatch({
            type: "auth/refreshUserToken/rejected",
          });
        }

        return Promise.reject(refreshError);
      }
    }

    // OTHER API ERRORS
    if (error.response?.status === 403) {
      toast.error("Access denied");
    }

    if (error.response?.status === 404) {
      toast.error("Resource not found");
    }

    if (error.response?.status >= 500) {
      toast.error("Server error, please try again later");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
export { API_URL };
