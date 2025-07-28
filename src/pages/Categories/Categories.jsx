import { useContext } from "react";
import { CategoriesContext } from "../../context/Categories.context";
import Loading from "../../components/Loading/Loading"; // لو عندك كمبوننت لودينج
import { Link } from "react-router-dom";

export default function Categories() {
  const { categories, isLoading, isError, error } = useContext(CategoriesContext);

  if (isLoading) return <Loading />;

  if (isError) return (
    <div className="text-center text-red-600 font-semibold mt-10">
      Failed to load categories: {error?.message || "Unexpected error"}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Browse Categories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories?.map((category) => (
<Link to={`/category/${category._id}`} key={category._id}>
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-36 object-cover"
              />
              <div className="p-3 text-center">
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

