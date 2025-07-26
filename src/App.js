import React from 'react';
import './App.css';
import Dashboardhome from './components/Dashboardhome';
import AddRestaurant from './components/AddRestaurant';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import EventsPage from './components/EventsPage';

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #176B6B, #253C5E)",
        color: "#fff",
        margin: 0,
        padding: 0
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboardhome />} />
          <Route path="AddRestaurant" element={<AddRestaurant />} />
          <Route path="event" element={<EventsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
