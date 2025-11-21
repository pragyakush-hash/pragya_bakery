import axiosInstance, { API_URL } from "../../utils/axiosConfig.js";

// Get seller's own products
export const getSellerProductsFetch = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/api/product/seller/my-products`);
    return response.data.products;
  } catch (error) {
    throw error.response;
  }
};

// Create product
export const createProductFetch = async (formData) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/api/product/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

// Update product
export const updateProductFetch = async (productId, formData) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/api/product/${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

// Delete product
export const deleteProductFetch = async (productId) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/api/product/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

