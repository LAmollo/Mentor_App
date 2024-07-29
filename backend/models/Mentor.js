const mongoose = require('mongoose');

const mentorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    expertise: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;
