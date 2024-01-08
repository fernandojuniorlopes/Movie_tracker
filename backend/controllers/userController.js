// userController.js
const User = require('../models/userModel'); // Adjust the path based on your actual file structure
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.MY_SECRET_KEY;

function createToken(user) {
  const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
  return token;
}

const userController = {
  async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        console.error('Invalid email or password for user with email: ' + email);
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        console.error('Invalid email or password for user with email: ' + email);
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = createToken(user);
      res.json({ token: token});
    } catch (err) {
      console.error('Login failed: ' + err.message);
      res.status(500).json({ message: 'Login failed' });
    }
  },
  async registerUser(req, res) {
    const { username, email, password } = req.body;

    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

      // Create a new user with the hashed password
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      res.json({ message: 'Registration successful', user: newUser });
    }catch (err) {
      console.error('Registration failed:', err.message);
      res.status(500).json({ message: 'Registration failed' });
    }

  },
  getUsernameFromToken(req, res) {
    // Access the username from the request object, which was attached by verifyToken middleware
    const username = req.user.username;

    res.json({ username });
  },
};

module.exports = userController;
