import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    await fetch("https://full-mern-stack-server.onrender.com/api/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          alert("Login Successful");
          window.location.href = "/dashboard";
        } else {
          alert("Please check your username and password ");
        }
      })
      .catch((error) => console.error("Error:", error));
  }
  async function dashboardDetect() {
    await fetch("https://full-mern-stack-server.onrender.com/dashboard", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const currentUrl = window.location.href;
        if (
          currentUrl === "https://full-mern-stack-code.onrender.com/dashbaord"
        ) {
          console.log("Good");
        }
      })
      .catch((error) => console.error("Error:", error));
  }
  dashboardDetect();
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="Submit" value="Login" />
      </form>
    </div>
  );
}

export default App;
