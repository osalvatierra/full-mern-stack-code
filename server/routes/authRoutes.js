const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/api/register", UserController.register);
router.get("/api/login", UserController.login);

module.exports = router;
