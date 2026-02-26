import { FaBell, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom"; // ⬅️ Penting!

export default function Topbar() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div
      className="d-flex justify-content-between align-items-center p-3 bg-white shadow-sm"
      style={{
        marginTop: "20px",
        marginRight: "20px",
        marginLeft: "20px",
        borderRadius: "15px",
      }}
    >
      <div className="input-group w-50">
        <input type="text" className="form-control" placeholder="Search here" />
        <span className="input-group-text">
          <FaSearch />
        </span>
      </div>

      <div className="d-flex align-items-center gap-3">
        <Link
          to="/admin/admin"
          className="btn me-2"
          style={{
            border: "2px solid #014AB0",
            color: "#014AB0",
            backgroundColor: "transparent",
          }}
        >
          {userInfo.name}
        </Link>

        <img
          src="https://nolae.eu/cdn/shop/articles/jake-enhypen-profil-873307.jpg?v=1722887800&width=1920"
          className="rounded-circle"
          alt="Profile"
          width="40"
          height="40"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/40"; // Fallback jika error
          }}
        />
      </div>
    </div>
  );
}
