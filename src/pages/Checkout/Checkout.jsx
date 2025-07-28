import { useFormik } from "formik";
import { useContext } from "react";
import * as yup from "yup";
import { CartContext } from "../../context/Cart.context";
import Loading from "../../components/Loading/Loading";
import { createOrder } from "../../services/payment-service";
import { toast } from "react-toastify";
import {useNavigate} from "react-router"
import { Link } from "react-router-dom";

export default function Checkout() {
const { cartInfo, isLoading } = useContext(CartContext);
// const navigate=useNavigate();

  if (isLoading) {
    return <Loading />;
  }

const { cartId, numOfCartItems, data } = cartInfo;
const { totalCartPrice, products } = data;


  const validationSchema = yup.object({
    paymentMethod: yup.string().required("Payment method is required"),
    shippingAddress: yup.object({
      details: yup.string().required("Address is required"),
      phone: yup
        .string()
        .required("Phone is required")
        .matches(/^(\+2)?01[0125][0-9]{8}$/, "Phone number is invalid"),
      city: yup.string().required("City is required"),
    }),
  });

  async function handleCreatingOrder(values) {
try {
  const response = await createOrder({
    cartId,
    shippingAddress: values.shippingAddress,
    paymentMethod: values.paymentMethod,
  });

  if(response.success){
    toast.success("order created")
    // setTimeout(()=>{
    // navigate("/orders")
    // },3000)
  }

  console.log(response);
} catch (error) {
  console.log(error);
}
  }

  const formik = useFormik({
    initialValues: {
      paymentMethod: "online",
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    validationSchema,
    onSubmit: handleCreatingOrder,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {/* Left Section - Payment + Address */}
      <div className="md:col-span-2 space-y-6">
        {/* Payment Method */}
        {/* <div className="bg-white p-6 rounded-lg shadow">
  <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
  <div className="space-y-4">
    <label
      className={`block border p-4 rounded-lg cursor-pointer transition-all duration-300 ${
        formik.values.paymentMethod === "cash"
          ? "border-green-500 bg-green-50"
          : "hover:border-green-500"
      }`}
    >
      <div className="flex items-start gap-4">
        <input
          type="radio"
          name="paymentMethod"
          value="cash"
          checked={formik.values.paymentMethod === "cash"}
          onChange={formik.handleChange}
          className="mt-1"
        />
        <div>
          <h3 className="font-medium">Cash on Delivery</h3>
          <p className="text-sm text-gray-500">Pay when your order arrives</p>
          {formik.values.paymentMethod === "cash" && (
            <p className="text-sm mt-2 text-green-600 bg-green-100 px-3 py-1 rounded w-fit">
              Please keep exact change ready for hassle-free delivery
            </p>
          )}
        </div>
      </div>
    </label>

    <label
      className={`block border p-4 rounded-lg cursor-pointer transition-all duration-300 ${
        formik.values.paymentMethod === "online"
          ? "border-green-500 bg-green-50"
          : "hover:border-green-500"
      }`}
    >
      <div className="flex items-start gap-4">
        <input
          type="radio"
          name="paymentMethod"
          value="online"
          checked={formik.values.paymentMethod === "online"}
          onChange={formik.handleChange}
          className="mt-1"
        />
        <div>
          <h3 className="font-medium flex items-center gap-2">
            Online Payment{" "}
            <span className="text-green-600 text-sm">Recommended</span>
          </h3>
          <p className="text-sm text-gray-500">
            Pay securely with card or digital wallet
          </p>
          {formik.values.paymentMethod === "online" && (
            <p className="text-sm mt-2 text-blue-600 bg-blue-100 px-3 py-1 rounded w-fit">
              You will be redirected to secure payment gateway
            </p>
          )}
        </div>
      </div>
    </label>

    {formik.touched.paymentMethod && formik.errors.paymentMethod && (
      <p className="text-red-500 text-sm mt-2">
        {formik.errors.paymentMethod}
      </p>
    )}
  </div>
</div> */}
        {/* Billing Address */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Billing Address</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="shippingAddress.details"
              placeholder="Full Address"
              value={formik.values.shippingAddress.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border px-3 py-2 rounded col-span-2"
            />
            {formik.touched.shippingAddress?.details && formik.errors.shippingAddress?.details && (
              <p className="text-red-500 text-sm col-span-2">{formik.errors.shippingAddress.details}</p>
            )}

            <input
              type="text"
              name="shippingAddress.city"
              placeholder="City"
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border px-3 py-2 rounded"
            />
            {formik.touched.shippingAddress?.city && formik.errors.shippingAddress?.city && (
              <p className="text-red-500 text-sm">{formik.errors.shippingAddress.city}</p>
            )}

            <input
              type="text"
              name="shippingAddress.phone"
              placeholder="Phone"
              value={formik.values.shippingAddress.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border px-3 py-2 rounded"
            />
            {formik.touched.shippingAddress?.phone && formik.errors.shippingAddress?.phone && (
              <p className="text-red-500 text-sm">{formik.errors.shippingAddress.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Right Section - Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
  <h2 className="text-lg font-semibold">Order Summary</h2>

  {/* Products List */}
 <div className="space-y-2 text-sm max-h-64 overflow-y-auto pr-1">
  {products?.map((product) => (
    <div key={product._id} className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        <img
          src={product.product.imageCover}
          alt={product.product.title}
          className="w-10 h-10 object-cover rounded"
        />
        <span className="max-w-[140px] truncate">{product.product.title}</span>
      </div>
      <span>{Math.trunc(product.price.toFixed(2))} EGP</span>
    </div>
  ))}
</div>

  <hr />

  {/* Summary Values */}
  <div className="text-sm space-y-1">
    <div className="flex justify-between">
      <span>Subtotal</span>
      <span>{Math.trunc(totalCartPrice?.toFixed(2))} EGP</span>
    </div>
    
    <div className="flex justify-between">
      <span>Delivery</span>
      <span>free</span>
    </div>
    <div className="flex justify-between">
      <span>Tax</span>
      <span>{Math.trunc((totalCartPrice * 0.14).toFixed(2))} EGP</span> {/* Example: 8% tax */}
    </div>
  </div>

  <hr />

  {/* Total */}
  <div className="flex justify-between font-semibold text-base">
    <span>Total</span>
    <span>
      
      {Math.trunc((
        totalCartPrice +
        totalCartPrice * 0.14
      ).toFixed(2)) }
          EGP
    </span>
  </div>

  {/* Buttons */}
  <button
    type="submit"
    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
  >
    Proceed to Payment →
  </button>

  <button
    type="button"
    className="w-full border py-2 rounded text-sm hover:bg-gray-100"
  >
   <Link to={`/cart`}>
    ← Return to Cart
   </Link>
  </button>

  {/* Security Info */}
  <div className="text-center mt-4 text-xs text-gray-500">
    <p className="mb-1">Secure Checkout</p>
    <p>Your payment information is secure</p>
    <div className="flex justify-center gap-2 mt-2">
      <img src="https://img.icons8.com/color/48/visa.png" className="w-6" />
      <img src="https://img.icons8.com/color/48/mastercard-logo.png" className="w-6" />
      <img src="https://img.icons8.com/color/48/paypal.png" className="w-6" />
      <img src="https://img.icons8.com/color/48/apple-pay.png" className="w-6" />
    </div>
  </div>
</div>

    </form>
  );
}
