import React, { useEffect, useState } from "react";
import axios from "axios";

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/resumes");
        setResumes(response.data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Uploaded Resumes</h2>
      {resumes.length === 0 ? (
        <p>No resumes found.</p>
      ) : (
        <ul className="list-group">
          {resumes.map((resume) => (
            <li key={resume._id} className="list-group-item">
              <strong>{resume.filename}</strong>
              <br />
              <small>{resume.filename}</small>
              <br />
              <strong>Skills:</strong> {resume.skills.join(", ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResumeList;
