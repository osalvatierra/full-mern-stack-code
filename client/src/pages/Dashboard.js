import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

// import { populate } from "../../../server/models/user.model";

const Dashboard = () => {
  const history = useNavigate();
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");

  async function detectLogout(e) {
    e.preventDefault();
    await fetch("https://full-mern-stack-server.onrender.com/api/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.status) {
          window.location.href = "/login";
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  async function populateQuote() {
    const req = await fetch(
      "https://full-mern-stack-server.onrender.com/api/quote",
      {
        credentials: "include", // Include credentials (cookies)
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await req.json();
    console.log(data);

    if (data.status === "ok") {
      setQuote(data.quote);
    } else {
      history("/login");
      // alert(data.error);
    }
  }

  useEffect(() => {
    populateQuote();
    detectLogout();
  }, []);

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

      <Logout type="Submit" value="Logout" />
    </div>
  );
};

export default Dashboard;
