import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const BookFormModal = ({
  show,
  onHide,
  formData,
  handleInputChange,
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
          <Form.Group controlId="formName">
            <Form.Label className="text-secondary">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter book name"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formImageUrl">
            <Form.Label className="text-secondary">Image URL</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              placeholder="Enter image URL"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formRating">
            <Form.Label className="text-secondary">Rating</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              value={formData.rating}
              placeholder="Enter rating"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formAuthorname">
            <Form.Label className="text-secondary">Author Name</Form.Label>
            <Form.Control
              type="text"
              name="authorname"
              value={formData.authorname}
              placeholder="Enter author name"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label className="text-secondary">Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              placeholder="Enter description"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formLink">
            <Form.Label className="text-secondary">Link</Form.Label>
            <Form.Control
              type="text"
              name="link"
              value={formData.link}
              placeholder="Enter link"
              onChange={handleInputChange}
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

export default BookFormModal;
