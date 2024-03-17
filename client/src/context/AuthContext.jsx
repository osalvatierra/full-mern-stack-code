import { createContext, useContext, useReducer } from "react";
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
          headers: {
            "Content-Type": "application/json",
          },
          origin: "https://full-mern-stack-server.onrender.com",
          method: "POST",
          mode: "cors",
          credentials: "include",

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

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
