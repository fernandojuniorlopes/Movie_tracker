import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/main.css'

const LoginForm = () => {
  const { login } = useContext(AuthContext); // Login function from AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await login(email, password);
    if (response.ok) {
      console.log('User login successfully');
    } else {
      console.error('Error logging user:', response.statusText);
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