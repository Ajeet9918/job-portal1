import React from 'react';

function ResourcesPage() {
  // Resource categories data
  const resourceCategories = [
    {
      title: "Resume Building",
      icon: "📝",
      description: "Craft a resume that stands out to recruiters",
      resources: [
        "Resume templates for all industries",
        "ATS optimization guide",
        "Action verb cheat sheet",
        "How to quantify achievements"
      ]
    },
    {
      title: "Interview Preparation",
      icon: "💼",
      description: "Ace your next job interview",
      resources: [
        "Common interview questions",
        "Behavioral interview guide",
        "Technical interview prep",
        "Salary negotiation tips"
      ]
    },
    {
      title: "Career Development",
      icon: "📈",
      description: "Grow your professional skills",
      resources: [
        "Career path planning",
        "Skill gap analysis",
        "Mentorship programs",
        "Continuing education options"
      ]
    },
    {
      title: "Job Search Strategies",
      icon: "🔍",
      description: "Find your dream job efficiently",
      resources: [
        "Networking techniques",
        "LinkedIn optimization",
        "Job board comparison",
        "Cold email templates"
      ]
    },
    {
      title: "Workplace Success",
      icon: "🏆",
      description: "Thrive in your professional environment",
      resources: [
        "Remote work best practices",
        "Time management techniques",
        "Team collaboration tips",
        "Promotion roadmap"
      ]
    },
    {
      title: "Industry Insights",
      icon: "📊",
      description: "Stay ahead of market trends",
      resources: [
        "Emerging tech skills",
        "Salary benchmark reports",
        "Company culture guides",
        "Future of work trends"
      ]
    }
  ];

  // Featured articles
  const featuredArticles = [
    {
      title: "How to Tailor Your Resume for Each Job Application",
      excerpt: "Learn the art of customizing your resume to match specific job descriptions without misrepresenting your experience.",
      readTime: "8 min read"
    },
    {
      title: "The STAR Method: Perfecting Behavioral Interview Answers",
      excerpt: "Master this framework to structure compelling responses that showcase your skills and experience.",
      readTime: "10 min read"
    },
    {
      title: "Negotiating Your Salary: A Step-by-Step Guide",
      excerpt: "Strategies to research, approach, and successfully negotiate your compensation package.",
      readTime: "12 min read"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Career Resources</h1>
      
      {/* Resource Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Resource Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourceCategories.map((category, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">{category.icon}</span>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <ul className="space-y-2 mb-4">
                {category.resources.map((resource, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{resource}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-2 text-blue-600 hover:text-blue-800 font-medium">
                Explore Resources →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((article, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="h-40 bg-blue-50 rounded-lg mb-4 flex items-center justify-center text-blue-200">
                [Article Cover]
              </div>
              <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-3">{article.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{article.readTime}</span>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Read Article →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Webinars & Events */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-r border-gray-200 pr-6">
              <h3 className="text-lg font-semibold mb-3">Resume Workshop</h3>
              <p className="text-gray-600 mb-2">June 15, 2023 | 2:00 PM EST</p>
              <p className="text-gray-600 mb-4">Live webinar with career experts</p>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Register Now
              </button>
            </div>
            <div className="border-r border-gray-200 pr-6">
              <h3 className="text-lg font-semibold mb-3">Tech Interview Prep</h3>
              <p className="text-gray-600 mb-2">June 22, 2023 | 3:30 PM EST</p>
              <p className="text-gray-600 mb-4">Mock interviews with hiring managers</p>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Register Now
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Career Fair</h3>
              <p className="text-gray-600 mb-2">July 5-6, 2023 | Virtual Event</p>
              <p className="text-gray-600 mb-4">Connect with top employers</p>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResourcesPage;