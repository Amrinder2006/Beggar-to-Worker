import { useState } from "react";
import { fetchAllUsers, blockUser, resumeUser } from "../services/recordsService";
import "./RecordsTable.css";

export default function AllUsers() {
  const [users, setUsers] = useState([]);

  async function handleFetchAll() {
    try {
      setUsers(await fetchAllUsers());
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleBlock(email) {
    try {
      await blockUser(email);
      alert("Blocked");
      handleFetchAll();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleResume(email) {
    try {
      await resumeUser(email);
      alert("Resumed");
      handleFetchAll();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="records-page">
      <div className="container py-4">
        <div className="card header-card text-center bg-primary text-white p-3 mb-4">
          <h3 className="mb-0">All Users Records</h3>
        </div>

        <div className="text-center mb-4">
          <button className="btn btn-success px-4 py-2" onClick={handleFetchAll}>
            Fetch All Records
          </button>
        </div>

        <div className="table-card">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>User Type</th>
                  <th>Status</th>
                  <th>Operation</th>
                </tr>
              </thead>

              <tbody>
                {users.map((obj, i) => (
                  <tr key={obj.emailid || i}>
                    <td>{i + 1}</td>
                    <td>{obj.username}</td>
                    <td>{obj.emailid}</td>
                    <td>{obj.password}</td>
                    <td>{obj.usertype}</td>
                    <td>
                      <span className={`badge ${obj.status === "active" ? "bg-success" : "bg-danger"}`}>
                        {obj.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-success btn-action me-2"
                        onClick={() => handleResume(obj.emailid)}
                      >
                        Resume
                      </button>
                      <button className="btn btn-danger btn-action" onClick={() => handleBlock(obj.emailid)}>
                        Block
                      </button>
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
