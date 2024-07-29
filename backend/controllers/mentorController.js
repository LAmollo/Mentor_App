const asyncHandler = require('express-async-handler');
const Mentor = require('../models/Mentor');

// @desc    Get all mentors
// @route   GET /api/mentors
// @access  Public
const getMentors = asyncHandler(async (req, res) => {
  const mentors = await Mentor.find({});
  res.json(mentors);
});

// @desc    Get single mentor
// @route   GET /api/mentors/:id
// @access  Public
const getMentorById = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.id);

  if (mentor) {
    res.json(mentor);
  } else {
    res.status(404);
    throw new Error('Mentor not found');
  }
});

// @desc    Create a mentor
// @route   POST /api/mentors
// @access  Private/Admin
const createMentor = asyncHandler(async (req, res) => {
  const { name, company, expertise } = req.body;

  const mentor = new Mentor({
    name,
    company,
    expertise,
  });

  const createdMentor = await mentor.save();
  res.status(201).json(createdMentor);
});

// @desc    Update a mentor
// @route   PUT /api/mentors/:id
// @access  Private/Admin
const updateMentor = asyncHandler(async (req, res) => {
  const { name, company, expertise } = req.body;

  const mentor = await Mentor.findById(req.params.id);

  if (mentor) {
    mentor.name = name || mentor.name;
    mentor.company = company || mentor.company;
    mentor.expertise = expertise || mentor.expertise;

    const updatedMentor = await mentor.save();
    res.json(updatedMentor);
  } else {
    res.status(404);
    throw new Error('Mentor not found');
  }
});

// @desc    Delete a mentor
// @route   DELETE /api/mentors/:id
// @access  Private/Admin
const deleteMentor = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.id);

  if (mentor) {
    await mentor.remove();
    res.json({ message: 'Mentor removed' });
  } else {
    res.status(404);
    throw new Error('Mentor not found');
  }
});

module.exports = {
  getMentors,
  getMentorById,
  createMentor,
  updateMentor,
  deleteMentor,
};
