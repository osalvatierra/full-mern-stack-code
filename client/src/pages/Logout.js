import React from "react";

function Logout() {
  function logout(e) {
    e.preventDefault();
    fetch("https://full-mern-stack-server.onrender.com/api/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // window.location.href = "/login";
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
