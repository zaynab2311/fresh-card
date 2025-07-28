import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  faEnvelope,
  faPhone,
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faHeart,
  faRightFromBracket,
  faAddressCard,
  faUserPlus,
  faChevronDown,
  faBars,
  faBolt,
  faSuitcaseMedical,
  faBabyCarriage,
  faPersonDress,
  faPerson,
  faEllipsis,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../assets/imgs/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth.context";
import { CartContext } from "../../context/Cart.context";

export default function Navbar() {
  const { logOut, token } = useContext(AuthContext);
  const { cartInfo, isLoading } = useContext(CartContext);
  return (
    <header className="text-sm">
      {/* Top Navbar */}
      <div className="bg-gray-100 py-2 text-gray-600">
        <div className="container mx-auto flex flex-wrap justify-between items-center px-4 text-xs md:text-sm">
          <ul className="flex flex-wrap gap-4 md:space-x-6">
            <li className="flex items-center gap-1">
              <FontAwesomeIcon icon={faPhone} />
              <a href="tel:+1 (800) 123-4567">+1 (800) 123-4567</a>
            </li>
            <li className="flex items-center gap-1">
              <FontAwesomeIcon icon={faEnvelope} />
              <a href="mailto:support@freshcart.com">support@freshcart.com</a>
            </li>
          </ul>
          <ul className="flex flex-wrap gap-2 md:space-x-4 items-center mt-2 md:mt-0">
            <li>
              <NavLink to={`/track-order`}>Track Order</NavLink>
            </li>
            <li>
              <NavLink to={`/about`}>About</NavLink>
            </li>
            <li>
              <NavLink to={`/contact`}>Contact</NavLink>
            </li>
            <li>
              <select className="bg-transparent">
                <option>EGP</option>
                <option>SAR</option>
                <option>AED</option>
              </select>
            </li>
            <li>
              <select className="bg-transparent">
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="py-4 border-b border-gray-200">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
          <NavLink to={`/`} className="shrink-0">
            <img src={Logo} alt="Fresh Cart Logo" className="h-10" />
          </NavLink>
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              className="form-control w-full md:min-w-96 border rounded py-1 px-3"
              placeholder="Search for products"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
          <ul className="flex space-x-4 items-center text-gray-700 text-xs md:text-sm">
            <li>
              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive
                      ? "text-green-600"
                      : "text-black hover:text-green-600"
                  }`
                }
              >
                <div className="flex flex-col items-center gap-1">
                  <FontAwesomeIcon icon={faHeart} />
                  <span>Wishlist</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive
                      ? "text-green-600"
                      : "text-black hover:text-green-600"
                  }`
                }
              >
                <div className="flex flex-col items-center gap-1 relative">
                  <div className="relative">
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span className="absolute -top-3 -right-3 bg-green-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center text-center font-bold">
                      {isLoading ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                      ) : (
                        cartInfo?.numOfCartItems || 0
                      )}
                    </span>
                  </div>
                  <span>Cart</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive
                      ? "text-green-600"
                      : "text-black hover:text-green-600"
                  }`
                }
              >
                <div className="flex flex-col items-center gap-1">
                  <FontAwesomeIcon icon={faUser} />
                  <span>Account</span>
                </div>
              </NavLink>
            </li>
            {!token ? (
              <>
                <li>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      `transition-colors ${
                        isActive
                          ? "text-green-600"
                          : "text-black hover:text-green-600"
                      }`
                    }
                  >
                    <div className="flex flex-col items-center gap-1">
                      <FontAwesomeIcon icon={faUserPlus} />
                      <span>Signup</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `transition-colors ${
                        isActive
                          ? "text-green-600"
                          : "text-black hover:text-green-600"
                      }`
                    }
                  >
                    <div className="flex flex-col items-center gap-1">
                      <FontAwesomeIcon icon={faAddressCard} />
                      <span>Login</span>
                    </div>
                  </NavLink>
                </li>
              </>
            ) : (
              <li
                className="text-black hover:text-green-600 cursor-pointer transition-colors"
                onClick={logOut}
              >
                <div className="flex flex-col items-center gap-1">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <span>Logout</span>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Category Navigation */}
      <div className="bg-gray-50 py-2 relative z-20">
        <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center px-4 gap-4">
          <div className="relative group">
            <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-600/90 text-white px-4 py-2 rounded">
              <FontAwesomeIcon icon={faBars} />
              <span>All Categories</span>
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <menu className="absolute hidden group-hover:block left-0 top-full w-56 bg-white shadow-lg rounded divide-y divide-gray-200 z-50">
              <li>
                <Link
                  to="/mens-fashion"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faPerson} className="text-green-600" />
                  <span>Men's Fashion</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/womens-fashion"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                >
                  <FontAwesomeIcon
                    icon={faPersonDress}
                    className="text-green-600"
                  />
                  <span>Women's Fashion</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/baby-toys"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                >
                  <FontAwesomeIcon
                    icon={faBabyCarriage}
                    className="text-green-600"
                  />
                  <span>Baby & Toys</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/beauty-health"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                >
                  <FontAwesomeIcon
                    icon={faSuitcaseMedical}
                    className="text-green-600"
                  />
                  <span>Beauty & Health</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/electronics"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faBolt} className="text-green-600" />
                  <span>Electronics</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                >
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    className="text-green-600"
                  />
                  <span>View All Categories</span>
                </Link>
              </li>
            </menu>
          </div>
          <ul className="flex flex-wrap gap-4 md:space-x-6 text-gray-700 text-xs md:text-sm">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/categories">Categories</NavLink>
            </li>
           
            <li>
              <NavLink to="/brands">Brands</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
