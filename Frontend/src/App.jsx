import { Routes, Route } from 'react-router-dom';
import { JobProvider } from './context/JobContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import React from 'react';
import HomePage from './pages/HomePage';
import PostJobPage from './pages/PostJobPage';
import CompaniesPage from './pages/CompaniesPage';
import SalaryPage from './pages/SalaryPage';
import ResourcesPage from './pages/ResourcesPage';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post-job" element={<PostJobPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/salary" element={<SalaryPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
          </Routes>
          <Footer />
        </div>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;