import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function App() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSumbit(e) {
    e.preventDefault();
    login();
  }

  useEffect(
    function () {
      if (isAuthenticated) window.location.href = "/login";
    },
    [isAuthenticated]
  );

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSumbit}>
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
