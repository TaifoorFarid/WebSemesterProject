import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
// import 'C:/Users/LAPTOP/Desktop/Book_Review_Website/frontend/src/Css-Files/Profile.css';

const fetchLoggedInUserData = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/log_reg_forms", {});
    const contentType = response.headers.get("content-type");
    console.log("Response content-type:", contentType);

    if (!response.ok) {
      throw new Error("Failed to fetch logged-in user");
    }

    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Unexpected response:", text);
      throw new Error(`Expected JSON but received: ${text}`);
    }

    const data = await response.json();
    console.log("Raw fetched data:", data); // Log the raw data
    return data;
  } catch (error) {
    console.error("Error fetching logged-in user data:", error);
    return { name: "", email: "", password: "" };
  }
};
const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchLoggedInUserData();
      console.log("Fetched user data in Profile:", data); // Log the data in the Profile component
      setUserData(data);
    };

    getUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Save user data to the database
    console.log("User data saved:", userData);
  };

  return (
    <>
      <div className="background-imag">
        <Container className="profile-container mt-5">
          <h1 className="text-center">Profile</h1>
          <Row className="justify-content-center">
            <Col md={8}>
              <h2 className="text-left account-settings">Account Settings</h2>
              <Form>
                {/* <Form.Group as={Row} className="mb-3 form-group-spacing" controlId="name">
                                    <Form.Label column sm={3} className="form-label">
                                        Name
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={userData.name}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </Col>
                                </Form.Group> */}
                <Form.Group
                  as={Row}
                  className="mb-3 form-group-spacing"
                  controlId="email"
                >
                  <Form.Label column sm={3} className="form-label">
                    Email
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3 form-group-spacing"
                  controlId="password"
                >
                  <Form.Label column sm={3} className="form-label">
                    Password
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="password"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </Col>
                </Form.Group>
                <div className="save-button">
                  <Button variant="primary" onClick={handleSave}>
                    Update
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Profile;
