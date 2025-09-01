import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import EventsPage from './components/EventsPage';
import Addrestaurant from './components/Addrestaurant';
import Users from './components/Users';
import ContactMessages from './components/ContactMessages';
import Restaurants from'./components/Restaurants';


function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #176B6B, #ffffffff)",
        color: "#000000ff",
        margin: 0,
        padding: 0
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="event" element={<EventsPage />} />
          <Route path="Addrestaurant" element={<Addrestaurant />} />
          <Route path ="Users" element={<Users/>}/>
          <Route path ="ContactMessages" element={<ContactMessages/>}/>
          <Route path ="Restaurants" element={<Restaurants/>}/>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
