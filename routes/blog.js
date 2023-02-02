const express = require("express");
const router = express.Router();
const Blog = require("../models/blog")
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor } = require("../middleware");

router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const blogs = await Blog.find({});
    res.send(blogs);
  })
);

router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    console.log(req.body);
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.send(updatedBlog);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.send(deletedBlog);
  })
);

module.exports = router;
