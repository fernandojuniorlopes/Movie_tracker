import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Adjust the path accordingly

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
    <form onSubmit={handleLogin} className='login-form'>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;