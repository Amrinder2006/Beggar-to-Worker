import { useState, useEffect } from "react";
import { submitBeggar, updateBeggar } from "../services/Registrationservice";
import "./Beggar.css";

const WORK_TYPES = ["Gardener", "Cleaner", "Care-taker", "Washer"];

export default function Beggar() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [types, setTypes] = useState([]);
  const [contact, setContact] = useState("");
  const [idProof, setIdProof] = useState("");
  const [proofNo, setProofNo] = useState("");

  const [proofFile, setProofFile] = useState(null);
  const [selfFile, setSelfFile] = useState(null);
  const [proofPreview, setProofPreview] = useState("");
  const [selfPreview, setSelfPreview] = useState("");

  const [error, setError] = useState("");

  // Auto-fill email from the logged-in user, same as the original $(document).ready
  useEffect(() => {
    setEmail(localStorage.getItem("activeuser") || "");
  }, []);

  // Restricts age input to a plausible 1–99 range, same intent as the original numonly()
  function handleAgeKeyDown(e) {
    const proposed = age + e.key;
    if (e.key === "+" || e.key === "-" || parseInt(proposed) < 1 || parseInt(proposed) >= 100) {
      if (e.key.length === 1) e.preventDefault(); // allow Backspace/Tab/arrows etc.
    }
  }

  function toggleType(value) {
    setTypes((prev) => (prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]));
  }

  function handleFileChange(file, setFile, setPreview) {
    setFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  }

  function buildFormData() {
    const fd = new FormData();
    fd.append("email", email);
    fd.append("name", name);
    fd.append("age", age);
    fd.append("gen", gender);
    fd.append("address", address);
    fd.append("city", city);
    types.forEach((t) => fd.append("type", t));
    fd.append("contact", contact);
    fd.append("idproof", idProof);
    fd.append("proofno", proofNo);
    if (proofFile) fd.append("proof", proofFile);
    if (selfFile) fd.append("self", selfFile);
    return fd;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!e.target.closest("form").checkValidity()) {
      e.target.closest("form").reportValidity();
      return;
    }

    try {
      const resp = await submitBeggar(buildFormData());
      alert(resp);
    } catch (err) {
      setError(err.message || "Error occurred while submitting registration.");
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setError("");

    try {
      const resp = await updateBeggar(buildFormData());
      alert(resp);
    } catch (err) {
      setError(err.message || "Error occurred while updating registration.");
    }
  }

  return (
    <div className="beggar-page py-5">
      <div className="container">
        <div className="form-card">
          <form>
            <h3 className="text-center mb-4 fw-bold">Worker Registration</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            {/* Email */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Email Address</label>
              <input type="text" className="form-control" value={email} disabled />
            </div>

            {/* Personal Details */}
            <div className="section-title">Personal Details</div>

            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  value={age}
                  onKeyDown={handleAgeKeyDown}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Gender</label>
                <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="gen"
                    value="Male"
                    className="form-check-input"
                    required
                    checked={gender === "Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="form-check-label">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="gen"
                    value="Female"
                    className="form-check-input"
                    checked={gender === "Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="form-check-label">Female</label>
                </div>
              </div>
            </div>

            <div className="row g-3 mt-1">
              <div className="col-md-7">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="col-md-5">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            {/* Work */}
            <div className="section-title mt-4">Work Details</div>

            <div className="row g-3">
              <div className="col-md-7">
                <label className="form-label">Type of Work</label>
                <br />
                {WORK_TYPES.map((t) => (
                  <div className="form-check form-check-inline" key={t}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={types.includes(t)}
                      onChange={() => toggleType(t)}
                    />
                    <label className="form-check-label">{t}</label>
                  </div>
                ))}
              </div>

              <div className="col-md-5">
                <label className="form-label">Contact</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>

            {/* ID Proof */}
            <div className="section-title mt-4">Verification</div>

            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">ID Proof</label>
                <select
                  className="form-select"
                  required
                  value={idProof}
                  onChange={(e) => setIdProof(e.target.value)}
                >
                  <option disabled value="">Select</option>
                  <option value="Aadhar">Aadhar Card</option>
                  <option value="PAN">PAN Card</option>
                </select>

                <label className="form-label mt-3">Proof Number</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={proofNo}
                  onChange={(e) => setProofNo(e.target.value)}
                />
              </div>

              <div className="col-md-4 text-center">
                <label className="form-label">Upload Proof</label>
                <div className="preview-box mx-auto">
                  {proofPreview && <img src={proofPreview} alt="Proof preview" />}
                </div>
                <label className="btn btn-outline-secondary btn-upload">
                  Browse
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleFileChange(e.target.files[0], setProofFile, setProofPreview)}
                  />
                </label>
              </div>

              <div className="col-md-4 text-center">
                <label className="form-label">Upload Self</label>
                <div className="preview-box mx-auto">
                  {selfPreview && <img src={selfPreview} alt="Self preview" />}
                </div>
                <label className="btn btn-outline-secondary btn-upload">
                  Browse
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleFileChange(e.target.files[0], setSelfFile, setSelfPreview)}
                  />
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="text-center mt-4">
              <button className="btn btn-primary btn-main me-3" onClick={handleSubmit}>
                Submit
              </button>
              <button className="btn btn-warning btn-main" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
