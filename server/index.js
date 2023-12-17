const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");

app.use(express.json());

mongoose.connect(
  `mongodb+srv://osalvatierra:YhG23YHt6WskEU6@cluster0.9edkxra.mongodb.net/login?retryWrites=true&w=majority`
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(cors());

app.post(
  "https://full-mern-stack-code.onrender.com/api/register",
  async (req, res) => {
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
  }
);

app.post(
  "https://full-mern-stack-code.onrender.com/api/login",
  async (req, res) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });

      if (!user) {
        return { status: "error", error: "Invalid Login" };
      }

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
          "secrete123"
        );
        console.log(token);

        return res.json({ status: "ok", user: token });
      }
    } catch (err) {
      console.log(err);
      res.json({ status: "error", user: false });
    }
  }
);

app.get(
  "https://full-mern-stack-code.onrender.com/api/quote",
  async (req, res) => {
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
  }
);

app.post(
  "https://full-mern-stack-code.onrender.com/api/quote",
  async (req, res) => {
    const token = req.headers["x-access-token"];
    try {
      const decoded = jwt.verify(token, "secrete123");
      const email = decoded.email;
      await User.updateOne(
        { email: email },
        { $set: { quote: req.body.quote } }
      );

      return res.json({ status: "ok" });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error: "invalid token" });
    }
  }
);

app.listen(1337, () => {
  console.log("Server started on 1337");
});
