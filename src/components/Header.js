import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import { Bell, Sun, Moon } from "react-bootstrap-icons";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark-mode"); // Global toggle
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="px-4 shadow"
      style={{
        background: "linear-gradient(135deg, #176B6B, #253C5E)",
        color: "#fff",
        zIndex: 1000,
      }}
    >
      {/* Brand Logo */}
      <Navbar.Brand href="/" className="fw-bold" style={{ color: "#fff" }}>
        Event Dashboard
      </Navbar.Brand>

      {/* Responsive Toggle */}
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="justify-content-between">
        {/* Search Bar */}
        <Form className="d-flex mx-auto" style={{ maxWidth: "400px", width: "100%" }}>
          <FormControl
            type="search"
            placeholder="Search events..."
            className="me-2"
          />
          <Button variant="primary">Search</Button>
        </Form>

        {/* Right-side icons */}
        <Nav>
          {/* Notifications */}
          <Nav.Link href="#" style={{ color: "#fff" }}>
            <Bell size={20} />
          </Nav.Link>

          {/* Dark Mode Toggle */}
          <Nav.Link onClick={toggleDarkMode} style={{ cursor: "pointer", color: "#fff" }}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Nav.Link>

          {/* Profile Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              style={{ background: "transparent", border: "none" }}
            >
              <img
                src="https://via.placeholder.com/30"
                alt="Profile"
                className="rounded-circle me-2"
                style={{ width: "30px", height: "30px" }}
              />
              Admin
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
              <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
