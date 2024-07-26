const Mentorship = require('../models/Mentorship');

// Create a new mentorship
exports.createMentorship = async (req, res) => {
  const { student, mentor } = req.body;
  try {
    const mentorship = new Mentorship({ student, mentor });
    await mentorship.save();
    res.status(201).json({ message: 'Mentorship created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all mentorships
exports.getMentorships = async (req, res) => {
  try {
    const mentorships = await Mentorship.find()
      .populate('student', 'name email')
      .populate('mentor', 'name email industry');
    res.json(mentorships);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific mentorship
exports.getMentorship = async (req, res) => {
  try {
    const mentorship = await Mentorship.findById(req.params.id)
      .populate('student', 'name email')
      .populate('mentor', 'name email industry');
    if (!mentorship) {
      return res.status(404).json({ message: 'Mentorship not found' });
    }
    res.json(mentorship);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a mentorship
exports.updateMentorship = async (req, res) => {
  try {
    const updatedMentorship = await Mentorship.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedMentorship) {
      return res.status(404).json({ message: 'Mentorship not found' });
    }
    res.json(updatedMentorship);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a mentorship
exports.deleteMentorship = async (req, res) => {
  try {
    const mentorship = await Mentorship.findByIdAndDelete(req.params.id);
    if (!mentorship) {
      return res.status(404).json({ message: 'Mentorship not found' });
    }
    res.json({ message: 'Mentorship deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
