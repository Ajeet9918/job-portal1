import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Plus, 
  Edit, 
  Trash2,
  Calendar,
  Bell,
  Filter,
  Search,
  X
} from 'lucide-react';

const ApplicationTracker = ({ isOpen, onClose }) => {
  const [applications, setApplications] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data - in real app, this would come from API
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    appliedDate: '',
    status: 'applied',
    notes: '',
    followUpDate: '',
    salary: '',
    location: ''
  });

  const statusOptions = [
    { value: 'applied', label: 'Applied', icon: Clock, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { value: 'interview', label: 'Interview', icon: AlertCircle, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { value: 'offer', label: 'Offer', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' },
    { value: 'rejected', label: 'Rejected', icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-100' },
    { value: 'withdrawn', label: 'Withdrawn', icon: XCircle, color: 'text-gray-600', bgColor: 'bg-gray-100' }
  ];

  useEffect(() => {
    // Load applications from localStorage
    const saved = localStorage.getItem('jobApplications');
    if (saved) {
      setApplications(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Save applications to localStorage
    localStorage.setItem('jobApplications', JSON.stringify(applications));
  }, [applications]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApplication = {
      id: editingApp ? editingApp.id : Date.now(),
      ...formData,
      createdAt: editingApp ? editingApp.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingApp) {
      setApplications(applications.map(app => 
        app.id === editingApp.id ? newApplication : app
      ));
      setEditingApp(null);
    } else {
      setApplications([newApplication, ...applications]);
    }

    setFormData({
      jobTitle: '',
      company: '',
      appliedDate: '',
      status: 'applied',
      notes: '',
      followUpDate: '',
      salary: '',
      location: ''
    });
    setShowAddForm(false);
  };

  const handleEdit = (application) => {
    setEditingApp(application);
    setFormData({
      jobTitle: application.jobTitle,
      company: application.company,
      appliedDate: application.appliedDate,
      status: application.status,
      notes: application.notes,
      followUpDate: application.followUpDate,
      salary: application.salary,
      location: application.location
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setApplications(applications.filter(app => app.id !== id));
    }
  };

  const updateStatus = (id, newStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus, updatedAt: new Date().toISOString() } : app
    ));
  };

  const filteredApplications = applications
    .filter(app => {
      if (filter !== 'all' && app.status !== filter) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return app.jobTitle.toLowerCase().includes(query) || 
               app.company.toLowerCase().includes(query);
      }
      return true;
    })
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const getStatusIcon = (status) => {
    const statusOption = statusOptions.find(option => option.value === status);
    const Icon = statusOption.icon;
    return <Icon className={`w-4 h-4 ${statusOption.color}`} />;
  };

  const getStatusBadge = (status) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusOption.bgColor} ${statusOption.color}`}>
        {statusOption.label}
      </span>
    );
  };

  const getStats = () => {
    const total = applications.length;
    const applied = applications.filter(app => app.status === 'applied').length;
    const interview = applications.filter(app => app.status === 'interview').length;
    const offer = applications.filter(app => app.status === 'offer').length;
    const rejected = applications.filter(app => app.status === 'rejected').length;

    return { total, applied, interview, offer, rejected };
  };

  const stats = getStats();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Briefcase className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Application Tracker</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.applied}</div>
              <div className="text-sm text-gray-600">Applied</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.interview}</div>
              <div className="text-sm text-gray-600">Interview</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.offer}</div>
              <div className="text-sm text-gray-600">Offers</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Application</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingApp ? 'Edit Application' : 'Add New Application'}
              </h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Applied Date</label>
                  <input
                    type="date"
                    value={formData.appliedDate}
                    onChange={(e) => setFormData({...formData, appliedDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    placeholder="e.g., $80k - $120k"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g., Remote, San Francisco, CA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows="3"
                    placeholder="Add any notes about the application..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingApp(null);
                      setFormData({
                        jobTitle: '',
                        company: '',
                        appliedDate: '',
                        status: 'applied',
                        notes: '',
                        followUpDate: '',
                        salary: '',
                        location: ''
                      });
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingApp ? 'Update' : 'Add'} Application
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                <p className="text-gray-600">Start tracking your job applications to stay organized</p>
              </div>
            ) : (
              filteredApplications.map((application) => (
                <div key={application.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{application.jobTitle}</h3>
                        {getStatusBadge(application.status)}
                      </div>
                      <p className="text-gray-600 mb-2">{application.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                        {application.location && (
                          <span>📍 {application.location}</span>
                        )}
                        {application.salary && (
                          <span>💰 {application.salary}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        value={application.status}
                        onChange={(e) => updateStatus(application.id, e.target.value)}
                        className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleEdit(application)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(application.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {application.notes && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-700">{application.notes}</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Last updated: {new Date(application.updatedAt).toLocaleDateString()}</span>
                    {application.followUpDate && (
                      <div className="flex items-center space-x-1">
                        <Bell className="w-3 h-3" />
                        <span>Follow up: {new Date(application.followUpDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationTracker;
