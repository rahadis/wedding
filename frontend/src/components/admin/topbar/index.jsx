import { FaBell, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Topbar() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div
      className="d-flex justify-content-between align-items-center p-4 bg-white"
      style={{
        marginTop: "20px",
        marginRight: "20px",
        marginLeft: "20px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
      }}
    >
      <div className="input-group" style={{ maxWidth: "400px" }}>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Cari event atau peserta..." 
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px 0 0 8px",
            padding: "10px 14px",
            fontSize: "14px"
          }}
        />
        <span 
          className="input-group-text"
          style={{
            backgroundColor: "#f5f7fa",
            border: "1px solid #e5e7eb",
            borderRadius: "0 8px 8px 0",
            color: "#6c757d"
          }}
        >
          <FaSearch size={16} />
        </span>
      </div>

      <div className="d-flex align-items-center gap-4">
        <div 
          className="position-relative"
          style={{ cursor: "pointer", transition: "all 0.3s ease" }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
        >
          <FaBell size={20} style={{ color: "#001f3f" }} />
          <span 
            style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              backgroundColor: "#ef4444",
              color: "#ffffff",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "600"
            }}
          >
            3
          </span>
        </div>

        <div style={{ width: "1px", height: "24px", backgroundColor: "#e5e7eb" }} />

        <Link
          to="/admin/admin"
          className="text-decoration-none"
          style={{
            padding: "8px 14px",
            borderRadius: "8px",
            backgroundColor: "#f5f7fa",
            color: "#001f3f",
            fontWeight: "600",
            fontSize: "14px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#001f3f";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#f5f7fa";
            e.currentTarget.style.color = "#001f3f";
          }}
        >
          {userInfo?.name || "Admin"}
        </Link>

        <img
          src={userInfo?.avatar || "https://via.placeholder.com/40"}
          className="rounded-circle"
          alt="Profile"
          width="40"
          height="40"
          style={{
            border: "2px solid #e5e7eb",
            objectFit: "cover",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#001f3f";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 31, 63, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#e5e7eb";
            e.currentTarget.style.boxShadow = "none";
          }}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/40";
          }}
        />
      </div>
    </div>
  );
}
