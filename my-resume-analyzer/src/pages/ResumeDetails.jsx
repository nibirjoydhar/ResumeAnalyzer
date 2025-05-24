import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { SKILL_CATEGORIES } from '../constants/skills';

function ResumeDetails() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/resumes/${id}`);
        setResume(response.data.data);
      } catch (error) {
        toast.error('Error fetching resume details');
        navigate('/resumes');
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/resumes/${id}`);
      toast.success('Resume deleted successfully');
      navigate('/resumes');
    } catch (error) {
      toast.error('Error deleting resume');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Group skills by category
  const groupedSkills = resume?.skills.reduce((acc, skill) => {
    const category = Object.entries(SKILL_CATEGORIES).find(([_, skills]) =>
      skills.includes(skill)
    )?.[0];
    
    if (category) {
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
    } else {
      if (!acc['OTHER']) acc['OTHER'] = [];
      acc['OTHER'].push(skill);
    }
    
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!resume) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{resume.originalName}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Uploaded on {formatDate(resume.createdAt)}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
        >
          Delete Resume
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Analysis Summary */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis Summary</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Confidence Score</span>
                <span className="text-sm font-semibold text-gray-900">{resume.analysis.confidence}%</span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 rounded-full h-2"
                  style={{ width: `${resume.analysis.confidence}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-sm font-medium text-gray-500">Experience</span>
              <span className="text-sm font-semibold text-gray-900">
                {resume.analysis.experienceYears} years
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-sm font-medium text-gray-500">Education Level</span>
              <span className="text-sm font-semibold text-gray-900">
                {resume.analysis.educationLevel}
              </span>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <span className="text-sm font-medium text-gray-500">Skills Detected</span>
              <span className="text-sm font-semibold text-gray-900">
                {resume.skills.length} skills
              </span>
            </div>
          </div>
        </div>

        {/* Skills by Category */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills by Category</h2>
          <div className="space-y-6">
            {Object.entries(groupedSkills).map(([category, skills]) => (
              <div key={category}>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {category.split('_').join(' ')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Text Preview */}
        <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Resume Content</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <pre className="whitespace-pre-wrap text-sm text-gray-600 font-mono">
              {resume.text}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeDetails; 