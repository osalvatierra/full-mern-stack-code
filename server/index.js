const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");

app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  `mongodb+srv://osalvatierra:YhG23YHt6WskEU6@cluster0.9edkxra.mongodb.net/login?retryWrites=true&w=majority`
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(cors());

app.post("/api/register", async (req, res) => {
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
    console.log(error);

    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    // Check if the user exists in the database
    const user = await User.findOne({
      email: req.body.email,
    });
    console.log(user.email);

    const isPasswordValid = await bycrypt.compare(
      req.body.password,
      user.password
    );

    if (!user || isPasswordValid === false) {
      return { status: "error", error: "Invalid Login" };
    }

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        "secrete123"
      );
      console.log(token);

      // Set the JWT token in a cookie using Set-Cookie header
      res.cookie("x-access-token", token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour in milliseconds
        secure: process.env.NODE_ENV === "production", // Set to true in production if using HTTPS
        sameSite: "strict", // Adjust based on your needs
      });
      //res.status(200).json({ message: "JWT token set successfully" });

      return res.json({ status: "ok", user: token });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", user: false });
  }
});

app.get("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secrete123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    console.log(user);
    return res.json({ status: "ok", quote: user.quote });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.post("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secrete123");
    const email = decoded.email;
    await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.listen(1337, () => {
  console.log("Server started on 1337");
});
