const express = require('express');
const router = express.Router();
const { matchStudentsWithMentors } = require('../controllers/matchController');

router.route('/').get(matchStudentsWithMentors);

module.exports = router;
