import React, { useCallback, useContext, createContext, useState } from "react";
const movie_api = process.env.REACT_APP_MOVIE_API;

const APIContext = createContext();

const recentMoviesURL = `https://api.themoviedb.org/3/discover/movie?api_key=${movie_api}`
const averageMoviesURL = `https://api.themoviedb.org/3/discover/movie?api_key=${movie_api}&language=en-US&sort_by=vote_average.desc&vote_count.gte=1000&page=1`
const APIURL = `https://api.themoviedb.org/3/discover/movie?api_key=${movie_api}`
export const APIProvider = ({ children }) => {
    const [recentData, setRecentData] = useState(null);
    const [topRatedData, setTopRatedData] = useState(null);
    const [movieData, setMovieData] = useState(null);
    const [movieSuggestions, setMovieSuggestions] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = useCallback(async (type, page) => {
        try {
            const customizedUrl = customizeUrl(type, page);
            const response = await fetch(customizedUrl);
            const result = await response.json();
            if(type === 'recent'){
                setRecentData(result.results.slice(0, 10));
            }
            if(type ==='topRated'){
                setTopRatedData(result.results.slice(0, 10));
            };
            setCurrentPage(page);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    const fetchMovie = useCallback(async (movieId) => {
        try {
            const customizedUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${movie_api}`
            const response = await fetch(customizedUrl);
            const result = await response.json();
            setMovieData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    const fetchMovieSuggestions = useCallback(async (searchQuery) => {
        try {
            const customizedUrl = `https://api.themoviedb.org/3/search/movie?api_key=${movie_api}&query=${searchQuery}`
            const response = await fetch(customizedUrl);
            const result = await response.json();
            setMovieSuggestions(result.results.slice(0,5));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    const customizeUrl = (type, page) => {
        // Customize the URL based on the type
        switch (type) {
            case 'recent':
                return `${recentMoviesURL}&page=${page}`;
            case 'topRated':
                return `${averageMoviesURL}&page=${page}`;
            default:
                return APIURL;
        }
    };


    return (
        <APIContext.Provider value={{ recentData, topRatedData, fetchData, currentPage, fetchMovie, movieData, fetchMovieSuggestions, movieSuggestions}}>
            {children}
        </APIContext.Provider>
    );
};

export const useAPI = () => {
    return useContext(APIContext);
};