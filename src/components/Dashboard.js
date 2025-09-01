import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
   axios.get("http://localhost:5000/api/dashboard/dashboard-stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!stats) return <p className="text-center">Loading Dashboard...</p>;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📊 Dashboard Overview</h2>

      <div className="row mb-4">
        <div className="col-md-3 card p-3 text-center"><h5>Total Users</h5><h3>{stats.totalUsers}</h3></div>
        <div className="col-md-3 card p-3 text-center"><h5>Total Bookings</h5><h3>{stats.totalBookings}</h3></div>
        <div className="col-md-3 card p-3 text-center"><h5>Total Messages</h5><h3>{stats.totalMessages}</h3></div>
        <div className="col-md-3 card p-3 text-center"><h5>Total Restaurants</h5><h3>{stats.totalRestaurants}</h3></div>
      </div>

      <div className="row">
        <div className="col-md-6 card p-3">
          <h5 className="text-center">Event Types Distribution</h5>
          <PieChart width={400} height={300}>
            <Pie
              data={stats.eventTypes.map(e => ({ name: e._id, value: e.count }))}
              cx="50%" cy="50%" outerRadius={100} dataKey="value"
              label
            >
              {stats.eventTypes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="col-md-6 card p-3">
          <h5 className="text-center">Bookings per Date</h5>
          <BarChart width={400} height={300} data={stats.bookingsPerDate.map(b => ({ date: b._id, count: b.count }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
