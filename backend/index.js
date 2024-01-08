// index.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const app = express();
const User = require('./models/userModel'); // Adjust the path based on your actual file structure
const port = 5000;
const { verifyToken } = require('./middleware/authMiddleware');
// const sequelize  = require('sequelize');

// Allow all origins - you might want to configure this to a specific origin in a production environment
app.use(cors());
app.use(express.json());

// Test the database connection
(async () => {
  try {
    await User.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Create the table if it doesn't exist
(async () => {
  await User.sequelize.sync();
})();

app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});