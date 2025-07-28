import { useContext } from "react";
import { AuthContext } from "../../context/Auth.context";
import { Navigate, useLocation } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  if (token === null) {
    return <Navigate to="/login" state={{from: location.pathname}}/>;
  } else {
    return children;
  }
}
