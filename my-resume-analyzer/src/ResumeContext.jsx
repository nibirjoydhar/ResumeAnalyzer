// import { createContext, useState } from "react";

// // Step 1: Create the context
// const ResumeContext = createContext();

// // Step 2: Create a wrapper component to provide the state
// export function ResumeProvider({ children }) {
//   const [resumeFile, setResumeFile] = useState(null);

//   return (
//     <ResumeContext.Provider value={{ resumeFile, setResumeFile }}>
//       {children}
//     </ResumeContext.Provider>
//   );
// }

// export default ResumeContext;

// import { createContext, useState } from "react";

// const ResumeContext = createContext();

// export function ResumeProvider({ children }) {
//   const [resumeFile, setResumeFile] = useState(null);
//   const [parsedText, setParsedText] = useState("");

//   return (
//     <ResumeContext.Provider value={{ resumeFile, setResumeFile, parsedText, setParsedText }}>
//       {children}
//     </ResumeContext.Provider>
//   );
// }

// export default ResumeContext;

import { createContext, useState } from "react";

const ResumeContext = createContext();                                                                                                                                                                                                                                                                                            

export function ResumeProvider({ children }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [parsedText, setParsedText] = useState("");
  const [skills, setSkills] = useState([]);

  return (
    <ResumeContext.Provider value={{ resumeFile, setResumeFile, parsedText, setParsedText, skills, setSkills }}>
      {children}
    </ResumeContext.Provider>
  );
}

export default ResumeContext;
