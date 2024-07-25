import React from "react";
import { Button, Table } from "react-bootstrap";

const BookTable = ({ books, onEdit, onDelete, onShowReviews, onAddReview }) => {
  return (
    <Table striped bordered hover className="mx-2">
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
              <a href={book.imageUrl} target="_blank" rel="noopener noreferrer">
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
            <td className="d-flex gap-3">
              <Button variant="warning" onClick={() => onEdit(book)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => onDelete(book._id)}>
                Delete
              </Button>
              <Button
                variant="info"
                onClick={() => onShowReviews(book._id)}
              >
                Show Reviews
              </Button>
              <Button
                variant="info"
                onClick={() => onAddReview(book._id)}
              >
                Add Review
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BookTable;
