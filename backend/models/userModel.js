const mongoose = require('mongoose');

const academicSchema = new mongoose.Schema({
    course: String,
    grade: String,
    year: String,
});


const sportSchema = new mongoose.Schema({
    name: String,
    position: String,
    achievements: String,
});

const internshipSchema = new mongoose.Schema({
    company: String,
    role: String,
    duration: String,
    description: String,
});

const workSchema = new mongoose.Schema({
    company: String,
    role: String,
    duration: String,
    description: String,
});

const activitySchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
});

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    profile: {
        academics: [academicSchema],
        sports: [sportSchema],
        internships: [internshipSchema],
        work: [workSchema],
        activities: [activitySchema],
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;