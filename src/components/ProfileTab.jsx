import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

const ProfileTab = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProfile(data.user || null);
    } catch (err) {
      setProfile(null);
    }
    setLoading(false);
  };
  useEffect(() => {

    fetchProfile();
  }, []);

  if (loading) return <div className="p-4 text-center"><Spinner /></div>;
  if (!profile) return <div className="flex flex-col items-center justify-center py-8 md:py-16">
    <div className="text-red-600 text-xs sm:text-sm md:text-lg mb-4">Something went wrong. Please try again.</div>
    <button
      className="px-3 py-2 bg-blue-900 text-white rounded transition text-xs sm:text-sm"
      onClick={fetchProfile}
    >
      Refresh
    </button>

  </div>;

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow">
      <h3 className="text-xl font-bold mb-4 text-center">Profile</h3>
      <div className="space-y-3">
        <div>
          <span className="font-semibold">Name:</span> {profile.name}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {profile.email}
        </div>
        <div>
          <span className="font-semibold">Phone:</span> {profile.phoneNu || "-"}
        </div>
        <div>
          <span className="font-semibold">Role:</span> {profile.role}
        </div>
        <div>
          <span className="font-semibold">Registered:</span>{" "}
          {profile.createdAt
            ? new Date(profile.createdAt).toLocaleDateString()
            : "-"}
        </div>
        {profile.isBlocked && (
          <div className="text-red-600 font-semibold">Blocked</div>
        )}
      </div>
    </div>
  );
};

export default ProfileTab;