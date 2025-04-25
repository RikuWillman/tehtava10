const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  coursecode: { type: String, required: true },
  grade: { type: Number, required: true, min: 0, max: 5 },
});

module.exports = GradeSchema;
