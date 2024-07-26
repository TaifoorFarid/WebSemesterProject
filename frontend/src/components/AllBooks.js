import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
// import one from "C:/Users/LAPTOP/Desktop/Book_Review_Website/frontend/src/allbooks.jpg";
// import one from "../books.jpg";
// import five from "C:/Users/LAPTOP/Desktop/Book_Review_Website/frontend/src/books.jpg";
// import five from "../allbook.jpg";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.state]);

  useEffect(() => {
    fetch("http://localhost:3001/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="all-books-page">
      <div
        className="header-image"
        // style={{ backgroundImage: `url(${one})` }}
      >
        <h1 className="header-title">All Books</h1>
        <p className="header-subtitle">
          Discover a variety of books and search for your favorite ones
        </p>
        <Form.Control
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>
      <div
        className="books-section"
        // style={{ backgroundImage: `url(${five})` }}
      >
        <Container className="all-books-container">
          <Row>
            {filteredBooks.map((book, index) => (
              <Col key={index} md={4} className="book-card mb-4">
                <Button
                  className="book-link"
                  variant="dark"
                  onClick={() => navigate("/reviewbook", { state: { book } })}
                >
                  <div className="book-image">
                    <img src={book.imageUrl} alt={book.name} />
                  </div>
                  <div className="book-details">
                    <h3>{book.name}</h3>
                    <p>Rating: {book.rating}</p>
                  </div>
                </Button>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AllBooks;
