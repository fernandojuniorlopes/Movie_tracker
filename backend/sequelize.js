const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'nando',
  database: 'movie_tracker',
  port: 5432
});

module.exports = sequelize;