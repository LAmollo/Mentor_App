// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile, getUserProfileById, findPotentialMentors, assignMentorToStudent } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.get('/:id', getUserProfileById);
router.get('/potential-mentors', authMiddleware, findPotentialMentors);
router.post('/assign-mentor', authMiddleware, assignMentorToStudent);

module.exports = router;
