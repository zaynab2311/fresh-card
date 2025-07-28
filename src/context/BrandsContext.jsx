import { createContext, useEffect, useState } from "react";
import { getAllBrands } from "../services/brand-service";

export const BrandsContext = createContext(null);

export default function BrandsProvider({ children }) {
  const [brands, setBrands] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  async function fetchBrands() {
    try {
      setIsLoading(true);
      const response = await getAllBrands();
      if (response.success) {
        setBrands(response.data.data);
      }
    } catch (error) {
      setIsError(true);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <BrandsContext.Provider value={{ brands, isLoading, isError, error }}>
      {children}
    </BrandsContext.Provider>
  );
}
