// MoviePage.js
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import notFoundImage from '../../utils/img.png';
import '../../styles/main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';
import { useAPI } from '../../contexts/APIContext';
import { useBackend } from '../../contexts/BackendContext';

const MoviePage = () => {
    const { fetchMovie, movieData } = useAPI();
    const {addUserMovie, fetchUserMovieInfo} = useBackend();
    const { id } = useParams();
    const { isLoggedIn, token } = useAuth(); // Hook to get authentication state
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

            const response = await addUserMovie(id, movieData.title, rating, status, isFavorite);
            
            if (response.ok) {
                setSuccessMessage('Movie successfully added to your list!');
                setShowForm(!showForm);
                const result = await fetchUserMovieInfo(id);
                setMovieUser(result);
            } else {
                console.error('Error adding movie to watchlist:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding movie to watchlist:', error);
        }
    };

    const checkUserMovie = useCallback(async () => {
        if (isLoggedIn) {
            const result = await fetchUserMovieInfo(id);
            if(result.success){
                setMovieUser(result);
            }
        }
    }, [fetchUserMovieInfo, id, isLoggedIn]);
    
    useEffect(() => {
        if (id) {
            fetchMovie(id);
            checkUserMovie(id);
        } else {
            <p>An error as occurred</p>
        }
    }, [fetchMovie, token, id, checkUserMovie]);

    if (!movieData && id) {
        return <div>Loading...</div>;
    }

    return (

        <div>
            {movieData ? (
                <>
                    <div className='main-movie-div' style={{ display: "flex", height: "600px" }}>
                        <div className='specific-movie-poster'>
                            <img style={{ width: '200px', height: '300px' }} src={movieData.poster_path ? `https://image.tmdb.org/t/p/w200/${movieData.poster_path}` : notFoundImage} alt={movieData.title} />
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
                            <h1 className='specific-movie-title'>{movieData.title} ({movieData.release_date.split("-")[0]})
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
                                <b>Genres:</b> {movieData.genres.map((genre, index) => (
                                    <span key={genre.id}>{genre.name}
                                        {index < movieData.genres.length - 1 ? ', ' : ''}</span>
                                ))}
                            </p>
                            <b className='specific-movie-score'>User score: {movieData.vote_average.toFixed(2)} </b><FontAwesomeIcon className='specific-movie-score-icon' icon={faStar} />
                            <br></br><br></br>
                            <b>Overview</b>
                            <p>{movieData.overview}</p>
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
