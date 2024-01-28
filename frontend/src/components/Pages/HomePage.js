import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAPI } from '../../contexts/APIContext';

const HomePage = () => {
    const { recentData, topRatedData, fetchData } = useAPI();

    useEffect(() => {
        fetchData('recent', 1);
        fetchData('topRated', 1);
    }, [fetchData]);

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
                    {recentData!=null && recentData.map((movie) => (
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
                    {topRatedData!=null && topRatedData.map((movie) => (
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