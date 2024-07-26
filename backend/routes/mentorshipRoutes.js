const express = require('express');
const {
  createMentorship,
  getMentorships,
  getMentorship,
  updateMentorship,
  deleteMentorship
} = require('../controllers/mentorshipController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createMentorship);
router.get('/', authMiddleware, getMentorships);
router.get('/:id', authMiddleware, getMentorship);
router.put('/:id', authMiddleware, updateMentorship);
router.delete('/:id', authMiddleware, deleteMentorship);

module.exports = router;
