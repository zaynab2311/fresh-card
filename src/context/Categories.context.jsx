import { createContext, useEffect, useState } from "react";
import { getAllCategories } from "../services/category-service";

export const CategoriesContext = createContext(null);

export default function CategoriesProvider({children}) {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  async function fetchCategories() {
    try {
      setIsLoading(true);
      const response = await getAllCategories();

      if (response.success) {
        setIsLoading(false);
        setCategories(response.data.data);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return <CategoriesContext.Provider value={{categories,isLoading,isError,error}}>
    {children}
  </CategoriesContext.Provider>;
}
