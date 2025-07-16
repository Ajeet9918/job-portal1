import React from 'react';
import { Search, MapPin, TrendingUp, Users, Star } from 'lucide-react';
import { useJob } from '../context/JobContext';

const Hero = () => {
  const { searchQuery, locationQuery, setSearchQuery, setLocationQuery } = useJob();

  const handleSearch = (e) => {
    e.preventDefault();
    // Scroll to jobs section
    const jobsSection = document.getElementById('jobs-section');
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent block">
              Dream Career
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect with top companies and discover opportunities that match your skills and ambitions. Your perfect job is just a search away.
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  />
                </div>
                <button 
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 font-semibold shadow-lg"
                >
                  Search Jobs
                </button>
              </form>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-cyan-400 mb-2">50K+</div>
                <div className="text-gray-300 text-sm">Active Jobs</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-blue-400 mb-2">10K+</div>
                <div className="text-gray-300 text-sm">Companies</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-purple-400 mb-2">100K+</div>
                <div className="text-gray-300 text-sm">Candidates</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
                <div className="text-gray-300 text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;