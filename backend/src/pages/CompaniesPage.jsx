import React from 'react';

function CompaniesPage() {
  // Company data array
  const companies = [
    {
      name: "TechCorp",
      logo: "🖥️", // In a real app, use actual logo images
      industry: "Software Development",
      jobs: 52,
      rating: 4.3,
      location: "San Francisco, CA",
      highlights: ["Flexible work", "Stock options", "Learning budget"]
    },
    {
      name: "DataSystems",
      logo: "📊",
      industry: "Big Data & Analytics",
      jobs: 28,
      rating: 4.1,
      location: "New York, NY",
      highlights: ["Remote options", "Health benefits", "401k matching"]
    },
    {
      name: "DesignHub",
      logo: "🎨",
      industry: "UX/UI Design",
      jobs: 15,
      rating: 4.5,
      location: "Austin, TX",
      highlights: ["Creative culture", "Profit sharing", "Wellness program"]
    },
    {
      name: "CloudNine",
      logo: "☁️",
      industry: "Cloud Computing",
      jobs: 37,
      rating: 4.0,
      location: "Seattle, WA",
      highlights: ["Cutting-edge tech", "Conference budget", "Team retreats"]
    },
    {
      name: "MobileFirst",
      logo: "📱",
      industry: "Mobile Development",
      jobs: 23,
      rating: 3.9,
      location: "Boston, MA",
      highlights: ["Pet-friendly", "Snacks", "Game room"]
    },
    {
      name: "CyberShield",
      logo: "🔒",
      industry: "Cybersecurity",
      jobs: 41,
      rating: 4.2,
      location: "Washington, DC",
      highlights: ["Security training", "Bonus structure", "Team events"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Featured Companies</h1>
      
      {/* Search and filter bar */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <input 
          type="text" 
          placeholder="Search companies..." 
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Industries</option>
          <option>Software Development</option>
          <option>Big Data & Analytics</option>
          <option>UX/UI Design</option>
          <option>Cloud Computing</option>
          <option>Cybersecurity</option>
        </select>
      </div>

      {/* Company cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="text-4xl bg-blue-50 p-3 rounded-lg">{company.logo}</div>
              <div>
                <h2 className="text-xl font-semibold">{company.name}</h2>
                <p className="text-gray-600">{company.industry}</p>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 text-gray-700">{company.rating}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-gray-600">{company.location}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">{company.jobs} open positions</span>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View all
                </button>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Company Highlights</h3>
                <ul className="space-y-1">
                  {company.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Browse Jobs
            </button>
          </div>
        ))}
      </div>

      {/* View more button */}
      <div className="mt-8 text-center">
        <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
          View All Companies
        </button>
      </div>
    </div>
  );
}

export default CompaniesPage;