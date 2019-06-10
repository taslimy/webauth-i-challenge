const express = require("express");

const Users = require("../models/users-model");

const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  let { username, password } = req.body;
  if (!username && !password) {
    res
      .status(401)
      .json({ message: "please enter a valid username and password" });
  } else {
    // password gets re-hashed 2 ^ 8 times : Larger the number logster it takes
    const hash = bcrypt.hashSync(password, 8);
    password = hash;
    try {
      const users = await Users.add({ username, password });
      if (users) {
        res.status(201).json(users);
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "please enter a valid username and password" });
    }
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  try {
    const user = await Users.findBy({ username }).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ message: `Welcome ${user.username}!` });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
