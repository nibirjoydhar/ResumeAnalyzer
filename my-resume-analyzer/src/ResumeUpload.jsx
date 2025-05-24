function ResumeUpload({ onFileSelect }) {
    function handleChange(event) {
      onFileSelect(event.target.files[0]);
    }
  
    return <input type="file" accept=".pdf" onChange={handleChange} />;
  }
  
  export default ResumeUpload;
  