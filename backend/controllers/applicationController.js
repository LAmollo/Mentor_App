// controllers/applicationController.js
const Application = require('../models/Application');

// Apply for a job
exports.applyForJob = async (req, res) => {
  try {
    const { companyId } = req.body;
    const application = new Application({
      student: req.user.id,
      company: companyId,
      status: 'applied'
    });
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get application history
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user.id }).populate('company');
    res.json(applications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
