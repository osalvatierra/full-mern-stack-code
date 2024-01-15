import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    await fetch("https://full-mern-stack-server.onrender.com/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":
          "https://full-mern-stack-code.onrender.com/",
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
          window.location.href = "/login";
          alert("Please check your username and password ");
        }
      })
      .catch((error) => console.error("Error:", error));
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
