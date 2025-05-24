function ResumePreview({ file }) {
    return file ? <p>Selected File: {file.name}</p> : <p>No file selected</p>;
  }
  
  export default ResumePreview;
  