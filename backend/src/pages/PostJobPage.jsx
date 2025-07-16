import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import React,{ useState } from 'react';

function PostJobPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Job posted:', jobData);
    alert('Job posted successfully!');
    navigate('/');
  };

  if (!user || user.userType !== 'employer') {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-center">Employer Access Required</h2>
        <p className="text-center mt-4">
          Only registered employers can post jobs. Please sign in as an employer.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Post a New Job</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Job Title</label>
          <input
            type="text"
            value={jobData.title}
            onChange={(e) => setJobData({...jobData, title: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Job Description</label>
          <textarea
            value={jobData.description}
            onChange={(e) => setJobData({...jobData, description: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg h-40"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Company</label>
            <input
              type="text"
              value={jobData.company}
              onChange={(e) => setJobData({...jobData, company: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={jobData.location}
              onChange={(e) => setJobData({...jobData, location: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Salary Range</label>
          <input
            type="text"
            value={jobData.salary}
            onChange={(e) => setJobData({...jobData, salary: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="e.g. $50,000 - $70,000"
          />
        </div>
        
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all font-medium"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}

export default PostJobPage;