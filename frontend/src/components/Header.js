import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContent";
// import 'C:/Users/LAPTOP/Desktop/Book_Review_Website/frontend/src/Css-Files/Header.css';
// import "../Css-Files/Header.css";

const Header = ({ scrollToAbout, scrollToEBooks, scrollToContact }) => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("#home");
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash || location.pathname;
    setActiveSection(hash);
  }, [location]);

  const handleLogout = () => {
    logout();
    // Perform any additional logout actions like redirecting if necessary
  };

  return (
    <header className="header-container py-4">
      <nav>
        <ul>
          <li>
            <Link
              className={`nav-link ${
                activeSection === "#home" ? "active" : ""
              }`}
              to="/home"
              onClick={() => setActiveSection("#home")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                activeSection === "#home" ? "active" : ""
              }`}
              to="/books"
              onClick={() => setActiveSection("#home")}
            >
              Books
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                activeSection === "#about" ? "active" : ""
              }`}
              to="/#about"
              onClick={() => setActiveSection("#about")}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                activeSection === "#ebooks" ? "active" : ""
              }`}
              to="/reviewbook"
              onClick={() => setActiveSection("#ebooks")}
            >
              Review Book
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                activeSection === "#ebooks" ? "active" : ""
              }`}
              to="/allbook"
              onClick={() => setActiveSection("#ebooks")}
            >
              All Book
            </Link>
          </li>
          <li>
            <Link
              className={`nav-link ${
                activeSection === "#contact" ? "active" : ""
              }`}
              to="/contact"
              onClick={() => setActiveSection("#contact")}
            >
              Contact Us
            </Link>
          </li>
          {user && (
            <li>
              <Link
                className={`nav-link ${
                  activeSection === "/profile" ? "active" : ""
                }`}
                to="/profile"
                onClick={() => setActiveSection("/profile")}
              >
                Profile
              </Link>
            </li>
          )}
          {user ? (
            <li>
              <button className="nav-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                className={`nav-link ${
                  activeSection === "/login" ? "active" : ""
                }`}
                to="/login"
                onClick={() => setActiveSection("/login")}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
