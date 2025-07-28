// components/Footer.jsx

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-5">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* About / Logo */}
        <div>
          <h2 className="text-xl font-bold text-green-600 mb-2">FreshCart</h2>
          <p className="text-sm">
            Your go-to place for smart and smooth shopping experience. Quality products, great prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-md font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-green-600">Home</Link></li>
            <li><Link to="/products" className="hover:text-green-600">Products</Link></li>
            <li><Link to="/cart" className="hover:text-green-600">Cart</Link></li>
            <li><Link  to={`/chechout`} className="hover:text-green-600">Checkout</Link></li>
          </ul>
        </div>

        {/* Contact / Info */}
        <div>
          <h3 className="text-md font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">Email: support@shopease.com</p>
          <p className="text-sm">Phone: +20 100 000 0000</p>
          <p className="text-sm">Address: Cairo, Egypt</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white  py-2 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
}
