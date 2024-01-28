import React, { useCallback, useContext, createContext, useState } from "react";

const BackendContext = createContext();

export const BackendProvider = ({ children }) => {
    const [userMovies, setUserMovies] = useState(null);
    const [nameUser, setNameUser] = useState(null);
    const token = localStorage.getItem('token');

    const fetchUserMovies = useCallback(async () => {
        try {
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
    }, [token]);

    const saveEdit = useCallback(async (editedMovie) => {
        try {
            const response = await fetch(`http://localhost:5000/api/movielist/editmovie/${editedMovie.movieId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rating: parseInt(editedMovie.rating),
                    status: editedMovie.status,
                    isFavorite: editedMovie.isFavorite
                })
            });

            if (!response.ok) {
                console.error('Error updating movie:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    }, [token]);

    const deleteUserMovie = (async (movieId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/movielist/deletemovie/${movieId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                },
            });

            if (!response.ok) {
                console.log('Test');
                console.error('Error deleting movie');
            }
        } catch (error) {
            console.error('Error deleting exercise:', error);
        }
    });

    const getNameUser = (async () => {
        try {
            // Asynchronous function
            const result = await fetch('http://localhost:5000/api/protected-route', {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });

            // JSON response
            const nameResult = await result.json();
            setNameUser(nameResult.username);
        } catch (error) {
            console.error('Error:', error.message);
        }
    })

    const addUserMovie = useCallback(async (id, title, rating, status, isFavorite) => {
        try {
            // POST request to backend API with the movie ID, user token, and additional information
            const response = await fetch('http://localhost:5000/api/movielist/addMovie', {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    movieId: id,
                    movieName: title,
                    rating: parseInt(rating),
                    status,
                    isFavorite,
                }),
            });

            if (response.ok) {
                return response;
            } else {
                // Handle the case where the request was not successful
                console.error('Error adding user movie:', response.statusText);
                throw new Error('Error adding user movie');
            }
        } catch (error) {
            // Handle other errors that may occur during the request
            console.error('Error adding user movie:', error);
            throw new Error('Error adding user movie');
        }
    }, [token]);

    const fetchUserMovieInfo = useCallback(async (id) => {
        try {
            // Asynchronous function
            const response = await fetch(`http://localhost:5000/api/movielist/getmovie/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error.message);
        }
    }, [token]);
    return (
        <BackendContext.Provider value={{ fetchUserMovies, userMovies, saveEdit, deleteUserMovie, getNameUser, nameUser, addUserMovie, fetchUserMovieInfo }}>
            {children}
        </BackendContext.Provider>
    );
};

export const useBackend = () => {
    return useContext(BackendContext);
};