
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];


export default function AdminAnalytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [month, setMonth] = useState(new Date().getMonth() + 1); // JS months are 0-based
  const [year, setYear] = useState(new Date().getFullYear());

  const fetchStats = async (selectedMonth, selectedYear) => {
    setLoading(true);
    setError("");
    let url = `${backendUrl}/appointments/stats?month=${selectedMonth}&year=${selectedYear}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to load analytics");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      setError(err.message || "Failed to load analytics");
      setStats(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStats(month, year);
    // eslint-disable-next-line
  }, [month, year]);

  if (loading) return <div className="py-12 text-center">Loading analytics...</div>;
  if (error) return <div className="py-12 text-center text-red-600">{error}</div>;
  if (!stats) return null;

  // Prepare chart data
  const monthlyStats = (stats.monthlyStats || []).map(m => ({
    month: `Month ${m._id}`,
    ...m,
  }));
  const dailyStats = (stats.dailyStats || []).map(d => ({
    date: `Day ${d._id}`,
    ...d,
  }));
  const statusStats = (stats.statusStats || []).map(s => ({
    status: s._id,
    count: s.count,
  }));
  const serviceTypeStats = (stats.serviceTypeStats || []).map(s => ({
    serviceType: s._id,
    total: s.total,
  }));

  // Month/year options
  const monthOptions = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  const yearOptions = [];
  for (let y = new Date().getFullYear(); y >= 2022; y--) yearOptions.push(y);

  return (
    <div className="w-full max-w-5xl mx-auto p-2">
      <h3 className="text-2xl font-bold mb-6 text-center">Analytics</h3>
      <div className="mb-6 flex flex-wrap justify-center items-center gap-4">
        <div>
          <label className="font-semibold mr-2">Month:</label>
          <select value={month} onChange={e => setMonth(Number(e.target.value))} className="border rounded px-3 py-2">
            {monthOptions.map((m, idx) => (
              <option key={m} value={idx + 1}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-semibold mr-2">Year:</label>
          <select value={year} onChange={e => setYear(Number(e.target.value))} className="border rounded px-3 py-2">
            {yearOptions.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div className="text-lg font-semibold">
          Total Appointments: <span className="text-blue-600">{stats.totalAppointments}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-4">
          <h4 className="font-semibold mb-2">Monthly Bookings</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyStats}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h4 className="font-semibold mb-2">Daily Bookings</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailyStats}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h4 className="font-semibold mb-2">Status Breakdown</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusStats} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80} label>
                {statusStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h4 className="font-semibold mb-2">Service Type Popularity</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={serviceTypeStats}>
              <XAxis dataKey="serviceType" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
