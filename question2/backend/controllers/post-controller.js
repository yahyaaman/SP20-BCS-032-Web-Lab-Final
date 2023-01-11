import mongoose from "mongoose";
import Post from "../models/Posts.js";

app.getAllPosts("/posts", async (req, res) => {
  let posts;
  try {
    posts = await Post.find().limit(20);
  } catch (error) {
    return console.log(error);
  }
  if (!posts) {
    return res.status(404).json({ message: "No Posts Found" });
  }
  return res.status(200).json({ posts });
});

export const addPost = async (req, res) => {
  const { title, body, userId } = req.body;

  const newPost = new Post({
    title,
    body,
    userId,
  });
  try {
    await newPost.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
  return res.status(201).json({ newPost });
};

export const updatePost = async (req, res) => {
  const { title, body } = req.body;
  const postId = req.params.id;
  let post;

  try {
    post = await Post.findByIdAndUpdate(postId, {
      title,
      body,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!post) {
    return res.status(500).json({ message: "Unable to update post" });
  }
  return res.status(200).json({ post });
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  let post;
  try {
    post = await Post.findByIdAndRemove(postId).populate("user");
    await post.user.posts.pull(post);
    await post.user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!post) {
    return res.status(500).json({ message: "Not Deleted" });
  }
  return res.status(200).json({ message: "Deleted Successfuly" });
};
