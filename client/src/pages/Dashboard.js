import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// import { populate } from "../../../server/models/user.model";

const Dashboard = () => {
  const history = useNavigate();
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");

  async function populateQuote() {
    const req = await fetch(
      "https://full-mern-stack-server.onrender.com/api/quote",
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await req.json();
    console.log(data);
    if (data.status === "ok") {
      setQuote(data.quote);
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        history.replace("/login");
      }
      populateQuote();
    }
  }, []);

  async function updateQuote(event) {
    event.preventDefault();
    const req = await fetch(
      "https://full-mern-stack-server.onrender.com/api/quote",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
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
          placeholder="Quote"
          value={tempQuote}
          onChange={(e) => setTempQuote(e.target.value)}
        />
        <input type="submit" value={"Update Quote"} />
      </form>
    </div>
  );
};

export default Dashboard;
