const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

let inOtherRoute = false;

exports.register = async (req, res, next) => {
  console.log(req.body);

  try {
    const newPassword = await bycrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
      quote: req.body.quote,
    });
    res.json({ status: "ok" });
  } catch (error) {
    next(error);
    res.json({ status: "error", error: "Duplicate email" });
  }
};

exports.login = async (req, res, next) => {
  inOtherRoute = false;
  try {
    // Check if the user exists in the database
    const user = await User.findOne({
      email: req.body.email,
    });

    const isPasswordValid = await bycrypt.compare(
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
    next(error);
    return res.json({ status: "error", user: false });
  }
};
