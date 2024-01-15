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

const corsOptions = {
  origin: "https://full-mern-stack-code.onrender.com/",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Origin, Content-Type, X-Auth-Token",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(cors());

app.get("/api/login", (req, res) => {
  // Access the user information attached to the request object
  const user = req.cookies;
  console.log(user);

  if (!user.xaccesstoken) {
    return res.status(401).send("Unauthorized");
  }

  res.json("Welcome to the protected resource, " + user.xaccesstoken);
});

app.post("/api/logout", (req, res) => {
  // Access the user information attached to the request object
  const user = req.cookies;
  console.log(user);

  res.cookie("xaccesstoken", { expires: Date.now() });
  res.json("Welcome to the protected resource, " + user.xaccesstoken);
});

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
      console.log(token);

      // Set the JWT token in a cookie using Set-Cookie header
      res.cookie("xaccesstoken", token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour in milliseconds
        secure: true, // Set to true in production if using HTTPS
        sameSite: "strict", // Adjust based on your needs
        path: "/",
      });

      res.setHeader(
        "Access-Control-Allow-Origin",
        "https://full-mern-stack-code.onrender.com/"
      );

      res.json({ success: true });
      //return res.json({ status: "ok", authToken: token });
    } else {
      window.location.href = "/login";
      return res.json({ status: "error", user: false });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", user: false });
  }
});

app.get("/api/quote", async (req, res) => {
  //const token = req.headers["x-access-token"];
  const authToken = req.cookies.xaccesstoken;
  if (!authToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(authToken, "secrete123");
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
  //const token = req.headers["x-access-token"];
  const authToken = req.cookies.xaccesstoken;
  if (!authToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(authToken, "secrete123");
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
