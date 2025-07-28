import { FaTruck, FaLock } from "react-icons/fa";
import CartItem from "../../components/CartItem/CartItem";
import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartInfo, isLoading } = useContext(CartContext);

  if (isLoading) {
    return <Loading />;
  }

  const { numOfCartItems, data } = cartInfo;
  const { products, totalCartPrice } = data;

  return (
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6 md:px-12 xl:px-40 bg-gray-50 min-h-screen">
      {/* Left: Cart Items */}
      <div className="lg:col-span-2 space-y-4">
  <div className="mb-4">
    <h2 className="text-2xl font-bold">Shopping Cart</h2>
    <p className="text-gray-600">{numOfCartItems} items in your cart</p>
  </div>

  {products && products.length > 0 ? (
    products.map((product) => (
      <CartItem key={product.id} productInfo={product} />
    ))
  ) : (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <p className="text-gray-600 text-lg mb-4">🛒 Your cart is empty</p>
      <button
        onClick={() => window.location.href = "/"}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Back to Home
      </button>
    </div>
  )}
</div>


      {/* Right: Summary */}
      <div className="space-y-4">
  <div className="bg-white p-4 rounded-xl shadow">
    <h4 className="font-bold mb-4">Order Summary</h4>
    <div className="flex justify-between text-sm mb-2">
      <span>Subtotal ({numOfCartItems} items)</span>
      <span>{Math.trunc(totalCartPrice)} EGP</span>
    </div>
    <div className="flex justify-between text-sm mb-2">
      <span>Shipping</span>
      <span className="text-green-600">Free</span>
    </div>
    {/* <div className="flex justify-between text-sm mb-2">
      <span>Discount (FRESH20)</span>
      <span className="text-green-600">- $3.25</span>
    </div> */}
    <div className="flex justify-between text-sm mb-2">
      <span>Tax</span>
      <span>{Math.trunc(totalCartPrice * 0.14)} EGP</span>
    </div>
    <hr className="my-2 text-gray-200" />
    <div className="flex justify-between font-bold">
      <span>Total</span>
      <span>
        {Math.trunc(totalCartPrice + totalCartPrice * 0.14)} EGP
      </span>
    </div>
    <button className="w-full mt-4 bg-green-600 text-white py-2 rounded">
      <Link to={`/checkout`}>Proceed to Checkout</Link>
    </button>
    <button className="w-full mt-2 border border-gray-200 py-2 rounded">
      <Link to={`/`}>Continue Shopping</Link>
    </button>
  </div>

  <div className="bg-white p-4 rounded-xl shadow text-sm flex items-start gap-2">
    <FaTruck className="text-green-600 mt-1" />
    <div>
      <p className="font-semibold">Free Delivery</p>
      <p>Your order qualifies for free delivery. Estimated delivery: 2–3 business days</p>
    </div>
  </div>

  <div className="bg-white p-4 rounded-xl shadow text-sm flex items-start gap-2">
    <FaLock className="text-green-600 mt-1" />
    <div>
      <p className="font-semibold">Secure Checkout</p>
      <p>Your payment information is protected with 256-bit SSL encryption</p>
    </div>
  </div>
</div>

    </div>
  );
}
