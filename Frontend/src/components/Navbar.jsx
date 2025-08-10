import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, X, Briefcase, User, Bell, Settings, Scale, FileText, Star } from 'lucide-react';
import { useJob } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../context/AuthModel';
import JobComparison from './JobComparison';
import ApplicationTracker from './ApplicationTracker';
import CompanyReviews from './CompanyReviews';
import DarkModeToggle from './DarkModeToggle';
import PushNotifications from './PushNotifications';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showJobComparison, setShowJobComparison] = useState(false);
  const [showApplicationTracker, setShowApplicationTracker] = useState(false);
  const [showCompanyReviews, setShowCompanyReviews] = useState(false);
  const [showPushNotifications, setShowPushNotifications] = useState(false);
  const { savedJobs } = useJob();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleNavClick = (section) => {
    setIsMenuOpen(false);
    switch (section) {
      case 'jobs':
        const jobsSection = document.getElementById('jobs-section');
        if (jobsSection && window.location.pathname === '/') {
          jobsSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate('/');
        }
        break;
      case 'companies':
        navigate('/companies');
        break;
      case 'salary':
        navigate('/salary');
        break;
      case 'resources':
        navigate('/resources');
        break;
      default:
        navigate('/');
    }
  };

  const handleAuthClick = () => {
    if (user) {
      if (confirm('Are you sure you want to log out?')) {
        logout();
        navigate('/');
      }
    } else {
      setShowAuthModal(true);
    }
  };

  const handlePostJobClick = () => {
    if (user && user.userType === 'employer') {
      navigate('/post-job');
    } else if (user) {
      alert('Only employers can post jobs.');
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-2 rounded-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                TalentHub
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => handleNavClick('jobs')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Jobs
              </button>
              <button
                onClick={() => handleNavClick('companies')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Companies
              </button>
              <button
                onClick={() => handleNavClick('salary')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Salary
              </button>
              <button
                onClick={() => handleNavClick('resources')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Resources
              </button>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <DarkModeToggle />

              {/* Job Comparison */}
              <button
                onClick={() => setShowJobComparison(true)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Compare Jobs"
              >
                <Scale className="w-5 h-5" />
              </button>

              {/* Application Tracker */}
              <button
                onClick={() => setShowApplicationTracker(true)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Application Tracker"
              >
                <FileText className="w-5 h-5" />
              </button>

              {/* Company Reviews */}
              <button
                onClick={() => setShowCompanyReviews(true)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Company Reviews"
              >
                <Star className="w-5 h-5" />
              </button>

              {/* Push Notifications */}
              <button
                onClick={() => setShowPushNotifications(true)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {savedJobs.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {savedJobs.length}
                  </span>
                )}
              </button>

              {user && (
                <button
                  onClick={() => navigate('/profile')}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Profile"
                >
                  <User className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={handleAuthClick}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                {user ? `Hi, ${user.name.split(' ')[0]}` : 'Sign In'}
              </button>

              <button
                onClick={handlePostJobClick}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all transform hover:scale-105 font-medium"
              >
                Post a Job
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => handleNavClick('jobs')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Jobs
                </button>
                <button
                  onClick={() => handleNavClick('companies')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Companies
                </button>
                <button
                  onClick={() => handleNavClick('salary')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Salary
                </button>
                <button
                  onClick={() => handleNavClick('resources')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Resources
                </button>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  {user && (
                    <button
                      onClick={() => {
                        navigate('/notifications');
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                    >
                      <Bell className="w-5 h-5 mr-2" />
                      Notifications
                      {savedJobs.length > 0 && (
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {savedJobs.length}
                        </span>
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleAuthClick();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                  >
                    {user ? `Sign Out (${user.name.split(' ')[0]})` : 'Sign In'}
                  </button>
                  <button
                    onClick={() => {
                      handlePostJobClick();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all font-medium"
                  >
                    Post a Job
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}

      {/* Feature Modals */}
      <JobComparison
        isOpen={showJobComparison}
        onClose={() => setShowJobComparison(false)}
      />

      <ApplicationTracker
        isOpen={showApplicationTracker}
        onClose={() => setShowApplicationTracker(false)}
      />

      <CompanyReviews
        company="TechCorp"
        isOpen={showCompanyReviews}
        onClose={() => setShowCompanyReviews(false)}
      />

      <PushNotifications
        isOpen={showPushNotifications}
        onClose={() => setShowPushNotifications(false)}
      />
    </>
  );
};

export default Navbar;