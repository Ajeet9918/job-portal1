import React, { useState } from 'react';
import { Filter, MapPin, Briefcase, DollarSign, Clock, ChevronDown } from 'lucide-react';
import { useJob } from '../context/JobContext';

const SearchFilters = () => {
  const { filters, setFilters, filteredJobs, locationQuery, setLocationQuery } = useJob();

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);
  const [tempLocation, setTempLocation] = useState(locationQuery);

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
  const salaryRanges = ['Under $50k', '$50k-$80k', '$80k-$120k', '$120k-$180k', '$180k+'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];

  const handleQuickFilter = (filterType, value) => {
    const newFilters = { ...filters };
    if (filterType === 'remote') {
      newFilters.remote = !newFilters.remote;
    } else if (filterType === 'jobType') {
      newFilters.jobType = newFilters.jobType === value ? '' : value;
    }
    setFilters(newFilters);
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setLocationQuery(tempLocation);
    setIsFiltersOpen(false);
  };

  const clearFilters = () => {
    const clearedFilters = {
      jobType: '',
      salary: '',
      experience: '',
      remote: false
    };
    setFilters(clearedFilters);
    setTempFilters(clearedFilters);
    setLocationQuery('');
    setTempLocation('');
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <button 
              onClick={() => handleQuickFilter('remote', true)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filters.remote 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              Remote
            </button>
            <button 
              onClick={() => handleQuickFilter('jobType', 'Full-time')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filters.jobType === 'Full-time' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              Full-time
            </button>
            <button 
              onClick={() => handleQuickFilter('jobType', 'Contract')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filters.jobType === 'Contract' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              Contract
            </button>
            <button 
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              Senior Level
            </button>
          </div>

          {/* Results Count */}
          <div className="text-gray-600">
            <span className="font-semibold">{filteredJobs.length}</span> jobs found
          </div>
        </div>

        {/* Expanded Filters */}
        {isFiltersOpen && (
          <div className="mt-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline-block mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  value={tempLocation}
                  onChange={(e) => setTempLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Briefcase className="w-4 h-4 inline-block mr-1" />
                  Job Type
                </label>
                <select 
                  value={tempFilters.jobType}
                  onChange={(e) => setTempFilters({...tempFilters, jobType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Salary Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline-block mr-1" />
                  Salary Range
                </label>
                <select 
                  value={tempFilters.salary}
                  onChange={(e) => setTempFilters({...tempFilters, salary: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Ranges</option>
                  {salaryRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline-block mr-1" />
                  Experience
                </label>
                <select 
                  value={tempFilters.experience}
                  onChange={(e) => setTempFilters({...tempFilters, experience: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Levels</option>
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between mt-6">
              <button 
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Clear all filters
              </button>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setIsFiltersOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={applyFilters}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;