const Book = require('../models/Book');

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, description } = req.body;
    const book = new Book({
      title,
      description,
      userId: req.user.id,
    });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('userId', 'firstName lastName');
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    book.title = req.body.title || book.title;
    book.description = req.body.description || book.description;
    await book.save();

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    await book.remove();
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
