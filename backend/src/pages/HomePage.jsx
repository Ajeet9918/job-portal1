import Hero from '../components/Hero';
import React from 'react';
import SearchFilters from '../components/SearchFilters';
import JobGrid from '../components/JobGrid';
import FeaturedCompanies from '../components/FeaturedCompanies';

function HomePage() {
  return (
    <main>
      <Hero />
      <SearchFilters />
      <JobGrid />
      <FeaturedCompanies />
    </main>
  );
}

export default HomePage;