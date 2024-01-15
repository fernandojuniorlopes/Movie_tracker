// index.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const app = express();
const User = require('./models/userModel');
const MovieList = require('./models/movieListModel'); 
const port = 5000;
const { refreshToken } = require('./middleware/authMiddleware');
const movieListRoutes =  require('./routes/movieListRoutes');

// Allow all origins
app.use(cors());
app.use(express.json());

// Test the database connection
(async () => {
  try {
    await User.sequelize.authenticate();
    await MovieList.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Create the table if it doesn't exist
(async () => {
  await User.sequelize.sync();
  await MovieList.sequelize.sync();
})();

app.use('/', userRoutes);
app.use('/api/movielist', movieListRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});