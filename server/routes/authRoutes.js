const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const UserController = require("../controllers/UserController");

app.use(
  cors({
    origin: "https://full-mern-stack-code.onrender.com",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Origin, Content-Type, X-Auth-Token",
    optionsSuccessStatus: 204,
    sameSite: "none",
  })
);

app.post("/api/register", UserController.register);
app.post("/api/login", UserController.login);

module.exports = app;
