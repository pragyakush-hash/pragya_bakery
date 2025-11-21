import axios from "axios";
import axiosInstance, { API_URL } from "../../utils/axiosConfig.js";

export const signupUser = async (formData) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/user/register`, formData);
    console.log(response, "register response");
    return response;
  } catch (error) {
    throw error.response;
  }
};
export const emailVerificationFetch = async (emailVerify) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/api/sendotp/`, {
      email: emailVerify,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};
export const loginUserFetch = async (loginData) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/user/login`, loginData);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const refreshTokenFetch = async () => {
  try {
    // Use direct axios call to avoid interceptor loop
    const response = await axios.post(
      `${API_URL}/user/refresh-token`,
      {},
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const logoutFetch = async () => {
  try {
    const response = await axiosInstance.post(`${API_URL}/user/logout`);
    return response;
  } catch (error) {
    throw error.response;
  }
};


