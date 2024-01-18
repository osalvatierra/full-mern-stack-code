import React from "react";

const Logout = () => {
  async function logout(e) {
    e.preventDefault();
    await fetch("https://full-mern-stack-server.onrender.com/api/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          window.location.href = "/login";
        }
      })
      .catch((error) => console.error("Error:", error));
  }
  return (
    <div>
      <button onClick={logout}>Logout </button>
    </div>
  );
};

export default Logout;
