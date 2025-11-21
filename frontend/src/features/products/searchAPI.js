import axiosInstance, { API_URL } from "../../utils/axiosConfig.js";

export const searchProductsFetch = async (searchQuery, filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.append("search", searchQuery);
    }
    if (filters.category) {
      params.append("category", filters.category);
    }
    if (filters.minPrice) {
      params.append("minPrice", filters.minPrice);
    }
    if (filters.maxPrice) {
      params.append("maxPrice", filters.maxPrice);
    }

    const response = await axiosInstance.get(
      `${API_URL}/api/product/?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

