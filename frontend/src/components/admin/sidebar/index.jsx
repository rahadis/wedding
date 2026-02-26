import React, { useState } from "react";
import {
  FaHome,
  FaDatabase,
  FaMoneyBill,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { logout } from "../../../_services/auth";

export default function Sidebar() {
  const [openKelola, setOpenKelola] = useState(false);
  const [openTransaksi, setOpenTransaksi] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = async () => {
    if (token) {
      await logout({ token, userInfo });
    }
    navigate("/login");
  };

  return (
    <div
      className="text-white"
      style={{
        width: "250px",
        height: "calc(100vh - 40px)",
        marginTop: "20px",
        marginLeft: "20px",
        marginBottom: "20px",
        borderRadius: "15px",
        background: "#033b5d",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <h4 className="mb-4 d-flex align-items-center justify-content-start gap-2">
        <img
          src="/logo.png"
          alt="Profile"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid white",
          }}
        />
        Event Pora
      </h4>

      <ul className="nav flex-column gap-2">
        <li className="nav-item d-flex align-items-center gap-2">
          <FaHome />
          <Link
            to="/admin/dashboard"
            className="text-white text-decoration-none"
          >
            Dashboard
          </Link>
        </li>

        <li className="nav-item position-relative">
          <div
            className="d-flex align-items-center gap-2"
            style={{ cursor: "pointer" }}
            onClick={() => setOpenKelola(!openKelola)}
          >
            <FaDatabase /> Kelola data
            <span style={{ marginLeft: "auto" }}>
              {openKelola ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>

          {openKelola && (
            <div
              style={{
                position: "relative",
                paddingLeft: "16px",
                marginTop: "8px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "4px",
                  top: 0,
                  bottom: 0,
                  width: "2px",
                  backgroundColor: "white",
                  borderRadius: "2px",
                }}
              />
              <ul className="nav flex-column mt-2 gap-1">
                <li className="nav-item" style={{ paddingLeft: "12px" }}>
                  <Link
                    to="/admin/users"
                    className="text-white text-decoration-none"
                  >
                    Data Users
                  </Link>
                </li>
                <li className="nav-item" style={{ paddingLeft: "12px" }}>
                  <Link
                    to="/admin/admin"
                    className="text-white text-decoration-none"
                  >
                    Data Admin
                  </Link>
                </li>
                <li className="nav-item" style={{ paddingLeft: "12px" }}>
                  <Link
                    to="/admin/kategori"
                    className="text-white text-decoration-none"
                  >
                    Data Kategori
                  </Link>
                </li>
                <li className="nav-item" style={{ paddingLeft: "12px" }}>
                  <Link
                    to="/admin/package"
                    className="text-white text-decoration-none"
                  >
                    Data Package
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </li>

        <li className="nav-item position-relative">
          <div
            className="d-flex align-items-center gap-2"
            style={{ cursor: "pointer" }}
            onClick={() => setOpenTransaksi(!openTransaksi)}
          >
            <FaMoneyBill /> Transaksi
            <span style={{ marginLeft: "auto" }}>
              {openTransaksi ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>

          {openTransaksi && (
            <div
              style={{
                position: "relative",
                paddingLeft: "16px",
                marginTop: "8px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "4px",
                  top: 0,
                  bottom: 0,
                  width: "2px",
                  backgroundColor: "white",
                  borderRadius: "2px",
                }}
              />
              <ul className="nav flex-column mt-2 gap-1">
                <li className="nav-item" style={{ paddingLeft: "12px" }}>
                  <Link
                    to="/admin/transaksi"
                    className="text-white text-decoration-none"
                  >
                    Daftar Transaksi
                  </Link>
                </li>
                <li className="nav-item" style={{ paddingLeft: "12px" }}>
                  <Link
                    to="/admin/laporan"
                    className="text-white text-decoration-none"
                  >
                    Laporan Konfirmasi
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </li>

        <li className="nav-item d-flex align-items-center gap-2">
          <FaCalendarAlt />
          <Link 
            to="/admin/event" 
            className="text-white text-decoration-none"
          >
            Event
          </Link>
        </li>
      </ul>

      <div
        className="mt-auto d-flex align-items-center gap-2"
        style={{ cursor: "pointer" }}
        onClick={handleLogout}
      >
        <FaSignOutAlt /> Keluar
      </div>
    </div>
  );
}
