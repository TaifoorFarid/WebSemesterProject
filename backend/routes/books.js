const express = require("express");
const Book = require("../models/Book");
const router = express.Router();

// GET all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new book
router.post("/", async (req, res) => {
  const { name, imageUrl, rating, authorname, description, link } = req.body;

  const book = new Book({
    name,
    imageUrl,
    rating,
    authorname,
    description,
    link,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a book by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, imageUrl, rating, authorname, description, link } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { name, imageUrl, rating, authorname, description, link },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a book by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a review to a specific book
router.post("/:id/reviews", async (req, res) => {
  const { id } = req.params;
  const { reviewer, rating, comment } = req.body;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const review = { reviewer, rating, comment };
    book.reviews.push(review);
    await book.save();

    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET reviews of a specific book
router.get("/:id/reviews", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book.reviews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a review of a specific book
router.put("/:bookId/reviews/:reviewId", async (req, res) => {
  const { bookId, reviewId } = req.params;
  const { reviewer, rating, comment } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const review = book.reviews.id(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.reviewer = reviewer;
    review.rating = rating;
    review.comment = comment;
    await book.save();

    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a review of a specific book
router.delete("/:bookId/reviews/:reviewId", async (req, res) => {
  const { bookId, reviewId } = req.params;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const review = book.reviews;
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    book.reviews = book.reviews.filter((review) => review._id != reviewId);

    await book.save();

    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
