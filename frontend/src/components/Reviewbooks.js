import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";
import { useAuth } from "./AuthContent";
// import 'C:/Users/LAPTOP/Desktop/Book_Review_Website/frontend/src/Css-Files/ReviewBook.css';

const ReviewBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [book, setBook] = useState(
    location.state?.book || JSON.parse(localStorage.getItem("bookDetails"))
  );
  const [showForm, setShowForm] = useState(false);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [editReviewId, setEditReviewId] = useState(null);
  const [editReviewText, setEditReviewText] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    if (location.state?.scrollToTop) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.state]);

  useEffect(() => {
    if (book) {
      localStorage.setItem("bookDetails", JSON.stringify(book));
      fetchReviews(book.name);
    }
  }, [book]);

  const fetchReviews = async (bookname) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/reviews?bookname=${bookname}`
      );
      setReviews(response.data);
      if (user) {
        const userHasReviewed = response.data.some(
          (review) => review.userName === user.name
        );
        setHasReviewed(userHasReviewed);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleWriteReviewClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      localStorage.setItem("bookDetails", JSON.stringify(book));
      alert("Please log in first to give a review to the book.");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    const userName = user.name;

    try {
      const response = await axios.post("http://localhost:3001/api/reviews", {
        bookname: book.name,
        review,
        userName: userName,
      });
      const newReview = response.data;
      setReviews([...reviews, newReview]);
      setShowForm(false);
      setReview("");
      setHasReviewed(true);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:3001/api/reviews/${editReviewId}`, {
        review: editReviewText,
      });
      const updatedReviews = reviews.map((r) =>
        r._id === editReviewId ? { ...r, review: editReviewText } : r
      );
      setReviews(updatedReviews);
      setEditReviewId(null);
      setEditReviewText("");
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:3001/api/reviews/${reviewId}`);
      setReviews(reviews.filter((review) => review._id !== reviewId));
      if (
        user &&
        reviews.find((review) => review._id === reviewId).userName === user.name
      ) {
        setHasReviewed(false);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleMenuToggle = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= filledStars) {
        stars.push(
          <span key={i} className="filled-star">
            ★
          </span>
        );
      } else if (i === filledStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} className="half-star">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="empty-star">
            ☆
          </span>
        );
      }
    }
    return stars;
  };

  const handleReadClick = () => {
    window.open(book.link, "_blank");
  };

  return (
    <>
      <div className="page-container">
        <div className="background-imagess"></div>
        <Container className="book-details-containerss mt-5">
          <Row className="align-items-start">
            <Col md={4} className="book-imagess-col">
              <img
                src={book?.imageUrl}
                alt={book?.name}
                className="book-imagess"
              />
            </Col>
            <Col md={8}>
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="book-title">{book?.name}</h1>
                {user && user?.role !== "Reader" && (
                  <Link to="/Postbooks">
                    <Button variant="primary" className="ml-auto">
                      Post a book
                    </Button>
                  </Link>
                )}
              </div>
              <p className="book-author">By {book?.authorname}</p>
              <div className="book-rating">{renderStars(book?.rating)}</div>
              <p className="book-description">
                Description: {book?.description}
              </p>
              <Button
                variant="primary"
                className="mt-3"
                onClick={handleReadClick}
              >
                Read Book
              </Button>
              {user && user?.role !== "Publisher" && (
                <Button
                  variant="primary"
                  className="mt-3 buttonnn-gap"
                  onClick={handleWriteReviewClick}
                  disabled={hasReviewed}
                >
                  {hasReviewed
                    ? "You have already reviewed this book"
                    : "Write Review"}
                </Button>
              )}
            </Col>
          </Row>
          {showForm && (
            <Row className="mt-5">
              <Col>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="review">
                    <Form.Label>Write a Review</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Write your review here..."
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="mt-3">
                    Submit Review
                  </Button>
                </Form>
              </Col>
            </Row>
          )}
          <Row className="mt-5 reviews-section">
            <Col>
              <h2 className="review-heading">Rating & Reviews</h2>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="review">
                    <div className="review-header">
                      <div className="review-username">
                        <strong>{review?.userName}</strong>
                        {user && review?.userName === user?.name && (
                          <div className="review-menu">
                            <button
                              className="menu-btn"
                              onClick={() => handleMenuToggle(index)}
                            >
                              <span className="menu-dots">⋮</span>
                            </button>
                            {menuOpen === index && (
                              <div className="menu-dropdown">
                                <button
                                  onClick={() => {
                                    setEditReviewId(review?._id);
                                    setEditReviewText(review?.review);
                                    handleMenuToggle(index);
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(review._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="review-content">
                      <div className="review-text">
                        {editReviewId === review?._id ? (
                          <div className="edit-review-container">
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={editReviewText}
                              onChange={(e) =>
                                setEditReviewText(e.target.value)
                              }
                            />
                            <Button
                              className="save-edit-button"
                              onClick={handleEdit}
                            >
                              Save
                            </Button>
                          </div>
                        ) : (
                          <p>{review?.review}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-reviews">No reviews on this book</p>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ReviewBook;
