import React, { useState } from 'react';
import { addBook } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure all fields are filled
      if (!title || !author || !genre || !publishedYear) {
        setError('All fields are required');
        return;
      }

      // Send new book data to the backend
      await addBook({ title, author, genre, publishedYear });

      // Navigate back to the book list after successful addition
      navigate('/');
    } catch (err) {
      setError('Failed to add book');
    }
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book Title"
          required
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
        />
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre"
          required
        />
        <input
          type="number"
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value)}
          placeholder="Published Year"
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
