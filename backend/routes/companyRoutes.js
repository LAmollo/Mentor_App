const express = require('express');
const { registerCompany, loginCompany, getCompanyProfile, updateCompanyProfile, deleteCompany } = require('../controllers/companyController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerCompany);
router.post('/login', loginCompany);
router.get('/profile', authMiddleware, getCompanyProfile);
router.put('/profile', authMiddleware, updateCompanyProfile);
router.delete('/profile', authMiddleware, deleteCompany);

module.exports = router;
