const express = require("express");

const Users = require("../models/users-model");
const restricted = require("../middlewares/restricted-middleware");

const router = express.Router();

// Get all users
router.get("/", restricted, async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error).json({ message: "its restricted" });
  }
});

// Get users by specific ID.
router.get("/:id", restricted, async (req, res) => {
  try {
    const users = await Users.findById(req.params.id);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "its restricted" });
  }
});
module.exports = router;
