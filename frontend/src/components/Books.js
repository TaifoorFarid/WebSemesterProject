import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import BookTable from "./BookTable";
import BookFormModal from "./BookFormModal";
import ReviewFormModal from "./ReviewFormModal";
import ReviewListModal from "./ReviewListModal";
import AlertMessage from "./AlertMessage";

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    rating: "",
    authorname: "",
    description: "",
    link: ""
  });
  const [reviewData, setReviewData] = useState({
    reviewer: "",
    rating: "",
    comment: ""
  });
  const [bookId, setBookId] = useState(null);
  const [bookReviews, setBookReviews] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/books");
      setBooks(response.data);
    } catch (error) {
      setAlert({ show: true, message: "Failed to fetch books", variant: "danger" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleAddBook = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/books", formData);
      setBooks([...books, response.data]);
      setShowAddModal(false);
      setAlert({ show: true, message: "Book added successfully", variant: "success" });
    } catch (error) {
      setAlert({ show: true, message: "Failed to add book", variant: "danger" });
    }
  };

  const handleEditBook = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/books/${formData._id}`, formData);
      setBooks(books.map((book) => (book._id === formData._id ? response.data : book)));
      setShowEditModal(false);
      setAlert({ show: true, message: "Book updated successfully", variant: "success" });
    } catch (error) {
      setAlert({ show: true, message: "Failed to update book", variant: "danger" });
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
      setAlert({ show: true, message: "Book deleted successfully", variant: "success" });
    } catch (error) {
      setAlert({ show: true, message: "Failed to delete book", variant: "danger" });
    }
  };

  const handleAddReview = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/books/${bookId}/reviews`, reviewData);
      setBookReviews([...bookReviews, response.data]);
      setShowReviewModal(false);
      setShowReviewsModal(false);
      setAlert({ show: true, message: "Review added successfully", variant: "success" });
    } catch (error) {
      setAlert({ show: true, message: "Failed to add review", variant: "danger" });
    }
  };

  const handleEditReview = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/books/${bookId}/reviews/${reviewData._id}`, reviewData);
      setBookReviews(
        bookReviews.map((review) => (review._id === reviewData._id ? response.data : review))
      );
      setShowReviewModal(false);
      setShowReviewsModal(false);
      setAlert({ show: true, message: "Review updated successfully", variant: "success" });
    } catch (error) {
      setAlert({ show: true, message: "Failed to update review", variant: "danger" });
    }
  };

  const handleDeleteReview = async (reviewId) => {

    console.log(bookId, reviewId);
    
    try {
      await axios.delete(`http://localhost:8000/api/books/${bookId}/reviews/${reviewId}`);
      setBookReviews(bookReviews.filter((review) => review._id !== reviewId));
      setAlert({ show: true, message: "Review deleted successfully", variant: "success" });
    } catch (error) {
      
      setAlert({ show: true, message: "Failed to delete review", variant: "danger" });
    }
  };

  const handleShowReviews = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/books/${id}/reviews`);
      setBookReviews(response.data);
      setBookId(id);
      setShowReviewsModal(true);
    } catch (error) {
      setAlert({ show: true, message: "Failed to fetch reviews", variant: "danger" });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mx-3 my-3">
        <h1 className="text-primary">Book Manager</h1>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Add New Book
        </Button>
      </div>

      <BookTable
        books={books}
        onEdit={(book) => {
          setFormData(book);
          setShowEditModal(true);
        }}
        onDelete={handleDeleteBook}
        onShowReviews={handleShowReviews}
        onAddReview={(id) => {
          setBookId(id);
          setShowReviewModal(true);
        }}
      />

      <BookFormModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleAddBook}
        title="Add Book"
      />

      <BookFormModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleEditBook}
        title="Edit Book"
      />

      <ReviewFormModal
        show={showReviewModal}
        onHide={() => setShowReviewModal(false)}
        reviewData={reviewData}
        handleReviewChange={handleReviewChange}
        handleSubmit={reviewData._id ? handleEditReview : handleAddReview}
        title={reviewData._id ? "Edit Review" : "Add Review"}
      />

      <ReviewListModal
        show={showReviewsModal}
        onHide={() => setShowReviewsModal(false)}
        bookReviews={bookReviews}
        onEditReview={(review) => {
          setReviewData(review);
          setShowReviewModal(true);
        }}
        onDeleteReview={handleDeleteReview}
      />

      <AlertMessage
        alert={alert}
        onClose={() => setAlert({ ...alert, show: false })}
      />
    </div>
  );
};

export default BookManager;
