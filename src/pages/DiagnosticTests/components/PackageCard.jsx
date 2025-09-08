import React from 'react';

const PackageCard = ({ package: pkg, onBookNow }) => {
  const handleBookNow = () => {
    onBookNow({
      type: 'package',
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      description: pkg.description,
      completionTime: pkg.completionTime,
      numberOfTests: pkg.numberOfTests
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group relative">
      {/* Popular Badge */}
      {pkg.isPopular && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            POPULAR
          </span>
        </div>
      )}

      {/* Package Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Package Content */}
      <div className="p-6">
        {/* Package Name */}
        <h3 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-2">
          {pkg.name}
        </h3>

        {/* Package Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {pkg.description}
        </p>

        {/* Package Details */}
        <div className="space-y-3 mb-6">
          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Package Price:</span>
            <span className="text-2xl font-bold text-green-600">
              ₹{pkg.price.toLocaleString()}
            </span>
          </div>

          {/* Number of Tests */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Tests Included:</span>
            <span className="text-lg font-semibold text-blue-600">
              {pkg.numberOfTests} Tests
            </span>
          </div>

          {/* Completion Time */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Completion Time:</span>
            <span className="text-sm font-medium text-gray-700">
              {pkg.completionTime} hours
            </span>
          </div>

          {/* Savings */}
          {pkg.originalPrice && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">You Save:</span>
              <span className="text-sm font-bold text-red-600">
                ₹{(pkg.originalPrice - pkg.price).toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Book Now Button */}
        <button
          onClick={handleBookNow}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 transform hover:scale-105 active:scale-95"
        >
          Book Package
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
