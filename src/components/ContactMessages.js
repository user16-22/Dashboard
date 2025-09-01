import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch contact messages from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contact/userinfo") // Adjust port if needed
      .then((res) => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load messages");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-5">Loading messages...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Contact Messages</h2>
      <table className="table table-dark table-striped table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.length > 0 ? (
            messages.map((msg, i) => (
              <tr key={msg._id}>
                <td>{i + 1}</td>
                <td>{msg.name}</td>
                <td>{msg.phone}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No messages found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ContactMessages;
