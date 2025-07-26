import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "200px", marginTop: "60px", padding: "20px", flex: 1 }}>
          <Outlet /> {/* This will render Dashboardhome or AddRestaurant dynamically */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
