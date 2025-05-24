const express = require("express");
const cors = require("cors");
const uploadRoute = require("./routes/upload");

const app = express();
const PORT = 5000;

const skillsList = [
  "JavaScript", "Python", "C++", "HTML", "CSS", "React", "Node.js",
  "Express", "MongoDB", "MySQL", "Docker", "Kubernetes",
  "Teamwork", "Communication", "Problem Solving", "Leadership"
];


app.use(cors());
app.use("/api", uploadRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
