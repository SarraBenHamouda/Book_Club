import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook to navigate after registration
import axios from 'axios'; // Import axios for making HTTP requests

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Used to navigate after successful registration

  const handleRegister = async (e) => {
    e.preventDefault();

    // Clear any previous errors
    setError(null);

    try {
      // Send the registration data to the backend via a POST request
      const response = await axios.post('http://localhost:8000/api/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });

      // If the response status is 201 (created), registration was successful
      if (response.status === 201) {
        alert('Registration successful!');
        navigate('/books'); // Redirect to login page after successful registration
      }
    } catch (err) {
      // Handle any errors that occur (e.g., user already exists, missing fields)
      console.error('Registration error:', err.response ? err.response.data : err);
      setError(err.response ? err.response.data.error : 'Registration failed, please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>} {/* Display any error messages */}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
