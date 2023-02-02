const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, username, password } = req.body;
    const user = new User({ name, email, username });
    await User.register(user, password);
    res.redirect("/api/blog");
  } catch (e) {
    res.redirect("register");
  }
});

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    keepSessionInfo: true,
  }),
  (req, res) => {
    res.redirect("/api/blog");
  }
);

module.exports = router;
