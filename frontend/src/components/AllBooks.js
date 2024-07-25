import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import axios from "axios";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <h1 className="mb-4">All Books</h1>
      <Form.Control
        type="text"
        placeholder="Search books by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Row>
        {filteredBooks.map((book) => (
          <Col key={book._id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={book.imageUrl} alt={book.name} />
              <Card.Body>
                <Card.Title>{book.name}</Card.Title>
                <Card.Text>
                  <strong>Author:</strong> {book.authorname}
                </Card.Text>
                <Card.Text>
                  <strong>Rating:</strong> {book.rating}
                </Card.Text>
                <Card.Text>
                  <strong>Description:</strong> {book.description}
                </Card.Text>
                <Card.Text>
                  <a href={book.link} target="_blank" rel="noopener noreferrer">
                    More Info
                  </a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllBooks;
