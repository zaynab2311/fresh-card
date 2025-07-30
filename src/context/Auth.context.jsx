import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  );

  const [resetEmail, setResetEmail] = useState("");

  function logOut() {
    setToken(null);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ token, setToken, logOut, resetEmail, setResetEmail }}>
      {children}
    </AuthContext.Provider>
  );
}
