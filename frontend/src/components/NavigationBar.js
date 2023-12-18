import React from 'react';
import '../styles/main.css'

const NavigationBar = () => {
  return (
    <div className="navigation-bar">
      <nav className="navbar">
        <ul className='left-links'>
          <li className='left-links li'><b>Home</b></li>
          <li className='left-links li'><b>Movies</b></li>
          <li className='left-links li'><b>Register</b></li>
          <li className='left-links li'><b>Login</b></li>
        </ul>
        <ul>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;