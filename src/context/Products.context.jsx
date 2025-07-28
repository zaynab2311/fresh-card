import { createContext, useEffect, useState } from "react";
import { getAllProducts } from "../services/products-service";

export const ProductsContext = createContext(null);

export default function ProductsProvider({children}) {


  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const[error,setError]=useState(null);
  async function fetchProducts() {
    try {
      setIsLoading(true);
      const response = await getAllProducts();
      if (response.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsError(true);
      setError(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

return <ProductsContext.Provider value={{isLoading,products,isError,error}}>
{children}
</ProductsContext.Provider>             

}