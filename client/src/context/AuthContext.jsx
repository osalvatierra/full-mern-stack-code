import { createContext, useContext, useReducer } from "react";
const express = require("express");
const app = express();
const cors = require("cors");
const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "Login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "Logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

// Set up the route handler
app.post("/api/login", cors(), (req, res) => {
  // Your route handler logic here
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://full-mern-stack-code.onrender.com"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Send the response
  res.json({ success: true });
});

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(email, password) {
    try {
      const response = await fetch(
        "https://full-mern-stack-server.onrender.com/api/login",
        {
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
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      console.log(data);

      if (data.success) {
        console.log(isAuthenticated);
        alert("Login Successful");
        dispatch({ type: "Login", payload: data.user });
        console.log(isAuthenticated);
      } else {
        alert("Please check your username and password ");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function logout() {
    dispatch({ type: "Logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was use outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
