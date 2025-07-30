import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaLock, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ استدعاء useNavigate

export default function ForgetPassword() {
  const navigate = useNavigate(); 

  const initialValues = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  async function handleSubmit(values, { setSubmitting, resetForm }) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      toast.success(data.message || "Reset link sent successfully");

      // ✅ التوجيه لصفحة التحقق من الكود
      navigate("/verify-code");

      resetForm();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong, try again"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
<div className="min-h-screen grid bg-gray-50 px-4 pt-10 place-items-start justify-center">
      <div className="bg-white shadow rounded-lg p-8 w-full max-w-md">
        <div className="grid place-items-center mb-4">
          <div className="bg-green-100 text-green-600 p-4 rounded-full">
            <FaLock className="text-2xl" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-center mb-2">
          Forgot your password?
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          No worries! Enter your email and we'll send you a link to reset it.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaEnvelope />
                  </span>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Your registered email address"
                    className="pl-10 pr-3 py-2 w-full border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <FaPaperPlane />
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-4 text-sm">
          Remember your password?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Sign in
          </a>
        </div>

        <div className="bg-gray-50 mt-6 p-3 border border-gray-200 rounded text-xs flex items-start gap-2">
          <div className="text-green-600 pt-1">
            <FaLock />
          </div>
          <p className="text-gray-600">
            <strong>Security Notice:</strong> A password reset link will be sent
            to your registered email. The link expires after 30 minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
