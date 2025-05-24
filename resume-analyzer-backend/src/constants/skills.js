const SKILL_CATEGORIES = {
  PROGRAMMING_LANGUAGES: [
    'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Go', 'Rust',
    'TypeScript', 'Kotlin', 'Scala', 'R', 'MATLAB', 'Perl', 'Shell Scripting'
  ],
  
  FRONTEND: [
    'HTML', 'CSS', 'React', 'Angular', 'Vue.js', 'Svelte', 'jQuery', 'Bootstrap',
    'Tailwind CSS', 'SASS/SCSS', 'Redux', 'Next.js', 'Webpack', 'Material-UI'
  ],
  
  BACKEND: [
    'Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot', 'Laravel',
    'ASP.NET', 'Ruby on Rails', 'FastAPI', 'GraphQL', 'REST API'
  ],
  
  DATABASES: [
    'MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Redis', 'Oracle',
    'Microsoft SQL Server', 'Cassandra', 'Firebase', 'DynamoDB'
  ],
  
  DEVOPS: [
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Jenkins',
    'GitLab CI/CD', 'Terraform', 'Ansible', 'Linux', 'Nginx'
  ],
  
  TOOLS: [
    'Git', 'GitHub', 'VS Code', 'Postman', 'Jira', 'Confluence',
    'npm', 'yarn', 'Webpack', 'Babel'
  ],
  
  SOFT_SKILLS: [
    'Problem Solving', 'Team Leadership', 'Communication', 'Project Management',
    'Agile/Scrum', 'Time Management', 'Critical Thinking', 'Collaboration'
  ],
  
  TESTING: [
    'Jest', 'Mocha', 'Cypress', 'Selenium', 'JUnit', 'PyTest',
    'TestNG', 'Unit Testing', 'Integration Testing', 'E2E Testing'
  ],
  
  AI_ML: [
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch',
    'Scikit-learn', 'Natural Language Processing', 'Computer Vision'
  ]
};

// Flatten all skills into a single array
const ALL_SKILLS = Object.values(SKILL_CATEGORIES).flat();

module.exports = {
  SKILL_CATEGORIES,
  ALL_SKILLS
}; 