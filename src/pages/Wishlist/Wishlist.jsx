import { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import { CartContext } from "../../context/Cart.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCartPlus } from "@fortawesome/free-solid-svg-icons";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, loading } = useContext(WishlistContext);
  const{handleAddingProductToCart}=useContext(CartContext);

  if (loading) {
    return <p>Loading wishlist...</p>;
  }

  return (
    <div className="container my-5">
      <h2 className="font-bold text-xl mb-4">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        wishlist.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between border-b py-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-600">
                  {product.priceAfterDiscount || product.price} EGP
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button
  className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1"
  onClick={() => removeFromWishlist(product._id)}
>
  <FontAwesomeIcon icon={faTrash} />
  Remove
</button>

<button
  className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1"
  onClick={() => handleAddingProductToCart({ id: product._id })}
>
  <FontAwesomeIcon icon={faCartPlus} />
    Add To Cart
</button>

            </div>
          </div>
        ))
      )}
    </div>
  );
}
