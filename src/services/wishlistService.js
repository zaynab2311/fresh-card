import { apiClient } from "./api-client";

export async function getUserWishlist() {
  try {
    const options = {
      url: `/wishlist`,
      method: "GET",
    };
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function addProductToWishlist(productId) {
  try {
    const options = {
      url: `/wishlist`,
      method: "POST",
      data: { productId },
    };
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function removeProductFromWishlist(productId) {
  try {
    const options = {
      url: `/wishlist/${productId}`,
      method: "DELETE",
    };
    const response = await apiClient.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
