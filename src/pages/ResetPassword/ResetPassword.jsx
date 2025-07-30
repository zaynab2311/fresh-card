import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { resetPassword } from "../../services/auth-service";

// ✅ Password validation regex
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),

  newPassword: Yup.string()
    .matches(
      passwordRegex,
      "Password must be 8+ characters with uppercase, lowercase, number, and special character"
    )
    .required("Required"),

  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Required"),
});

export default function ResetPassword() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await resetPassword({ email: values.email, newPassword: values.newPassword });
      navigate("/login");
    } catch (error) {
      setErrors({ email: "Reset failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex pb-80 pt-20 justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaLock className="text-green-600" />
          Reset Your Password
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="mt-1 p-2 w-full border rounded"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* New Password Field */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium">
                  New Password
                </label>
                <Field
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  className="mt-1 p-2 w-full border rounded"
                />
                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Confirm New Password Field */}
              <div>
                <label htmlFor="confirmNewPassword" className="block text-sm font-medium">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmNewPassword"
                  placeholder="Confirm new password"
                  className="mt-1 p-2 w-full border rounded"
                />
                <ErrorMessage name="confirmNewPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
