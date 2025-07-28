import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTruckFast,
  faLock,
  faStar,
  faEnvelope,
  faUser,
  faPhone,
  faLockOpen,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { sendDataToSignUp } from '../../services/auth-service';
export default function Signup() {


    const navigate= useNavigate();
    const[isExistError, setIsExistError]=useState(null)


  const phoneRegex=/^(\+2)?01[0125][0-9]{8}$/;
  const passwordRegex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/


const validationSchema=yup.object({

name: yup.string().required("name is required"),
email: yup.string().required("email is required").email("Email is invalid"),
phone: yup.string().required("phone number is required").matches(phoneRegex, 'egyption phon number only'),
password: yup.string().required("password is required").matches(passwordRegex, "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
rePassword: yup.string().required("confirm password is required").oneOf([yup.ref("password")], 'passwords should be the same'),
terms:yup.boolean().oneOf([true],'you must agree to our terms and policies')

});


async function handleSignUp(values){
try {

 const response=await sendDataToSignUp(values)
 if(response.success){
  toast.success("account created successfuly");
  setTimeout(()=>{
      navigate("/login")
  },3000)
}
} catch (error) {
  console.log(error)
setIsExistError(error.message)
}


}

const formik=useFormik({
  initialValues:{
    "name": "",
    "email":"",
    "password":"",
    "rePassword":"",
    "phone":"",
    "terms":false
  },
  validationSchema,
  onSubmit:handleSignUp
})



  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div className="bg-white shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-2 max-w-7xl w-full overflow-hidden">

    
    {/* Left Column */}
    <div className="bg-gray-50 p-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Welcome to <span className="text-green-600 font-bold">FreshCart</span>
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
      </p>

      <ul className="space-y-4 mb-6">
        <li className="flex items-start gap-3 text-sm text-gray-600">
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1" />
          <span><strong>Premium Quality</strong><br />Premium quality products sourced from trusted suppliers.</span>
        </li>
        <li className="flex items-start gap-3 text-sm text-gray-600">
          <FontAwesomeIcon icon={faTruckFast} className="text-green-500 mt-1" />
          <span><strong>Fast Delivery</strong><br />Same-day delivery available in most areas.</span>
        </li>
        <li className="flex items-start gap-3 text-sm text-gray-600">
          <FontAwesomeIcon icon={faLock} className="text-green-500 mt-1" />
          <span><strong>Secure Shopping</strong><br />Your data and payments are completely secure.</span>
        </li>
      </ul>

      <div className="bg-white rounded p-4 text-sm text-gray-600">
        <div className="flex items-center gap-2 mb-2">
          <img
            src="https://i.pravatar.cc/40?img=1"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium text-gray-800">Sarah Johnson</span>
          <div className="flex text-yellow-400 text-xs ml-2">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon icon={faStar} key={i} />
            ))}
          </div>
        </div>
        <p>
          "FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"
        </p>
      </div>
    </div>

    {/* Right Column */}
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Create Your Account</h2>
      <p className="text-sm text-gray-500 mb-4 text-center">Start your fresh journey with us today</p>

      {/* Social Buttons */}
      <div className="flex gap-4 mb-4">
        <button type='button' className="w-full border border-gray-300 text-sm py-2 rounded hover:bg-gray-100">
          <FontAwesomeIcon icon={faGoogle} className='mr-2 text-red-600' />
          Google
        </button>
        <button type='button' className="w-full border border-gray-300 text-sm py-2 rounded hover:bg-gray-100">
          <FontAwesomeIcon icon={faFacebook} className='mr-2 text-blue-700' />
          Facebook
        </button>
      </div>

      {/* OR divider */}
      <div className="flex items-center my-4">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-sm text-gray-500">or</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      {/* Form */}
    <form className="space-y-4 text-sm text-gray-700" onSubmit={formik.handleSubmit}>
  <div>
    <label htmlFor="name" className="block mb-1 font-medium">Name</label>
    <input
      type="text"
      id="name"
      name="name"
      placeholder="Zaynab"
      value={formik.values.name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="w-full border border-gray-300 p-2 rounded"
    />
    {formik.touched.name&&formik.errors.name&&<p className='text-red-500'>*{formik.errors.name}</p>}
  </div>

  <div>
    <label htmlFor="email" className="block mb-1 font-medium">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="zaynab@example.com"
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="w-full border border-gray-300 p-2 rounded"
    />
        {formik.touched.email&&formik.errors.email&&(<p className='text-red-500'>*{formik.errors.email}</p>)}
        {isExistError&& <p className='text-red-500'>*{isExistError}</p>}

  </div>

  <div>
    <label htmlFor="password" className="block mb-1 font-medium">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      placeholder="At least 8 characters"
      value={formik.values.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="w-full border border-gray-300 p-2 rounded"
    />
    {formik.touched.password&&formik.errors.password ? (
      <p className='text-red-500'>*{formik.errors.password}</p>
    ) : (
      <p className='text-sm '>
        must be at least 8 characters with numbers and symbols
      </p>
    )
  }
  </div>

  <div>
    <label htmlFor="rePassword" className="block mb-1 font-medium">Confirm Password</label>
    <input
      type="password"
      id="rePassword"
      name="rePassword"
      placeholder="Repeat your password"
      value={formik.values.rePassword}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="w-full border border-gray-300 p-2 rounded"
    />
    {formik.touched.rePassword&&formik.errors.rePassword&&<p className='text-red-500'>*{formik.errors.rePassword}</p>}

  </div>

  <div>
    <label htmlFor="phone" className="block mb-1 font-medium">Phone Number</label>
    <input
      type="tel"
      id="phone"
      name="phone"
      placeholder="+20 100 123 4567"
      value={formik.values.phone}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="w-full border border-gray-300 p-2 rounded"
    />
    {formik.touched.phone&&formik.errors.phone&&<p className='text-red-500'>*{formik.errors.phone}</p>}

  </div>
  <div className='terms'>
      <div className='flex gap-2 items-center'>
      <input 
    type="checkbox"
    name='terms'
    id='terms'
    value={formik.values.terms}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className="accent-green-600 size-4" />
    <label htmlFor='terms'>
        I agree to the{" "}
        <Link to={`/terms`} className='text-green-600 underline'>
        Terms of service
        </Link>{" "}
        and{" "}
        <Link to={`/privacy-policy`}
        className='text-green-600 underline'>
          Privacy policy
        </Link>
    </label>
      </div>
      {formik.touched.terms&&formik.errors.terms&&(<p className='text-red-500'>*{formik.errors.terms}</p>)}
  </div>

  <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 flex justify-center items-center gap-2">
    <FontAwesomeIcon icon={faUserPlus} />
    Create My Account
  </button>

  <p className="text-sm text-center text-gray-500">
    Already have an account? <Link to="/login" className="text-green-600">Sign In</Link>
  </p>
</form>

    </div>
  </div>
</div>

  );
}

