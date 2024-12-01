const express = require('express');
const Book = require('../models/Book'); // Assuming you have a Book model
const router = express.Router();

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();  // Fetch all books
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a specific book by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id); // Fetch book by ID
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new book
router.post('/', async (req, res) => {
  const { title, author, genre, publishedYear } = req.body;

  if (!title || !author || !genre || !publishedYear) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newBook = new Book({ title, author, genre, publishedYear });
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update book
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, publishedYear } = req.body;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.publishedYear = publishedYear || book.publishedYear;

    await book.save();
    res.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a book
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
