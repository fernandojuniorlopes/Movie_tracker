const jwt = require('jsonwebtoken');
const secretKey = process.env.MY_SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    // Attach the decoded user information to the request object
    req.user = decoded;

    next();
  });
};

module.exports = { verifyToken };