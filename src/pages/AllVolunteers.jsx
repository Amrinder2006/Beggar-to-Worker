import { useState } from "react";
import { fetchVolunteers } from "../services/recordsService";
import "./RecordsTable.css";

export default function AllVolunteers() {
  const [volunteers, setVolunteers] = useState([]);

  async function handleFetch() {
    try {
      setVolunteers(await fetchVolunteers());
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="records-page">
      <div className="container py-4">
        <div className="card header-card text-center bg-primary text-white p-3 mb-4">
          <h3 className="mb-0">All Volunteers Records</h3>
        </div>

        <div className="text-center mb-4">
          <button className="btn btn-success px-4 py-2" onClick={handleFetch}>
            Fetch Volunteers
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
                  <th>Contact</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Gender</th>
                  <th>Occupation</th>
                  <th>Aadhar</th>
                  <th>Photo</th>
                </tr>
              </thead>

              <tbody>
                {volunteers.map((obj, i) => (
                  <tr key={obj.emailid || i}>
                    <td>{i + 1}</td>
                    <td>{obj.emailid}</td>
                    <td>{obj.name}</td>
                    <td>{obj.contact}</td>
                    <td>{obj.address}</td>
                    <td>{obj.city}</td>
                    <td>{obj.gender}</td>
                    <td>{obj.occupation}</td>
                    <td>
                      <a href={obj.adharurl} target="_blank" rel="noopener noreferrer">View</a>
                    </td>
                    <td>
                      <a href={obj.picurl} target="_blank" rel="noopener noreferrer">View</a>
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
