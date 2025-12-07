const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register (for creating accounts)
router.post("/register", async (req, res) => {
  const { matric, password, role, department } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ matric, password: hashed, role, department });
  await newUser.save();
  res.json({ message: "User created" });
});

// Login
router.post("/login", async (req, res) => {
  const { matric, password } = req.body;
  const user = await User.findOne({ matric });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, role: user.role });
});

module.exports = router;
