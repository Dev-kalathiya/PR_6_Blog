const express = require("express");
const {
  createBlog,
  getAllBlogs,
  likeBlog,
  addComment,
  validateBlogData,
} = require("../controllers/blog.controller");

const router = express.Router();

router.post("/create", validateBlogData, createBlog);
router.get("/blogs", getAllBlogs); 
router.patch("/like/:id", likeBlog);
router.patch("/comment/:id", addComment);

module.exports = router;
