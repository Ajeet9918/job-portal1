import React from 'react';
import { Star, Users, MapPin, TrendingUp } from 'lucide-react';

const FeaturedCompanies = () => {
  const companies = [
    {
      name: 'TechCorp',
      logo: 'TC',
      rating: 4.8,
      employees: '1,000+',
      location: 'San Francisco, CA',
      openJobs: 15,
      industry: 'Technology',
      description: 'Leading technology company focused on innovation and digital transformation.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'InnovateLabs',
      logo: 'IL',
      rating: 4.9,
      employees: '500+',
      location: 'Remote',
      openJobs: 8,
      industry: 'SaaS',
      description: 'Building the future of B2B software solutions with cutting-edge technology.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'DesignStudio',
      logo: 'DS',
      rating: 4.7,
      employees: '200+',
      location: 'New York, NY',
      openJobs: 12,
      industry: 'Design',
      description: 'Award-winning design agency creating beautiful digital experiences.',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'CloudTech',
      logo: 'CT',
      rating: 4.6,
      employees: '800+',
      location: 'Austin, TX',
      openJobs: 20,
      industry: 'Cloud Services',
      description: 'Cloud infrastructure provider helping businesses scale globally.',
      color: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Companies
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join industry leaders and innovative startups that are shaping the future
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companies.map((company, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-100 group"
            >
              {/* Company Logo */}
              <div className="flex items-center justify-center mb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${company.color} rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                  {company.logo}
                </div>
              </div>

              {/* Company Info */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {company.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{company.industry}</p>
                <p className="text-gray-700 text-sm line-clamp-2">
                  {company.description}
                </p>
              </div>

              {/* Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                    Rating
                  </span>
                  <span className="font-semibold text-gray-900">{company.rating}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Employees
                  </span>
                  <span className="font-semibold text-gray-900">{company.employees}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Location
                  </span>
                  <span className="font-semibold text-gray-900">{company.location}</span>
                </div>
              </div>

              {/* Open Jobs */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Open Positions</span>
                  <span className="text-sm font-semibold text-blue-600">{company.openJobs} jobs</span>
                </div>
                <button 
                  onClick={() => alert(`Viewing jobs at ${company.name}!\n\nIn a real application, this would filter jobs by company or redirect to the company's job listings.`)}
                  className="w-full mt-3 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
                >
                  View Jobs
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => alert('Viewing all companies!\n\nIn a real application, this would navigate to a dedicated companies page.')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all transform hover:scale-105 font-medium"
          >
            View All Companies
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompanies;