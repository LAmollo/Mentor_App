const Company = require('../models/Company');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new company
exports.registerCompany = async (req, res) => {
  const { name, email, password, industry } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const company = new Company({ name, email, password: hashedPassword, industry });
    await company.save();
    res.status(201).json({ message: 'Company registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a company
exports.loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get company profile
exports.getCompanyProfile = async (req, res) => {
  try {
    const company = await Company.findById(req.user.id).select('-password');
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update company profile
exports.updateCompanyProfile = async (req, res) => {
  try {
    const updatedProfile = await Company.findByIdAndUpdate(
      req.user.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select('-password');
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete company
exports.deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.user.id);
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
