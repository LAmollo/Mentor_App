import jwt from 'jsonwebtoken';
import Users from '../models/userModel.js';
import Companies from '../models/companiesModel.js';

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const user = await Users.findById(decoded.userId);
    if (!user) {
      const company = await Companies.findById(decoded.userId);
      if (!company) return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authenticateUser;