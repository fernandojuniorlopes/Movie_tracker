import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext'

const RegistrationForm = () => {
  const {register} = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async (event) => {
    event.preventDefault();
    const response = await register(username, email, password);
    if (response.ok) {
      console.log('User registered successfully');
  } else {
      console.error('Error registering user:', response.statusText);
  }
  };

  return (
    <div className="login-div">
      <form onSubmit={handleRegistration} className='login-form'>
        <b>Username</b>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc' }} placeholder="Username" />
        <b>Email</b>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc' }} placeholder="Email" />
        <b>Password</b>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc' }} placeholder="Password" />
        <button type="submit" style={{ padding: '10px', border: '1px solid #ccc' }}>Register</button>
        &nbsp;
        <button><Link to="/">Cancel</Link></button>
      </form>
    </div>
  );
};

export default RegistrationForm;