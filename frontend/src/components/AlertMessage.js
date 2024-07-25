import React from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = ({ alert, onClose }) => {
  return (
    alert.show && (
      <Alert variant={alert.variant} onClose={onClose} dismissible>
        {alert.message}
      </Alert>
    )
  );
};

export default AlertMessage;
