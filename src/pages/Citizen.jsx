import { useState, useEffect } from "react";
import { submitCitizenProfile } from "../services/citizenService";
import "./Citizen.css";

export default function Citizen() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [frontPreview, setFrontPreview] = useState("");
  const [backPreview, setBackPreview] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("activeuser") || "");
  }, []);

  function handleFileChange(file, setFile, setPreview) {
    setFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    const fd = new FormData();
    fd.append("Email", email);
    fd.append("Mob", mobile);
    fd.append("Name", name);
    fd.append("Adharno", aadharNo);
    fd.append("Fathername", fatherName);
    fd.append("dob", dob);
    fd.append("gen", gender);
    fd.append("Address", address);
    fd.append("city", city);
    if (frontFile) fd.append("froadhar", frontFile);
    if (backFile) fd.append("backadhar", backFile);

    try {
      const resp = await submitCitizenProfile(fd);
      alert(resp);
    } catch (err) {
      setError(err.message || "Error occurred while submitting profile.");
    }
  }

  return (
    <div className="citizen-page py-5">
      <div className="container">
        <div className="main-card">
          <h3 className="text-center mb-4 fw-bold">Citizen Profile</h3>

          <form onSubmit={handleSubmit} noValidate>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row g-4">
              {/* Aadhar Upload */}
              <div className="col-md-4">
                <div className="section-title">Aadhar Upload</div>

                <div className="upload-box mb-3">
                  {frontPreview && <img src={frontPreview} alt="Aadhar front preview" />}
                  <label className="btn btn-outline-primary btn-upload">
                    Upload Front
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleFileChange(e.target.files[0], setFrontFile, setFrontPreview)}
                    />
                  </label>
                </div>

                <div className="upload-box">
                  {backPreview && <img src={backPreview} alt="Aadhar back preview" />}
                  <label className="btn btn-outline-primary btn-upload">
                    Upload Back
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleFileChange(e.target.files[0], setBackFile, setBackPreview)}
                    />
                  </label>
                </div>
              </div>

              {/* Form Fields */}
              <div className="col-md-8">
                <div className="section-title">Personal Information</div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} disabled />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Mobile</label>
                    <input
                      type="tel"
                      className="form-control"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      maxLength={20}
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Aadhar Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={aadharNo}
                      onChange={(e) => setAadharNo(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Father's Name</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">DOB</label>
                    <input
                      type="date"
                      className="form-control"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      required
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option disabled value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>

                  <div className="col-md-8">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="col-md-4">
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
              </div>
            </div>

            {/* Submit */}
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary submit-btn">
                Submit Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
