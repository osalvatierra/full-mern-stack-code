const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const cookieParser = require("cookie-parser"); // Import cookieParser module

const express = require("express");
const morgan = require("morgan");

app.use(morgan("dev"));

const express = require("express");
const app = express();
app.use(cookieParser());

let inOtherRoute = false;

exports.register = async (req, res) => {
  console.log(req.body);

  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
      quote: req.body.quote,
    });
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Duplicate email" });
  }
};

exports.login = async (req, res) => {
  inOtherRoute = false;
  try {
    // Check if the user exists in the database
    const user = await User.findOne({
      email: req.body.email,
    });

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },

        "secrete123",
        {
          expiresIn: "20m",
        }
      );

      // Set the JWT token in a cookie using Set-Cookie header
      res.cookie("xaccesstoken", token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour in milliseconds
        secure: true, // Set to true in production if using HTTPS
        sameSite: "none", // Adjust based on your needs
        path: "/",
      });

      res.json({ success: true });
      //return res.json({ status: "ok", authToken: token });
    } else {
      return res.json({ status: "error", user: false });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", user: false });
  }
};
