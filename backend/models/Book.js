const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewer: String,
  rating: Number,
  comment: String,
});

const bookSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  rating: Number,
  authorname: String,
  description: String,
  link: String,
  reviews: [reviewSchema],
});

module.exports = mongoose.model("Book", bookSchema);
