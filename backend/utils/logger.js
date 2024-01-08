const fs = require('fs');

const logger = {
  info: (message) => {
    fs.appendFile('./utils/info.log', `${message}\n`, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });
  },

  error: (message) => {
    fs.appendFile('./utils/error.log', `${message}\n`, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });
  },
};

module.exports = logger;