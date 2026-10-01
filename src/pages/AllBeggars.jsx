import { useState } from "react";
import { fetchBeggars } from "../services/Recordsservice";
import "./RecordsTable.css";

export default function AllBeggars() {
  const [beggars, setBeggars] = useState([]);

  async function handleFetch() {
    try {
      setBeggars(await fetchBeggars());
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="records-page">
      <div className="container py-4">
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="card header-card text-center bg-primary text-white p-3">
              <h3 className="mb-0">All Worker Records</h3>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-12 text-center">
            <button className="btn btn-success btn-fetch" onClick={handleFetch}>
              Fetch Records
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="table-card">
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>Type</th>
                      <th>Contact</th>
                      <th>ID Proof</th>
                      <th>Proof No.</th>
                      <th>Proof URL</th>
                      <th>Self URL</th>
                    </tr>
                  </thead>

                  <tbody>
                    {beggars.map((obj, i) => (
                      <tr key={obj.emailid || i}>
                        <td>{i + 1}</td>
                        <td>{obj.emailid}</td>
                        <td>{obj.name}</td>
                        <td>{obj.age}</td>
                        <td>{obj.gender}</td>
                        <td>{obj.address}</td>
                        <td>{obj.city}</td>
                        <td>{obj.type}</td>
                        <td>{obj.contact}</td>
                        <td>{obj.idproof}</td>
                        <td>{obj.proofno}</td>
                        <td>
                          <a href={obj.proofurl} target="_blank" rel="noopener noreferrer">View</a>
                        </td>
                        <td>
                          <a href={obj.selfurl} target="_blank" rel="noopener noreferrer">View</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
