import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../services/category-service";
import Loading from "../Loading/Loading";
import { CategoriesContext } from "../../context/Categories.context";

export default function HomeCategories() {
   const{categories,isLoading,isError,console,error}=useContext(CategoriesContext);
  if(isLoading){
    return <Loading/>
  }

  return (
    <section>
      <div className="container">
        <div className="flex items-center justify-between mt-3">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Link
            to={`/categories`}
            className="flex items-center gap-4 text-green-600 hover:text-green-700 font-medium transition-colors duration-300 group"
          >
            <span className="text-sm">View All Categories</span>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-xs transform group-hover:translate-x-1 transition-transform duration-300 ml-2"
            />
          </Link>
        </div>

        <div className="grid py-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
       {categories.map((category) => (
  <Link
    key={category._id}
    to={`/category/${category._id}`}
    className="group card cursor-pointer p-4 rounded-xl bg-white border border-gray-200 hover:border-green-400 shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center justify-center text-center gap-3"
  >
    <div className="w-20 aspect-square rounded-full overflow-hidden m-auto mb-1">
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <h3 className="text-sm font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
      {category.name}
    </h3>
  </Link>
))}



        </div>
      </div>
    </section>
  );
}
