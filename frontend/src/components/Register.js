import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// import 'C:/Users/LAPTOP/Desktop/Book_Review_Website/frontend/src/Css-Files/Login.css';

const Register = () => {
  const [role, setRole] = useState("Reader");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/register", {
        name,
        email,
        password,
        role,
        additionalInfo,
      })
      .then((result) => {
        console.log(result);
        if (result.data === "Already registered") {
          alert("E-mail already registered! Please Login to proceed.");
          navigate("/login");
        } else {
          alert("Registered successfully! Please Login to proceed.");
          navigate("/login");
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
        className="d-flex justify-content-center align-items-center text-center vh-100"
      >
        <Row className="login-container login-section" style={{ width: "40%" }}>
          <Col className="login-card">
            <h2 className="mb-3 text-primary">Register</h2>

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
              <Form.Group className="mb-3 text-start" controlId="formBasicName">
                <Form.Label>
                  <strong>Name</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  onChange={(event) => setName(event.target.value)}
                  className="form-control-black"
                  required
                />
              </Form.Group>

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
                  className="form-control-black"
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
                  className="form-control-black"
                  required
                />
              </Form.Group>

              {role === "Publisher" && (
                <Form.Group
                  className="mb-3 text-start"
                  controlId="formBasicInfo"
                >
                  <Form.Label>
                    <strong>Additional Info</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Additional Info"
                    onChange={(event) => setAdditionalInfo(event.target.value)}
                    className="form-control-black"
                  />
                </Form.Group>
              )}

              <Button
                variant="primary"
                type="submit"
                className="btn btn-primary"
              >
                Register
              </Button>
            </Form>

            <p className="container my-2 login-text">
              Already have an account?
            </p>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
