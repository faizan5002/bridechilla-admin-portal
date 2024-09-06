import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // CSS file for styling
import logo from '../assets/logo.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const response = await fetch('https://precociousstrategies.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: email,     // Assuming your API uses 'login' for the email/username field
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.message === 'Login successful') {
        console.log('Login successful');
        navigate('/dashboard'); // Redirect to dashboard on successful login
      } else {
        setError('Invalid login credentials'); // Handle unsuccessful login
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logo} alt="Logo" className="logo" />
        <p>We’re happy to see you again. Enter your credentials to log in.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>UserName</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="actions">
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
