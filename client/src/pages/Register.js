import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [quote, setQuote] = useState("");

  const history = useNavigate();
  async function registerUser(event) {
    event.preventDefault();
    setQuote("");
    const response = await fetch("http://localhost:1338/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        password,
        quote,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }

    console.log(data);

    if (data.status === "ok") {
      history("/login");
    }
  }
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <br />
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

        <input type="Submit" value="Register" />
      </form>
    </div>
  );
}

export default App;
