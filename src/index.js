require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

// Security
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: process.env.PRODUCTION ? 70 : 10000000,
  handler: (req, res) => {
    return res.status(429).json({
      error: "You sent too many requests. Please wait a while then try again",
    });
  },
});

const corsConfig = {
  credentials: true,
  origin: "*",
};

// Config
const app = express();
app.enable("trust proxy"); // Required for SSL
app.use(helmet());
app.use(limiter);
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan(process.env.PRODUCTION ? "combined" : "dev"));

// Auth
const passport = require("./auth/config");
app.use(passport.initialize());

// Database config
require("./database");

// Routers
app.use("/api/v1/", require("./routers"));
app.listen(process.env.PORT || 8000);
