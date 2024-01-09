import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import '../styles/main.css'


const Profile = () => {
  const [userMovies, setUserMovies] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('movieName');
  const [sortOrder, setSortOrder] = useState('asc');

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
        console.log(data.userMovies);
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
    <div style={{ marginTop: '50px', textAlign: 'center' }}>
      <div style={{ margin: 'auto', width: '50%' }}>
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
              <tr key={movie.movieId}>
                <td style={{ textAlign: 'left' }}>{movie.movieName}</td>
                <td>{movie.rating}</td>
                <td>{movie.status}</td>
                <td>{movie.isFavorite ? 'Yes' : 'No'}</td>
                <td className='container-style'>
                  <div className='div-style'>
                    <FontAwesomeIcon className='svg-icon' icon={faEdit} />
                  </div>
                  <div className='div-style' onClick={() => handleDeleteMovie(movie.movieId, movie.movieName)}>
                    <FontAwesomeIcon className='svg-icon' icon={faTrash} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
