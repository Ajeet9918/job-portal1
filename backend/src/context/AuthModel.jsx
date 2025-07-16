import React,{ useState } from 'react';
import { X, User, Mail, Lock, Briefcase } from 'lucide-react';
import { useAuth } from './AuthContext';

const AuthModal = ({ onClose }) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    userType: 'jobSeeker' // 'jobSeeker' or 'employer'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Basic validation
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }
      
      // In a real app, you would call your API here
      login({
        email: formData.email,
        name: 'Demo User', // Normally this would come from your backend
        userType: formData.userType
      });
      onClose();
    } else {
      // Registration validation
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }
      
      // In a real app, you would call your API here
      register({
        name: formData.name,
        email: formData.email,
        userType: formData.userType
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-3 rounded-lg">
              <Briefcase size={32} className="text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-6">
            {isLogin ? 'Welcome Back' : 'Join TalentHub'}
          </h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={isLogin ? 'Your password' : 'Create a password'}
                />
              </div>
            </div>
            
            {!isLogin && (
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">I am a...</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="userType"
                      value="jobSeeker"
                      checked={formData.userType === 'jobSeeker'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Job Seeker
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="userType"
                      value="employer"
                      checked={formData.userType === 'employer'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Employer
                  </label>
                </div>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all font-medium"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
            By {isLogin ? 'signing in' : 'registering'}, you agree to our Terms and Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;