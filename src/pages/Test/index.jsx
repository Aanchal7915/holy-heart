import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

function formatDuration(duration) {
  // Try to parse as integer minutes
  const min = parseInt(duration, 10);
  if (!isNaN(min)) {
    if (min < 60) return `${min} min`;
    const hr = Math.floor(min / 60);
    const rem = min % 60;
    return rem === 0 ? `${hr} hr` : `${hr} hr ${rem} min`;
  }
  // Fallback to raw string
  return duration;
}

function Test() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Add this

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await fetch(`${backendUrl}/services?type=test`);
        const data = await res.json();
        setTests(data.services || []);
      } catch {
        setTests([]);
      }
      setLoading(false);
    };
    fetchTests();
  }, []);

  const handleBookNow = (testId) => {
    // You can pass testId as state if needed
    navigate("/book-appointment", { state: { serviceId: testId, type: "test" } });
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="h-[50px]"></div>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">Tests Provided</h2>
        <div className="bg-blue-900 h-[4px] w-[80px] mx-auto mb-8"></div>
        {loading ? (
          <div className="text-center py-12 text-blue-900 font-semibold">Loading...</div>
        ) : tests.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No tests available.</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {tests.map(test => (
              <div
                key={test._id}
                className="bg-white rounded-2xl shadow-lg p-0 flex flex-col overflow-hidden border border-blue-100 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image at top with overlay */}
                <div className="relative">
                  {test.image ? (
                    <img
                      src={test.image}
                      alt={test.name}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-blue-50 flex items-center justify-center text-blue-300 text-5xl">
                      <span>No Image</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-900/70 to-transparent px-4 py-2">
                    <h3 className="text-xl font-bold text-white drop-shadow">{test.name}</h3>
                  </div>
                </div>
                {/* Card Content */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    {test.price && (
                      <span className="bg-blue-100 text-blue-900 font-semibold px-3 py-1 rounded-full text-sm">
                        ₹{test.price}
                      </span>
                    )}
                    {test.duration && (
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {formatDuration(test.duration)}
                      </span>
                    )}
                  </div>
                  <div className="text-gray-700 text-base leading-relaxed">
                    {test.description}
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-semibold shadow transition"
                      onClick={() => handleBookNow(test._id)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Test;