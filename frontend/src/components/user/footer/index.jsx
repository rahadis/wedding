import { Link } from "react-router-dom";

export default function Footer() {
    return (
      <footer
        className="py-2 border-top d-flex flex-wrap justify-content-between align-items-center"
        style={{
          left: 0,
          bottom: 0,
          width: "100%",
          background: "#fff",
          zIndex: 100,
        }}
      >
        <div
          className="col-md-4 d-flex align-items-center mb-3 mb-md-0"
          style={{ paddingLeft: "20px" }}
        >
          <a
            href="/"
            className="me-2 text-body-secondary text-decoration-none lh-1 d-flex align-items-center"
          >
            <img
              src="/Event.png"
              alt="Event"
              style={{ height: "32px", marginRight: "8px" }}
            />
            <span className="ms-2" style={{ fontSize: "1rem", fontWeight: 500 }}>
              Event Pora
            </span>
          </a>
        </div>
        <ul className="nav justify-content-center col-md-4 mb-3 mb-md-0">
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-body-secondary">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link px-2 text-body-secondary">
                About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/service" className="nav-link px-2 text-body-secondary">
                Service & Package
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link px-2 text-body-secondary">
                Contact
            </Link>
          </li>
        </ul>
        <ul
          className="nav col-md-4 justify-content-end list-unstyled d-flex"
          style={{ paddingRight: "20px" }}
        >
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <i className="fa-brands fa-facebook fa-xl"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <i className="fa-brands fa-instagram fa-xl"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <i className="fa-brands fa-twitter fa-xl"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <i className="fa-brands fa-linkedin fa-xl"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <i className="fa-brands fa-youtube fa-xl"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <i className="fa-brands fa-tiktok fa-xl"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <i className="fa-brands fa-telegram fa-xl"></i>
            </a>
          </li>
        </ul>
        <p className="w-100 text-center text-body-secondary mt-2 mb-0">
          &copy; 2025 Event Pora
        </p>
      </footer>
    );
  }
  