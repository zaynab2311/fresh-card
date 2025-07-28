import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faTruckFast,
  faRotateLeft,
  faHeart,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import Rating from "../../components/Rating/Rating";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../services/products-service";
import Loading from "../../components/Loading/Loading";
import { calcDiscountPercentage } from "../../components/ProductCard/ProductCard";
import { CartContext } from "../../context/Cart.context";

export default function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function fetchProductDetails() {
    try {
      setIsLoading(true);
      const response = await getProductById({ id });
      if (response.success) {
        const data = response.data.data;
        setProductDetails(data);
        setMainImage(data.imageCover);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log("Error fetching product:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (isLoading) return <Loading />;
  if (isError || !productDetails) return <div>Error loading product.</div>;

  const {
    title,
    description,
    price,
    priceAfterDiscount,
    ratingsAverage,
    ratingsQuantity,
    quantity: stock,
    images = [],
    brand,
    category,
  } = productDetails;
    const{handleAddingProductToCart}=useContext(CartContext);

  return (
    <section className="p-4 md:p-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto">
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
  {/* صور المنتج */}
  <div className="w-full space-y-4">
    {/* الصورة الرئيسية */}
    <div className="aspect-[4/3] rounded-md border border-gray-200 overflow-hidden">
      <img
        src={mainImage}
        alt="main"
        className="w-full h-full object-contain"
      />
    </div>

    {/* الصور المصغرة */}
    <div className="flex gap-3 overflow-x-auto">
      {[productDetails.imageCover, ...images].map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`thumb-${index}`}
          onClick={() => setMainImage(img)}
          className={`w-20 h-20 object-contain border-2 p-1 cursor-pointer rounded-md transition-all duration-300 ${
            mainImage === img ? "border-blue-500" : "border-gray-300"
          }`}
        />
      ))}
    </div>
  </div>



        {/* تفاصيل المنتج */}
  <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center justify-between">
            <span
              className={`text-sm font-medium px-2 py-1 rounded-md ${
                stock > 0
                  ? "text-green-700 bg-green-100"
                  : "text-red-700 bg-red-100"
              }`}
            >
              {stock > 0 ? "In Stock" : "Out of Stock"}
            </span>

            <Link to={`/WishList`}>
            <FontAwesomeIcon
              icon={faHeart}
              className="text-gray-500 cursor-pointer hover:text-red-600"
            />
            </Link>
          </div>

          <h2 className="text-xl font-semibold leading-relaxed">{title}</h2>

          <div className="flex items-center gap-2 text-yellow-500">
            <Rating rating={ratingsAverage} />
            <span className="text-gray-800 text-sm font-semibold">
              {ratingsAverage} ({ratingsQuantity})
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {priceAfterDiscount && priceAfterDiscount < price ? (
              <>
                <span className="text-sm text-gray-500 line-through">
                  {price} EGP
                </span>

                <span className="text-lg font-semibold text-green-600">
                  {priceAfterDiscount} EGP
                </span>

                <span className="bg-red-100 text-red-700 text-sm px-2 py-1 rounded">
                  Save {calcDiscountPercentage(price, priceAfterDiscount)}%
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold text-green-600">
                {price} EGP
              </span>
            )}
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">{description}</p>

          <div className="text-sm text-gray-500 flex flex-col gap-1">
            <span>
              <strong>Brand:</strong> {brand?.name}
            </span>
            <span>
              <strong>Category:</strong> {category?.name}
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm">Quantity:</span>
            <button
              className="border px-3 py-1 rounded"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span className="w-6 text-center">{quantity}</span>
            <button
              className="border px-3 py-1 rounded"
              onClick={() => setQuantity((q) => q + 1)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <span className="text-sm text-gray-500">
              Only {stock} items left in stock
            </span>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button  onClick={()=>{handleAddingProductToCart({id})}} className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition">
                <span>  <FontAwesomeIcon icon={faCartShopping}  /></span>
              Add to Cart
            </button>
            <button className="border px-5 py-2 rounded-md hover:bg-gray-100 transition">
              Buy Now
            </button>
          </div>

          <div className="flex gap-6 mt-4 text-sm flex-wrap">
            <div className="flex items-center gap-2 text-green-600">
              <FontAwesomeIcon icon={faTruckFast} />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <FontAwesomeIcon icon={faRotateLeft} />
              <span>30 Days Return</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
