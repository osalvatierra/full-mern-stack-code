import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value="Logout" type="submit" />
      </form>
    </div>
  );
};

export default Logout;
