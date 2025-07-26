import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const AddRestaurant = () => {
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    contact: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    capacity: "",
    cuisine: "",
    costPerPerson: "",
    amenities: [],
    images: null,
    active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        amenities: checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((a) => a !== value),
      }));
    } else if (type === "file") {
      setFormData({ ...formData, images: e.target.files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Restaurant Data:", formData);
    alert("Restaurant Added Successfully!");
  };

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      <h2 style={{ marginBottom: "20px" }}>Add New Restaurant</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Restaurant Name */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter restaurant name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          {/* Owner Name */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Owner/Manager</Form.Label>
              <Form.Control
                type="text"
                name="owner"
                placeholder="Enter owner's name"
                value={formData.owner}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Contact and Email */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="tel"
                name="contact"
                placeholder="Enter phone number"
                value={formData.contact}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Address */}
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            rows={2}
            placeholder="Enter full address"
            value={formData.address}
            onChange={handleChange}
          />
        </Form.Group>

        {/* City, State, ZIP */}
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>ZIP Code</Form.Label>
              <Form.Control
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Capacity & Cuisine */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Seating/Event Capacity</Form.Label>
              <Form.Control
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Cuisine Type</Form.Label>
              <Form.Control
                type="text"
                name="cuisine"
                placeholder="E.g., Indian, Continental"
                value={formData.cuisine}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Cost per person */}
        <Form.Group className="mb-3">
          <Form.Label>Average Cost per Person (₹)</Form.Label>
          <Form.Control
            type="number"
            name="costPerPerson"
            value={formData.costPerPerson}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Amenities */}
        <Form.Group className="mb-3">
          <Form.Label>Amenities</Form.Label>
          <div>
            {["Wi-Fi", "Parking", "Outdoor Seating", "Bar", "Live Music"].map((amenity) => (
              <Form.Check
                key={amenity}
                inline
                type="checkbox"
                label={amenity}
                value={amenity}
                onChange={handleChange}
              />
            ))}
          </div>
        </Form.Group>

        {/* Upload Images */}
        <Form.Group className="mb-3">
          <Form.Label>Upload Images</Form.Label>
          <Form.Control type="file" multiple name="images" onChange={handleChange} />
        </Form.Group>

        {/* Active Toggle */}
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            id="activeSwitch"
            label="Active"
            checked={formData.active}
            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Add Restaurant
        </Button>
      </Form>
    </div>
  );
};

export default AddRestaurant;
