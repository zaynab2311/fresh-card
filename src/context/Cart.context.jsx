import { createContext, useEffect, useState } from "react";
import { addProductToCart, getCartItems, removeItemFromCart, updateProductQuantity } from "../services/cart-service";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartInfo, setCartInfo] = useState(null);


  
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  async function handleAddingProductToCart({ id }) {
    try {
      setIsLoading(true);
      const response = await addProductToCart({ id });
        console.log(response);
      if (response.success) {
        setIsLoading(false);
        toast.success(response.data.message);
        setCartInfo(response.data);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error);
    }
  }
  async function handleFetchCartItems() {
    try{
      setIsLoading(true);
      const response=await getCartItems();
      if(response.success){
        setIsLoading(false);
        setCartInfo(response.data);
      }
    }
    catch(error){
      setIsLoading(false);
      setIsError(true);
      setError(error);
    }
    
  }



// ! Remove Item from Cart
async function handleRemoveFromCart({ id }) {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const toastId = toast.loading("We are deleting cart item...");

      const response = await removeItemFromCart({ id });

      if (response.success) {
        toast.dismiss(toastId);
        toast.success("Item removed from cart.");
        setCartInfo(response.data);
      }
    } 
    console.log(result)
  } catch (error) {
    console.error(error);
  }
}
// Update Product Quantity
async function handleUpdateQunatity({ id, count }) {
  try {
    const toastId = toast.loading("Updating Product Quantity");
    const response = await updateProductQuantity({ id, count });

    if (response.success) {
      toast.dismiss(toastId);
      setCartInfo(response.data);
    }
  } catch (error) {
    console.log(error);
  }
}




  useEffect(()=>{
    handleFetchCartItems()
  },[])
  

  return (
    <CartContext.Provider
      value={{
        cartInfo,
        isLoading,
        isError,
        error,
        handleAddingProductToCart,
        handleRemoveFromCart,
        handleUpdateQunatity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
