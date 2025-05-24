// import { useState } from "react";

// function ResumeForm() {
//   const [name, setName] = useState("");

//   function handleChange(event) {
//     setName(event.target.value);
//   }

//   return (
//     <div>
//       <h2>Enter Your Name:</h2>
//       <input type="text" value={name} onChange={handleChange} />
//       <p>Hello, {name}!</p>


//     </div>
//   );
// }

// export default ResumeForm;

import {useState} from "react";

function ResumeUpload() {
    const [file, setFile]=useState(null);

    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }

    return (
        <div>
            <h2 class="border p-2 m-2 text-right">Upload Your Resume (PDF only):</h2>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            {file&&<p>Selected File: {file.name} <br></br> <a href="/path/to/your-cv-file.pdf" download class="download-button">
                <i class="fas fa-file-pdf"></i> Download CV
            </a> </p>}
        </div>
    );
}

export default ResumeUpload;
