import { RouterProvider, createBrowserRouter } from "react-router-dom"; // ✅ ده الصح
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Brands from "./pages/Brands/Brands";
import Cart from "./pages/Cart/Cart";
import Categories from "./pages/Categories/Categories";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import Orders from "./pages/Orders/Orders";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import SearchProducts from "./pages/SearchProducts/SearchProducts";
import WishList from "./pages/Wishlist/Wishlist";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import Favourites from "./pages/Favourites/Favourites";
import NotFound from "./pages/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import ProductsProvider from "./context/Products.context";
import CategoriesProvider from "./context/Categories.context";
import AuthProvider from "./context/Auth.context";
import Checkout from "./pages/Checkout/Checkout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CartProvider from "./context/Cart.context";
import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
import BrandsProvider from "./context/BrandsContext";
import WishlistProvider from "./context/WishlistContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "brands", element: <Brands /> },
        { path: "cart", element: <ProtectedRoute>
          <Cart />
        </ProtectedRoute> },
        { path: "categories", element: <Categories /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "orders", element:<ProtectedRoute>
           <Orders /> 
        </ProtectedRoute>},
        { path: "product/:id", element: <ProductDetails/> },
        { path: "searchproducts", element: <SearchProducts /> },
        { path: "wishlist", element: <ProtectedRoute>
          <WishList />
        </ProtectedRoute> },
        {path:"verify-email" , element:<VerifyEmail/>},
        {path:"favourites" , element:<ProtectedRoute>
          <Favourites/>
        </ProtectedRoute>},
        {path:"*" , element:<NotFound/>},
        {path:"checkout",element:<ProtectedRoute>
          <Checkout/>
        </ProtectedRoute>},
        { path: "category/:id", element: <CategoryDetails /> },
      ],
    },
  ]);

  return (
    <>
    <AuthProvider>
     <WishlistProvider>
      <BrandsProvider>
      <CartProvider>
         <ProductsProvider>
       <CategoriesProvider>
        <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000}
      closeButton={false} closeOnClick={true}/>
       </CategoriesProvider>
     </ProductsProvider>
      </CartProvider>
     </BrandsProvider>
     </WishlistProvider>
    </AuthProvider>


    </>
  );
}

export default App;
