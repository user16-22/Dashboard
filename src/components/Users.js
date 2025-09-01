import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Users() {
  const API_BASE = "http://localhost:5000/api/user/users";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState(null);

  // editing state
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", mobilenumber: "" });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [flash, setFlash] = useState({ type: "", msg: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setPageError(null);
    try {
      const res = await axios.get(API_BASE);
      setUsers(res.data || []);
    } catch (err) {
      setPageError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Begin edit
  const startEdit = (user) => {
    setEditingUser(user);
    setForm({
      name: user.name || "",
      email: user.email || "",
      mobilenumber: user.mobilenumber || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setForm({ name: "", email: "", mobilenumber: "" });
  };

  // Save edit -> PUT /users/:id
  const saveEdit = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    // simple validation
    if (!form.name?.trim() || !form.email?.trim() || !form.mobilenumber?.trim()) {
      setFlash({ type: "danger", msg: "Please fill all fields." });
      return;
    }

    setSaving(true);
    try {
      const res = await axios.put(`${API_BASE}/${editingUser._id}`, {
        name: form.name.trim(),
        email: form.email.trim(),
        mobilenumber: form.mobilenumber.trim(),
      });

      // update list locally
      const updated = res.data; // assuming API returns updated user
      setUsers((prev) =>
        prev.map((u) => (u._id === editingUser._id ? { ...u, ...updated } : u))
      );

      setFlash({ type: "success", msg: "User updated successfully." });
      cancelEdit();
    } catch (err) {
      setFlash({ type: "danger", msg: "Failed to update user." });
    } finally {
      setSaving(false);
    }
  };

  // Delete -> DELETE /users/:id
  const deleteUser = async (user) => {
    const ok = window.confirm(`Delete user "${user.name || user.email}"?`);
    if (!ok) return;

    setDeletingId(user._id);
    try {
      await axios.delete(`${API_BASE}/${user._id}`);
      setUsers((prev) => prev.filter((u) => u._id !== user._id));
      setFlash({ type: "success", msg: "User deleted." });
      // if currently editing the same user, cancel the edit
      if (editingUser && editingUser._id === user._id) cancelEdit();
    } catch (err) {
      setFlash({ type: "danger", msg: "Failed to delete user." });
    } finally {
      setDeletingId(null);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (pageError) return <p className="text-center mt-5 text-danger">{pageError}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-3 text-center">Registered Users</h2>

      {/* flash message */}
      {flash.msg && (
        <div className={`alert alert-${flash.type} d-flex justify-content-between`} role="alert">
          <span>{flash.msg}</span>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setFlash({ type: "", msg: "" })}
          />
        </div>
      )}

      {/* Edit form (inline) */}
      {editingUser && (
        <div className="card mb-4 shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center">
            <strong>Edit User</strong>
            <button className="btn btn-sm btn-outline-secondary" onClick={cancelEdit}>
              Close
            </button>
          </div>
          <div className="card-body">
            <form onSubmit={saveEdit}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Enter name"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="Enter email"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Mobile Number</label>
                  <input
                    className="form-control"
                    name="mobilenumber"
                    value={form.mobilenumber}
                    onChange={onChange}
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>

              <div className="mt-3 d-flex gap-2">
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={cancelEdit} disabled={saving}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users table */}
      <div className="table-responsive">
        <table className="table table-dark table-striped table-bordered align-middle">
          <thead>
            <tr>
              <th style={{ width: 60 }}>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th style={{ width: 180 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, i) => (
                <tr key={user._id}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobilenumber}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => startEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteUser(user)}
                        disabled={deletingId === user._id}
                      >
                        {deletingId === user._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
