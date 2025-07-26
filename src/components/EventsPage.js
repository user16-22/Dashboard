import React, { useState } from "react";
import { Table, Button, Form, Badge, Row, Col } from "react-bootstrap";

const EventsPage = () => {
  // Sample Events Data
  const [events] = useState([
    {
      id: 1,
      name: "Ravi & Priya Wedding",
      type: "Marriage",
      date: "2025-08-12",
      location: "Chennai",
      guests: 300,
      status: "Confirmed",
    },
    {
      id: 2,
      name: "Anita's Birthday Bash",
      type: "Birthday",
      date: "2025-08-15",
      location: "Bangalore",
      guests: 50,
      status: "Pending",
    },
    {
      id: 3,
      name: "ABC Pvt Ltd Annual Meet",
      type: "Corporate",
      date: "2025-08-20",
      location: "Hyderabad",
      guests: 120,
      status: "Cancelled",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  // Filter Logic
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType ? event.type === filterType : true;
    return matchesSearch && matchesType;
  });

  // Status Colors
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

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      <h2 style={{ marginBottom: "20px" }}>Event Listings</h2>

      {/* Filters */}
      <Row style={{ marginBottom: "20px" }}>
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by Event Name..."
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
            <option value="Marriage">Marriage</option>
            <option value="Birthday">Birthday</option>
            <option value="Corporate">Corporate</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button variant="primary" style={{ width: "100%" }}>
            + Add Event
          </Button>
        </Col>
      </Row>

      {/* Event Table */}
      <Table responsive bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Event Name</th>
            <th>Type</th>
            <th>Date</th>
            <th>Location</th>
            <th>Guests</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <tr key={event.id}>
                <td>{index + 1}</td>
                <td>{event.name}</td>
                <td>{event.type}</td>
                <td>{event.date}</td>
                <td>{event.location}</td>
                <td>{event.guests}</td>
                <td>
                  <Badge bg={getStatusVariant(event.status)}>{event.status}</Badge>
                </td>
                <td>
                  <Button size="sm" variant="outline-light" style={{ marginRight: "10px" }}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No events found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default EventsPage;
