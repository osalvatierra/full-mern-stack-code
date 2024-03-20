const express = require("express");
const router = express.Router();
// Import the CORS middleware
const cors = require("cors");

const UserController = require("../controllers/UserController");

router.post("/api/register", UserController.register);
router.post("/api/login", UserController.login);

module.exports = router;
