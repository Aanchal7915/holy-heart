import React, { useState, useEffect } from 'react';
import TestCard from './components/TestCard';
import PackageCard from './components/PackageCard';
import FilterAndSearch from './components/FilterAndSearch';
import { diagnosticTests, fullBodyPackages } from './data/testData';

const DiagnosticTests = () => {
  const [tests, setTests] = useState(diagnosticTests);
  const [packages, setPackages] = useState(fullBodyPackages);
  const [filteredTests, setFilteredTests] = useState(diagnosticTests);
  const [filteredPackages, setFilteredPackages] = useState(fullBodyPackages);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    priceRange: [0, 10000],
    completionTime: 'all'
  });

  useEffect(() => {
    applyFilters();
  }, [filters, tests, packages]);

  const applyFilters = () => {
    let filtered = tests.filter(test => {
      const matchesSearch = test.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           test.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'all' || test.category === filters.category;
      const matchesPrice = test.price >= filters.priceRange[0] && test.price <= filters.priceRange[1];
      const matchesTime = filters.completionTime === 'all' || 
                         (filters.completionTime === 'fast' && test.completionTime <= 2) ||
                         (filters.completionTime === 'medium' && test.completionTime > 2 && test.completionTime <= 6) ||
                         (filters.completionTime === 'slow' && test.completionTime > 6);
      
      return matchesSearch && matchesCategory && matchesPrice && matchesTime;
    });

    let filteredPkgs = packages.filter(pkg => {
      const matchesSearch = pkg.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           pkg.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesPrice = pkg.price >= filters.priceRange[0] && pkg.price <= filters.priceRange[1];
      const matchesTime = filters.completionTime === 'all' || 
                         (filters.completionTime === 'fast' && pkg.completionTime <= 2) ||
                         (filters.completionTime === 'medium' && pkg.completionTime > 2 && pkg.completionTime <= 6) ||
                         (filters.completionTime === 'slow' && pkg.completionTime > 6);
      
      return matchesSearch && matchesPrice && matchesTime;
    });

    setFilteredTests(filtered);
    setFilteredPackages(filteredPkgs);
  };

  const handleBookNow = (testData) => {
    // Store test data in localStorage for pre-filling appointment form
    localStorage.setItem('selectedTest', JSON.stringify(testData));
    // Redirect to appointment booking (you can modify this route as needed)
    window.location.href = '/book-appointment';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Diagnostic Tests & Health Packages
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive diagnostic services with accurate results and quick turnaround times
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="container mx-auto px-4 py-8">
        <FilterAndSearch filters={filters} setFilters={setFilters} />
      </div>

      {/* Full Body Checkup Packages Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Full Body Checkup Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive health packages designed to give you a complete picture of your health status
          </p>
        </div>

        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredPackages.map((pkg) => (
              <PackageCard 
                key={pkg.id} 
                package={pkg} 
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No packages found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Individual Tests Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Individual Diagnostic Tests
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of specialized diagnostic tests
          </p>
        </div>

        {filteredTests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTests.map((test) => (
              <TestCard 
                key={test.id} 
                test={test} 
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tests found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help Choosing the Right Test?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our medical experts are here to help you select the most appropriate diagnostic tests for your health needs.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors duration-300">
            Consult Our Experts
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticTests;
