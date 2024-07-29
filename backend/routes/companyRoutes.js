// routes/companyRoutes.js
const express = require('express');
const router = express.Router();
const { createCompany, getCompany, updateCompany, deleteCompany } = require('../controllers/companyController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createCompany);
router.get('/:id', getCompany);
router.put('/:id', authMiddleware, updateCompany);
router.delete('/:id', authMiddleware, deleteCompany);

module.exports = router;
