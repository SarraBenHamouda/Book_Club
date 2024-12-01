import React, { useState } from 'react';
import { addBook } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/images.jpg'; // Import the background image

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title || !author || !genre || !publishedYear) {
        setError('All fields are required');
        return;
      }

      await addBook({ title, author, genre, publishedYear });
      navigate('/');
    } catch (err) {
      setError('Failed to add book');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`, // Reference the imported image
        backgroundSize: 'cover', // Cover the entire container
        backgroundPosition: 'center', // Center the image
        minHeight: '100vh', // Full page height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '20px',
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better readability
          padding: '20px',
          borderRadius: '8px',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <h2>New Book &#x1F4D2;</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Book Title"
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Genre"
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="number"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            placeholder="Published Year"
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          {error && <p style={{ color: 'pink' }}>{error}</p>}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#DBB5B5',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Add Book &#x1F4DA;
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
