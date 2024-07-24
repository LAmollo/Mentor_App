const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: String,
    email: String,
    skills: [String],
    industry: String,
});