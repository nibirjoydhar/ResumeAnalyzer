const path = require('path');
const fs = require('fs').promises;
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const Resume = require('../models/Resume');
const { ALL_SKILLS, SKILL_CATEGORIES } = require('../constants/skills');

// Utility function to extract text based on file type
const extractTextFromFile = async (filePath, fileType) => {
  try {
    if (fileType === 'pdf') {
      const dataBuffer = await fs.readFile(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    } else if (fileType === 'docx') {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    }
    throw new Error('Unsupported file type');
  } catch (error) {
    throw new Error(`Error extracting text: ${error.message}`);
  }
};

// Utility function to analyze text and extract information
const analyzeText = (text) => {
  const textLower = text.toLowerCase();
  
  // Extract skills
  const matchedSkills = ALL_SKILLS.filter(skill =>
    textLower.includes(skill.toLowerCase())
  );

  // Estimate experience years
  const experienceMatch = text.match(/(\d+)[\s+](?:year|yr)s?\s+(?:of\s+)?experience/i);
  const experienceYears = experienceMatch ? parseInt(experienceMatch[1]) : 0;

  // Detect education level
  const educationLevel = ['PhD', 'Master', 'Bachelor'].find(level =>
    textLower.includes(level.toLowerCase())
  ) || 'Not Specified';

  // Calculate confidence score based on various factors
  const confidence = Math.min(
    100,
    Math.floor(
      (matchedSkills.length * 10) +
      (experienceYears * 5) +
      (educationLevel !== 'Not Specified' ? 20 : 0)
    )
  );

  return {
    skills: matchedSkills,
    experienceYears,
    educationLevel,
    confidence,
    skillsMatch: matchedSkills.length
  };
};

// Controller methods
exports.uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded'
    });
  }

  try {
    const fileType = path.extname(req.file.originalname).toLowerCase().substring(1);
    const text = await extractTextFromFile(req.file.path, fileType);
    const analysis = analyzeText(text);

    const resume = new Resume({
      filename: req.file.filename,
      originalName: req.file.originalname,
      filepath: req.file.path,
      fileType,
      text,
      skills: analysis.skills,
      analysis: {
        skillsMatch: analysis.skillsMatch,
        experienceYears: analysis.experienceYears,
        educationLevel: analysis.educationLevel,
        confidence: analysis.confidence
      },
      status: 'analyzed'
    });

    await resume.save();

    res.status(201).json({
      success: true,
      data: resume,
      message: 'Resume uploaded and analyzed successfully'
    });
  } catch (error) {
    // Clean up uploaded file if there's an error
    if (req.file) {
      await fs.unlink(req.file.path).catch(console.error);
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Error processing resume'
    });
  }
};

exports.getResumes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const resumes = await Resume.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-text'); // Exclude the full text for performance

    const total = await Resume.countDocuments();

    res.json({
      success: true,
      data: {
        resumes,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching resumes'
    });
  }
};

exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    res.json({
      success: true,
      data: resume
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching resume'
    });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Delete file from storage
    if (resume.filepath) {
      await fs.unlink(resume.filepath).catch(console.error);
    }

    await resume.deleteOne();

    res.json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting resume'
    });
  }
}; 