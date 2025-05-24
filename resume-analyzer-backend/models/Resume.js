const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    filename: String,
    filepath: String,
    text: String,
    skills: [String],
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);
module.exports = Resume;
