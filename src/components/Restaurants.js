import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editRestaurant, setEditRestaurant] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // 🔹 Fetch Restaurants
  const fetchRestaurants = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/restaurants/view");
      setRestaurants(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load restaurants");
      setLoading(false);
    }
  };

  // 🔹 Open Edit Modal
  const handleEdit = (restaurant) => {
    setEditRestaurant({ ...restaurant });
    setNewImage(null);
    setShowModal(true);
  };

  // 🔹 Delete Restaurant
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      try {
        await axios.delete(`http://localhost:5000/api/restaurants/${id}`);
        fetchRestaurants();
      } catch (err) {
        console.error(err);
        alert("Error deleting restaurant");
      }
    }
  };

  // 🔹 Auto Calculate Payment
  const calculatePayment = (restaurant) => {
    const price = Number(restaurant.avgCost) || 0;
    const seats = Number(restaurant.seating) || 0;
    return price * seats;
  };

  // 🔹 Save Edited Restaurant
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editRestaurant.name);
      formData.append("city", editRestaurant.city);
      formData.append("seating", editRestaurant.seating);
      formData.append("cuisineType", editRestaurant.cuisineType);
      formData.append("avgCost", editRestaurant.avgCost);
      formData.append("payment", calculatePayment(editRestaurant));
      if (newImage) {
        formData.append("image", newImage);
      }

      await axios.put(
        `http://localhost:5000/api/restaurants/${editRestaurant._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setShowModal(false);
      fetchRestaurants();
    } catch (err) {
      console.error(err);
      alert("Error updating restaurant");
    }
  };

  if (loading) return <p className="text-center">Loading restaurants...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Restaurants Dashboard</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>City</th>
            <th>Seating</th>
            <th>Cuisine</th>
            <th>Avg Cost</th>
            <th>Payment</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant, index) => (
            <tr key={restaurant._id}>
              <td>{index + 1}</td>
              <td>{restaurant.name}</td>
              <td>{restaurant.city}</td>
              <td>{restaurant.seating}</td>
              <td>{restaurant.cuisineType}</td>
              <td>₹{restaurant.avgCost}</td>
              <td>₹{restaurant.payment || calculatePayment(restaurant)}</td>
              <td>
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  style={{ width: "80px", height: "60px", objectFit: "cover" }}
                />
              </td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleEdit(restaurant)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(restaurant._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 🔹 Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Restaurant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editRestaurant && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editRestaurant.name}
                  onChange={(e) =>
                    setEditRestaurant({ ...editRestaurant, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  value={editRestaurant.city}
                  onChange={(e) =>
                    setEditRestaurant({ ...editRestaurant, city: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Seating</Form.Label>
                <Form.Control
                  type="number"
                  value={editRestaurant.seating}
                  onChange={(e) =>
                    setEditRestaurant({
                      ...editRestaurant,
                      seating: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cuisine</Form.Label>
                <Form.Control
                  type="text"
                  value={editRestaurant.cuisineType}
                  onChange={(e) =>
                    setEditRestaurant({
                      ...editRestaurant,
                      cuisineType: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Avg Cost</Form.Label>
                <Form.Control
                  type="number"
                  value={editRestaurant.avgCost}
                  onChange={(e) =>
                    setEditRestaurant({
                      ...editRestaurant,
                      avgCost: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Payment (Auto)</Form.Label>
                <Form.Control
                  type="text"
                  value={calculatePayment(editRestaurant)}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Change Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewImage(e.target.files[0])}
                />
                {editRestaurant.image && (
                  <img
                    src={editRestaurant.image}
                    alt="Preview"
                    style={{ width: "100%", marginTop: "10px", borderRadius: "8px" }}
                  />
                )}
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Restaurants;
