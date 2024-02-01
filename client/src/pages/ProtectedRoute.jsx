// import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  //   useEffect(
  //     function () {
  //       if (!isAuthenticated) window.location.href = "/login";
  //     },
  //     [isAuthenticated]
  //   );

  return isAuthenticated ? children : (window.location.href = "/login");
}

export default ProtectedRoute;
