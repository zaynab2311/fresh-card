import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { useContext, useEffect, useState } from "react";
import { getAllProducts } from "../../services/products-service";
import Loading from "../Loading/Loading";
import { calcTimeLeft } from "../../utils/countdown";
import { ProductsContext } from "../../context/Products.context";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HomeDeals() {
  const { products, isLoading, isError, console, error } =
    useContext(ProductsContext);

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // console.log(calcTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calcTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);
    return function () {
      clearInterval(timer);
    };
  }, []);

  if (isLoading) return <Loading />;

  const deals = products
    ?.filter((product) => product.priceAfterDiscount)
    .slice(0, 5);

  return (
    <>
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Deals of the Day
          </h2>

          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* المؤقت */}
            <div className="flex items-center gap-2">
              <p className="text-xl text-gray-600">Offer ends in:</p>
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-gray-900 text-white text-xs flex items-center justify-center rounded">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <span className="text-lg text-gray-700">:</span>
                <div className="w-6 h-6 bg-gray-900 text-white text-xs flex items-center justify-center rounded">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <span className="text-lg text-gray-700">:</span>
                <div className="w-6 h-6 bg-gray-900 text-white text-xs flex items-center justify-center rounded">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
              </div>
            </div>

            {/* زر عرض كل العروض */}
            <Link
              to={`/deals`}
              className="flex items-center gap-4 text-green-600 hover:text-green-700 font-medium transition-colors duration-300 group"
            >
              <span className="text-sm">View All deals</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-xs transform group-hover:translate-x-1 transition-transform duration-300 ml-2"
              />
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {deals.map((product) => (
            <ProductCard
              key={product._id || product.id}
              productInfo={product}
            />
          ))}
        </div>
      </div>
    </>
  );
}
