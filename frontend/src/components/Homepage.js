import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [recentMovies, setRecentMovies] = useState([]);
    const [highestRatedMovies, setHighestRatedMovies] = useState([]);

    useEffect(() => {
        // Fetch most recent movies
        fetchMostRecentMovies();

        // Fetch highest-rated movies
        fetchHighestRatedMovies();
    }, []);

    const fetchMostRecentMovies = () => {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=3aa8331b87376c256164c7868c3efe83")
            .then(res => res.json())
            .then(json => setRecentMovies(json.results.slice(0, 10))) // Limit to 10 movies
            .catch(error => console.error('Error fetching most recent movies:', error));
    }

    const fetchHighestRatedMovies = () => {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=3aa8331b87376c256164c7868c3efe83&language=en-US&sort_by=vote_average.desc&vote_count.gte=1000&page=1`;")
        .then((response) => response.json())
        .then((json) => setHighestRatedMovies(json.results.slice(0, 10))) // Get the top 10 movies
        .catch((error) => console.error('Error fetching highest-rated movies:', error));
    };

    return (
        <div>
            <section className='home-page_text-section'>
                <h1 className="home-page__title">Movie tracker</h1>
                <div className='home-page__content'>
                    <p>Track of the movies you watch and share it with your friends!</p>
                    <p>Discover new movies and save them to watch later.</p>
                    <button className='home-page_register-button'><Link className='home-page-link' to="/register">GET STARTED!</Link></button>
                    <p className='home-page_login-link'><Link className='home-page-link' to="/login">Already have an account?</Link></p>
                </div>
            </section>
            <section>
                <h2 className="heading-title" style={{textAlign:"center"}}>Most Recent Movies</h2>
                <div className="movie-list">
                    {recentMovies.map((movie) => (
                        <div key={movie.id} className="movie-item">
                            <Link to={`/movies/${movie.id}`} href='../styles/main.css'><img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}alt={movie.title} /></Link>
                            <div className="movie-title-overlay">{movie.title}<p>Avg Score: {movie.vote_average}</p></div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="heading-title" style={{textAlign:"center"}}>Highest Rated Movies</h2>
                <div className="movie-list">
                    {highestRatedMovies.map((movie) => (
                        <div key={movie.id} className="movie-item">
                            <Link to={`/movies/${movie.id}`} href='../styles/main.css'><img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}alt={movie.title} /></Link>
                            <div className="movie-title-overlay">{movie.title}<p>Avg Score: {movie.vote_average}</p></div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
