import React from "react";

function Logout() {
  async function logout(e) {
    e.preventDefault();
    await fetch("https://full-mern-stack-server.onrender.com/api/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
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
}

export default Logout;
