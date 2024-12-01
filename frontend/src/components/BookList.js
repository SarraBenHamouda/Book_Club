import React, { useState, useEffect } from 'react';
import { getBooks, deleteBook, updateBook } from '../utils/api';
import { useNavigate } from 'react-router-dom';

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

  // Handle editing a book
  const handleEditBook = (book) => {
    setEditingBookId(book._id);
    setEditedBook({ ...book });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prev) => ({ ...prev, [name]: value }));
  };

  // Handle saving the updated book
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

  // Handle canceling edit mode
  const handleCancelEdit = () => {
    setEditingBookId(null);
    setEditedBook({});
  };

  // Handle deleting a book
  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  return (
    <div>
      <h2>Books List</h2>
      <button onClick={onLogout}>Logout</button>
      <button onClick={() => navigate('/add-book')}>Add Book</button>
      <ul>
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book._id}>
              {editingBookId === book._id ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={editedBook.title || ''}
                    onChange={handleInputChange}
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    name="author"
                    value={editedBook.author || ''}
                    onChange={handleInputChange}
                    placeholder="Author"
                  />
                  <input
                    type="text"
                    name="genre"
                    value={editedBook.genre || ''}
                    onChange={handleInputChange}
                    placeholder="Genre"
                  />
                  <input
                    type="text"
                    name="publishedYear"
                    value={editedBook.publishedYear || ''}
                    onChange={handleInputChange}
                    placeholder="Published Year"
                  />
                  <button onClick={handleSaveBook}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <div>
                  <p><strong>Title:</strong> {book.title}</p>
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Genre:</strong> {book.genre}</p>
                  <p><strong>Published Year:</strong> {book.publishedYear}</p>
                  <button onClick={() => handleEditBook(book)}>Update</button>
                  <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
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
