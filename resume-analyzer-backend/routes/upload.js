const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const Resume = require("../models/Resume");
const router = express.Router();

// Upload directory setup
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only PDF or DOCX allowed"));
    }
    cb(null, true);
  },
});

// Predefined skill list
const skillsList = [
  "JavaScript", "Python", "C++", "Java", "HTML", "CSS", "React", "Node.js",
  "Express", "MongoDB", "MySQL", "Docker", "Kubernetes",
  "AWS", "Git", "Linux", "REST API", "GraphQL",
  "Teamwork", "Communication", "Problem Solving", "Leadership"
];

// Upload and Parse Resume
router.post("/upload", upload.single("resume"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = path.join(uploadDir, req.file.filename);
  const ext = path.extname(req.file.originalname).toLowerCase();

  try {
    let extractedText = "";

    // Parse PDF files
    if (ext === ".pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      extractedText = data.text;
    } 
    // Parse DOCX files
    else if (ext === ".docx") {
      const data = await mammoth.extractRawText({ path: filePath });
      extractedText = data.value;
    } 
    else {
      return res.status(400).json({ message: "Unsupported file type" });
    }

    // Extract skills
    const matchedSkills = skillsList.filter(skill =>
      extractedText.toLowerCase().includes(skill.toLowerCase())
    );

    // Save to MongoDB
    const newResume = new Resume({
      filename: req.file.originalname,
      filepath: req.file.path,
      text: extractedText,
      skills: matchedSkills,
    });

    await newResume.save();

    res.json({
      message: "File uploaded and parsed successfully",
      filename: req.file.filename,
      text: extractedText,
      skills: matchedSkills,
    });
  } catch (err) {
    console.error("Error parsing file:", err);
    res.status(500).json({ message: "Error parsing resume file" });
  }
});

// Get all resumes
router.get("/resumes", async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 }); // latest first
    res.json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ message: "Failed to fetch resumes" });
  }
});

module.exports = router;
