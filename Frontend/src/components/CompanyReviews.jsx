import React, { useState, useEffect } from 'react';
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  Calendar, 
  User, 
  Plus, 
  X,
  Building,
  Heart,
  Flag
} from 'lucide-react';

const CompanyReviews = ({ company, isOpen, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [showAddReview, setShowAddReview] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [userReview, setUserReview] = useState({
    rating: 5,
    pros: '',
    cons: '',
    title: '',
    review: '',
    jobTitle: '',
    employmentStatus: 'current',
    recommend: true
  });

  // Sample reviews data - in real app, this would come from API
  const sampleReviews = [
    {
      id: 1,
      rating: 5,
      title: "Great company culture and work-life balance",
      review: "I've been working here for 2 years and absolutely love it. The team is supportive, the work is challenging but rewarding, and the benefits are excellent. Remote work options are great and the company really cares about employee well-being.",
      pros: "Flexible work hours, great benefits, supportive management",
      cons: "Sometimes meetings can run long",
      jobTitle: "Senior Software Engineer",
      employmentStatus: "current",
      recommend: true,
      helpful: 12,
      notHelpful: 2,
      date: "2024-01-15",
      author: "Anonymous Employee"
    },
    {
      id: 2,
      rating: 4,
      title: "Good place to grow your career",
      review: "The company provides good opportunities for learning and growth. The salary is competitive and the work environment is positive. However, there could be more transparency in decision-making processes.",
      pros: "Career growth, competitive salary, positive environment",
      cons: "Lack of transparency in some decisions",
      jobTitle: "Product Manager",
      employmentStatus: "former",
      recommend: true,
      helpful: 8,
      notHelpful: 1,
      date: "2024-01-10",
      author: "Anonymous Employee"
    },
    {
      id: 3,
      rating: 3,
      title: "Decent place to work, but has room for improvement",
      review: "The work is interesting and colleagues are friendly. However, the workload can be overwhelming at times and communication between departments could be better.",
      pros: "Interesting work, friendly colleagues",
      cons: "High workload, poor inter-department communication",
      jobTitle: "UX Designer",
      employmentStatus: "former",
      recommend: false,
      helpful: 5,
      notHelpful: 3,
      date: "2024-01-05",
      author: "Anonymous Employee"
    }
  ];

  useEffect(() => {
    setReviews(sampleReviews);
  }, []);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newReview = {
      id: Date.now(),
      ...userReview,
      helpful: 0,
      notHelpful: 0,
      date: new Date().toISOString().split('T')[0],
      author: "Anonymous Employee"
    };
    setReviews([newReview, ...reviews]);
    setUserReview({
      rating: 5,
      pros: '',
      cons: '',
      title: '',
      review: '',
      jobTitle: '',
      employmentStatus: 'current',
      recommend: true
    });
    setShowAddReview(false);
  };

  const handleHelpful = (reviewId, isHelpful) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            helpful: isHelpful ? review.helpful + 1 : review.helpful,
            notHelpful: !isHelpful ? review.notHelpful + 1 : review.notHelpful
          }
        : review
    ));
  };

  const filteredAndSortedReviews = reviews
    .filter(review => {
      if (filter === 'current' && review.employmentStatus !== 'current') return false;
      if (filter === 'former' && review.employmentStatus !== 'former') return false;
      if (filter === 'recommended' && !review.recommend) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'helpful') return b.helpful - a.helpful;
      return 0;
    });

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const recommendPercentage = reviews.length > 0
    ? Math.round((reviews.filter(review => review.recommend).length / reviews.length) * 100)
    : 0;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Building className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{company} Reviews</h2>
              <p className="text-gray-600">{reviews.length} reviews</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Company Overview */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{averageRating}</div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(averageRating))}
                </div>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{recommendPercentage}%</div>
                <p className="text-sm text-gray-600">Recommend to a Friend</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{reviews.length}</div>
                <p className="text-sm text-gray-600">Total Reviews</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <button
              onClick={() => setShowAddReview(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>

            <div className="flex items-center space-x-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Reviews</option>
                <option value="current">Current Employees</option>
                <option value="former">Former Employees</option>
                <option value="recommended">Recommended</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">Most Recent</option>
                <option value="rating">Highest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>

          {/* Add Review Form */}
          {showAddReview && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Overall Rating</label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserReview({...userReview, rating: star})}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${star <= userReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{userReview.rating} out of 5</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review Title</label>
                  <input
                    type="text"
                    value={userReview.title}
                    onChange={(e) => setUserReview({...userReview, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <input
                      type="text"
                      value={userReview.jobTitle}
                      onChange={(e) => setUserReview({...userReview, jobTitle: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment Status</label>
                    <select
                      value={userReview.employmentStatus}
                      onChange={(e) => setUserReview({...userReview, employmentStatus: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="current">Current Employee</option>
                      <option value="former">Former Employee</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                  <textarea
                    value={userReview.review}
                    onChange={(e) => setUserReview({...userReview, review: e.target.value})}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Share your experience working at this company..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pros</label>
                    <textarea
                      value={userReview.pros}
                      onChange={(e) => setUserReview({...userReview, pros: e.target.value})}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="What do you like about working here?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cons</label>
                    <textarea
                      value={userReview.cons}
                      onChange={(e) => setUserReview({...userReview, cons: e.target.value})}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="What could be improved?"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={userReview.recommend}
                      onChange={(e) => setUserReview({...userReview, recommend: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">I would recommend this company to a friend</span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddReview(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {filteredAndSortedReviews.map((review) => (
              <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{review.title}</h3>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {review.author}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        review.employmentStatus === 'current' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {review.employmentStatus === 'current' ? 'Current Employee' : 'Former Employee'}
                      </span>
                      {review.recommend && (
                        <span className="flex items-center text-green-600">
                          <Heart className="w-4 h-4 mr-1" />
                          Recommends
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{review.jobTitle}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{review.review}</p>

                {(review.pros || review.cons) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {review.pros && (
                      <div className="bg-green-50 rounded-lg p-3">
                        <h4 className="font-medium text-green-800 mb-1">Pros</h4>
                        <p className="text-sm text-green-700">{review.pros}</p>
                      </div>
                    )}
                    {review.cons && (
                      <div className="bg-red-50 rounded-lg p-3">
                        <h4 className="font-medium text-red-800 mb-1">Cons</h4>
                        <p className="text-sm text-red-700">{review.cons}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleHelpful(review.id, true)}
                      className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button
                      onClick={() => handleHelpful(review.id, false)}
                      className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>Not Helpful ({review.notHelpful})</span>
                    </button>
                  </div>
                  <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                    <Flag className="w-4 h-4" />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyReviews;
