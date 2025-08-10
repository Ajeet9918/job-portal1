import React, { useState } from 'react';
import { X, Scale, MapPin, DollarSign, Clock, Building, Star, Check, X as XIcon } from 'lucide-react';
import { useJob } from '../context/JobContext';

const JobComparison = ({ isOpen, onClose }) => {
  const { jobs, savedJobs } = useJob();
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [compareMode, setCompareMode] = useState(false);

  const savedJobObjects = jobs.filter(job => savedJobs.includes(job._id || job.id));

  const addToComparison = (job) => {
    if (selectedJobs.length < 3 && !selectedJobs.find(j => j._id === job._id)) {
      setSelectedJobs([...selectedJobs, job]);
    }
  };

  const removeFromComparison = (jobId) => {
    setSelectedJobs(selectedJobs.filter(job => job._id !== jobId));
  };

  const startComparison = () => {
    if (selectedJobs.length >= 2) {
      setCompareMode(true);
    }
  };

  const getComparisonData = () => {
    if (selectedJobs.length < 2) return null;

    const data = {
      salary: selectedJobs.map(job => job.salary),
      location: selectedJobs.map(job => job.location),
      type: selectedJobs.map(job => job.type),
      experience: selectedJobs.map(job => job.experience || 'Not specified'),
      remote: selectedJobs.map(job => job.location.toLowerCase().includes('remote')),
      featured: selectedJobs.map(job => job.featured),
      tags: selectedJobs.map(job => job.tags?.length || 0),
      company: selectedJobs.map(job => job.company)
    };

    return data;
  };

  const comparisonData = getComparisonData();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Scale className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Job Comparison</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {!compareMode ? (
            /* Job Selection Mode */
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Select Jobs to Compare (Max 3)
                </h3>
                <p className="text-gray-600">
                  Choose 2-3 jobs to compare their features, benefits, and requirements
                </p>
              </div>

              {/* Selected Jobs */}
              {selectedJobs.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Selected Jobs:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedJobs.map((job) => (
                      <div key={job._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-gray-900 line-clamp-2">{job.title}</h5>
                          <button
                            onClick={() => removeFromComparison(job._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          {job.location}
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedJobs.length >= 2 && (
                    <button
                      onClick={startComparison}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Compare Jobs
                    </button>
                  )}
                </div>
              )}

              {/* Available Jobs */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Available Jobs:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedJobObjects
                    .filter(job => !selectedJobs.find(selected => selected._id === job._id))
                    .map((job) => (
                      <div key={job._id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                        <h5 className="font-semibold text-gray-900 line-clamp-2 mb-2">{job.title}</h5>
                        <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <MapPin className="w-3 h-3 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-600">{job.salary}</span>
                          <button
                            onClick={() => addToComparison(job)}
                            disabled={selectedJobs.length >= 3}
                            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            Add to Compare
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            /* Comparison Mode */
            <div>
              <div className="mb-6">
                <button
                  onClick={() => setCompareMode(false)}
                  className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
                >
                  ← Back to Selection
                </button>
                <h3 className="text-xl font-bold text-gray-900">Job Comparison</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-4 font-semibold text-gray-900">Features</th>
                      {selectedJobs.map((job) => (
                        <th key={job._id} className="text-center p-4 font-semibold text-gray-900 min-w-[200px]">
                          <div className="text-center">
                            <h4 className="font-semibold text-gray-900 line-clamp-2 mb-1">{job.title}</h4>
                            <p className="text-sm text-gray-600">{job.company}</p>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-medium text-gray-700">Salary</td>
                      {selectedJobs.map((job) => (
                        <td key={job._id} className="p-4 text-center">
                          <span className="font-semibold text-green-600">{job.salary}</span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-medium text-gray-700">Location</td>
                      {selectedJobs.map((job) => (
                        <td key={job._id} className="p-4 text-center">
                          <div className="flex items-center justify-center">
                            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                            {job.location}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-medium text-gray-700">Job Type</td>
                      {selectedJobs.map((job) => (
                        <td key={job._id} className="p-4 text-center">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {job.type}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-medium text-gray-700">Experience Level</td>
                      {selectedJobs.map((job) => (
                        <td key={job._id} className="p-4 text-center">
                          {job.experience || 'Not specified'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-medium text-gray-700">Remote Work</td>
                      {selectedJobs.map((job) => (
                        <td key={job._id} className="p-4 text-center">
                          {job.location.toLowerCase().includes('remote') ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <XIcon className="w-5 h-5 text-red-500 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-medium text-gray-700">Featured Job</td>
                      {selectedJobs.map((job) => (
                        <td key={job._id} className="p-4 text-center">
                          {job.featured ? (
                            <Star className="w-5 h-5 text-yellow-500 mx-auto" />
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-medium text-gray-700">Skills Required</td>
                      {selectedJobs.map((job) => (
                        <td key={job._id} className="p-4 text-center">
                          <span className="text-sm text-gray-600">{job.tags?.length || 0} skills</span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-medium text-gray-700">Company Size</td>
                      {selectedJobs.map((job) => (
                        <td key={job._id} className="p-4 text-center">
                          <span className="text-sm text-gray-600">Not specified</span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-center space-x-4">
                {selectedJobs.map((job) => (
                  <button
                    key={job._id}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply to {job.company}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobComparison;
