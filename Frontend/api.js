import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Set auth token
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    setAuthToken(response.data.token);
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    setAuthToken(response.data.token);
  }
  return response.data;
};

// Get all jobs with search and filters
const getJobs = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.search) queryParams.append('search', params.search);
  if (params.location) queryParams.append('location', params.location);
  if (params.jobType) queryParams.append('jobType', params.jobType);
  if (params.salary) queryParams.append('salary', params.salary);
  if (params.experience) queryParams.append('experience', params.experience);
  if (params.remote) queryParams.append('remote', params.remote);
  
  const url = queryParams.toString() ? `${API_URL}/jobs?${queryParams.toString()}` : `${API_URL}/jobs`;
  const response = await axios.get(url);
  return response.data;
};

// Post a job
const postJob = async (jobData) => {
  const response = await axios.post(`${API_URL}/jobs`, jobData);
  return response.data;
};

export default {
  register,
  login,
  getJobs,
  postJob,
  setAuthToken
};