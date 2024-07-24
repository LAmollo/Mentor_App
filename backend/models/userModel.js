const mongoose = require('mongoose');

const academicSchema = new mongoose.Schema({
    course: String,
    grade: String,
    year: String,
});

