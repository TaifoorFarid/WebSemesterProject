import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
// import 'C:/Users/LAPTOP/Desktop/Book_Review_Website/frontend/src/Css-Files/Postbooks.css';
// import "../Css-Files/postbooks.css";
// import two from 'C:/Users/LAPTOP/Desktop/Book_Review_Website/frontend/src/prehome1.png';
// import one from 'C:/Users/LAPTOP/Desktop/Book_Review_Website/frontend/src/prehome2.png';
// import { useAuth } from "./AuthContent";

const Postbooks = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const difference = +new Date("2024-12-31") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (5000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  function formatTimeLeft() {
    const { days, hours, minutes, seconds } = timeLeft;
    return (
      <div className="timer">
        <div className="timer-circle">
          <span>{days}</span>
          <div className="timer-label">DAYS</div>
        </div>
        <div className="timer-circle">
          <span>{hours}</span>
          <div className="timer-label">HOURS</div>
        </div>
        <div className="timer-circle">
          <span>{minutes}</span>
          <div className="timer-label">MINUTES</div>
        </div>
        <div className="timer-circle">
          <span>{seconds}</span>
          <div className="timer-label">SECONDS</div>
        </div>
      </div>
    );
  }

  return (
    <div
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
    >
      <Row className="w-100">
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center bg-coolr "
        >
          <div
            className="d-flex flex-column align-items-center justify-content-center bg-img-left"
            style={{
              backgroundImage: `url(assets/1.png)`,
            }}
          ></div>
        </Col>
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="text-center">
            <div className="category-icon" style={{ marginBottom: "20px" }}>
              <img src={"assets/1.png"} alt="Icon" style={{ width: "50px" }} />
            </div>
            <h1 className="head-color">COMING SOON!</h1>
            <p>
              "Currently, this module needs to be implemented. Later, the
              publisher will log in here and then be able to post their books."
            </p>
            {formatTimeLeft()}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Postbooks;
