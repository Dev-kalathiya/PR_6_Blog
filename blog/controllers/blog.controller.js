const Blog = require("../models/blog.schema");

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).send("Error fetching blogs");
  }
};
const getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.status(200).json(blogs);
    } catch (err) {
      res.status(500).send("Error fetching blogs");
    }
  };

const getCreatePage = (req, res) => {
  const role = req.cookies.role;
  if (role !== "admin") {
    return res.status(403).send("You are not authorized to access this page.");
  }
  res.render("createBlog");
};

const createBlog = async (req, res) => {
  const { title, content, image, category } = req.body;
  const author = req.cookies.username;

  try {
    const blog = new Blog({ title, content, image, category, author });
    await blog.save();
    res.status(201).send(`Blog created by ${author}`);
  } catch (err) {
    res.status(500).send("Error creating blog");
  }
};

const likeBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).send("Blog not found");

    blog.likes += 1;
    await blog.save();
    res.status(200).send("Blog liked");
  } catch (err) {
    res.status(500).send("Error liking blog");
  }
};

const addComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).send("Blog not found");

    blog.comments.push(comment);
    await blog.save();
    res.status(200).send("Comment added");
  } catch (err) {
    res.status(500).send("Error adding comment");
  }
};

const validateBlogData = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send("Title and content are required");
  }
  next();
};

module.exports = {
  createBlog,
  getBlogs,
  getCreatePage,
  getAllBlogs,
  likeBlog,
  addComment,
  validateBlogData,
};
