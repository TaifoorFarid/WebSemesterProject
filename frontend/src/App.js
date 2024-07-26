import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AllBooks from "./components/AllBooks";
import Footer from "./components/Footer";
import "./App.css";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Register from "./components/Register";
import ReviewBook from "./components/Reviewbooks";
import Header from "./components/Header";
import Login from "./components/Login";
import Postbooks from "./components/Postbooks";
import BookManager from "./components/Books";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

const AppContent = () => {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/Postbooks"
    ) {
      setShowHeader(true);
      setShowFooter(false);
    } else if (location.pathname === "/Postbooks") {
      setShowHeader(false);
      setShowFooter(false);
    } else {
      setShowFooter(true);
      if (location.pathname === "/reviewbook") {
        setShowHeader(true);
      } else {
        setShowHeader(true);
      }
    }
  }, [location]);

  return (
    <div>
      {showHeader && <Header />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/postbooks" element={<Postbooks />} />
          <Route path="/reviewbook" element={<ReviewBook />} />
          <Route path="/allbook" element={<AllBooks />} />
          <Route path="/books" element={<BookManager />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      {showFooter && <Footer />}
    </div>
  );
};

export default App;
