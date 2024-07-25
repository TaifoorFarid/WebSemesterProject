import React from "react";
import { Button, Modal } from "react-bootstrap";

const ReviewListModal = ({
  show,
  onHide,
  bookReviews,
  onEditReview,
  onDeleteReview
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Book Reviews</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bookReviews.map((review) => (
          <div key={review._id} className="border rounded p-3 mb-3">
            <p><strong>Reviewer:</strong> {review.reviewer}</p>
            <p><strong>Rating:</strong> {review.rating}</p>
            <p><strong>Comment:</strong> {review.comment}</p>
            <Button variant="warning" onClick={() => onEditReview(review)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => onDeleteReview(review._id)}>
              Delete
            </Button>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewListModal;
