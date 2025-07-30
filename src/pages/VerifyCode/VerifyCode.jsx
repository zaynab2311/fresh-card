import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { verifyResetCode } from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function VerifyCode() {
  const navigate = useNavigate();

  const initialValues = {
    resetCode: "",
  };

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required("Please enter the reset code")
      .matches(/^[0-9]{6}$/, "Code must be 6 digits"),
  });

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    try {
      const response = await verifyResetCode(values.resetCode);
      // بعد النجاح نوجه المستخدم إلى صفحة Reset Password
      navigate("/reset-password");
    } catch (error) {
      if (error.response?.data?.message) {
        setErrors({ resetCode: error.response.data.message });
      }
    } finally {
      setSubmitting(false);
    }
  }

 return (
  <section className="min-h-screen flex pb-80 pt-20 justify-center bg-gray-50 px-4">
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2 text-center">
        <FaCheckCircle className="text-green-600 text-3xl" />
        Verify Your Code
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5">
            <div>
              <label
                htmlFor="resetCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Reset Code
              </label>
              <Field
                type="text"
                name="resetCode"
                placeholder="Enter the code from email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <ErrorMessage
                name="resetCode"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              {isSubmitting ? "Verifying..." : "Verify Code"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  </section>
);

}
