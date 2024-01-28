import '../styles/main.css';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import notFoundImage from '../utils/img.png';
import { useAPI } from '../contexts/APIContext';
import { useBackend } from '../contexts/BackendContext';

const NavigationBar = () => {
  const { fetchMovieSuggestions, movieSuggestions } = useAPI();
  const { getNameUser, nameUser } = useBackend();
  const [query, setQuery] = useState('');
  const { isLoggedIn, logout, token } = useAuth(); // Use the useAuth hook to get authentication state
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef();

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    setShowDropdown(inputValue.trim() !== '');
    // Fetch movie suggestions based on the input value
    fetchMovieSuggestions(inputValue);
  };

  const handleClickOutside = (event) => {
    // Close the dropdown if the click is outside the input and dropdown
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setShowDropdown(false);
      setQuery('');
    }
  };

  const handleDropdownSelect = (selectedValue) => {
    setQuery('');
    setShowDropdown(false);
  };
  // Asynchronous function to fetch data or perform an action
  const fetchUsername = async () => {
    try {
      if (isLoggedIn) {
        getNameUser();
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  document.addEventListener('click', handleClickOutside);

  useEffect(() => {

    // Call the asynchronous function when the component mounts
    fetchUsername();
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isLoggedIn]);
  return (
    <div className="navigation-bar">
      <nav className="navbar">
        <ul className="left-links">
          <li className="left-links-li"><Link to="/"><b>Home</b></Link></li>
          <li className="left-links-li"><Link to="/movie"><b>Movies</b></Link></li>
          <li className="left-links-li dropdown-container">
            <input style={{ width: "300px" }}
              type="text"
              placeholder="Search..."
              value={query}
              onChange={handleInputChange}
              ref={inputRef}
            />
            <ul className="dropdown-menu">
              {showDropdown && Array.isArray(movieSuggestions) &&
                movieSuggestions.map((movie) => (
                  <li className="dropdown-elements" key={movie.id}>
                    <img className="dropdown-elements-poster" src={movie.poster_path ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}` : notFoundImage} alt={movie.title} />
                    <div className="movie-info">
                      <p>
                        <Link to={`/movies/${movie.id}`} onClick={() => handleDropdownSelect(`${movie.title}`)}>
                          {movie.title} ({movie.release_date.split("-")[0]})
                        </Link>
                      </p>
                      <p>Rating: {movie.vote_average} <FontAwesomeIcon icon={faStar} /></p>
                    </div>
                  </li>
                ))}
            </ul>

          </li>
        </ul>
        <ul className="right-links">
          {!isLoggedIn && (
            <>
              <li className="right-links-li"><Link to="/register"><b>Register</b></Link></li>
              <li className="right-links-li"><Link to="/login"><b>Login</b></Link></li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="right-links-li dropdown">
                <b className="dropbtn">{nameUser}</b>
                <div className="dropdown-content">
                  <Link to="/list">Profile</Link>
                  <Link to="/analytics">Analytics</Link>
                </div>
              </li>
              <li className="right-links-li" onClick={logout}><b>Logout</b></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;