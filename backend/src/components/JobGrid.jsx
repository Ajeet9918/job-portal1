import React from 'react';
import JobCard from './JobCard';
import { useJob } from '../context/JobContext';

const JobGrid = () => {
  const { filteredJobs } = useJob();
  const [showAll, setShowAll] = React.useState(false);

  const displayedJobs = showAll ? filteredJobs : filteredJobs.slice(0, 6);

  return (
    <section id="jobs-section" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Latest Job Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your next career move with our curated selection of premium job opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No jobs found matching your criteria</div>
            <p className="text-gray-400">Try adjusting your search terms or filters</p>
          </div>
        )}

        {filteredJobs.length > 6 && (
          <div className="text-center mt-12">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all transform hover:scale-105 font-medium"
            >
              {showAll ? 'Show Less' : `View All ${filteredJobs.length} Jobs`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobGrid;