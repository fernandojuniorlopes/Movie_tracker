// MoviePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import notFoundImage from '../utils/img.png';
import '../styles/main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../styles/main.css'


const MoviePage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        if (id) {
            // Fetch movie data based on the ID from the API
            const fetchMovieData = async () => {
                try {
                    const tmdbApiKey = '3aa8331b87376c256164c7868c3efe83';
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}`);
                    const data = await response.json();
                    console.log(data)
                    setMovie(data);
                } catch (error) {
                    console.error('Error fetching movie data:', error);
                }
            };

            fetchMovieData();
        } else {
            // Fetch default movie data or display a default page
            // You can handle this according to your application logic
        }
    }, [id]);

    if (!movie && id) {
        return <div>Loading...</div>;
    }

    return (
        
        <div>
            {movie ? (
                <>
                    <div className='main-movie-div' style={{display:"flex", height:"600px"}}>
                        <div className='specific-movie-poster'>
                        <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}` : notFoundImage} alt={movie.title} />
                        </div>
                        <div className='specific-movie-details'>
                            <h1 className='specific-movie-title'>{movie.title} ({movie.release_date.split("-")[0]})</h1>
                            <p>
                                <b>Genres:</b> {movie.genres.map((genre,index) => (
                                    <span key={genre.id}>{genre.name} 
                                    {index < movie.genres.length - 1 ? ', ' : ''}</span>
                                ))}
                            </p>
                            <b className='specific-movie-score'>User score: {movie.vote_average} </b><FontAwesomeIcon className='specific-movie-score-icon' icon={faStar} />
                            <br></br><br></br>
                            <b>Overview</b>
                            <p>{movie.overview}</p>
                        </div>
                        </div>
                </>
            ) : (
                <p>An error occurred.</p>
            )}
        </div>
    );
};

export default MoviePage;
