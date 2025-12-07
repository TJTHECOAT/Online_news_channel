const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

// Add post (admin only)
router.post("/add", async (req, res) => {
  const { title, content, category } = req.body;
  const post = new Post({ title, content, category });
  await post.save();
  res.json({ message: "Post added" });
});

module.exports = router;
