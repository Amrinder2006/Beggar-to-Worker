import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../services/Registrationservice";
import "./CitizenDashboard.css";

export default function CitizenDashboard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [passData, setPassData] = useState({ email: "", oldpass: "", newpass: "" });
  const [passError, setPassError] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("activeuser") || "");
  }, []);

  function handleLogout() {
    localStorage.removeItem("activeuser");
    navigate("/");
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setPassError("");

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    try {
      const resp = await changePassword(passData);
      alert(resp);
    } catch (err) {
      setPassError(err.message || "Error occurred while changing password.");
    }
  }

  return (
    <div>
      <nav className="navbar bg-white px-4 d-flex justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <img
            src="https://image2url.com/r2/default/images/1771851558508-3b4fd333-800f-48c2-99a3-6f3421bb38be.png"
            width="45"
            alt="Beggar to Worker logo"
          />
          <span className="brand-title">Worker Union</span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <img
            src="https://image2url.com/r2/default/images/1775562336209-73e1be2a-7b2e-4cf4-b6a5-7b1189bdc0fb.png"
            width="30"
            alt="User"
          />
          <span className="fw-bold">{email}</span>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          <div className="col-md-4 col-lg-3">
            <div className="card text-center p-3 citdash-card">
              <h5>Profile</h5>
              <img
                src="https://st2.depositphotos.com/1006318/5909/v/450/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg"
                width="140"
                className="mx-auto my-3"
                alt="Profile"
              />
              <button className="btn btn-primary w-100" onClick={() => navigate("/Citizencred")}>
                Open
              </button>
            </div>
          </div>

    

          <div className="col-md-4 col-lg-3">
            <div className="card text-center p-3 citdash-card">
              <h5>Worker Finder</h5>
              <img
                src="https://static.vecteezy.com/system/resources/previews/016/329/823/original/3d-illustration-business-manager-png.png"
                width="140"
                className="mx-auto my-3"
                alt="Beggar Finder"
              />
              <button className="btn btn-primary w-100" onClick={() => navigate("/find")}>
                Open
              </button>
            </div>
          </div>

          <div className="col-md-4 col-lg-3">
            <div className="card text-center p-3 citdash-card">
              <h5>Settings</h5>
              <img
                src="https://image2url.com/r2/default/images/1771851752329-43581042-2d3d-407e-a18e-5e02cae28c52.webp"
                width="140"
                className="mx-auto my-3"
                alt="Settings"
              />
              <button className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#changeModal">
                Open
              </button>
            </div>
          </div>

          <div className="col-md-4 col-lg-3">
            <div className="card text-center p-3 citdash-card">
              <h5>Logout</h5>
              <img
                src="https://static.vecteezy.com/system/resources/previews/019/078/821/original/logout-simple-flat-icon-illustration-vector.jpg"
                width="140"
                className="mx-auto my-3"
                alt="Logout"
              />
              <button className="btn btn-danger w-100" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <div className="modal fade" id="changeModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Change Password</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleChangePassword} noValidate>
                {passError && <div className="alert alert-danger py-2">{passError}</div>}

                <div className="mb-3">
                  <label className="form-label fw-bold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={passData.email}
                    onChange={(e) => setPassData({ ...passData, email: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    value={passData.oldpass}
                    onChange={(e) => setPassData({ ...passData, oldpass: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    value={passData.newpass}
                    onChange={(e) => setPassData({ ...passData, newpass: e.target.value })}
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
