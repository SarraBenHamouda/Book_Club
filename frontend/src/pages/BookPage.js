import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getBooks, addBook } from '../utils/api';  // Import the functions from api.js


const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', description: '' });

  useEffect(() => {
    // Fetch books from the backend
    axios.get('http://your-backend-url/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleAddBook = (e) => {
    e.preventDefault();
    axios.post('http://your-backend-url/books', newBook)
      .then(response => {
        setBooks([...books, response.data]);
        setNewBook({ title: '', author: '', description: '' });
      })
      .catch(error => console.error('Error adding book:', error));
  };

  return (
    <div>
      <h2>Books</h2>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newBook.description}
          onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
        />
        <button type="submit">Add Book</button>
      </form>

      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookPage;
