// Import necessary modules
const express = require('express');
const router = express.Router();
const movieListController = require('../controllers/movieListController');
const { verifyToken } = require('../middleware/authMiddleware');

// route POST register
router.post('/addmovie', verifyToken, movieListController.addMovie);

// Export the router
module.exports = router;