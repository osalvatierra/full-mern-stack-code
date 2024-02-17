const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

// const router = express.Router();
const UserController = require("../controllers/UserController");

app.post("/api/register", UserController.register);
app.post("/api/login", UserController.login);

module.exports = app;
