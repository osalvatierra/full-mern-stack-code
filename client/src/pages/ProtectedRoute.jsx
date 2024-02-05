import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/login");
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? (
    <Route element={<Dashboard />} />
  ) : (
    navigate("/login")
  );
}

export default ProtectedRoute;
