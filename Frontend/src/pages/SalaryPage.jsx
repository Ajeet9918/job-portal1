import React from 'react';

function SalaryPage() {
  // Salary data array
  const salaryData = [
    {
      role: "Software Engineer",
      range: "$90,000 - $120,000",
      experience: "Mid-level (3-5 years)",
      location: "United States",
      trend: "↑ 5% from last year"
    },
    {
      role: "DevOps Engineer",
      range: "$70,000 - $100,000",
      experience: "Mid-level (3-5 years)",
      location: "United States",
      trend: "↑ 7% from last year"
    },
    {
      role: "Frontend Developer",
      range: "$80,000 - $110,000",
      experience: "Mid-level (3-5 years)",
      location: "United States",
      trend: "↑ 4% from last year"
    },
    {
      role: "Backend Developer",
      range: "$85,000 - $115,000",
      experience: "Mid-level (3-5 years)",
      location: "United States",
      trend: "↑ 6% from last year"
    },
    {
      role: "Data Scientist",
      range: "$95,000 - $130,000",
      experience: "Mid-level (3-5 years)",
      location: "United States",
      trend: "↑ 8% from last year"
    },
    {
      role: "UX Designer",
      range: "$75,000 - $105,000",
      experience: "Mid-level (3-5 years)",
      location: "United States",
      trend: "↑ 5% from last year"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Salary Insights</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {salaryData.map((salary, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold mb-2 text-blue-600">{salary.role}</h2>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                {salary.trend}
              </span>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Salary:</span> {salary.range}
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">Experience:</span> {salary.experience}
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">Location:</span> {salary.location}
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors font-medium">
              View Details
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Salary Trends</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">[Salary Trend Chart Would Appear Here]</p>
        </div>
        <p className="mt-4 text-gray-600">
          The tech industry continues to see steady salary growth, with specialized roles like Data Science and DevOps showing the highest increases.
        </p>
      </div>
    </div>
  );
}

export default SalaryPage;