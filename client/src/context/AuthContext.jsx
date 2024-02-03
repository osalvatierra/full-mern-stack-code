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

  //   function login(success) {
  //     if (success) {
  //       dispatch({ type: "Login", payload: success });
  //     }
  //   }

  async function login(email, password) {
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
          //if (data.success)
          alert("Login Successful");
          console.log(isAuthenticated);
          dispatch({ type: "Login", payload: isAuthenticated });
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
