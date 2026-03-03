import { Link, useNavigate } from "react-router-dom";
import "./../../../styles/header.css";
import { logout } from "../../../_services/auth";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = async () => {
    if (token) {
      await logout({token});
      localStorage.removeItem("userInfo");
    }
    navigate("/login")
  }

  return (
    <header className="navbar navbar-expand-lg bg-white fixed-top border-bottom shadow-sm">
      <div className="container-fluid px-4">
        {/* Toggler button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center fw-bold"
          style={{ color: "#0a2357" }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: "60px", marginRight: "6px" }}
          />
          EduEvent Pro
        </Link>

        {/* Navbar content */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <ul className="navbar-nav align-items-center mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link nav-link-custom">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link nav-link-custom">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/service" className="nav-link nav-link-custom">
                Service & Package
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link nav-link-custom">
                Contact
              </Link>
            </li>
          </ul>

          {/* Register & Login */}
          {token && userInfo ? (
            <>
              <Link
              to="/dashboard"
              className="btn"
              style={{
                backgroundColor: "#0a2357",
                color: "#fff",
                marginRight: "10px",
                marginLeft: "10px",
              }}
              >
                {userInfo.name}
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-danger fw-semibold px-4"
              >
                Logout
              </button>
            </>
          ):(

          <>
            <Link
              to="/login"
              className="btn"
              style={{
                backgroundColor: "#0a2357",
                color: "#fff",
                marginRight: "10px",
                marginLeft: "10px",
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn me-2"
              style={{
                border: "2px solid #0a2357",
                color: "#0a2357",
                backgroundColor: "transparent",
              }}
            >
              Register
            </Link>
          </>
          )}
        </div>
      </div>
    </header>
  );
}