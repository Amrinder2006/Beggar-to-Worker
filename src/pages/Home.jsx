import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, login, adminLogin } from "../services/authService";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();


  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    userType: "",
  });
  const [signupError, setSignupError] = useState("");

  
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  
  const [adminData, setAdminData] = useState({ email: "", password: "" });
  const [adminError, setAdminError] = useState("");

  function closeModal(id) {
    const modalact = document.getElementById(id);
    const instance = window.bootstrap?.Modal.getInstance(modalact);
    instance?.hide();
  }

  async function handleSignup(e) {
    e.preventDefault();
    setSignupError("");

    try {
      const resp = await signup(signupData);
      alert(resp);
      closeModal("signupModal");
    } catch {
      setSignupError("Error occurred while creating account.");
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    try {
      const resp = await login(loginData);
      localStorage.setItem("activeuser", loginData.email);

      if (resp === "Volunteer") {
        navigate("/voldash");
      } else if (resp === "Citizen") {
        navigate("/citizendash");
      } else {
        alert(resp);
      }
    } catch {
      setLoginError("Error occurred during login.");
    }
  }

  async function handleAdminLogin(e) {
    e.preventDefault();
    setAdminError("");

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    try {
      const resp = await adminLogin(adminData);
      if (resp === "Valid") {
        navigate("/admindash");
      } else {
        setAdminError("Invalid Credentials");
      }
    } catch {
      setAdminError("Error occurred during admin login.");
    }
  }

  return (
    <div className="home-page">
      
      <nav className="navbar main-navbar">
        <div className="container-fluid px-3 px-md-4">
          <a href="/" className="brand">
            <img
              src="https://image2url.com/r2/default/images/1771851558508-3b4fd333-800f-48c2-99a3-6f3421bb38be.png"
              alt="Beggar 2 Worker logo"
            />
            <span>Workers Union</span>
          </a>

          <div className="nav-actions">
            <button className="nav-btn signup" data-bs-toggle="modal" data-bs-target="#signupModal">
              Signup
            </button>
            <button className="nav-btn" data-bs-toggle="modal" data-bs-target="#loginModal">
              Login
            </button>
            <button className="nav-btn" data-bs-toggle="modal" data-bs-target="#AdminModal">
              Admin
            </button>
          </div>
        </div>
      </nav>

      
      <section className="hero-section">
        <div id="carouselExampleControls" className="carousel slide hero-carousel" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://www.image2url.com/r2/default/images/1790869220826-88c76b51-4c31-417f-b898-b89c45e71f6b.png"
                alt="Beggar 2 Worker"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.image2url.com/r2/default/images/1790869514707-ac691a41-6524-455a-a2e9-da80e2b181d1.png"
                alt="Beggar 2 Worker services"
              />
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>

      
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Helping individuals identify their skills, discover employment opportunities, and move toward a more
            stable and independent future.
          </p>
          <div className="section-heading-line"></div>

          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-image-wrapper">
                  <img
                    src="https://img.freepik.com/premium-vector/skills-icon-with-research-sign-skills-icon-explore-find-inspect-symbol-vector-icon_775815-967.jpg?w=2000"
                    alt="Skill Identification"
                  />
                </div>
                <div className="service-content">
                  <h3>Skill Identification</h3>
                  <p>
                    We help identify hidden talents and skills in individuals, enabling them to move beyond begging
                    and explore meaningful job opportunities.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-image-wrapper">
                  <img
                    src="https://cdn0.iconfinder.com/data/icons/aami-web-internet/64/aami15-31-1024.png"
                    alt="Job Opportunities"
                  />
                </div>
                <div className="service-content">
                  <h3>Job Opportunities</h3>
                  <p>
                    Our platform connects individuals with small jobs, daily wage work, and local employment options
                    to help them earn with dignity.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mx-md-auto">
              <div className="service-card">
                <div className="service-image-wrapper">
                  <img
                    src="https://image2url.com/r2/default/images/1774957116402-1ee78151-c081-46d9-b31b-bd291304a689.png"
                    alt="Rehabilitation Support"
                  />
                </div>
                <div className="service-content">
                  <h3>Rehabilitation Support</h3>
                  <p>
                    We provide guidance, resources, and support to help individuals transition into a stable
                    lifestyle and become self-reliant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="section section-light">
        <div className="container">
          <h2 className="section-title">Meet Our Developer</h2>
          <p className="section-subtitle">The person behind the development and implementation of the platform.</p>
          <div className="section-heading-line"></div>

          <div className="developer-card">
            <div className="row align-items-center g-5">
              <div className="col-md-5 text-center">
                <img
                  src="https://image2url.com/r2/default/images/1774958017927-14f19e2d-95c1-4402-a8bb-ac8d87f7591e.jpeg"
                  className="developer-image"
                  alt="Amrinder Singh"
                />
              </div>

              <div className="col-md-7">
                <h3 className="developer-name">Amrinder Singh</h3>
                <div className="developer-info">
                  <p><strong>Age:</strong> 20</p>
                  <p><strong>Contact:</strong> +91-9779652928</p>
                  <p>
                    <strong>Role:</strong> <span className="role-badge">Full Stack Developer</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="section">
        <div className="container">
          <h2 className="section-title">Reach Us</h2>
          <p className="section-subtitle">Find us at our location.</p>
          <div className="section-heading-line"></div>

          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d558.5561204654421!2d74.95767490394852!3d30.2160013378193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391732b038353191%3A0x2ec172b19aeaef9f!2s12123%2C%20Guru%20Teg%20Bahadar%20Nagar%2C%20Shaibzada%20Jujhar%20Singh%20Nagar%2C%20Bathinda%2C%20Punjab%20151001!5e0!3m2!1sen!2sin!4v1767078189553!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our location"
            ></iframe>
          </div>
        </div>
      </section>

      
      <section className="section contact-section">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">Get in touch with us for more information.</p>
          <div className="section-heading-line"></div>

          <div className="row justify-content-center g-4">
            <div className="col-md-5 col-lg-4">
              <div className="contact-card text-center">
                <div className="contact-icon phone-icon">☎</div>
                <h3>Phone</h3>
                <p>+91-9779652928</p>
              </div>
            </div>

            <div className="col-md-5 col-lg-4">
              <div className="contact-card text-center">
                <div className="contact-icon email-icon">✉</div>
                <h3>Email</h3>
                <p>support@workerunion.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <footer className="footer">
        <div className="container text-center">
          <h3 className="footer-title">Worker Union</h3>
          <p className="footer-description">
            Empowering individuals to meaningful work through opportunities, support, and
            dignity-driven initiatives.
          </p>
          <div className="footer-divider"></div>
          <p className="copyright mb-0">© Worker Union. All rights reserved.</p>
        </div>
      </footer>

      
      <div className="modal fade" id="signupModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Account</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <form onSubmit={handleSignup} noValidate>
              <div className="modal-body">
                {signupError && <div className="alert alert-danger py-2">{signupError}</div>}

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Username"
                  required
                  value={signupData.username}
                  onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                />
                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  required
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                />
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  required
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                />
                <select
                  className="form-select"
                  required
                  value={signupData.userType}
                  onChange={(e) => setSignupData({ ...signupData, userType: e.target.value })}
                >
                  <option value="" disabled>Select User Type</option>
                  <option value="Volunteer">Worker</option>
                  <option value="Citizen">Citizen</option>
                </select>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary modal-submit w-100">
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      
      <div className="modal fade" id="loginModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <form onSubmit={handleLogin} noValidate>
              <div className="modal-body">
                {loginError && <div className="alert alert-danger py-2">{loginError}</div>}

                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary modal-submit w-100">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

     
      <div className="modal fade" id="AdminModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Admin Login</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <form onSubmit={handleAdminLogin} noValidate>
              <div className="modal-body">
                {adminError && <div className="alert alert-danger py-2">{adminError}</div>}

                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Admin Email"
                  required
                  value={adminData.email}
                  onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                  value={adminData.password}
                  onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                />
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary modal-submit w-100">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
