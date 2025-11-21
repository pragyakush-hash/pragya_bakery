import axiosInstance, { API_URL } from "../../utils/axiosConfig.js";

export const getSellerStatsFetch = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/api/analytics/seller/stats`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getSellerTotalProductsFetch = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/api/analytics/seller/total-products`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getSellerTotalOrdersFetch = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/api/analytics/seller/total-orders`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getSellerRevenueFetch = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/api/analytics/seller/total-revenue`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

