import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "200px",
        background: "linear-gradient(135deg, #176B6B, #253C5E)",
        color: "#fff",
        minHeight: "calc(100vh - 56px)", // Take full height minus header
        marginTop: "56px",               // Push below Header dynamically
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        overflowY: "auto",
        zIndex: 999,
      }}
    >
      <h3 style={{ color: "#ecf0f1", marginBottom: "30px" }}>Dashboard</h3>

      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
        <Link to="/event" style={{ color: "#fff", textDecoration: "none" }}>Events</Link>
        <Link to="/users" style={{ color: "#fff", textDecoration: "none" }}>Users</Link>
        <Link to="/bookings" style={{ color: "#fff", textDecoration: "none" }}>Bookings</Link>
        <Link to="/AddRestaurant" style={{ color: "#fff", textDecoration: "none" }}>Add Restaurant</Link>
        <Link to="/restaurants/booked" style={{ color: "#fff", textDecoration: "none" }}>Booked Restaurants</Link>
        <Link to="/settings" style={{ color: "#fff", textDecoration: "none" }}>Settings</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
