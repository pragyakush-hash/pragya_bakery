import axiosInstance, { API_URL } from "../../utils/axiosConfig.js";

export const getSellerOrdersFetch = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/api/order/`);
    return response.data.orders;
  } catch (error) {
    throw error.response;
  }
};

