const express = require("express");
const router = express.Router();
// Import the CORS middleware
const cors = require("cors");

const UserController = require("../controllers/UserController");

router.post("/api/register", UserController.register);
router.post("/api/login", UserController.login);

// Set up the route handler
router.post("/api/login", cors(), (req, res) => {
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
module.exports = router;
