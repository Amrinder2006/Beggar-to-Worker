import { useState } from "react";
import { signup } from "../services/authService";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    userType: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    try {
      const resp = await signup(formData);
      alert(resp);
    } catch (err) {
      setError(err.message || "Error occurred while creating account.");
    }
  }

  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card p-4 shadow">
              <h3 className="text-center mb-3">Sign Up</h3>

              <form onSubmit={handleSubmit} noValidate>
                {error && <div className="alert alert-danger py-2">{error}</div>}

                <input
                  type="text"
                  name="username"
                  className="form-control mb-3"
                  placeholder="Username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                />

                <input
                  type="email"
                  name="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />

                <input
                  type="password"
                  name="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />

                <select
                  name="userType"
                  className="form-select mb-3"
                  required
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select User Type</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Citizen">Citizen</option>
                </select>

                <button type="submit" className="btn btn-primary w-100">
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
