// MoviePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import notFoundImage from '../utils/img.png';
import '../styles/main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../styles/main.css'
import { useAuth } from '../contexts/AuthContext';
const movie_api = process.env.REACT_APP_MOVIE_API;

const MoviePage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const { isLoggedIn, token } = useAuth(); // Hook to get authentication state
    const [movieNotFound, setmovieNotFound] = useState(null);
    const [movieUser, setMovieUser] = useState(null);
    const [showForm, setShowForm] = useState(null);
    const [rating, setRating] = useState(0);
    const [status, setStatus] = useState('Plan-to-watch');
    const [isFavorite, setIsFavorite] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleAddToListClick = () => {
        setShowForm(!showForm);
    };

    const handleFormSubmit = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.log('User not authenticated');
                return;
            }

            // POST request to backend API with the movie ID, user token, and additional information
            const response = await fetch('http://localhost:5000/api/movielist/addMovie', {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    movieId: id,
                    movieName: movie.title,
                    rating: parseInt(rating),
                    status,
                    isFavorite,
                }),
            });

            // Response from the backend
            if (response.ok) {
                setSuccessMessage('Movie successfully added to your list!');
                setShowForm(!showForm);
                setRating(0);
                setStatus('Plan-to-watch');
                setIsFavorite(false);
            } else {
                console.error('Error adding movie to watchlist:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding movie to watchlist:', error);
        }
    };

    

    useEffect(() => {
        if (id) {
            // Fetch movie data based on the ID from the API
            const fetchMovieData = async () => {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${movie_api}`);
                    const data = await response.json();
                    if (response.ok) {
                        setMovie(data);
                    } else {
                        setmovieNotFound(true);
                    }
                } catch (error) {
                    console.error('Error fetching movie data:', error);
                }
            };
            const fetchUserMovieInfo = async () => {
                try {
                    if (isLoggedIn) {
                        // Asynchronous function
                        const result = await fetch(`http://localhost:5000/api/movielist/getmovie/${id}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': token,
                            },
                        });
                        // JSON response
                        const data = await result.json();
                        if (data.success) {
                            setMovieUser(data)
                        } else {
                            setMovieUser(null);
                        }
                    }
                } catch (error) {
                    console.error('Error:', error.message);
                }
            };
            fetchMovieData();
            fetchUserMovieInfo();
        } else {
            <p>An error as occurred</p>
        }
    }, [isLoggedIn, token, id]);

    if (!movie && id && !movieNotFound) {
        return <div>Loading...</div>;
    }

    return (

        <div>
            {movie ? (
                <>
                    <div className='main-movie-div' style={{ display: "flex", height: "600px" }}>
                        <div className='specific-movie-poster'>
                            <img style={{ width: '200px', height: '300px' }} src={movie.poster_path ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}` : notFoundImage} alt={movie.title} />
                            <button className='home-page_register-button' onClick={handleAddToListClick}>Add to list</button>
                            {successMessage && <p className="success-message">{successMessage}</p>}
                            {showForm && (
                                <form className='form-add-movie' onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }}>
                                    <label>
                                        Rating:<input style={{ marginLeft: "5px", width: "35px" }} type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
                                    </label>
                                    <label>
                                        <br></br>
                                        Status:
                                        <select style={{ marginLeft: "5px", width: "140px" }}value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value="Plan-to-watch">Plan to Watch</option>
                                            <option value="Watching">Watching</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Dropped">Dropped</option>
                                        </select>
                                    </label>
                                    <label>
                                        Favorite:
                                        <input type="checkbox" checked={isFavorite} onChange={() => setIsFavorite(!isFavorite)}/>
                                    </label><br></br>
                                    <button style={{ width: "50%", height: "30px" }} className='home-page_register-button' type="submit">Submit</button>
                                </form>)}
                        </div>
                        <div className='specific-movie-details'>
                            <h1 className='specific-movie-title'>{movie.title} ({movie.release_date.split("-")[0]})
                                <div className='status'>
                                    {movieUser ? (
                                        <div className={`status-${movieUser.status}`}>
                                            {movieUser.status}
                                        </div>
                                    ) : (
                                        <div className='status-Unwatched'>
                                            Not seen
                                        </div>
                                    )}</div>
                            </h1>
                            <p>
                                <b>Genres:</b> {movie.genres.map((genre, index) => (
                                    <span key={genre.id}>{genre.name}
                                        {index < movie.genres.length - 1 ? ', ' : ''}</span>
                                ))}
                            </p>
                            <b className='specific-movie-score'>User score: {movie.vote_average.toFixed(2)} </b><FontAwesomeIcon className='specific-movie-score-icon' icon={faStar} />
                            <br></br><br></br>
                            <b>Overview</b>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                </>
            ) : (
                <p>Movie not found!</p>
            )}
        </div>
    );
};

export default MoviePage;
