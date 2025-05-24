const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: [true, 'Filename is required'],
    trim: true
  },
  originalName: {
    type: String,
    required: [true, 'Original filename is required'],
    trim: true
  },
  filepath: {
    type: String,
    required: [true, 'File path is required']
  },
  fileType: {
    type: String,
    enum: ['pdf', 'docx'],
    required: [true, 'File type is required']
  },
  text: {
    type: String,
    required: [true, 'Extracted text is required']
  },
  skills: [{
    type: String,
    trim: true
  }],
  analysis: {
    skillsMatch: {
      type: Number,
      default: 0
    },
    experienceYears: {
      type: Number,
      default: 0
    },
    educationLevel: {
      type: String,
      enum: ['High School', 'Bachelor', 'Master', 'PhD', 'Other', 'Not Specified'],
      default: 'Not Specified'
    },
    confidence: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  },
  status: {
    type: String,
    enum: ['pending', 'analyzed', 'error'],
    default: 'pending'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
resumeSchema.index({ createdAt: -1 });
resumeSchema.index({ skills: 1 });
resumeSchema.index({ 'analysis.skillsMatch': -1 });

const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume; 