import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    fetch("https://full-mern-stack-server.onrender.com/api/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Retrieve the JWT token from the cookie
        const jwtToken = Cookies.get("xaccesstoken");

        console.log("JWT Token:", jwtToken);
      })
      .catch((error) => console.error("Error:", error));

    // const datagg = await gg.json();
    // console.log(datagg);

    const response = await fetch(
      "https://full-mern-stack-server.onrender.com/api/login",
      {
        method: "POST",
        mode: "cors",
        credentials: "include", // Include credentials (cookies)
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    // Assuming the server sets the HTTP-only cookie during login

    if (data.success) {
      // Retrieve the JWT token from the cookie
      const jwtToken = Cookies.get("xaccesstoken");

      console.log("JWT Token:", jwtToken);

      // localStorage.setItem("token", data.user);
      alert("Login Successful");
      window.location.href = "/dashboard";
    } else {
      alert("Please check your username and password ");
    }
  }
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
