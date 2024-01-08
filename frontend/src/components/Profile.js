import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [userMovies, setUserMovies] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('movieName');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
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

  return (
    <div style={{ marginTop: '50px', textAlign: 'center' }}>
      <div style={{ margin: 'auto', width: '50%' }}>
        <table style={{ fontSize: '20px', width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', cursor: 'pointer'}} onClick={() => sortUserMovies('movieName')}>
                Title {sortCriteria === 'movieName'}
              </th>
              <th style= {{ cursor: 'pointer'}} onClick={() => sortUserMovies('rating')}>
                Rating {sortCriteria === 'rating'}
              </th>
              <th style= {{ cursor: 'pointer'}} onClick={() => sortUserMovies('status')}>
                Status {sortCriteria === 'status'}
              </th>
              <th style= {{ cursor: 'pointer'}} onClick={() => sortUserMovies('isFavorite')}>
                Favorite {sortCriteria === 'isFavorite'}
              </th>
            </tr>
          </thead>
          <tbody>
            {userMovies.map((movie) => (
              <tr key={movie.id}>
                <td style={{ textAlign: 'left' }}>{movie.movieName}</td>
                <td>{movie.rating}</td>
                <td>{movie.status}</td>
                <td>{movie.isFavorite ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
