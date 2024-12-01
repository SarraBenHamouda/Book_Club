// src/pages/HomePage.js

import React from 'react';
import BookList from '../components/BookList';
import AddBook from '../components/AddBook';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Book Management System</h1>
      <AddBook />
      <BookList />
    </div>
  );
};

export default HomePage;
