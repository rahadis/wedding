import React, { useState } from "react";
import {
  FaHome,
  FaDatabase,
  FaMoneyBill,
  FaCalendarAlt,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../../_services/auth";

export default function Sidebar() {
  const [openKelola, setOpenKelola] = useState(false);
  const [openTransaksi, setOpenTransaksi] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const handleLogout = async () => {
    if (token) {
      await logout({ token, userInfo });
    }
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-gradient-to-b from-education-primary to-education-secondary text-white h-screen fixed left-0 top-0 shadow-lg flex flex-col overflow-hidden">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
            P
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-base text-white leading-tight">Pendidikan</h2>
            <p className="text-xs text-white/70">Event Manager</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {/* Dashboard */}
        <Link
          to="/admin/dashboard"
          className={`sidebar-item flex items-center gap-3 ${
            isActive("/admin/dashboard") ? "bg-white/20" : ""
          }`}
        >
          <FaHome className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>

        {/* Manajemen Event */}
        <Link
          to="/admin/event"
          className={`sidebar-item flex items-center gap-3 ${
            isActive("/admin/event") ? "bg-white/20" : ""
          }`}
        >
          <FaCalendarAlt className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">Manajemen Event</span>
        </Link>

        {/* Data Master */}
        <div>
          <button
            onClick={() => setOpenKelola(!openKelola)}
            className="sidebar-item flex items-center justify-between w-full gap-3"
          >
            <div className="flex items-center gap-3">
              <FaDatabase className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">Data Master</span>
            </div>
            {openKelola ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />}
          </button>
          {openKelola && (
            <div className="ml-8 mt-2 space-y-2 border-l border-white/20 pl-4">
              <Link 
                to="/admin/users" 
                className="block text-sm text-white/80 hover:text-white transition-colors py-1"
              >
                Data Users
              </Link>
              <Link 
                to="/admin/admin" 
                className="block text-sm text-white/80 hover:text-white transition-colors py-1"
              >
                Data Admin
              </Link>
              <Link 
                to="/admin/kategori" 
                className="block text-sm text-white/80 hover:text-white transition-colors py-1"
              >
                Data Kategori
              </Link>
              <Link 
                to="/admin/package" 
                className="block text-sm text-white/80 hover:text-white transition-colors py-1"
              >
                Data Package
              </Link>
            </div>
          )}
        </div>

        {/* Transaksi */}
        <div>
          <button
            onClick={() => setOpenTransaksi(!openTransaksi)}
            className="sidebar-item flex items-center justify-between w-full gap-3"
          >
            <div className="flex items-center gap-3">
              <FaMoneyBill className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">Transaksi</span>
            </div>
            {openTransaksi ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />}
          </button>
          {openTransaksi && (
            <div className="ml-8 mt-2 space-y-2 border-l border-white/20 pl-4">
              <Link 
                to="/admin/transaksi" 
                className="block text-sm text-white/80 hover:text-white transition-colors py-1"
              >
                Daftar Transaksi
              </Link>
              <Link 
                to="/admin/laporan" 
                className="block text-sm text-white/80 hover:text-white transition-colors py-1"
              >
                Laporan Konfirmasi
              </Link>
              <Link 
                to="/admin/event-reports" 
                className="block text-sm text-white/80 hover:text-white transition-colors py-1"
              >
                Laporan Event
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium"
        >
          <FaSignOutAlt className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </div>
  );
}
