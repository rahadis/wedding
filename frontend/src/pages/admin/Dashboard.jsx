import React, { useState, useEffect } from "react";
import { FaCalendarCheck, FaUsers, FaMoneyBill, FaChartLine } from "react-icons/fa";
import Sidebar from "../../components/admin/sidebar";
import StatCard from "../../components/admin/StatCard";
import { getDashboardStats, DUMMY_EVENTS, EVENT_TYPES } from "../../data/educationEvents";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [eventTypeStats, setEventTypeStats] = useState({});
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  useEffect(() => {
    // Simulate fetching data
    const dashboardStats = getDashboardStats();
    setStats(dashboardStats);

    // Calculate event type breakdown
    const breakdown = {};
    Object.keys(EVENT_TYPES).forEach((key) => {
      const type = EVENT_TYPES[key];
      const count = DUMMY_EVENTS.filter(
        (e) => e.event_type === type.id
      ).length;
      breakdown[key] = count;
    });
    setEventTypeStats(breakdown);
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-education-light">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-education-primary mb-1">
            Selamat Datang, {userInfo?.name || "Admin"}
          </h1>
          <p className="text-gray-600">
            Kelola semua acara pendidikan Anda dari dashboard ini
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Main Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={FaCalendarCheck}
              title="Total Event"
              count={stats.totalEvents}
              trend={15}
              isPositive={true}
            />
            <StatCard
              icon={FaUsers}
              title="Total Peserta"
              count={stats.totalPeserta}
              trend={24}
              isPositive={true}
            />
            <StatCard
              icon={FaMoneyBill}
              title="Total Pendapatan"
              count={`Rp ${(stats.totalPendapatan / 1000000).toFixed(1)}M`}
              trend={18}
              isPositive={true}
            />
            <StatCard
              icon={FaChartLine}
              title="Transaksi Berhasil"
              count={`${stats.conversionRate}%`}
              trend={8}
              isPositive={true}
            />
          </div>

          {/* Event Type Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-education-primary mb-6">
              Breakdown Event Berdasarkan Jenis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(EVENT_TYPES).map(([key, type]) => (
                <div
                  key={key}
                  className="p-4 rounded-lg border-2"
                  style={{ borderColor: type.color }}
                >
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <h3 className="font-bold text-sm mb-1">{type.name}</h3>
                  <p className="text-2xl font-bold text-education-primary">
                    {eventTypeStats[key] || 0}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">event aktif</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Events */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-education-primary">
                Event Terbaru
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="table-header">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs">Event</th>
                    <th className="px-6 py-4 text-left text-xs">Jenis</th>
                    <th className="px-6 py-4 text-left text-xs">Tanggal</th>
                    <th className="px-6 py-4 text-left text-xs">Peserta</th>
                    <th className="px-6 py-4 text-left text-xs">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {DUMMY_EVENTS.slice(0, 5).map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-education-primary">
                          {event.event_name}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium">
                          {EVENT_TYPES[Object.keys(EVENT_TYPES).find((k) => EVENT_TYPES[k].id === event.event_type)]?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {event.transaction_date}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold">
                        {event.guest_count}/{event.target_peserta}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            event.status === "Paid"
                              ? "badge-success"
                              : event.status === "Waiting verification"
                              ? "badge-warning"
                              : "badge-danger"
                          }`}
                        >
                          {event.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
