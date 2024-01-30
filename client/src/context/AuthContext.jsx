const { createContext, useContext, useReducer, useState } = require("react");

const AuthContext = createContext();

const initialState = {
  success: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "Login":
      return { ...state, success: action.payload, isAuthenticated: true };
    case "Logout":
      return { ...state, success: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ success, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  //   function login(success) {
  //     if (success) {
  //       dispatch({ type: "Login", payload: success });
  //     }
  //   }

  async function login() {
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
        setEmail(data.email);
        setPassword(data.password);
        if (data.success) {
          alert("Login Successful");
          dispatch({ type: "Login", payload: data.success });
          window.location.href = "/dashboard";
        } else {
          alert("Please check your username and password ");
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  function logout() {
    dispatch({ type: "Logout" });
  }
  return (
    <AuthContext.Provider value={{ success, isAuthenticated, login, logout }}>
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
