// movieListController.js
const MovieList = require('../models/movieListModel');

const movieListController = {
  async addMovie(req, res) {
    try {
      const { movieId, movieName, rating, status, isFavorite } = req.body;
      
      //Decoded user ID from the verifyToken middleware
      const userId = req.user.userId;
      
      // Validate required parameters
      if (!movieId || !movieName || !status || isFavorite === undefined) {
        return res.status(400).json({ success: false, message: 'Missing required parameters' });
      }

      // Find and delete the workout by ID
      const movieToDelete = await MovieList.findOne({
        where: {
          userId,
          movieId: movieId,
        },
      });

      if (movieToDelete) {
        await movieToDelete.destroy();
      }

      // Create a new movie in the MovieList table
      const newMovie = await MovieList.create({
        movieId,
        movieName,
        userId,
        rating: rating || null,
        status,
        isFavorite,
      });

      return res.status(201).json({ success: true, data: newMovie });
    } catch (error) {
      console.error('Error adding movie:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
  async getMovie(req, res) {
    const userId = req.user.userId;
    try {

      //Find all movies from a user
      const userMovies = await MovieList.findAll({
        where: { userId },
        attributes: ['movieId', 'movieName', 'rating', 'status', 'isFavorite'],
      });

      return res.status(200).json({ success: true, userMovies });
    } catch (error) {
      console.error('Error getting user movie list:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
  async deleteMovie(req, res) {
    const userId = req.user.userId;
    const id = req.params.movieId;
    try {

      // Find and delete the movie by ID
      const movieToDelete = await MovieList.findOne({
        where: {
          userId,
          movieId: id,
        },
      });

      if (!movieToDelete) {
        return res.status(404).json({ success: false, message: 'Movie not found in user list' });
      }

      // Delete the movie
      await movieToDelete.destroy();

      return res.status(200).json({ success: true, message: 'Movie deleted successfully' });
    } catch (error) {
      console.error('Error deleting movie:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
  async updateMovie(req, res) {
    const userId = req.user.userId;
    const id = req.params.movieId;
    try {

      // Find the movie by ID
      const movieToUpdate = await MovieList.findOne({
        where: {
          userId,
          movieId: id,
        },
      });

      if (!movieToUpdate) {
        return res.status(404).json({ success: false, message: 'Movie not found in user list' });
      }
      // Update movie data based on the request body
      const updatedMovieData = req.body;

      movieToUpdate.rating = updatedMovieData.rating;
      movieToUpdate.status = updatedMovieData.status;
      movieToUpdate.isFavorite = updatedMovieData.isFavorite;

      //Save changes of the user
      await movieToUpdate.save();

      return res.status(200).json({ success: true, message: 'Movie updated successfully' });
    } catch (error) {
      console.error('Error deleting movie:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
  async getSingularMovie(req, res) {
    const userId = req.user.userId;
    const id = req.params.movieId;
    try {
      // Find the movie by ID
      const movie = await MovieList.findOne({
        where: {
          userId,
          movieId: id,
        },
      });
      if (!movie) {
        return res.status(404).json({ success: false, message: 'Movie not found in user list' });
      }
      const status = movie.status;
        return res.status(200).json({ success: true, status });
    } catch (error) {
      console.error('Error finding movie:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
};
module.exports = movieListController;
