const express = require('express');
const User = require('../models/User');
const router = express.Router();

// POST login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the password with the stored password (Note: Password should be hashed in production)
    if (user.password !== password) {  // In real-life scenarios, compare hashed passwords
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // On successful login, return the user information (consider generating JWT token)
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
