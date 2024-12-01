// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import BookList from './components/BookList';
import Register from './components/Register';
import AddBook from './components/AddBook'; // Make sure to import AddBook
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulate user login check (this could be replaced with a real authentication check)
  useEffect(() => {
    const loggedInUser = localStorage.getItem('isLoggedIn');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');  // Persist login state (optional)
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');  // Remove persisted login state
  };

  return (
    <Router>
      <div>
        <Routes>
          {/* Login Route */}
          <Route
            path="/login"
            element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
          />
          {/* Register Route */}
          <Route path="/register" element={<Register />} />

          {/* Protected Route for BookList, show if logged in, else redirect to login */}
          <Route
            path="/"
            element={isLoggedIn ? <BookList onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          
          {/* Add Book Route */}
          <Route path="/add-book" element={<AddBook />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
