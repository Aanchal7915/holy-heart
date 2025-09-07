import React, { useEffect, useState } from "react";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

const ProfileTab = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${backendUrl}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProfile(data.user || null);
      } catch {
        setProfile(null);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="py-8 text-center">Loading...</div>;
  if (!profile) return <div className="py-8 text-center text-gray-500">Profile not found.</div>;

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-4 text-blue-900">Doctor Profile</h3>
      <div className="mb-2"><span className="font-semibold">Name:</span> {profile.name}</div>
      <div className="mb-2"><span className="font-semibold">Email:</span> {profile.email}</div>
      <div className="mb-2"><span className="font-semibold">Phone:</span> {profile.phoneNu}</div>
      {/* <div className="mb-2"><span className="font-semibold">Specialization:</span> {profile.specialization || "-"}</div> */}
      <div className="mb-2"><span className="font-semibold">Gender:</span> {profile.gender || "-"}</div>
      {/* Add more fields as needed */}
    </div>
  );
};

export default ProfileTab;