import { useState, useEffect } from "react";
import { submitVolunteer, updateVolunteer } from "../services/Registrationservice";
import "./Volunteer.css";

export default function Volunteer() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [type, setType] = useState("");
  const [ngoNumber, setNgoNumber] = useState("");

  const [aadharFile, setAadharFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [aadharPreview, setAadharPreview] = useState("");
  const [profilePreview, setProfilePreview] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("activeuser") || "");
  }, []);

  const isNGO = type === "NGO";

  function handleFileChange(file, setFile, setPreview) {
    setFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  }

  function buildFormData() {
    const fd = new FormData();
    fd.append("Email", email);
    fd.append("name", name);
    fd.append("contact", contact);
    fd.append("Address", address);
    fd.append("city", city);
    fd.append("gen", gender);
    fd.append("occu", occupation);
    fd.append("type", type);
    if (isNGO) fd.append("NGO", ngoNumber);
    if (aadharFile) fd.append("adhar", aadharFile);
    if (profileFile) fd.append("profile", profileFile);
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
      const resp = await submitVolunteer(buildFormData());
      alert(resp);
    } catch (err) {
      setError(err.message || "Error occurred while submitting registration.");
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setError("");

    try {
      const resp = await updateVolunteer(buildFormData());
      alert(resp);
    } catch (err) {
      setError(err.message || "Error occurred while updating registration.");
    }
  }

  
  function handleFetch(e) {
    e.preventDefault();
  }

  return (
    <div className="volunteer-page py-5">
      <div className="container">
        <div className="form-card">
          <h3 className="text-center mb-4 fw-bold">Volunteer Registration</h3>

          <form>
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Email */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} disabled />
              </div>

          

           
            <div className="section-title">Personal Information</div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Contact</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="col-md-6">
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

              <div className="col-md-6">
                <label className="form-label">Occupation</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
              </div>
            </div>

            {/* Volunteer Type */}
            <div className="section-title mt-4">Volunteer Type</div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Type</label>
                <select
                  className="form-select"
                  required
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option disabled value="">Select</option>
                  <option value="Individual">Individual</option>
                  <option value="NGO">NGO</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">{isNGO ? "NGO Registration Number" : ""}</label>
                <input
                  type="text"
                  className="form-control"
                  hidden={!isNGO}
                  required={isNGO}
                  value={ngoNumber}
                  onChange={(e) => setNgoNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Uploads */}
            <div className="section-title mt-4">Documents</div>

            <div className="row g-3 text-center">
              <div className="col-md-6">
                <div className="upload-box">
                  {aadharPreview && <img src={aadharPreview} alt="Aadhar preview" />}
                </div>
                <label className="btn btn-outline-secondary btn-upload">
                  Upload Aadhar
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleFileChange(e.target.files[0], setAadharFile, setAadharPreview)}
                  />
                </label>
              </div>

              <div className="col-md-6">
                <div className="upload-box">
                  {profilePreview && <img src={profilePreview} alt="Profile preview" />}
                </div>
                <label className="btn btn-outline-secondary btn-upload">
                  Upload Profile
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleFileChange(e.target.files[0], setProfileFile, setProfilePreview)}
                  />
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="text-center mt-4">
              <button className="btn btn-primary submit-btn me-3" onClick={handleSubmit}>
                Submit
              </button>
              <button className="btn btn-warning submit-btn" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
