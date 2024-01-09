// Import necessary modules
const express = require('express');
const router = express.Router();
const movieListController = require('../controllers/movieListController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/addmovie', verifyToken, movieListController.addMovie);

router.get('/mylist', verifyToken, movieListController.getMovie);

router.delete('/deletemovie/:movieId', verifyToken, movieListController.deleteMovie);

// Export the router
module.exports = router;