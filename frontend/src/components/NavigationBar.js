import '../styles/main.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavigationBar = () => {
  const { isLoggedIn, logout, token } = useAuth(); // Use the useAuth hook to get authentication state
  let [username, setUsername] = useState()

  useEffect(() => {
    // Asynchronous function to fetch data or perform an action
    const fetchData = async () => {
      try {
        if (isLoggedIn) {
        // Asynchronous function
        const result = await fetch('http://localhost:5000/api/protected-route', {
            method: 'GET',
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json',
            },
          });

        // JSON response
        const data = await result.json();

        // Set username
        setUsername(data.username);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    // Call the asynchronous function when the component mounts
    fetchData();

  }, [isLoggedIn, token]);
  return (
    <div className="navigation-bar">
      <nav className="navbar">
        <ul className='left-links'>
          <li className='left-links li'><Link to="/"><b>Home</b></Link></li>
          <li className='left-links li'><Link to="/movie"><b>Movies</b></Link></li>
        </ul>
        <ul className='right-links'>
          {!isLoggedIn && (
            <>
              <li className="right-links li"><Link to="/register"><b>Register</b></Link></li>
              <li className="right-links li"><Link to="/login"><b>Login</b></Link></li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="right-links li"><Link to="/list"><b>{username}</b></Link></li>
              <li className="right-links li" onClick={logout}><b>Logout</b></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;