import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import MyComponent from "./MyComponent";

// function App() {
//   return (
//     <div>
//       <MyComponent />
//     </div>
//   );
// }


// function App() {
//   const name = "Nibir";
//   return (
//     <div>
//       <h1>Hello, {name}!</h1>
//       <p>This is your AI-powered Resume Analyzer.</p>
//     </div>
//   );
// }

// import Greeting from "./Greeting";

// function App() {
//   return (
//     <div>
//       <Greeting user="Nibir" />
//       <Greeting user="John" />
//     </div>
//   );
// }


// import Counter from "./Counter";

// function App() {
//   return (
//     <div>
//       <Counter />
//       <Counter />

//     </div>
//   );
// }

// export default App;

// import ResumeForm from "./ResumeForm";

// function App() {
//   return (
//     <div>
//       <ResumeForm />
//     </div>
//   );
// }

// import ResumeAnalyzer from "./ResumeAnalyzer";

// function App() {
//   return (
//     <div>
//       <ResumeAnalyzer />
//     </div>
//   );
// }

// export default App;

import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Upload from "./Upload";
import Results from "./Results";
import ResumeList from "./components/ResumeList";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/upload">Upload</Link> |{" "}
        <Link to="/results">Results</Link> |{" "}
        {/* <Link to="/resumes">Resumes</Link> */}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/results" element={<Results />} />
        {/* <Route path="/resumes" element={<ResumeList />} /> */}
      </Routes>
    </div>
  );
}

export default App;
