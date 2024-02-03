import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  async function logout() {
    try {
      const response = await fetch(
        "https://full-mern-stack-server.onrender.com/api/logout",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            // Include any additional headers if needed (e.g., authentication token)
          },
        }
      );

      if (response.ok) {
        // Optionally handle success (e.g., redirect to login page)
        // window.location.href = "/login";
        navigate("/login");
      } else {
        // Handle unsuccessful logout (e.g., display an error message)
        console.error("Logout failed");
      }
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
