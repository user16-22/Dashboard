import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "200px",
        background: "linear-gradient(135deg, #637c7cff, #fefefeff)",
        color: "#000000ff",
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
      <h3 style={{ color: "#000000ff", marginBottom: "30px" }}>Dashboard</h3>

      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Link to="/" style={{ color: "#000000ff", textDecoration: "none" }}>Home</Link>
        <Link to="/event" style={{ color: "#0d0d0dff", textDecoration: "none" }}>Events</Link>
        <Link to="/Users" style={{ color: "#000000ff", textDecoration: "none" }}>Users</Link>
        <Link to="/ContactMessages" style={{ color: "#000000ff", textDecoration: "none" }}>ContactMessages</Link>
         <Link to="/Addrestaurant" style={{ color: "#000000ff", textDecoration: "none" }}>Addrestaurant</Link>
        <Link to="/Restaurants" style={{ color: "#000000ff", textDecoration: "none" }}>Restaurants</Link>
       
        
      </nav>
    </div>
  );
};

export default Sidebar;
