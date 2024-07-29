const express = require('express');
const router = express.Router();
const {
  getMentors,
  getMentorById,
  createMentor,
  updateMentor,
  deleteMentor,
} = require('../controllers/mentorController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getMentors).post(protect, admin, createMentor);
router
  .route('/:id')
  .get(getMentorById)
  .put(protect, admin, updateMentor)
  .delete(protect, admin, deleteMentor);

module.exports = router;
