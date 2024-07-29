const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    activities: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
