import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../../context/Products.context";
import { CategoriesContext } from "../../context/Categories.context";
import ProductCard from "../../components/ProductCard/ProductCard";

export default function CategoryDetails() {
  const { id } = useParams();

  const { products, isLoading } = useContext(ProductsContext);
  const { categories } = useContext(CategoriesContext);

  if (isLoading || !products || !categories) return <div>Loading...</div>;

  // هات الكاتيجوري من الـ id
  const category = categories.find(cat => cat._id === id);
  const categoryName = category?.name;

  // فلترة المنتجات اللي عندها نفس الكاتيجوري
  const filteredProducts = products.filter(
    product => product.category.name === categoryName
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Products in "{categoryName}" Category
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} productInfo={product} />
          ))}
        </div>
      )}
    </div>
  );
}
