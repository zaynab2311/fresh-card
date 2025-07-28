import { useContext } from "react";
import { BrandsContext } from "../../context/BrandsContext";

export default function Brands() {
  const { brands, isLoading, isError } = useContext(BrandsContext);

  if (isLoading) return <div className="text-center p-5">Loading...</div>;
  if (isError) return <div className="text-center p-5 text-red-500">Failed to load brands.</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Brands</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands?.map((brand) => (
          <div key={brand._id} className="border rounded-lg p-3 bg-white shadow hover:shadow-lg transition-all duration-200">
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-[120px] object-contain mb-2"
            />
            <p className="text-center text-sm font-medium">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

