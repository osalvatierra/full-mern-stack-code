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
        console.log(data);
        // window.location.href = "/login";
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
        <input value="submit" type="submit" placeholder="Logout" />
      </form>
    </div>
  );
};

export default Logout;
