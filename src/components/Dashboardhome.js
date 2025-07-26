import React, { useState } from "react";
import { Row, Col, Table, Button, ListGroup } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Dashboardhome = () => {
  const [date, setDate] = useState(new Date());

  // Sample Data
  const bookingsData = [
    { name: "Marriages", value: 15 },
    { name: "Birthdays", value: 10 },
    { name: "Corporate", value: 17 }
  ];
  const COLORS = ["#5874DC", "#384E78", "#50C878"];

  const weeklyBookings = [
    { name: "Mon", bookings: 12 },
    { name: "Tue", bookings: 8 },
    { name: "Wed", bookings: 15 },
    { name: "Thu", bookings: 10 },
    { name: "Fri", bookings: 18 },
    { name: "Sat", bookings: 5 },
    { name: "Sun", bookings: 9 }
  ];

  const recentBookings = [
    { id: 1, name: "Ravi Kumar", type: "Marriage", date: "2025-08-12", guests: 300, status: "Confirmed" },
    { id: 2, name: "Anita Sharma", type: "Birthday Party", date: "2025-08-15", guests: 50, status: "Pending" },
    { id: 3, name: "ABC Pvt Ltd", type: "Corporate Event", date: "2025-08-20", guests: 120, status: "Confirmed" }
  ];

  const reviews = [
    "Amazing service, our wedding was perfect!",
    "Birthday party arrangements were top-notch.",
    "Corporate event handled smoothly, very professional."
  ];

  const updates = [
    "New feature: Online guest RSVP available!",
    "3 new restaurants added to our partner list.",
    "Early bird discounts for corporate events extended to September."
  ];

  // Frosted Glass Styles
  const frostedCard = {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "12px",
    color: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    padding: "20px",
    marginBottom: "20px"
  };

  const tableStyle = {
    background: "transparent",
    color: "#fff",
    borderCollapse: "collapse",
    width: "100%"
  };

  const tableHeaderStyle = {
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    padding: "10px",
    borderBottom: "1px solid rgba(255,255,255,0.2)"
  };

  const tableCellStyle = {
    background: "rgba(255,255,255,0.03)",
    color: "#fff",
    padding: "10px",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  };

  const tableRowHover = {
    transition: "background 0.3s ease",
    cursor: "pointer"
  };

  const listGroupStyle = {
    background: "transparent",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.2)"
  };

  const headingStyle = { color: "#fff", marginBottom: "20px" };

  return (
    <div
      style={{
        padding: "20px",
        background: "linear-gradient(135deg,#384E78,#5874DC)",
        minHeight: "100vh",
        width: "100%",
        margin: "0"
      }}
    >
      {/* Welcome */}
      <h2 style={headingStyle}>Welcome back, Admin!</h2>

      {/* Stat Cards */}
      <Row style={{ marginBottom: "20px" }}>
        {["Total Events:42", "Marriages:15", "Birthdays:10", "Corporate Events:17"].map((item, index) => {
          const [label, value] = item.split(":");
          return (
            <Col key={index} md={3}>
              <div style={{ ...frostedCard, textAlign: "center" }}>
                <h5>{label}</h5>
                <h3>{value}</h3>
              </div>
            </Col>
          );
        })}
      </Row>

      {/* Charts */}
      <Row style={{ marginBottom: "20px" }}>
        <Col md={6}>
          <div style={frostedCard}>
            <h5>Bookings by Event Type</h5>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={bookingsData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {bookingsData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Col>
        <Col md={6}>
          <div style={frostedCard}>
            <h5>Weekly Bookings Trend</h5>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyBookings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#5874DC" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Col>
      </Row>

      {/* Recent Bookings */}
      <div style={frostedCard}>
        <h4>Recent Event Bookings</h4>
        <Table responsive style={tableStyle} hover>
          <thead>
            <tr>
              {["#", "Booked By", "Event Type", "Date", "Guests", "Status"].map((heading, idx) => (
                <th key={idx} style={tableHeaderStyle}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((booking, index) => (
              <tr
                key={booking.id}
                style={tableRowHover}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={tableCellStyle}>{index + 1}</td>
                <td style={tableCellStyle}>{booking.name}</td>
                <td style={tableCellStyle}>{booking.type}</td>
                <td style={tableCellStyle}>{booking.date}</td>
                <td style={tableCellStyle}>{booking.guests}</td>
                <td style={tableCellStyle}>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Reviews & Updates */}
      <Row style={{ marginTop: "20px" }}>
        <Col md={6}>
          <div style={frostedCard}>
            <h5>Customer Reviews</h5>
            <ListGroup style={listGroupStyle}>
              {reviews.map((review, idx) => (
                <ListGroup.Item key={idx} style={listGroupStyle}>
                  {review}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
        <Col md={6}>
          <div style={frostedCard}>
            <h5>Recent Updates</h5>
            <ListGroup style={listGroupStyle}>
              {updates.map((update, idx) => (
                <ListGroup.Item key={idx} style={listGroupStyle}>
                  {update}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>

      {/* Calendar (Fixed Width + Centered) */}
      <Row style={{ marginTop: "20px" }}>
        <Col md={12}>
          <div style={frostedCard}>
            <h5>Upcoming Events Calendar</h5>
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: "10px",
                borderRadius: "10px",
                maxWidth: "400px",
                margin: "0 auto",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Calendar value={date} onChange={setDate} />
            </div>
          </div>
        </Col>
      </Row>

      {/* Actions */}
      <div style={{ marginTop: "20px" }}>
        <Button variant="primary" style={{ marginRight: "10px" }}>
          + Create Event
        </Button>
        <Button variant="secondary" style={{ marginRight: "10px" }}>
          + Add Venue / Restaurant
        </Button>
        <Button variant="outline-light">View All Bookings</Button>
      </div>
    </div>
  );
};

export default Dashboardhome;
