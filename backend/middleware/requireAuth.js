
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      const user = await User.findById(decodedToken.userId);
      if (!user) {
        throw new Error('User not found');
      }
      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = requireAuth;
