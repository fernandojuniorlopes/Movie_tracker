import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import '../../styles/main.css'
import { useBackend } from '../../contexts/BackendContext';

const Profile = () => {
  const { fetchUserMovies, userMovies, saveEdit, deleteUserMovie } = useBackend();
  const [localUserMovies, setLocalUserMovies] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [editMode, setEditMode] = useState(false);
  const [editedMovie, setEditedMovie] = useState({});

  useEffect(() => {
    fetchUserMovies();
  }, [fetchUserMovies]);

  useEffect(() => {
    setLocalUserMovies(userMovies);
  }, [userMovies]);

  const handleSaveEdit = async () => {
    try {
      await saveEdit(editedMovie);
      await fetchUserMovies();
      setEditMode(false);
    } catch (error) {
      console.error('Error saving or fetching user movies:', error);
    }
  };

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

    setLocalUserMovies(sortedMovies);
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

  const handleDeleteMovie = async (movieId, movieName) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${movieName}?`);
    if (isConfirmed) {
      try {
        await deleteUserMovie(movieId);
        await fetchUserMovies();
        setEditMode(false);
      } catch (error) {
        console.error('Error saving or fetching user movies:', error);
      }
    }
  };


  return (
    <div style={{ marginTop: '50px', textAlign: 'center', minHeight: "600px" }}>
      <div style={{ margin: 'auto', width: '80%' }}>
        <table style={{ fontSize: '20px', width: '100%', borderCollapse: 'collapse' }}>
          <thead className='table-title'>
            <tr>
              <th style={{ textAlign: 'left', cursor: 'pointer' }} onClick={() => sortUserMovies('movieName')}>
                Title
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => sortUserMovies('rating')}>
                Rating
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => sortUserMovies('status')}>
                Status
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => sortUserMovies('isFavorite')}>
                Favorite
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='table-body'>
            {localUserMovies && localUserMovies.map((movie) => (
              <React.Fragment key={movie.movieId}>
                {editMode && editedMovie.movieId === movie.movieId ? (
                  <tr>
                    <td style={{ textAlign: 'left' }}>
                      {editedMovie.movieName}
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
