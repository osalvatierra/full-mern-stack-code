import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Logout from "./Logout";

// import { populate } from "../../../server/models/user.model";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");
  console.log(isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      async function populateQuote() {
        const req = await fetch(
          "https://full-mern-stack-server.onrender.com/api/quote",
          {
            method: "GET",
            credentials: "include", // Include credentials (cookies)
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await req.json();
        console.log("test");
        console.log(data.status);

        if (data.status === "ok") {
          setQuote(data.quote);
        }
      }

      populateQuote();
    }
  }, [isAuthenticated, navigate]);

  //So you have to also include a GET request for /dashboard here and also add in index.js/routes so that you can
  //Access the cookies via fetch req, res and then routes will take care of the sending on the node server file!!!
  //Then it should remove when logging out

  async function updateQuote(event) {
    event.preventDefault();
    const req = await fetch(
      "https://full-mern-stack-server.onrender.com/api/quote",
      {
        method: "POST",
        credentials: "include", // Include credentials (cookies)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quote: tempQuote,
        }),
      }
    );
    const data = await req.json();

    if (data.status === "ok") {
      setQuote(tempQuote);
      setTempQuote("");
    } else {
      alert(data.error);
    }
  }

  return (
    <div>
      <h1>Your quote: {quote || "No quote found"} </h1>
      <form onSubmit={updateQuote}>
        <input
          type="text"
          placeholder="Quotes"
          value={tempQuote}
          onChange={(e) => setTempQuote(e.target.value)}
        />
        <input type="submit" value={"Update Quote"} />
      </form>

      <Logout type="Logout" value="Logout" />
    </div>
  );
};

export default Dashboard;
