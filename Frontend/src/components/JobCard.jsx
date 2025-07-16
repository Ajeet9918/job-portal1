import React from 'react';
import { MapPin, Clock, DollarSign, Building, Users, Star, Heart } from 'lucide-react';
import { useJob } from '../context/JobContext';

const JobCard = ({ job }) => {
  const { saveJob, unsaveJob, isJobSaved } = useJob();
  const saved = isJobSaved(job.id);

  const handleSaveJob = () => {
    if (saved) {
      unsaveJob(job.id);
    } else {
      saveJob(job.id);
    }
  };

  const handleApply = () => {
    alert(`Applying for ${job.title} at ${job.company}!\n\nIn a real application, this would open the application form or redirect to the company's application page.`);
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border-l-4 ${
      job.featured ? 'border-gradient-to-b from-cyan-500 to-blue-500' : 'border-gray-200'
    } relative overflow-hidden group`}>
      {/* Featured Badge */}
      {job.featured && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          <Star className="w-3 h-3 inline-block mr-1" />
          Featured
        </div>
      )}

      {/* Company Logo & Info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
            {job.company.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-gray-600 flex items-center">
              <Building className="w-4 h-4 mr-1" />
              {job.company}
            </p>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2 text-gray-400" />
          <span>{job.type}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
          <span className="font-semibold text-green-600">{job.salary}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {job.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-gray-500 text-sm">{job.postedAt}</span>
        <div className="flex space-x-2">
          <button 
            onClick={handleSaveJob}
            className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-1 ${
              saved 
                ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                : 'text-blue-600 hover:bg-blue-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
            <span>{saved ? 'Saved' : 'Save'}</span>
          </button>
          <button 
            onClick={handleApply}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all transform hover:scale-105 font-medium"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default JobCard;