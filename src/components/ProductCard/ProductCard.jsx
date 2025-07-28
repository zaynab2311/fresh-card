import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WishlistContext } from "../../context/WishlistContext";
import {
  faHeart,
  faEye,
  faRotateRight,
  faPlus,
  faStar as fullStar,
  faStarHalfAlt,
  faStar as emptyStar
} from "@fortawesome/free-solid-svg-icons";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";

// لحساب الخصم
export function calcDiscountPercentage(price, priceAfterDiscount) {
  if (!price || !priceAfterDiscount || price <= priceAfterDiscount) return 0;
  const discount = ((price - priceAfterDiscount) / price) * 100;
  return Math.round(discount);
}


export default function ProductCard({ productInfo }) {
  const {
    id,
    imageCover,
    priceAfterDiscount,
    price,
    ratingsQuantity,
    ratingsAverage,
    title,
    category,
  } = productInfo;

  const{handleAddingProductToCart}=useContext(CartContext);

  const discount = calcDiscountPercentage(price, priceAfterDiscount);
  const { addToWishlist, wishlist } = useContext(WishlistContext);

const isInWishlist = wishlist?.some(item => item._id === id);

  return (
    <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm w-full max-w-[250px]">
      {/* الخصم */}
      {discount > 0 && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded z-10">
          -{discount}%
        </span>
      )}

      {/* ايقونات */}
     <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
  <FontAwesomeIcon
    icon={faHeart}
    className={`cursor-pointer text-sm ${
      isInWishlist ? "text-red-600" : "text-gray-500 hover:text-red-600"
    }`}
    onClick={() => addToWishlist(id)}
    title={isInWishlist ? "In Wishlist" : "Add to Wishlist"}
  />
  <FontAwesomeIcon icon={faRotateRight} className="text-gray-500 hover:text-blue-600 cursor-pointer text-sm" />
  <Link to={`/product/${id}`}>
    <FontAwesomeIcon icon={faEye} className="text-gray-500 hover:text-green-600 cursor-pointer text-sm" />
  </Link>
</div>

     <div className="w-full aspect-[4/5] overflow-hidden rounded flex items-center justify-center bg-gray-100">
  <Link to={`/product/${id}`}>
  <img
    src={imageCover}
    alt=""
    className="w-full h-full object-cover"
  />
  </Link>
</div>


      {/* التفاصيل */}
      <div className="p-3">
        <p className="text-xs text-gray-500 mb-1">{category?.name || "No category"}</p>
<Link to={`/product/${id}`}>        
<h3 className="text-sm font-medium text-gray-800 leading-snug">{title}</h3>
</Link>
        {/* التقييم */}
        <div className="flex items-center text-yellow-400 text-sm mt-1 gap-1">
          <Rating rating={ratingsAverage}/>
          <span className="text-gray-600 text-xs ml-1">{ratingsAverage?.toFixed(1)}</span>
          <span className="text-gray-600 text-xs ml-1">({ratingsQuantity})</span>
        </div>

        {/* السعر وزر الإضافة */}
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-green-600 font-bold text-sm">
              {priceAfterDiscount || price} EGP
            </span>
            {priceAfterDiscount && priceAfterDiscount < price && (
              <span className="text-gray-400 text-xs line-through ml-2">{price} EGP</span>
            )}
          </div>
          <button onClick={()=>{handleAddingProductToCart({id})}} className="bg-green-600 hover:bg-green-700 text-white rounded-full p-1 text-xs">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
}
