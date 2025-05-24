import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumeContext from "./ResumeContext";

function Upload() {
  const { setResumeFile, setParsedText, setSkills } = useContext(ResumeContext);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError("Please select a file.");
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      setError("Only PDF or DOCX files allowed.");
      return;
    }

    setError(""); // Clear error message
    setMessage(""); // Clear previous messages

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setResumeFile(file);
        setParsedText(result.text);
        setSkills(result.skills || []);
        setMessage("✅ Upload successful!");
        navigate("/results"); // Navigate to results page
      } else {
        setError(result.message || "Upload failed.");
      }
    } catch (err) {
      setError("Something went wrong while uploading.");
    }
  };

  return (
    <div>
      <h2>Upload Your Resume</h2>
      <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}

export default Upload;
