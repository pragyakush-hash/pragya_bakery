import axiosInstance, { API_URL } from "../../utils/axiosConfig.js";

export const addToCartFetch = async ({ productId, quantity }) => {
  try {
    // Token will be added automatically by axios interceptor
    const response = await axiosInstance.post(
      `${API_URL}/api/cart/add`,
      {
        productId,
        quantity,
      }
    );
    console.log(response.data.cart.items, "response addTo cartFETCH");
    return response.data.cart.items;
  } catch (error) {
    throw error.response;
  }
};
export const viewCartItemsFetch = async () => {
  try {
    // Token will be added automatically by axios interceptor
    const response = await axiosInstance.get(`${API_URL}/api/cart/`);

    return response.data.cart.items;
  } catch (error) {
    throw error.response;
  }
};

export const deleteCartItemFetch = async (cartItemId) => {
  // Token will be added automatically by axios interceptor
  const response = await axiosInstance.delete(`${API_URL}/api/cart/${cartItemId}`);

  return response.data.cart;   
};


