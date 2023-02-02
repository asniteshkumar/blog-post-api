const mongoose = require("mongoose");

const titles = require("./title");
const descriptions = require("./description");

const Blog = require("../models/blog");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/blog-post");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await Blog.deleteMany({});
  for (let i = 0; i < 10; i++) {
    const blog = new Blog({
      title: `${titles[i]}`,
      description: `${descriptions[i]}`,
      createdBy: "63db6ba1774041e357e09497",
      createdOn: "01-02-2023",
    });
    await blog.save();
  }
};

seedDB().then(() => {
  db.close();
});
