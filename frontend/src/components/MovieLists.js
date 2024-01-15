import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const movie_api = process.env.REACT_APP_MOVIE_API;

const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
]

const MovieLists = () => {
    const [highestRatedMovies, setHighestRatedMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchHighestRatedMovies = (newPage) => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${movie_api}&language=en-US&sort_by=vote_average.desc&vote_count.gte=1000&page=${newPage}`)
            .then((response) => response.json())
            .then((json) => setHighestRatedMovies(json.results))
            .catch((error) => console.error('Error fetching highest-rated movies:', error));
    };

    // Render page buttons
    const renderPageButtons = () => {
        const buttons = [];
        for (let page = 1; page <= totalPages; page++) {
            buttons.push(
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={page === currentPage ? 'active' : ''}
                >
                    {page}
                </button>
            );
        }
        return buttons;
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchHighestRatedMovies(newPage);
    };


    useEffect(() => {
        fetchHighestRatedMovies(currentPage);
        const totalPages = 10;
        setTotalPages(totalPages);
    }, [currentPage]);

    return (
        <div>
            <section>
                <h2 className="heading-title" style={{ textAlign: "center" }}>Highest Rated Movies</h2>
                <div className="lists-movie-list">
                    {highestRatedMovies.map((movie) => (
                        <div key={movie.id} className="movie-container">
                            <Link to={`/movies/${movie.id}`}><img className="movie-poster-catalog" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} /></Link>
                            <div className="movie-details">
                                <div><b>{movie.title}({movie.release_date.split("-")[0]})</b>
                                    <p><b>Average User Score: {movie.vote_average} </b><FontAwesomeIcon style={{fontSize:"15px",paddingBottom:"2px"}} className='specific-movie-score-icon' icon={faStar} /></p>
                                    <b>Genres:</b> {movie.genre_ids.map((genreId, index) => {
                                        const foundGenre = genres.find((g) => g.id === genreId);
                                        return (
                                            <span key={genreId}>
                                                {foundGenre ? foundGenre.name : ''}
                                                {index < movie.genre_ids.length - 1 ? ', ' : ''}
                                            </span>
                                        );
                                    }
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <div style={{textAlign:"center", margin:"20px"}} className="pagination-buttons">
                {renderPageButtons()}
            </div>
        </div>
    );
}

export default MovieLists;