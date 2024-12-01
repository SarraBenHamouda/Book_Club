import axios from 'axios';

// Set the base URL for your API (replace with your backend URL)
const API_URL = 'http://localhost:8000/api';  // Replace with your backend URL

// Example: Get all books
export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    return response.data; // Returns the books data
  } catch (error) {
    throw new Error('Error fetching books: ' + error.message);
  }
};

// Example: Add a new book
export const addBook = async (bookData) => {
  try {
    const response = await axios.post(`${API_URL}/books`, bookData);
    return response.data; // Returns the added book data
  } catch (error) {
    throw new Error('Error adding book: ' + error.message);
  }
};

// Example: Delete a book
export const deleteBook = async (bookId) => {
  try {
    await axios.delete(`${API_URL}/books/${bookId}`);
  } catch (error) {
    throw new Error('Error deleting book: ' + error.message);
  }
};

// Example: Update a book
export const updateBook = async (bookId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/books/${bookId}`, updatedData);
    return response.data; // Returns the updated book data
  } catch (error) {
    throw new Error('Error updating book: ' + error.message);
  }
};
