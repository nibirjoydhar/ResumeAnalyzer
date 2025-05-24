const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/resume_analyser', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  const Resume = mongoose.model('Resume', new mongoose.Schema({ filename: String }));
  const resume = new Resume({ filename: 'test.pdf' });

  resume.save()
    .then(() => console.log('Resume saved'))
    .catch((err) => console.log('Error saving resume:', err));
}).catch((err) => console.log('MongoDB connection error:', err));
