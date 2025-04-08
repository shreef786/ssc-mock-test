const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
  explanation: String
});

const sectionSchema = new mongoose.Schema({
  name: String,
  questions: [questionSchema],
  timeLimit: Number
});

const mockTestSchema = new mongoose.Schema({
  examName: String,
  paperName: String,
  totalMarks: Number,
  negativeMark: Number,
  sections: [sectionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MockTest", mockTestSchema);
