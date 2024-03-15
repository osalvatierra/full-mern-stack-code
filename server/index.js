const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Load environment variables from config.env file
dotenv.config({ path: "./config.env" });

// Middleware
app.use(morgan("combined"));
app.use(express.json());
app.use(cookieParser());

// app.use(
//   cors({
//     origin: "https://full-mern-stack-code.onrender.com",
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: ["Origin", "Content-Type", "X-Auth-Token"],
//     optionsSuccessStatus: 204,
//     sameSite: "none",
//   })
// );

// app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://full-mern-stack-code.onrender.com"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS, HEAD, POST, PUT"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

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

app.use((req, res) => {
  res.setHeader("Cache-Control", "no-cache");
});

// Routes
const authRoutes = require("./routes/authRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
app.post("/api/login", cors(), authRoutes);
app.get("/api/quote", quoteRoutes);

// Error handling middleware
// app.use((err, req, res) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// Start server
const PORT = 1337;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
