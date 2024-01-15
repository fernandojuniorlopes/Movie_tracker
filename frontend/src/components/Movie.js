import React, { useEffect, useState } from 'react';
import '../styles/main.css'
const movie_api = process.env.REACT_APP_MOVIE_API;

function Movie() {
    const [movieList, setMovieList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [rating, setRating] = useState(0);
    const [status, setStatus] = useState('plan-to-watch');
    const [isFavorite, setIsFavorite] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const getMovie = () => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movie_api}`)
            .then(res => res.json())
            .then(json => setMovieList(json.results))
    }

    const addToWatchlist = (movie) => {
        setSelectedMovie((prevSelectedMovie) => {
            // Toggle selectedMovie
            return prevSelectedMovie && prevSelectedMovie.id === movie.id ? null : movie;
        });
    }

    const handleFormSubmit = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.log('User not authenticated');
                return;
            }

            console.log('Data being sent:', {
                movieId: selectedMovie.id,
                movieName: selectedMovie.title,
                rating: parseInt(rating),
                status,
                isFavorite,
            });

            // Send a POST request to your backend API with the movie ID, user token, and additional information
            const response = await fetch('http://localhost:5000/api/movielist/addMovie', {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    movieId: selectedMovie.id,
                    movieName: selectedMovie.title,
                    rating: parseInt(rating),
                    status,
                    isFavorite,
                }),
            });

            // Handle the response from the backend
            if (response.ok) {
                console.log('Movie added to watchlist successfully!');
                // Clear selected movie and form fields after successful addition
                setSelectedMovie(null);
                setRating(0);
                setStatus('plan-to-watch');
                setIsFavorite(false);
            } else {
                console.error('Error adding movie to watchlist:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding movie to watchlist:', error);
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        try {
            const tmdbResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${movie_api}&query=${searchQuery}`);
            const tmdbData = await tmdbResponse.json();

            // Update search results
            setSearchResults(tmdbData.results);
        } catch (error) {
            console.error('Error searching for movies:', error);
        }
    };

    useEffect(() => {
        getMovie();
    }, []);

    return (
        <div>
            <form onSubmit={handleSearchSubmit} style={{marginTop: "50px", textAlign:"center"}}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Search for movies..."
                    style={{fontSize:"20px"}}
                />
                <button style={{fontSize:"20px"}} type="submit">Search</button>
            </form>

            {/* Display Search Results or Movie List */}
            {searchResults && searchResults.length > 0 ? (
                <div>
                    <h2 className="heading-title" >Search Results:</h2>
                    {searchResults.map((movie) => (
                        <div key={movie.id} className="movie-container">
                            <img className="movie-poster-catalog" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <div className="movie-details">
                                <h3>{movie.title}</h3>
                                <p>{movie.release_date}</p>
                                <p>Rating: {movie.vote_average}</p>
                                <button onClick={() => addToWatchlist(movie)}>Add to Watchlist</button>
                                {selectedMovie && selectedMovie.id === movie.id && (
                                    <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }}>
                                        <label>
                                            Rating:
                                            <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
                                        </label>
                                        <label>
                                            Status:
                                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                                <option value="Plan-to-watch">Plan to Watch</option>
                                                <option value="Watching">Watching</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Dropped">Dropped</option>
                                            </select>
                                        </label>
                                        <label>
                                            Favorite:
                                            <input type="checkbox" checked={isFavorite} onChange={() => setIsFavorite(!isFavorite)} />
                                        </label>
                                        <button type="submit">Submit</button>
                                    </form>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <h2  className="heading-title" >Movie List:</h2>
                    {movieList.map((movie) => (
                        <div key={movie.id} style={{ marginBottom: "20px", textAlign: "center" }}>
                            {/* Display movie details and add to watchlist button */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Movie;
