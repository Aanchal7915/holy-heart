import React, { useEffect, useState } from "react";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

function Test() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="h-[50px]"></div>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">Tests Provided</h2>
        <div className="bg-blue-900 h-[4px] w-[80px] mx-auto mb-8"></div>
        {loading ? (
          <div className="text-center py-12 text-blue-900 font-semibold">Loading...</div>
        ) : tests.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No tests available.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {tests.map(test => (
              <div key={test._id} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
                <h3 className="text-xl font-bold text-blue-900">{test.name}</h3>
                <div className="text-gray-700">{test.description}</div>
                {test.price && (
                  <div className="text-blue-700 font-semibold">Price: ₹{test.price}</div>
                )}
                {test.duration && (
                  <div className="text-gray-600 text-sm">Duration: {test.duration}</div>
                )}
                {test.image && (
                  <img src={test.image} alt={test.name} className="w-24 h-24 object-cover rounded mt-2" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Test