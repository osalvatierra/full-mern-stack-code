import React, { useEffect } from "react";

const Logout = () => {
  async function logout() {
    await fetch("https://full-mern-stack-server.onrender.com/api/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Logout Successful");
          window.location.href = "/dashboard";
        } else {
          console.log("Still Logged in");
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  useEffect(() => {
    logout();
  }, []);

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
