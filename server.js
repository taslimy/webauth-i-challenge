const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const server = express();

server.use(express());
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2> TESTING IF SERVER IS LIVE! </h2>`);
});

// Middlewares

// Define Routes

// Logger
function logger(req, res, next) {
  console.log(` [${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

module.exports = server;
