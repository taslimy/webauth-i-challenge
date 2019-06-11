const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);

const server = express();

const sessionConfig = {
  name: "monkey", // by default it would be sid
  secret: "keep it secret, keep it safe",
  resave: false, // if there are no changes to the session don't save it again.
  saveUninitialized: true, // for GDPR compliance
  cookie: {
    maxAge: 1000 * 60 * 10, // milliseconds
    secure: false, // send cookie only over https, set to true in production
    httpOnly: true // always set to true, it means client JS can't access the cookie
  },
  store: new knexSessionStore({
    knex: require("./data/dbConfig"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

server.use(express());
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2> TESTING IF SERVER IS LIVE! </h2>`);
});

// Define Routes
server.use("/api/auth", require("./routes/auth-router")); // register & login
server.use("/api/users", require("./routes/user-router")); // all users

// Logger
function logger(req, res, next) {
  console.log(` [${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

module.exports = server;
