const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: String,
  description: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdOn: Date,
});

module.exports = mongoose.model("Blog", BlogSchema);
