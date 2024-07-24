const express = require('express');
const { matchMentors } = require('../controllers/matchingController');

const router = express.Router();

router.get('/match/:studentId', matchMentors);

module.exports = router;
