import React from "react";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
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
