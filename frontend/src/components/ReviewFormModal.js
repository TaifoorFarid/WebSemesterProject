import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ReviewFormModal = ({
  show,
  onHide,
  reviewData,
  handleReviewChange,
  handleSubmit,
  title
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formReviewer">
            <Form.Label className="text-secondary">Reviewer</Form.Label>
            <Form.Control
              type="text"
              name="reviewer"
              value={reviewData.reviewer}
              onChange={handleReviewChange}
            />
          </Form.Group>
          <Form.Group controlId="formReviewRating">
            <Form.Label className="text-secondary">Rating</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              value={reviewData.rating}
              onChange={handleReviewChange}
            />
          </Form.Group>
          <Form.Group controlId="formComment">
            <Form.Label className="text-secondary">Comment</Form.Label>
            <Form.Control
              type="text"
              name="comment"
              value={reviewData.comment}
              onChange={handleReviewChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {title}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewFormModal;
