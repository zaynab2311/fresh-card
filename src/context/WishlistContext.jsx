// src/context/WishlistContext.jsx
import { createContext, useEffect, useState } from "react";
import {
  getUserWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
} from "../services/wishlistService";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchWishlist() {
    try {
      const response = await getUserWishlist();
      if (response?.data?.status === "success") {
        setWishlist(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddToWishlist(productId) {
    try {
      await addProductToWishlist(productId);
      fetchWishlist();
    } catch (error) {
      console.error("Add to wishlist failed", error);
    }
  }

  async function handleRemoveFromWishlist(productId) {
    try {
      await removeProductFromWishlist(productId);
      setWishlist((prev) =>
        prev.filter((item) => item._id !== productId)
      );
    } catch (error) {
      console.error("Remove from wishlist failed", error);
    }
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist: handleAddToWishlist,
        removeFromWishlist: handleRemoveFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
