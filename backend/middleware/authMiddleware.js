const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Company = require('../models/Company');

exports.authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    req.user = await User.findById(req.user) || await Company.findById(req.user);
    if (!req.user) {
      return res.status(401).json({ message: 'Authorization denied' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
