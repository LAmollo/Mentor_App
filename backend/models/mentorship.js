const mongoose = require('mongoose');

const mentorshipSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  status: { type: String, default: 'Pending' },
}, { timestamps: true });

const Mentorship = mongoose.model('Mentorship', mentorshipSchema);

module.exports = Mentorship;
