import { useState, useEffect } from "react";
import { fetchWorkTypes, fetchCities, fetchWorkers } from "../services/workerService";
import "./Find.css";

export default function Find() {
  const [workTypes, setWorkTypes] = useState([]);
  const [cities, setCities] = useState([]);
  const [workers, setWorkers] = useState([]);

  const [selectedWork, setSelectedWork] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedWorker, setSelectedWorker] = useState({});

  // Runs once on mount — equivalent of ng-init="FindType();FindCity();"
  useEffect(() => {
    fetchWorkTypes().then(setWorkTypes).catch(() => setWorkTypes([]));
    fetchCities().then(setCities).catch(() => setCities([]));
  }, []);

  async function handleSearch() {
    try {
      const data = await fetchWorkers({ type: selectedWork, city: selectedCity });
      setWorkers(data);
    } catch {
      setWorkers([]);
    }
  }

  function handleShowDetails(worker) {
    // Sets state so the modal (opened by Bootstrap's own data-bs-toggle
    // attribute below) shows this worker's details.
    setSelectedWorker(worker);
  }

  return (
    <div style={{ background: "#f5f7fa", minHeight: "100vh" }}>
      {/* Header */}
      <div className="header-bar bg-white shadow-sm p-3 text-center fw-semibold">
        <h4 className="mb-0">Find Workers</h4>
      </div>

      <div className="container py-4">
        {/* Filters */}
        <div className="filter-card bg-white rounded-3 p-4 shadow-sm mb-4">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label">Work Type</label>
              <select
                className="form-select"
                value={selectedWork}
                onChange={(e) => setSelectedWork(e.target.value)}
              >
                <option disabled value="">Select</option>
                {workTypes.map((obj, i) => (
                  <option key={i} value={obj.type}>{obj.type}</option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">City</label>
              <select
                className="form-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option disabled value="">Select</option>
                {cities.map((obj, i) => (
                  <option key={i} value={obj.city}>{obj.city}</option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <button className="btn btn-primary w-100" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="row g-4">
          {workers.map((obj, i) => (
            <div className="col-md-4 col-lg-3" key={i}>
              <div className="card p-3 text-center find-card">
                <img src={obj.selfurl} height="180" style={{ objectFit: "cover", borderRadius: "12px" }} alt={obj.name} />

                <div className="mt-3">
                  <h6 className="fw-bold mb-1">{obj.name}</h6>
                  <div className="text-muted small">
                    Age: {obj.age} | {obj.gender}
                  </div>
                </div>

                <button
                  className="btn btn-outline-primary mt-3"
                  data-bs-toggle="modal"
                  data-bs-target="#Detail"
                  onClick={() => handleShowDetails(obj)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="Detail" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Worker Details</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <div className="row text-center mb-4">
                <div className="col-md-6">
                  <img src={selectedWorker.selfurl} className="modal-img w-100" alt="Self" />
                </div>
                <div className="col-md-6">
                  <img src={selectedWorker.proofurl} className="modal-img w-100" alt="Proof" />
                </div>
              </div>

              <div className="card p-4">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Name:</strong>
                    <div className="text-muted">{selectedWorker.name}</div>
                  </div>
                  <div className="col-md-6">
                    <strong>Email:</strong>
                    <div className="text-muted">{selectedWorker.emailid}</div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Contact:</strong>
                    <div className="text-muted">{selectedWorker.contact}</div>
                  </div>
                  <div className="col-md-6">
                    <strong>Address:</strong>
                    <div className="text-muted">{selectedWorker.address}</div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>City:</strong>
                    <div className="text-muted">{selectedWorker.city}</div>
                  </div>
                  <div className="col-md-6">
                    <strong>Work Type:</strong>
                    <div className="text-muted">{selectedWorker.type}</div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <strong>ID Proof:</strong>
                    <div className="text-muted">{selectedWorker.idproof}</div>
                  </div>
                  <div className="col-md-6">
                    <strong>Proof No:</strong>
                    <div className="text-muted">{selectedWorker.proofno}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
