import React from "react";

function Logout() {
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
        console.log(data);
        // window.location.href = "/login";
      })
      .catch((error) => console.error("Error:", error));
  }
  return (
    <div>
      <form onSubmit={logout}>
        <input value="submit" type="submit" placeholder="Submit" />
      </form>
    </div>
  );
}

export default Logout;
