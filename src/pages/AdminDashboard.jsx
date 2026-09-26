import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../services/RegistrationService.js";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [passData, setPassData] = useState({
    email: "",
    oldpass: "",
    newpass: "",
  });
  const [passError, setPassError] = useState("");

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
      <nav className="navbar navbar-light bg-white justify-content-center">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#">
          <img
            src="https://image2url.com/r2/default/images/1771851558508-3b4fd333-800f-48c2-99a3-6f3421bb38be.png"
            width="45"
            height="45"
            alt="Beggar to Worker logo"
          />
          <span className="dashboard-title">Beggar to Worker</span>
        </a>
      </nav>

      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          <div className="col-md-4 col-lg-3">
            <div className="card text-center p-3 dashboard-card">
              <h5 className="mb-3">Users Manager</h5>
              <img
                src="https://st2.depositphotos.com/1006318/5909/v/450/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg"
                width="150"
                height="150"
                className="mx-auto mb-3"
                alt="Users"
              />
              <button
                className="btn btn-primary w-100"
                onClick={() => navigate("/allusers")}
              >
                Users Manager
              </button>
            </div>
          </div>

          <div className="col-md-4 col-lg-3">
            <div className="card text-center p-3 dashboard-card">
              <h5 className="mb-3">Volunteers</h5>
              <img
                src="https://image2url.com/r2/default/images/1772464726685-4026f98f-a577-45f7-b135-67c055afc444.png"
                width="150"
                height="150"
                className="mx-auto mb-3"
                alt="Volunteers"
              />
              <button
                className="btn btn-primary w-100"
                onClick={() => navigate("/allvol")}
              >
                Volunteers
              </button>
            </div>
          </div>

          <div className="col-md-4 col-lg-3">
            <div className="card text-center p-3 dashboard-card">
              <h5 className="mb-3">Citizens</h5>
              <img
                src="http://getdrawings.com/free-icon/cool-profile-icons-51.png"
                width="150"
                height="150"
                className="mx-auto mb-3"
                alt="Citizens"
              />
              <button
                className="btn btn-primary w-100"
                onClick={() => navigate("/allcit")}
              >
                Citizens
              </button>
            </div>
          </div>

          <div className="col-md-4 col-lg-3">
            <div className="card text-center p-3 dashboard-card">
              <h5 className="mb-3">Beggars</h5>
              <img
                src="https://cdn-icons-png.flaticon.com/512/4888/4888756.png"
                width="150"
                height="150"
                className="mx-auto mb-3"
                alt="Beggars"
              />
              <button
                className="btn btn-primary w-100"
                onClick={() => navigate("/allbeg")}
              >
                Beggars
              </button>
            </div>
          </div>

          {/* Change password — separated out from Logout, see note in chat */}
          <div className="col-md-4 col-lg-3">
            <div className="card text-center p-3 dashboard-card">
              <h5 className="mb-3">Change Password</h5>
              <img
                src="https://cdn-icons-png.flaticon.com/512/159/159604.png"
                width="150"
                height="150"
                className="mx-auto mb-3"
                alt="Change password"
              />
              <button
                className="btn btn-secondary w-100"
                data-bs-toggle="modal"
                data-bs-target="#changeModal"
              >
                Change Password
              </button>
            </div>
          </div>

          <div className="col-md-4 col-lg-3">
            <div className="card text-center p-3 dashboard-card">
              <h5 className="mb-3">Log Out</h5>
              <img
                src="https://st2.depositphotos.com/4103319/6625/i/950/depositphotos_66251761-stock-photo-logout-circular-icon-on-white.jpg"
                width="150"
                height="150"
                className="mx-auto mb-3"
                alt="Log out"
              />
              <button className="btn btn-danger w-100" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <div
        className="modal fade"
        id="changeModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change Password</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <form onSubmit={handleChangePassword} noValidate>
              <div className="modal-body">
                {passError && (
                  <div className="alert alert-danger py-2">{passError}</div>
                )}

                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  required
                  value={passData.email}
                  onChange={(e) =>
                    setPassData({ ...passData, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Old Password"
                  required
                  value={passData.oldpass}
                  onChange={(e) =>
                    setPassData({ ...passData, oldpass: e.target.value })
                  }
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                  required
                  value={passData.newpass}
                  onChange={(e) =>
                    setPassData({ ...passData, newpass: e.target.value })
                  }
                />
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary w-100">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
