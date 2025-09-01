import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Badge, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  // ✅ Fetch all bookings from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/booking")
      .then((res) => {
        if (res.data && Array.isArray(res.data.data)) {
          setEvents(res.data.data);
          console.log(res.data.data);
        } else {
          console.error("Invalid data format:", res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      });
  }, []);

  // ✅ Delete booking
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`http://localhost:5000/api/booking/${id}`);
        setEvents((prev) => prev.filter((event) => event._id !== id));
      } catch (err) {
        console.error("Error deleting booking:", err);
      }
    }
  };

  // ✅ Badge colors for status
  const getStatusVariant = (status) => {
    switch (status) {
      case "Confirmed":
        return "success";
      case "Pending":
        return "warning";
      case "Cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  // ✅ Search & Filter
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name?.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType ? event.eventType === filterType : true;
    return matchesSearch && matchesType;
  });

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      <h2 style={{ marginBottom: "20px" }}>Event Bookings</h2>

      {/* 🔍 Search & Filter */}
      <Row style={{ marginBottom: "20px" }}>
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Event Types</option>
            <option value="Wedding">Wedding</option>
            <option value="Birthday Party">Birthday Party</option>
            <option value="Conference">Conference</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Engagement">Engagement</option>
            <option value="Reception">Reception</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button
            variant="primary"
            style={{ width: "100%" }}
            onClick={() => navigate("/book-event")}
          >
            + Add Booking
          </Button>
        </Col>
      </Row>

      {/* 📋 Bookings Table */}
      <div style={{ overflowX: "auto", width: "100%" }}>
        <Table bordered hover variant="dark" style={{ minWidth: "1300px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Event Type</th>
              <th>Event Date</th>
              <th>Start</th>
              <th>End</th>
              <th>Hall Booked</th>
              <th>Hall Name</th>
              <th>Total Payment (₹)</th> {/* 🔥 Added Payment Column */}
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <tr key={event._id}>
                  <td>{index + 1}</td>
                  <td>{event.name}</td>
                  <td>{event.email}</td>
                  <td>{event.mobile}</td>
                  <td>{event.eventType}</td>
                  <td>{event.eventDate}</td>
                  <td>{event.startTime}</td>
                  <td>{event.endTime}</td>
                  <td>{event.hallBooking}</td>
                  <td>{event.hallName}</td>
                  <td>
                    {event.totalAmount ? `₹${event.totalAmount}` : "Not Paid"} {/* 🔥 Payment Value */}
                  </td>
                  <td>
                    <Badge bg={getStatusVariant(event.status || "Pending")}>
                      {event.status || "Pending"}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" style={{ textAlign: "center" }}>
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default EventsPage;
