import { FaTrashAlt } from "react-icons/fa";
import Rating from "../Rating/Rating";
import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";

export default function CartItem({ productInfo }) {
  const { count, price, product } = productInfo;
  const { handleRemoveFromCart, handleUpdateQunatity } =
    useContext(CartContext);
  // console.log(product);
  return (
    <div className="bg-white p-4 rounded-xl shadow grid grid-cols-5 items-center gap-4">
      <img
        src={product.imageCover}
        alt="Product"
        className="w-24 h-24 object-cover rounded-lg col-span-1"
      />
      <div className="col-span-3">
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-500">{product.category.name}</p>

        {/* التقييم */}
        <div className="flex items-center mt-2">
          <div className="flex text-amber-400 text-sm">
            <Rating rating={product.ratingsAverage} />
          </div>
          <span className="text-xs text-gray-500 ml-2">
            {product.ratingsAverage}
          </span>
        </div>
      </div>
      <div className="text-right col-span-1">
        <div className="flex items-center justify-end space-x-2 mb-1">
          <button
            className="px-2 border rounded"
           onClick={() => {
      if (count - 1 < 1) {
        handleRemoveFromCart({ id: product.id });
      } else {
        handleUpdateQunatity({ id: product.id, count: count - 1 });
      }
    }}
          >
            -
          </button>
          <span>{count}</span>
          <button
            className="px-2  border rounded"
            onClick={() => {
              handleUpdateQunatity({  id: product.id, count: count + 1 });
            }}
          >
            +
          </button>
        </div>

        <p className="font-bold">{price*count} EGP</p>

        <button
          onClick={() => {
            handleRemoveFromCart({ id: product.id });
          }}
          className="text-red-500 mt-2 text-sm"
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
}
