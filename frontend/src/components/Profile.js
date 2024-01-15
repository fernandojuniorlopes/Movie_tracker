import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import '../styles/main.css'


const Profile = () => {
  const [userMovies, setUserMovies] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('movieName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editMode, setEditMode] = useState(false);
  const [editedMovie, setEditedMovie] = useState({});


  const fetchUserMovies = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/movielist/mylist', {
        method: 'GET',
        headers: {
          'Authorization': token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserMovies(data.userMovies);
      } else {
        console.error('Error fetching user movies:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user movies:', error);
    }
  };

  useEffect(() => {
    fetchUserMovies();
  }, []);

  const sortUserMovies = (criteria) => {
    const sortedMovies = [...userMovies];

    sortedMovies.sort((a, b) => {
      const aValue = a[criteria];
      const bValue = b[criteria];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
    });

    setUserMovies(sortedMovies);
    // Toggle sort order for the next click
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleEditMovie = (selectedMovie) => {
    setEditMode(true);
    setEditedMovie(prevState => ({
      ...prevState,
      movieId: selectedMovie.movieId,
      movieName: selectedMovie.movieName,
      rating: selectedMovie.rating,
      status: selectedMovie.status,
      isFavorite: selectedMovie.isFavorite,
    }));
  };

  const handleSaveEdit = async () => {
    console.log(editedMovie)
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/movielist/editmovie/${editedMovie.movieId}`, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: parseInt(editedMovie.rating),
          status: editedMovie.status,
          isFavorite: editedMovie.isFavorite})
      });

      if (response.ok) {
        // Movie updated successfully
        fetchUserMovies();
        setEditMode(false); // Exit edit mode
      } else {
        console.error('Error updating movie:', response.statusText);
        
      }
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };


  const handleDeleteMovie = async (movieId, movieName) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${movieName}?`);
    if (isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/movielist/deletemovie/${movieId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': token,
          },
        });

        if (response.ok) {
          // Refresh the movie list after deletion
          fetchUserMovies();

        } else {
          console.error('Error deleting exercise');
        }
      } catch (error) {
        console.error('Error deleting exercise:', error);
      }
    }
  };


  return (
    <div style={{ marginTop: '50px', textAlign: 'center' ,minHeight:"600px"}}>
      <div style={{ margin: 'auto', width: '80%' }}>
        <table style={{ fontSize: '20px', width: '100%', borderCollapse: 'collapse' }}>
          <thead className='table-title'>
            <tr>
              <th style={{ textAlign: 'left', cursor: 'pointer' }} onClick={() => sortUserMovies('movieName')}>
                Title {sortCriteria === 'movieName'}
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => sortUserMovies('rating')}>
                Rating {sortCriteria === 'rating'}
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => sortUserMovies('status')}>
                Status {sortCriteria === 'status'}
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => sortUserMovies('isFavorite')}>
                Favorite {sortCriteria === 'isFavorite'}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='table-body'>
            {userMovies.map((movie) => (
              <React.Fragment key={movie.movieId}>
                {editMode && editedMovie.movieId === movie.movieId ? (
                  <tr>
                    <td style={{ textAlign: 'left' }}>
                      <td>{editedMovie.movieName}</td>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editedMovie.rating}
                        onChange={(e) => setEditedMovie({ ...editedMovie, rating: e.target.value })}
                      />
                    </td>
                    <td>
                      <select value={editedMovie.status} onChange={(e) => setEditedMovie({ ...editedMovie, status: e.target.value })}>
                        <option value="Plan-to-watch">Plan to Watch</option>
                        <option value="Watching">Watching</option>
                        <option value="Completed">Completed</option>
                        <option value="Dropped">Dropped</option>
                      </select>
                    </td>
                    <td><input
                      type="checkbox"
                      checked={editedMovie.isFavorite}
                      onChange={(e) => setEditedMovie({ ...editedMovie, isFavorite: e.target.checked })}
                    /></td>
                    <td>
                      <div onClick={handleSaveEdit}>
                        <FontAwesomeIcon className='svg-icon' icon={faCheck} />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td style={{ textAlign: 'left' }}><Link to={`/movies/${movie.movieId}`}>{movie.movieName}</Link></td>
                    <td>{movie.rating}</td>
                    <td>{movie.status}</td>
                    <td>{movie.isFavorite ? 'Yes' : 'No'}</td>
                    <td className='container-style'>
                      <div className='div-style' onClick={() => handleEditMovie(movie)}>
                        <FontAwesomeIcon className='svg-icon' icon={faEdit} />
                      </div>
                      <div className='div-style' onClick={() => handleDeleteMovie(movie.movieId, movie.movieName)}>
                        <FontAwesomeIcon className='svg-icon' icon={faTrash} />
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
