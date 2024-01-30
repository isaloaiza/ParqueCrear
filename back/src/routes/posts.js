const express = require('express');
const Post = require('../models/post.js')

const router = express.Router();

// Creating posts
router.post("/posts", async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      longitud: req.body.longitud,
      latitud: req.body.latitud,
    });
    await post.save();

    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a post by id
router.put("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {  
        title: req.body.title, 
        content: req.body.content,
        longitud: req.body.longitud,
        latitud: req.body.latitud,
      },
      { new: true }
    );
    if (!post) return res.status(404).send("Post not found");
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single post by id
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Deleting a post by id
router.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndRemove(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
