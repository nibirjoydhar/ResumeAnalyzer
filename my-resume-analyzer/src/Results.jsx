// function Results() {
//     return <h1>Analysis Results</h1>;
// }

// export default Results;

// import { useContext } from "react";
// import ResumeContext from "./ResumeContext";

// function Results() {
//   const { resumeFile } = useContext(ResumeContext);

//   return (
//     <div>
//       <h2>Resume Preview</h2>
//       {resumeFile ? (
//         <div>
//           <p>Filename: {resumeFile.name}</p>
//           <p>Size: {(resumeFile.size / 1024).toFixed(2)} KB</p>
//         </div>
//       ) : (
//         <p>No file uploaded yet.</p>
//       )}
//     </div>
//   );
// }

// export default Results;


import {useContext} from "react";
import ResumeContext from "./ResumeContext";

function Results() {
  // const {resumeFile, parsedText}=useContext(ResumeContext);
  const {resumeFile, parsedText, skills} = useContext(ResumeContext);

  return (
    <div>
      <h2>Resume Preview</h2>
      {resumeFile? (
        <div>
          <p><strong>Filename:</strong> {resumeFile.name}</p>
          <p><strong>Size:</strong> {(resumeFile.size/1024).toFixed(2)} KB</p>
          <hr />
          <h3>Extracted Text:</h3>
          <pre style={{whiteSpace: "pre-wrap", background: "#f4f4f4", padding: "1rem", borderRadius: "10px"}}>
            {parsedText||"No text extracted."}
          </pre>

          <h3>Skills Detected:</h3>
          <ul>
            {skills.length>0? (
              skills.map((skill, idx) => <li key={idx}>{skill}</li>)
            ):(
              <li>No skills detected.</li>
            )}
          </ul>

        </div>
      ):(
        <p>No file uploaded yet.</p>
      )}
    </div>
  );
}

export default Results;
