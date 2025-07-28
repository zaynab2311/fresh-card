import { useState, useEffect, useContext } from "react";
import { getAllProducts } from "../../services/products-service";
import Loading from "../Loading/Loading";
import ProductCard from "../ProductCard/ProductCard";
import { ProductsContext } from "../../context/Products.context";

export default function FeaturedProducts() {
  const{products,isLoading,isError,console,error}=useContext(ProductsContext);
  if(isLoading){
    return <Loading/>
  }

  return (
    <>
     <section>
  <div className="container">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Products</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} productInfo={product} />
      ))}
    </div>
  </div>
</section>

    </>
  );
}
