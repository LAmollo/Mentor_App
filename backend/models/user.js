const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    academics: String,
    sports: String,
    internships: String,
    workExperience: String,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
