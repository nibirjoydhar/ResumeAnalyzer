import { useState } from "react";
import ResumeUpload from "./ResumeUpload";
import ResumePreview from "./ResumePreview";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);

  function handleFileSelect(selectedFile) {
    setFile(selectedFile);
  }

  return (
    <div>
      <ResumeUpload onFileSelect={handleFileSelect} />
      <ResumePreview file={file} />
    </div>
  );
}

export default ResumeAnalyzer;
