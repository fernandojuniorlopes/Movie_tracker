import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useAPI } from '../../contexts/APIContext';

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
    const {topRatedData, fetchData, currentPage } = useAPI();
    // const [highestRatedMovies, setHighestRatedMovies] = useState([]);
    const [currPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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
        fetchData('topRated', newPage);
    };


    useEffect(() => {
        const totalPages = 10;
        setTotalPages(totalPages);
        fetchData('topRated', currPage);
    }, [fetchData, currentPage, currPage]);

    return (
        <div>
            <section>
                <h2 className="heading-title" style={{ textAlign: "center" }}>Highest Rated Movies</h2>
                <div className="lists-movie-list">
                    {topRatedData!=null && topRatedData.map((movie) => (
                        <div key={movie.id} className="movie-container">
                            <Link to={`/movies/${movie.id}`}><img className="movie-poster-catalog" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`img from ${movie.title}`}/></Link>
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