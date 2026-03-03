import React, { useState } from "react";
import {
  FaHome,
  FaDatabase,
  FaMoneyBill,
  FaCalendarAlt,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaGraduationCap,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { logout } from "../../../_services/auth";

export default function Sidebar() {
  const [openKelola, setOpenKelola] = useState(false);
  const [openTransaksi, setOpenTransaksi] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const handleLogout = async () => {
    if (token) {
      await logout();
    }
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className="text-white shadow-lg"
      style={{
        width: "260px",
        height: "calc(100vh - 40px)",
        margin: "20px",
        borderRadius: "20px",
        background: "linear-gradient(180deg, #0a2357 0%, #153e90 100%)",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
        zIndex: 1000,
      }}
    >
      <div className="mb-5 d-flex align-items-center gap-3">
        <div 
          className="bg-white rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: "45px", height: "45px" }}
        >
          <FaGraduationCap size={24} color="#0a2357" />
        </div>
        <h5 className="mb-0 fw-bold letter-spacing-1">EduEvent Pro</h5>
      </div>

      <ul className="nav flex-column gap-3 flex-grow-1">
        <li className="nav-item">
          <Link
            to="/admin/dashboard"
            className="text-white text-decoration-none d-flex align-items-center gap-3 p-2 rounded-3 hover-bg-light"
            style={{ transition: "all 0.3s" }}
          >
            <FaHome size={18} />
            <span>Dashboard</span>
          </Link>
        </li>

        <li className="nav-item">
          <div
            className="d-flex align-items-center gap-3 p-2 rounded-3 cursor-pointer"
            style={{ transition: "all 0.3s" }}
            onClick={() => setOpenKelola(!openKelola)}
          >
            <FaDatabase size={18} />
            <span>Kelola Data</span>
            <span style={{ marginLeft: "auto" }}>
              {openKelola ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
            </span>
          </div>

          {openKelola && (
            <ul className="nav flex-column mt-2 ms-4 gap-2 border-start border-white border-opacity-25 ps-3">
              <li className="nav-item">
                <Link to="/admin/users" className="text-white-50 text-decoration-none small hover-text-white">
                  Data Siswa/User
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/package" className="text-white-50 text-decoration-none small hover-text-white">
                  Program & Event
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/kategori" className="text-white-50 text-decoration-none small hover-text-white">
                  Kategori Layanan
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item">
          <div
            className="d-flex align-items-center gap-3 p-2 rounded-3 cursor-pointer"
            onClick={() => setOpenTransaksi(!openTransaksi)}
          >
            <FaMoneyBill size={18} />
            <span>Keuangan</span>
            <span style={{ marginLeft: "auto" }}>
              {openTransaksi ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
            </span>
          </div>

          {openTransaksi && (
            <ul className="nav flex-column mt-2 ms-4 gap-2 border-start border-white border-opacity-25 ps-3">
              <li className="nav-item">
                <Link to="/admin/transaksi" className="text-white-50 text-decoration-none small hover-text-white">
                  Daftar Pendaftaran
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/laporan" className="text-white-50 text-decoration-none small hover-text-white">
                  Laporan Pendapatan
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item">
          <Link 
            to="/admin/event" 
            className="text-white text-decoration-none d-flex align-items-center gap-3 p-2 rounded-3"
          >
            <FaCalendarAlt size={18} />
            <span>Jadwal Event</span>
          </Link>
        </li>
      </ul>

      <div
        className="mt-auto d-flex align-items-center gap-3 p-2 rounded-3 text-white-50 cursor-pointer hover-text-white"
        onClick={handleLogout}
      >
        <FaSignOutAlt size={18} />
        <span>Keluar Sistem</span>
      </div>
    </div>
  );
}
