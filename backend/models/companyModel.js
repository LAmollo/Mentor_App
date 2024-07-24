const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: String,
    email: String,
    skills: [String],
    industry: String,
});

const companySchema = new mongoose.Schema({
    name: String,
    industry: String,
    mentors: [mentorSchema],
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;