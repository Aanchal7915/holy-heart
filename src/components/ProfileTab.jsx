import React, { useEffect, useState } from "react";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

const ProfileTab = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } catch (err) {
        setProfile(null);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!profile)
    return <div className="p-4 text-red-600">Failed to load profile.</div>;

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