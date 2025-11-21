import axios from "axios";
const API_URL = "https://pragyabakery-production.up.railway.app";

export const ProductDataFetch = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/product/`);
    console.log(response,"response of productlist")
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
export const ProductDataFetchById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/product/${id}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
