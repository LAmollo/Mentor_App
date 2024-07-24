const express = require('express');
const { registerUser, getUserProfile } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.get('/:id', getUserProfile);

module.exports = router;
