import React, { useEffect, useState } from 'react'

function Movie() {

    const [MovieList, setMovieList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [rating, setRating] = useState(0);
    const [status, setStatus] = useState('plan-to-watch');
    const [isFavorite, setIsFavorite] = useState(false);

    const getMovie = () => {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=3aa8331b87376c256164c7868c3efe83")
            .then(res => res.json())
            .then(json => setMovieList(json.results))
    }

    const addToWatchlist = (movie) => {
        setSelectedMovie(movie);
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
    useEffect(() => {
        getMovie()
    }, [])

    return (
        <div>
      {MovieList.map((movie) => (
        <div key={movie.id} style={{ marginBottom: "20px", textAlign: "center" }}>
          <img
            style={{ width: "300px", height: "200px", marginBottom: "10px" }}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <p style={{ fontWeight: "bold" }}>{movie.title}</p>
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
                  <option value="plan-to-watch">Plan to Watch</option>
                  <option value="watching">Watching</option>
                  <option value="completed">Completed</option>
                  <option value="dropped">Dropped</option>
                </select>
              </label>
              <label>
                Favorite:
                <input type="checkbox" checked={isFavorite} onChange={() => setIsFavorite(!isFavorite)} />
              </label>
              <button type="submit">Add to Watchlist</button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}

export default Movie