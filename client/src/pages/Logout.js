import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  async function logout() {
    try {
      navigate("/login");
    } catch (error) {
      // Handle network or other errors
      console.error("Logout failed", error);
    }
  }

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
