import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Table, Alert } from "react-bootstrap";
import axios from "axios";

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    rating: "",
    authorname: "",
    description: "",
    link: "",
  });
  const [reviewData, setReviewData] = useState({
    reviewer: "",
    rating: "",
    comment: "",
  });
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/books");
      setBooks(response.data);
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to fetch books.",
        variant: "danger",
      });
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
      await axios.post("http://localhost:8000/api/books", formData);
      fetchBooks();
      setShowAddModal(false);
      setAlert({
        show: true,
        message: "Book added successfully.",
        variant: "success",
      });
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to add book.",
        variant: "danger",
      });
    }
  };

  const handleEditBook = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/books/${currentBook._id}`,
        formData
      );
      fetchBooks();
      setShowEditModal(false);
      setAlert({
        show: true,
        message: "Book updated successfully.",
        variant: "success",
      });
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to update book.",
        variant: "danger",
      });
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/books/${id}`);
      fetchBooks();
      setAlert({
        show: true,
        message: "Book deleted successfully.",
        variant: "success",
      });
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to delete book.",
        variant: "danger",
      });
    }
  };

  const handleAddReview = async () => {
    try {
      await axios.post(
        `http://localhost:8000/api/books/${currentBook._id}/reviews`,
        reviewData
      );
      fetchBooks();
      setShowReviewModal(false);
      setAlert({
        show: true,
        message: "Review added successfully.",
        variant: "success",
      });
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to add review.",
        variant: "danger",
      });
    }
  };

  const handleEditReview = async (reviewId) => {
    try {
      await axios.put(
        `http://localhost:8000/api/books/${currentBook._id}/reviews/${reviewId}`,
        reviewData
      );
      fetchBooks();
      setShowReviewModal(false);
      setAlert({
        show: true,
        message: "Review updated successfully.",
        variant: "success",
      });
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to update review.",
        variant: "danger",
      });
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/books/${currentBook._id}/reviews/${reviewId}`
      );
      fetchBooks();
      setAlert({
        show: true,
        message: "Review deleted successfully.",
        variant: "success",
      });
    } catch (error) {
      setAlert({
        show: true,
        message: "Failed to delete review.",
        variant: "danger",
      });
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setShowAddModal(true)}>
        Add New Book
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image URL</th>
            <th>Rating</th>
            <th>Author</th>
            <th>Description</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.name}</td>
              <td>
                <a
                  href={book.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Image
                </a>
              </td>
              <td>{book.rating}</td>
              <td>{book.authorname}</td>
              <td>{book.description}</td>
              <td>
                <a href={book.link} target="_blank" rel="noopener noreferrer">
                  Link
                </a>
              </td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => {
                    setCurrentBook(book);
                    setFormData(book);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteBook(book._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="info"
                  onClick={() => {
                    setCurrentBook(book);
                    setReviewData({ reviewer: "", rating: "", comment: "" });
                    setShowReviewModal(true);
                  }}
                >
                  Add Review
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Book Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter book name"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                placeholder="Enter image URL"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                value={formData.rating}
                placeholder="Enter rating"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formAuthorname">
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                name="authorname"
                value={formData.authorname}
                placeholder="Enter author name"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                placeholder="Enter description"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formLink">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                name="link"
                value={formData.link}
                placeholder="Enter link"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddBook}>
              Add Book
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Book Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter book name"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                placeholder="Enter image URL"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                value={formData.rating}
                placeholder="Enter rating"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formAuthorname">
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                name="authorname"
                value={formData.authorname}
                placeholder="Enter author name"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                placeholder="Enter description"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formLink">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                name="link"
                value={formData.link}
                placeholder="Enter link"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleEditBook}>
              Update Book
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Add Review Modal */}
      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formReviewer">
              <Form.Label>Reviewer</Form.Label>
              <Form.Control
                type="text"
                name="reviewer"
                value={reviewData.reviewer}
                placeholder="Enter reviewer name"
                onChange={handleReviewChange}
              />
            </Form.Group>
            <Form.Group controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                value={reviewData.rating}
                placeholder="Enter rating"
                onChange={handleReviewChange}
              />
            </Form.Group>
            <Form.Group controlId="formComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                name="comment"
                value={reviewData.comment}
                placeholder="Enter comment"
                onChange={handleReviewChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddReview}>
              Add Review
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert({ ...alert, show: false })}
          dismissible
        >
          {alert.message}
        </Alert>
      )}
    </div>
  );
};

export default BookManager;
