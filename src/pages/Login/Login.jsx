import loginImg from "../../assets/imgs/login-img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useState } from 'react';
import { API_CONFIG} from "../../config";
import { sendDataToLogIn } from "../../services/auth-service";
import { AuthContext } from "../../context/Auth.context";

export default function Login() {

  const location=useLocation();
  const from= location ?.state ?.from || "/"
  
  const{setToken}=useContext(AuthContext)


const navigate= useNavigate();
const[isinCorrect, setisinCorrect]=useState()



  const passwordRegex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/


const validationSchema=yup.object({

email: yup.string().required("email is required").email("Email is invalid"),
password: yup.string().required("password is required").matches(passwordRegex, "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character")

});


async function handleLogin(values){
try {
  const response=await sendDataToLogIn(values)
if(response.success){
  toast.success("welcom back");
  setToken(response.data.token)  
  if(values.rememberMe){
      localStorage.setItem("token",response.data.token)
  }   
  else{
      sessionStorage.setItem("token",response.data.token)
  }
  setTimeout(()=>{
  navigate(from)
  },3000)
}
} catch (error) {
  setisinCorrect(error.message)
}


}

const formik=useFormik({
  initialValues:{
    "email":"",
    "password":"",
    "remember me":false
  },
  validationSchema,
  onSubmit:handleLogin
})

function handelChange(e){
  setisinCorrect("")
  formik.handleChange(e);
}


  return (
<div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-100 max-w-5xl mx-auto">
      {/* Left Side - Image & Description */}
      <div className="flex flex-col justify-center items-center bg-white p-8">
        <img
          src={loginImg}
          alt="Fresh Groceries"
          className="w-full max-w-md mb-6"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Fresh Groceries Delivered
        </h2>
        <p className="text-sm text-gray-500 text-center max-w-md">
          Join thousands of happy customers who trust FreshCart for their daily
          grocery needs
        </p>
        <div className="flex gap-6 text-sm text-gray-400 mt-4">
          <span>Free Delivery</span>
          <span>Secure Payment</span>
          <span>24/7 Support</span>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col justify-center bg-gray-50 p-8">
        <h1 className="text-3xl font-bold text-green-600 text-center">
          FreshCart
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 text-center mt-2">
          Welcome Back!
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign in to continue your fresh shopping experience
        </p>

        {/* Social Buttons */}
        <div className="flex flex-col gap-4 mb-4">
          <button className="w-full border border-gray-300 py-2 rounded hover:bg-gray-100 flex items-center justify-center text-sm">
            <FontAwesomeIcon icon={faGoogle} className="text-red-600 mr-2" />
            Continue with Google
          </button>
          <button className="w-full border border-gray-300 py-2 rounded hover:bg-gray-100 flex items-center justify-center text-sm">
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-blue-600 mr-2"
            />
            Continue with Facebook
          </button>
        </div>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-sm text-gray-500">
            OR CONTINUE WITH EMAIL
          </span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={handelChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your email"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {formik.touched.email&&formik.errors.email&&(<p className='text-red-500'>*{formik.errors.email}</p>)}

        </div>

        {/* Password Input */}
        <div className="mb-2">
          <div className="flex justify-between items-center">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Link
              to="/forgetpassword"
              className="text-green-600 text-xs hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={handelChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your password"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {formik.touched.password&&formik.errors.password&&(<p className='text-red-500'>*{formik.errors.password}</p>)}
          {isinCorrect&&<p className='text-red-500'>*{isinCorrect}</p>}
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <input
            type="checkbox"
            id="rememberMe"
            className="accent-green-600 size-4"
            name="rememberMe"
            value={formik.values.rememberMe}
            onChange={handelChange}
            onBlur={formik.handleBlur}
            
          />
          <label htmlFor="rememberMe" className="text-gray-600">
            Keep me signed in
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Sign In
        </button>
        </form>

        {/* Signup Link */}
        <p className="text-sm text-center text-gray-500 mt-4">
          New to FreshCart?{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
