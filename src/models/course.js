const mongoose = require('mongoose');

const { Schema } = mongoose;

const CourseSchema = new Schema({
    name: String,
    code: String,
});

const CourseModel = mongoose.model('courses', CourseSchema);
module.exports = CourseModel;