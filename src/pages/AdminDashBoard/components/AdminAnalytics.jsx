import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid
} from "recharts";
import Spinner from "../../../components/Spinner";
import { IoMdRefresh } from "react-icons/io";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

export default function AdminAnalytics() {
  const [userSummary, setUserSummary] = useState(null);
  const [apptSummary, setApptSummary] = useState(null);
  const [apptTrends, setApptTrends] = useState([]);
  const [popularServices, setPopularServices] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [patientRanking, setPatientRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAll = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login to view analytics");
      const [
        userSummaryRes,
        apptSummaryRes,
        apptTrendsRes,
        popularServicesRes,
        patientRankingRes
      ] = await Promise.all([
        fetch(`${backendUrl}/admin/users/summary`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${backendUrl}/admin/appointments/summary`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${backendUrl}/admin/appointments/trends`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${backendUrl}/admin/appointments/popular-services`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${backendUrl}/admin/appointments/patient-ranking`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      if (!userSummaryRes.ok) throw new Error("Failed to load user summary");
      if (!apptSummaryRes.ok) throw new Error("Failed to load appointment summary");
      if (!apptTrendsRes.ok) throw new Error("Failed to load appointment trends");
      if (!popularServicesRes.ok) throw new Error("Failed to load popular services");
      if (!patientRankingRes.ok) throw new Error("Failed to load patient ranking");

      const userSummaryData = await userSummaryRes.json();
      const apptSummaryData = await apptSummaryRes.json();
      const apptTrendsData = await apptTrendsRes.json();
      const popularServicesData = await popularServicesRes.json();
      const patientRankingData = await patientRankingRes.json();

      setUserSummary(userSummaryData);
      setApptSummary(apptSummaryData);
      setApptTrends(apptTrendsData);
      setPopularServices(popularServicesData);
      setUserGrowth(userSummaryData.growth || []);
      setPatientRanking(patientRankingData);
    } catch (err) {
      setError(err.message || "Failed to load analytics");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div className="flex flex-col items-center justify-center py-8 md:py-16">
    <div className="text-red-600 text-xs sm:text-sm md:text-lg mb-4">{error}. Something went wrong. Please try again.</div>
    <button
      className="px-3 md:px-4 py-2 bg-blue-900 text-white rounded transition text-xs sm:text-sm"
      onClick={fetchAll}
    >
      Refresh
    </button>

  </div>;

  // Prepare chart data
  const trendsChart = apptTrends.map(m => ({
    month: m._id,
    count: m.count,
  }));
  const userGrowthChart = userGrowth.map(d => ({
    date: d._id,
    count: d.count,
  }));
  const servicePie = popularServices.map((s, i) => ({
    name: s._id,
    value: s.count,
    color: COLORS[i % COLORS.length],
  }));

  // Patient ranking chart expects: [{ name, count }]
  const patientRankingChart = patientRanking.map((p) => ({
    name: p.name,
    count: p.count,
    email: p.email,
  }));

  return (
    <div className="w-full max-w-5xl mx-auto p-2 text-xs sm:text-sm md:text-base">

      <div className="mb-6 flex flex-row flex-wrap items-center">
        <h3 className="text-xl sm:text-2xl font-bold">Analytics</h3>
        <button
          className="px-3 md:px-4 pt-1 bg-inherit rounded"
          onClick={fetchAll}
        >
          <IoMdRefresh className="text-blue-900 text-xl" />
        </button>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <div className="text-xs sm:text-sm md:text-base text-gray-500">Total Users</div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold">{userSummary?.totalUsers ?? "-"}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <div className="text-xs sm:text-sm md:text-base text-gray-500">Admins</div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold">{userSummary?.admins ?? "-"}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <div className="text-xs sm:text-sm md:text-base text-gray-500">Total Appointments</div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold">{apptSummary?.totalAppointments ?? "-"}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <div className="text-xs sm:text-sm md:text-base text-gray-500">Upcoming</div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold">{apptSummary?.upcoming ?? "-"}</div>
        </div>
      </div>
      {/* Appointment Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <div className="text-xs sm:text-sm md:text-base text-gray-500">Pending</div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold">{apptSummary?.pending ?? "-"}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <div className="text-xs sm:text-sm md:text-base text-gray-500">Confirmed</div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold">{apptSummary?.confirmed ?? "-"}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <div className="text-xs sm:text-sm md:text-base text-gray-500">Cancelled</div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold">{apptSummary?.cancelled ?? "-"}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <div className="text-xs sm:text-sm md:text-base text-gray-500">Past</div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold">{apptSummary?.past ?? "-"}</div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow p-4">
          <h4 className="font-semibold mb-2 text-xs sm:text-sm md:text-base">Appointments Trend (per month)</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendsChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#0088FE" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h4 className="font-semibold mb-2 text-xs sm:text-sm md:text-base">User Growth (last 30 days)</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userGrowthChart}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h4 className="font-semibold mb-2 text-xs sm:text-sm md:text-base">Popular Services</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={servicePie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {servicePie.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h4 className="font-semibold mb-2 text-xs sm:text-sm md:text-base">Top Patients</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={patientRankingChart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value, name, props) => [`${value} appointments`, "Appointments"]} />
              <Bar dataKey="count" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
          {/* Table for details */}
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-xs sm:text-sm md:text-base">
              <thead>
                <tr>
                  <th className="px-2 py-1">Name</th>
                  <th className="px-2 py-1">Email</th>
                  <th className="px-2 py-1">Appointments</th>
                </tr>
              </thead>
              <tbody>
                {patientRankingChart.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-2 text-gray-500">
                      No data
                    </td>
                  </tr>
                ) : (
                  patientRankingChart.map((p, i) => (
                    <tr key={i}>
                      <td className="px-2 py-1">{p.name}</td>
                      <td className="px-2 py-1">{p.email}</td>
                      <td className="px-2 py-1 text-center">{p.count}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
