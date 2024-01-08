// movieListModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const MovieList = sequelize.define('MovieList', {
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  movieName:{
    type: DataTypes.STRING,
    allowNull: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10,
    },
  },
  status: {
    type: DataTypes.ENUM('Plan-to-watch', 'Watching', 'Completed', 'Dropped'),
    allowNull: false,
  },
  isFavorite: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = MovieList;