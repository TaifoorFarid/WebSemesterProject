import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext"; // Import the AuthContext
import { useAuth } from "./AuthContent";

const Login = () => {
  const [role, setRole] = useState("Reader");
  const { login } = useAuth(); // Use the authentication context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/login", { email, password, role })
      .then((result) => {
        if (result.data.user) {
          console.log("Login Success");
          login(result.data.user); // Pass user data to AuthContext
          alert("Login successful!");
          navigate(from, { replace: true });
        } else {
          alert(result.data.message || "Login failed! Please try again.");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleRoleChange = (val) => {
    setRole(val);
  };

  return (
    <div className="top">
      <Container
        fluid
        className="d-flex justify-content-center align-items-center text-center vh-100 "
      >
        <Row className="login-container login-section" style={{ width: "40%" }}>
          <Col className="login-card">
            <h2 className="mb-3 text-primary">Login</h2>
            <ToggleButtonGroup
              type="radio"
              name="roles"
              value={role}
              onChange={handleRoleChange}
              className="mb-3"
            >
              <ToggleButton
                id="tbg-radio-1"
                value={"Reader"}
                variant="outline-primary"
              >
                Reader
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-2"
                value={"Publisher"}
                variant="outline-primary"
              >
                Publisher
              </ToggleButton>
            </ToggleButtonGroup>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicEmail"
              >
                <Form.Label>
                  <strong>Email Id</strong>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  onChange={(event) => setEmail(event.target.value)}
                  className="form-control-black" // Apply the new class here
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicPassword"
              >
                <Form.Label>
                  <strong>Password</strong>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  onChange={(event) => setPassword(event.target.value)}
                  className="form-control-black" // Apply the new class here
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="btn get-started-btn"
              >
                Login
              </Button>
            </Form>
            <p className="container my-2 login-text">Don't have an account?</p>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
