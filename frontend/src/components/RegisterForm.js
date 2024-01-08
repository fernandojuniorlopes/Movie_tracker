import React, { useState } from 'react';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/register', { // Replace with your backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();
      console.log(data); // Display success or error message
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <form onSubmit={handleRegistration} className='login-form'>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc' }} placeholder="Username" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc' }} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc' }} placeholder="Password" />
      <button type="submit" style={{ padding: '10px', border: '1px solid #ccc' }}>Register</button>
    </form>
  );
};

export default RegistrationForm;