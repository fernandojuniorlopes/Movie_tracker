// Import necessary modules
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// route POST register
router.post('/api/register', userController.registerUser);

//rout POST Log in
router.post('/api/login', userController.loginUser);

//Router Get Username
router.get('/api/protected-route', verifyToken, userController.getUsernameFromToken);

// Export the router
module.exports = router;