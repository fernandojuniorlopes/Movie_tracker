import '../styles/main.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import notFoundImage from '../utils/img.png';
const movie_api = process.env.REACT_APP_MOVIE_API;

const NavigationBar = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const { isLoggedIn, logout, token } = useAuth(); // Use the useAuth hook to get authentication state
  let [username, setUsername] = useState()

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    // Fetch movie suggestions based on the input value
    fetchMovieSuggestions(inputValue);
  };

  const fetchMovieSuggestions = async (searchQuery) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${movie_api}&query=${searchQuery}`);
      const tmdbData = await response.json();
      setMovies(tmdbData.results.slice(0, 5));
    } catch (error) {
      console.error('Error fetching movie suggestions:', error);
    }
  };

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
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
      }
    };

    document.addEventListener('click', handleClickOutside);

    // Call the asynchronous function when the component mounts
    fetchData();

  }, [isLoggedIn, token]);
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
            />
            <ul className="dropdown-menu">
              {Array.isArray(movies) &&
                movies.map((movie) => (
                  <li className="dropdown-elements" key={movie.id}>
                    <img className="dropdown-elements-poster" src={movie.poster_path ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}` : notFoundImage} alt={movie.title} />
                    <div className="movie-info">
                      <Link to={`/movies/${movie.id}`} href='../styles/main.css'><p>{movie.title} ({movie.release_date.split("-")[0]})</p></Link>
                      <p>Rating: {movie.vote_average}
                        <FontAwesomeIcon icon={faStar} /></p>
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
                <b className="dropbtn">{username}</b>
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