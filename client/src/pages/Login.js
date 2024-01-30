import { useEffect, useState } from "react";
import { useAuth } from "./ProtectedRoute";
import { useNavigate } from "react-router-dom";

function App() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSumbit(e) {
    e.preventDefault();
    login();
  }
  const navigate = useNavigate();
  useEffect(
    function () {
      isAuthenticated && navigate("/dashboard", { replace: true });
    },
    [isAuthenticated, navigate]
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
