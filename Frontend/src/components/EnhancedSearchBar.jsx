import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, TrendingUp, Building, Briefcase } from 'lucide-react';
import { useJob } from '../context/JobContext';

const EnhancedSearchBar = () => {
    const { searchQuery, locationQuery, setSearchQuery, setLocationQuery } = useJob();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [trendingJobs, setTrendingJobs] = useState([]);
    const searchRef = useRef(null);

    // Sample data for suggestions and trending jobs
    const jobTitles = [
        'Frontend Developer', 'Backend Engineer', 'Full Stack Developer',
        'Data Scientist', 'Product Manager', 'UX Designer', 'DevOps Engineer',
        'Mobile Developer', 'Software Engineer', 'QA Engineer'
    ];

    const companies = [
        'Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Netflix',
        'Twitter', 'LinkedIn', 'Uber', 'Airbnb', 'Spotify', 'Slack'
    ];

    const locations = [
        'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX',
        'Remote', 'Los Angeles, CA', 'Chicago, IL', 'Boston, MA'
    ];

    const trendingJobsData = [
        { title: 'AI Engineer', count: '2.3k' },
        { title: 'React Developer', count: '1.8k' },
        { title: 'Data Scientist', count: '1.5k' },
        { title: 'DevOps Engineer', count: '1.2k' }
    ];

    useEffect(() => {
        setTrendingJobs(trendingJobsData);
        loadRecentSearches();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const loadRecentSearches = () => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    };

    const saveRecentSearch = (search) => {
        const updated = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    };

    const handleSearchInput = (value) => {
        setSearchQuery(value);

        if (value.length > 1) {
            const filtered = [
                ...jobTitles.filter(title =>
                    title.toLowerCase().includes(value.toLowerCase())
                ).map(title => ({ type: 'job', text: title })),
                ...companies.filter(company =>
                    company.toLowerCase().includes(value.toLowerCase())
                ).map(company => ({ type: 'company', text: company })),
                ...locations.filter(location =>
                    location.toLowerCase().includes(value.toLowerCase())
                ).map(location => ({ type: 'location', text: location }))
            ].slice(0, 8);

            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        if (suggestion.type === 'location') {
            setLocationQuery(suggestion.text);
        } else {
            setSearchQuery(suggestion.text);
        }
        saveRecentSearch(suggestion.text);
        setShowSuggestions(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            saveRecentSearch(searchQuery);
        }
        // Scroll to jobs section
        const jobsSection = document.getElementById('jobs-section');
        if (jobsSection) {
            jobsSection.scrollIntoView({ behavior: 'smooth' });
        }
        setShowSuggestions(false);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setLocationQuery('');
        setShowSuggestions(false);
    };

    const getSuggestionIcon = (type) => {
        switch (type) {
            case 'job': return <Briefcase className="w-4 h-4" />;
            case 'company': return <Building className="w-4 h-4" />;
            case 'location': return <MapPin className="w-4 h-4" />;
            default: return <Search className="w-4 h-4" />;
        }
    };

    return (
        <div className="relative max-w-4xl mx-auto" ref={searchRef}>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                    {/* Job Search Input */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Job title, keywords, or company"
                            value={searchQuery}
                            onChange={(e) => handleSearchInput(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                            className="w-full pl-12 pr-10 py-4 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Location Input */}
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

                    {/* Search Button */}
                    <button
                        type="submit"
                        className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 font-semibold shadow-lg"
                    >
                        Search Jobs
                    </button>
                </form>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                        <div className="p-4 border-b border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Recent Searches</h3>
                            <div className="space-y-1">
                                {recentSearches.map((search, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick({ type: 'job', text: search })}
                                        className="w-full text-left px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg flex items-center space-x-2"
                                    >
                                        <Search className="w-4 h-4 text-gray-400" />
                                        <span>{search}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Trending Jobs */}
                    <div className="p-4 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            Trending Jobs
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {trendingJobs.map((job, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestionClick({ type: 'job', text: job.title })}
                                    className="text-left px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg flex items-center justify-between"
                                >
                                    <span className="text-sm">{job.title}</span>
                                    <span className="text-xs text-gray-400">{job.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search Suggestions */}
                    {suggestions.length > 0 && (
                        <div className="p-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Suggestions</h3>
                            <div className="space-y-1">
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="w-full text-left px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg flex items-center space-x-2"
                                    >
                                        {getSuggestionIcon(suggestion.type)}
                                        <span>{suggestion.text}</span>
                                        <span className="text-xs text-gray-400 capitalize ml-auto">
                                            {suggestion.type}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick Filters */}
                    <div className="p-4 border-t border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Quick Filters</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Remote', 'Full-time', 'Entry Level', 'Senior'].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => handleSuggestionClick({ type: 'filter', text: filter })}
                                    className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnhancedSearchBar;
