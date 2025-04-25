const mongoose = require('mongoose');
const GradeSchema = require('./Grade');

const StudentSchema = new mongoose.Schema({
  studentcode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  studypoints: { type: Number, default: 0 },
  grades: { type: [GradeSchema], default: [] },
});

module.exports = mongoose.model('Student', StudentSchema);
