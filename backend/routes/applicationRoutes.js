// routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const { applyForJob, getApplications, updateApplicationStatus } = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, applyForJob);
router.get('/', authMiddleware, getApplications);
router.put('/:id', authMiddleware, updateApplicationStatus);

module.exports = router;
