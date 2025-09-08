import React from 'react';

const FilterAndSearch = ({ filters, setFilters }) => {
  const categories = [
    'all',
    'blood tests',
    'imaging',
    'cardiology',
    'neurology',
    'oncology',
    'endocrinology',
    'gastroenterology',
    'pulmonology',
    'dermatology'
  ];

  const completionTimeOptions = [
    { value: 'all', label: 'All Times' },
    { value: 'fast', label: 'Fast (≤2 hours)' },
    { value: 'medium', label: 'Medium (2-6 hours)' },
    { value: 'slow', label: 'Extended (>6 hours)' }
  ];

  const handleSearchChange = (e) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  const handleCategoryChange = (e) => {
    setFilters(prev => ({
      ...prev,
      category: e.target.value
    }));
  };

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      priceRange: [0, value]
    }));
  };

  const handleCompletionTimeChange = (e) => {
    setFilters(prev => ({
      ...prev,
      completionTime: e.target.value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      priceRange: [0, 10000],
      completionTime: 'all'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tests or packages..."
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Category Filter */}
          <div className="min-w-[150px]">
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="min-w-[150px]">
            <select
              value={filters.priceRange[1]}
              onChange={handlePriceRangeChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={1000}>Under ₹1,000</option>
              <option value={2500}>Under ₹2,500</option>
              <option value={5000}>Under ₹5,000</option>
              <option value={10000}>Under ₹10,000</option>
              <option value={25000}>Under ₹25,000</option>
              <option value={50000}>All Prices</option>
            </select>
          </div>

          {/* Completion Time Filter */}
          <div className="min-w-[150px]">
            <select
              value={filters.completionTime}
              onChange={handleCompletionTimeChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {completionTimeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={clearFilters}
            className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300 font-medium"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="mt-4 flex flex-wrap gap-2">
        {filters.search && (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            Search: "{filters.search}"
          </span>
        )}
        {filters.category !== 'all' && (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            Category: {filters.category}
          </span>
        )}
        {filters.priceRange[1] < 50000 && (
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
            Price: Under ₹{filters.priceRange[1].toLocaleString()}
          </span>
        )}
        {filters.completionTime !== 'all' && (
          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
            Time: {completionTimeOptions.find(opt => opt.value === filters.completionTime)?.label}
          </span>
        )}
      </div>
    </div>
  );
};

export default FilterAndSearch;
