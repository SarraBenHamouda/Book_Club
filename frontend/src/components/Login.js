import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../images/background.png'; // Adjust the path as needed

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send the login data to the backend
      const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });

      // Store the token (you can store it in localStorage or context)
      localStorage.setItem('token', response.data.token);

      // Call the onLogin function passed as a prop to update the login state
      onLogin(response.data.token);

      // Redirect to the home page (or BookList)
      navigate('/books');  
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`, // Add the background image
        backgroundSize: 'cover', // Cover the entire screen with the image
        backgroundPosition: 'center', // Center the image
        minHeight: '100vh', // Full page height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'white', // Optional: to make the text stand out against the background
        padding: '20px',
      }}
    >
      <h2>Welcome To Bookly &#x1F64B;</h2>
      {error && <p style={{ color: 'pink' }}>{error}</p>}
      <form onSubmit={handleLogin} style={{ maxWidth: '400px', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '8px' }}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#DBB5B5', color: 'white', border: 'none', borderRadius: '4px' }}>Login</button>
      </form>

      <p style={{ marginTop: '10px' }}>
        OH you Don't have an account? <a href="/register" style={{ color: '#DBB5B5' }}>Register here &#x1F647;</a>
      </p>
    </div>
  );
};

export default Login;
