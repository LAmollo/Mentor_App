// models/Company.js
const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  industry: { type: String },
  location: { type: String },
  profile: {
    size: { type: String },
    website: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String }
  },
  mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // List of mentor IDs
});

module.exports = mongoose.model('Company', CompanySchema);
