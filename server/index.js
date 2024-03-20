const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Middleware
app.use(morgan("combined"));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://full-mern-stack-code.onrender.com",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Origin", "Content-Type", "X-Auth-Token"],
    optionsSuccessStatus: 204,
    sameSite: "none",
  })
);

app.use((req, res) => {
  res.setHeader("Cache-Control", "no-cache");
});

// Set up the route handler
router.post("/api/login", cors(), (req, res) => {
  // Your route handler logic here
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://full-mern-stack-code.onrender.com"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Send the response
  res.json({ success: true });
});

// Load environment variables from config.env file
dotenv.config({ path: "./config.env" });

// Database connection
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// Routes
const authRoutes = require("./routes/authRoutes");
const quoteRoutes = require("./routes/quoteRoutes");

app.use("/api/login", authRoutes);
app.use("/api/quote", quoteRoutes);

// Start server
const PORT = 1337;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
