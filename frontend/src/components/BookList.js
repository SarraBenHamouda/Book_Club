import React, { useState, useEffect } from 'react';
import { getBooks, deleteBook, updateBook } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/list.jpg';

const BookList = ({ onLogout }) => {
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);
  const [editedBook, setEditedBook] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };

    fetchBooks();
  }, []);

  const handleEditBook = (book) => {
    setEditingBookId(book._id);
    setEditedBook({ ...book });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveBook = async () => {
    try {
      await updateBook(editingBookId, editedBook);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === editingBookId ? { ...book, ...editedBook } : book
        )
      );
      setEditingBookId(null);
      alert('Book updated successfully');
    } catch (err) {
      console.error('Error updating book:', err);
      alert('Failed to update book');
    }
  };

  const handleCancelEdit = () => {
    setEditingBookId(null);
    setEditedBook({});
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  const handleFavoriteBook = (bookId) => {
    const favoriteBook = books.find((book) => book._id === bookId);
    if (favoriteBook) {
      const updatedBooks = [favoriteBook, ...books.filter((book) => book._id !== bookId)];
      setBooks(updatedBooks);
      alert(`${favoriteBook.title} is marked as your favorite!`);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
        color: 'white',
      }}
    >
      <h2>Your Favorite Books Are Here! &#x1F4D6;</h2>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={onLogout} style={{ marginRight: '10px' }}>
          Logout &#x1F3C3;
        </button>
        <button onClick={() => navigate('/add-book')}>Add Book &#x1F4DA;</button>
      </div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {books.length > 0 ? (
          books.map((book) => (
            <li
              key={book._id}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '8px',
              }}
            >
              {editingBookId === book._id ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={editedBook.title || ''}
                    onChange={handleInputChange}
                    placeholder="Title"
                    style={{
                      width: '100%',
                      padding: '5px',
                      marginBottom: '5px',
                      borderRadius: '4px',
                    }}
                  />
                  <input
                    type="text"
                    name="author"
                    value={editedBook.author || ''}
                    onChange={handleInputChange}
                    placeholder="Author"
                    style={{
                      width: '100%',
                      padding: '5px',
                      marginBottom: '5px',
                      borderRadius: '4px',
                    }}
                  />
                  <input
                    type="text"
                    name="genre"
                    value={editedBook.genre || ''}
                    onChange={handleInputChange}
                    placeholder="Genre"
                    style={{
                      width: '100%',
                      padding: '5px',
                      marginBottom: '5px',
                      borderRadius: '4px',
                    }}
                  />
                  <input
                    type="text"
                    name="publishedYear"
                    value={editedBook.publishedYear || ''}
                    onChange={handleInputChange}
                    placeholder="Published Year"
                    style={{
                      width: '100%',
                      padding: '5px',
                      marginBottom: '5px',
                      borderRadius: '4px',
                    }}
                  />
                  <button onClick={handleSaveBook} style={{ marginRight: '10px' }}>
                    Save &#x1F4CC;
                  </button>
                  <button onClick={handleCancelEdit}>Cancel &#x274C;</button>
                </div>
              ) : (
                <div>
                  <p>
                    <strong>Title:</strong> {book.title}
                  </p>
                  <p>
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p>
                    <strong>Genre:</strong> {book.genre}
                  </p>
                  <p>
                    <strong>Published Year:</strong> {book.publishedYear}
                  </p>
                  <button
                    onClick={() => handleEditBook(book)}
                    style={{ marginRight: '10px' }}
                  >
                    Update &#x2B55;
                  </button>
                  <button
                    onClick={() => handleDeleteBook(book._id)}
                    style={{ marginRight: '10px' }}
                  >
                    Delete &#x274C;
                  </button>
                  <button
                    onClick={() => handleFavoriteBook(book._id)}
                    style={{ marginRight: '10px' }}
                  >
                    Favorite &#x1F338;
                  </button>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>No books available</p>
        )}
      </ul>
    </div>
  );
};

export default BookList;
