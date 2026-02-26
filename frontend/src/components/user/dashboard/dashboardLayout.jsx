import { Outlet, useLocation, useNavigate, Navigate } from "react-router-dom";
import "../../../styles/Dashboard.css";

// Icon SVG
const CloudIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

const UserIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const FileTextIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10,9 9,9 8,9" />
  </svg>
);

const BellIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const HomeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 9l9-7 9 7" />
    <path d="M9 22V12h6v10" />
  </svg>
);

// Sidebar Component
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: "Profil Saya", key: "profile", icon: UserIcon },
    { name: "Riwayat Transaksi", key: "transaksi", icon: FileTextIcon },
    { name: "Kembali ke halaman utama", key: "", icon: HomeIcon },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <CloudIcon />
        <span className="sidebar-title">My Dashboard</span>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navigation.map((item) => {
            const isActive =
              item.key === ""
                ? location.pathname === "/"
                : location.pathname.includes(`/dashboard/${item.key}`);

            const IconComponent = item.icon;

            return (
              <li key={item.key} className="nav-item">
                <button
                  onClick={() => {
                    if (item.key === "") {
                      navigate("/");
                    } else {
                      navigate(`/dashboard/${item.key}`);
                    }
                  }}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  <IconComponent />
                  <span>{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

// Main Dashboard Layout
const DashboardLayout = () => {
  const location = useLocation();

  // Redirect default /dashboard ke /dashboard/profile
  if (location.pathname === "/dashboard") {
    return <Navigate to="/dashboard/profile" replace />;
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
