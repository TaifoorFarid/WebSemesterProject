const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const User = require("../models/FormData");

// Get reviews
router.get("/", async (req, res) => {
  try {
    const bookname = req.query.bookname;
    const bookReviews = await Review.find({ bookname: bookname });
    res.json(bookReviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Post a review
router.post("/", async (req, res) => {
  try {
    const { bookname, review, userName } = req.body;
    const newReview = new Review({
      bookname,
      review,
      userName,
    });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    console.error("Error saving review:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { review } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { review },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).send("Review not found");
    }
    res.send(updatedReview);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Delete a review
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).send("Review not found");
    }
    res.send(deletedReview);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
