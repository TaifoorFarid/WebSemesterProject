import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";

const CountingBox = ({ start, end, text }) => {
  const [count, setCount] = useState(start);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let current = start;
      const increment = (end - start) / 100;
      const interval = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(Math.ceil(current));
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [inView, start, end]);

  return (
    <div ref={ref} className="box-content">
      <div className="count">{count}</div>
      <div className="underline"></div>
      <div className="box-text">{text}</div>
    </div>
  );
};

const Home = () => {
  //   const { user, logout } = useAuth();
  const aboutSectionRef = useRef(null);
  const ebooksSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const homeSectionRef = useRef(null);
  const [activeSection, setActiveSection] = useState("#home");
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [visibleBooksCount, setVisibleBooksCount] = useState(6);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      alert(`Failed to send message: ${error.message}`);
    }
    // Clear the form fields
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      description: "",
    });
  };

  //   const handleLogout = () => {
  //     logout();
  //   };

  const scrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (location.hash === "#about") {
      scrollToSection(aboutSectionRef);
    } else if (location.hash === "#ebooks") {
      scrollToSection(ebooksSectionRef);
    } else if (location.hash === "#contact") {
      scrollToSection(contactSectionRef);
    } else if (location.hash == "#home") {
      scrollToSection(homeSectionRef);
    }
  }, [location]);

  useEffect(() => {
    fetch("http://localhost:3001/api/books")
      .then((response) => response.json())
      .then((data) => {
        console.log("Books data:", data); // Log the data to verify
        setBooks(data);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  // const handleShowMore = () => {
  //     setVisibleBooksCount(visibleBooksCount + 6);
  // };

  return (
    <>
      <div
        className="home-background"
        ref={homeSectionRef}
        id="home"
        style={{ backgroundImage: `url(assets/1.png)` }}
      >
        <Container className="home-container d-flex flex-column justify-content-center align-items-center vh-100">
          <Row className="w-100 align-items-center mb-4">
            <Col
              md={8}
              className="d-flex flex-column justify-content-center text-start"
            >
              {/* <h1>Welcome {user ? user.name : "User"}! To Review Reads</h1> */}
              <h1>Welcome {"User"}! To Review Reads</h1>
              <p>
                Running an affiliate store is not the rocket building. Get this
                free guide and earn a fortune selling website templates online.
                Immediately after glancing through the first pages of the book
                it became obvious to me – this is a masterpiece and a real
                blueprint for young entrepreneurs to act on!
              </p>
              <div className="button-wrapper mt-3">
                <Link to="">
                  <Button variant="primary">Read More</Button>
                </Link>
              </div>
            </Col>
            <Col
              md={4}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                src={"assets/2.png"}
                alt="Additional"
                className="additional-image"
              />
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <Container className="color-box-container">
          <Row>
            <Col md={3} className="color-box box1">
              <CountingBox
                start={0}
                end={100}
                text="Pages, all enhanced by lots of insights and tips for young entrepreneurs"
              />
            </Col>
            <Col md={3} className="color-box box2">
              <CountingBox
                start={0}
                end={200}
                text="eBooks for entrepreneurs, website owners, and marketers"
              />
            </Col>
            <Col md={3} className="color-box box3">
              <CountingBox
                start={0}
                end={300}
                text="eBooks downloads in the last 12 months"
              />
            </Col>
            <Col md={3} className="color-box box4">
              <CountingBox
                start={0}
                end={400}
                text="Years of work, with hundreds of interviews with fellow colleagues."
              />
            </Col>
          </Row>
        </Container>
      </div>
      <div
        className="about-background"
        ref={aboutSectionRef}
        id="about"
        style={{ backgroundColor: "white" }}
      >
        <Container className="about-container vh-100 d-flex flex-column justify-content-between">
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1 className="about-heading">About Us</h1>
              <div className="underline mx-auto"></div>
            </Col>
          </Row>
          <Row className="w-100 align-items-center about-content flex-grow-1">
            <Col
              md={4}
              className="icons-section d-flex flex-column justify-content-start align-items-start"
            >
              <div className="icon-item d-flex align-items-center mb-4 ">
                <img
                  src={"assets/svg.svg"}
                  alt="Support Icon"
                  className="icon-image me-3 "
                />
                <div className="icon-text">
                  <h5>24/7 CUSTOMER SUPPORT</h5>
                  <p>Call: +0123 456 789</p>
                </div>
              </div>
              <div className="icon-item d-flex align-items-center mb-4">
                <img
                  src={"assets/svg2.svg"}
                  alt="Shipping Icon"
                  className="icon-image me-3"
                />
                <div className="icon-text">
                  <h5>FREE SHIPPING WORLD WIDE</h5>
                  <p>On Order Over $99</p>
                </div>
              </div>
              <div className="icon-item d-flex align-items-center mb-4">
                <img
                  src={"assets/svg3.svg"}
                  alt="Money Back Icon"
                  className="icon-image me-3"
                />
                <div className="icon-text">
                  <h5>MONEY BACK GUARANTEE</h5>
                  <p>100% Money Back</p>
                </div>
              </div>
            </Col>
            <Col md={8} className="additional-about-content">
              <div className="d-flex flex-column align-items-start">
                <p>
                  At Review Reads, our mission is to provide readers with
                  in-depth, honest, and insightful reviews of books across a
                  wide range of genres. We believe that books have the power to
                  transform lives, and our goal is to help you find the perfect
                  read for your needs, whether it's for personal enjoyment,
                  professional development, or academic purposes. Our team of
                  passionate reviewers is dedicated to delivering comprehensive
                  and unbiased evaluations, ensuring that you can make informed
                  decisions about your next literary adventure.Founded on the
                  principles of integrity and transparency, Review Reads strives
                  to be a trusted resource for book enthusiasts around the
                  world. We understand that the vast array of available titles
                  can be overwhelming, and we aim to simplify the selection
                  process by highlighting the strengths and weaknesses of each
                  book.
                </p>
                <div className="button-wrapper mt-3">
                  <Link to="">
                    <Button variant="primary">Read More</Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div
        className="books-section"
        ref={ebooksSectionRef}
        id="ebooks"
        style={{ backgroundImage: `url(assets/books.jpg)` }}
      >
        <Container>
          <Row>
            <h2 className="book-heading">Books</h2>
            {books.slice(0, visibleBooksCount).map((book, index) => (
              <Col key={index} md={4} className="book-card">
                <Button
                  className="book-link"
                  variant="dark"
                  onClick={() =>
                    navigate("/reviewbook", {
                      state: { scrollToTop: true, book },
                    })
                  }
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
          {visibleBooksCount < books.length && (
            <Row className="justify-content-center mt-3">
              <Button
                variant="primary"
                className="more-books-button"
                onClick={() =>
                  navigate("/AllBooks", { state: { scrollToTop: true } })
                }
              >
                More Books
              </Button>
            </Row>
          )}
        </Container>
      </div>
      <div
        className="contact-background"
        ref={contactSectionRef}
        id="contact"
        style={{ backgroundImage: `url(assets/Contact.png)` }}
      >
        <Container className="contact-container d-flex flex-column justify-content-center align-items-center vh-100">
          <Row className="align-items-center w-100">
            <Col md={6} className="contact-image"></Col>
            <Col md={6}>
              <div className="contact-header">
                <h1 className="contact-heading">Get in Touch With Me</h1>
                <p>
                  Dealing with lots of mail regarding ebooks we really do
                  appreciate every shortest message or questions we get from
                  you.
                </p>
              </div>
              <Form className="contact-form" onSubmit={handleSubmit}>
                <Form.Group controlId="formFirstName" className="form-group">
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formLastName" className="form-group">
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="form-group">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="E-mail address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formDescription" className="form-group">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    placeholder="Your text here"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="contact-button"
                >
                  Let's Go
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
