// models/Application.js
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  status: { type: String, enum: ['applied', 'interviewed', 'offered', 'rejected'], default: 'applied' }
});

module.exports = mongoose.model('Application', ApplicationSchema);
