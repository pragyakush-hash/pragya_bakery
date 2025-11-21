import axiosInstance, { API_URL } from "../../utils/axiosConfig.js";

export const placedOrderFetch = async (orderData) => {
  try {
    // Token will be added automatically by axios interceptor
    const response = await axiosInstance.post(`${API_URL}/api/order/`, orderData);
    console.log(response.data.orders, "response placed order");
    return response.data.orders;
  } catch (error) {
    throw error.response;
  }
};

export const cancleOrderFetch = async () => {
  try {
  } catch (error) {}
};

export const getallOrderByUserFetch = async ()=>{
 try {
    // Token will be added automatically by axios interceptor
    const response = await axiosInstance.get(`${API_URL}/api/order/getAllByUser`);
    console.log(response.data.orders, "response addTo getAkkOrderByUserFetch");
    return response.data.orders;
  } catch (error) {
    throw error.response;
  }
}
