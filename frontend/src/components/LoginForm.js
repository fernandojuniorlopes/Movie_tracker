import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Adjust the path accordingly
import '../styles/main.css'

const LoginForm = () => {
  const { login } = useContext(AuthContext); // Use the login function from AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const tokenObject = await response.json();
        const tokenString = tokenObject.token;
        // Use the login function from AuthContext to update authentication state
        login(tokenString);
        window.location.href = '/';
      } else {
        console.error('Error logging in');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-div">
    <form onSubmit={handleLogin} className='login-form'>
    <b>Email</b>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <b>Password</b>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      &nbsp;
      <button><Link to="/">Cancel</Link></button>
    </form>
    </div>
  );
};

export default LoginForm;