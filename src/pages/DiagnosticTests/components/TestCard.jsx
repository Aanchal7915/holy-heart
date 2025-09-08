import React from 'react';

const TestCard = ({ test, onBookNow }) => {
  const handleBookNow = () => {
    onBookNow({
      type: 'test',
      id: test.id,
      name: test.name,
      price: test.price,
      description: test.description,
      completionTime: test.completionTime
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
      {/* Test Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={test.image} 
          alt={test.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Test Content */}
      <div className="p-6">
        {/* Test Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {test.name}
        </h3>

        {/* Short Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {test.description}
        </p>

        {/* Test Details */}
        <div className="space-y-2 mb-4">
          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Price:</span>
            <span className="text-lg font-bold text-blue-600">
              ₹{test.price.toLocaleString()}
            </span>
          </div>

          {/* Completion Time */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Completion Time:</span>
            <span className="text-sm font-medium text-gray-700">
              {test.completionTime} hours
            </span>
          </div>

          {/* Category Badge */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Category:</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {test.category}
            </span>
          </div>
        </div>

        {/* Book Now Button */}
        <button
          onClick={handleBookNow}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 active:scale-95"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default TestCard;
