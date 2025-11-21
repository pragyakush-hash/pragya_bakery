import axiosInstance, { API_URL } from "../../utils/axiosConfig.js";

export const getAdminStatsFetch = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/api/analytics/admin/stats`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getAllUsersFetch = async (role = null) => {
  try {
    const url = role
      ? `${API_URL}/user/all?role=${role}`
      : `${API_URL}/user/all`;
    const response = await axiosInstance.get(url);
    return response.data.users;
  } catch (error) {
    throw error.response;
  }
};

export const deleteUserFetch = async (userId) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const updateUserFetch = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/user/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getAllProductsFetch = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/api/product/`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const deleteProductFetch = async (productId) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/api/product/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getAllOrdersFetch = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/api/order/`);
    return response.data.orders;
  } catch (error) {
    throw error.response;
  }
};

export const updateOrderStatusFetch = async (orderId, status) => {
  try {
    const response = await axiosInstance.patch(`${API_URL}/api/order/${orderId}`, { status });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

