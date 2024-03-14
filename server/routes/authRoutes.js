const express = require("express");
const app = express();
const router = express.Router();
const UserController = require("../controllers/UserController");

app.options("*", (req, res) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://full-mern-stack-code.onrender.com"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

router.post("/api/register", UserController.register);
router.post("/api/login", UserController.login);

module.exports = router;
