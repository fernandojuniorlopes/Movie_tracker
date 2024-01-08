// movieListController.js
const MovieList = require('../models/movieListModel');

const addMovie = async (req, res) => {
  try {
    const { movieId, movieName, rating, status, isFavorite } = req.body;
    // Use the decoded user ID from the verifyToken middleware
    const userId = req.user.userId;
    // Validate required parameters
    if (!movieId || !movieName || !status || isFavorite === undefined) {
      return res.status(400).json({ success: false, message: 'Missing required parameters' });
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
};

module.exports = { addMovie };
