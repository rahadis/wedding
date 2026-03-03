import { FaBell, FaSearch, FaUser } from "react-icons/fa";
import { useState } from "react";

export default function TopBar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari event..."
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <div className="relative">
            <button className="relative p-2 text-gray-600 hover:text-education-primary transition-colors">
              <FaBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200"></div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-education-primary to-education-secondary text-white flex items-center justify-center font-bold">
              {userInfo?.name?.charAt(0) || "A"}
            </div>
            <div className="hidden sm:block">
              <p className="font-semibold text-gray-800 text-sm">
                {userInfo?.name || "Admin"}
              </p>
              <p className="text-xs text-gray-600">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
