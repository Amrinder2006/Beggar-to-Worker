import { useState } from "react";
import { fetchCitizens } from "../services/recordsService";
import "./RecordsTable.css";

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d)) return value;
  return d.toISOString().slice(0, 10); // yyyy-MM-dd, matching the original Angular date filter
}

export default function AllCitizens() {
  const [citizens, setCitizens] = useState([]);

  async function handleFetch() {
    try {
      setCitizens(await fetchCitizens());
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="records-page">
      <div className="container py-4">
        <div className="card header-card text-center bg-primary text-white p-3 mb-4">
          <h3 className="mb-0">All Citizens Records</h3>
        </div>

        <div className="text-center mb-4">
          <button className="btn btn-success px-4 py-2" onClick={handleFetch}>
            Fetch Citizens
          </button>
        </div>

        <div className="table-card">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Father Name</th>
                  <th>DOB</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Aadhar No</th>
                  <th>Front Aadhar</th>
                  <th>Back Aadhar</th>
                </tr>
              </thead>

              <tbody>
                {citizens.map((obj, i) => (
                  <tr key={obj.Email || i}>
                    <td>{i + 1}</td>
                    <td>{obj.Email}</td>
                    <td>{obj.Name}</td>
                    <td>{obj.Mob}</td>
                    <td>{obj.Fathername}</td>
                    <td>{formatDate(obj.dob)}</td>
                    <td>{obj.gender}</td>
                    <td>{obj.Address}</td>
                    <td>{obj.city}</td>
                    <td>{obj.Adharno}</td>
                    <td>
                      <a href={obj.froadhar} target="_blank" rel="noopener noreferrer">View</a>
                    </td>
                    <td>
                      <a href={obj.backadhar} target="_blank" rel="noopener noreferrer">View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
