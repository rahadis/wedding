import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaEye, FaFilter, FaSearch } from "react-icons/fa";
import Sidebar from "../../components/admin/sidebar";
import { EVENT_TYPES, DUMMY_EVENTS } from "../../data/educationEvents";

export default function EventManagement() {
  const [events, setEvents] = useState(DUMMY_EVENTS);
  const [viewMode, setViewMode] = useState("table");
  const [selectedType, setSelectedType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = events.filter((event) => {
    const matchesType = !selectedType || event.event_type === selectedType;
    const matchesSearch = event.event_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleViewDetail = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus event ini?")) {
      setEvents(events.filter((e) => e.id !== id));
    }
  };

  const getEventTypeInfo = (typeId) => {
    return Object.values(EVENT_TYPES).find((e) => e.id === typeId);
  };

  const getStatusBadgeColor = (status) => {
    if (status === "Paid") return "badge-success";
    if (status === "Waiting verification") return "badge-warning";
    return "badge-danger";
  };

  return (
    <div className="flex h-screen bg-education-light">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-start gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-education-primary mb-1">
                Manajemen Event Pendidikan
              </h1>
              <p className="text-gray-600">
                Kelola semua acara pendidikan dan peserta Anda dengan mudah
              </p>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <FaPlus className="w-4 h-4" />
              Buat Event Baru
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari event atau paket..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Event Type Filter Cards */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-education-primary mb-4">
              Jenis Event
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(EVENT_TYPES).map(([key, type]) => (
                <button
                  key={key}
                  onClick={() =>
                    setSelectedType(selectedType === type.id ? null : type.id)
                  }
                  className={`p-4 rounded-xl transition-all duration-300 text-center ${
                    selectedType === type.id
                      ? "bg-white border-2 shadow-lg"
                      : "bg-white border border-gray-200 hover:shadow-md"
                  }`}
                  style={{
                    borderColor:
                      selectedType === type.id ? type.color : "inherit",
                  }}
                >
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <h3 className="font-bold text-sm mb-1">{type.name}</h3>
                  <p className="text-xs text-gray-600 leading-tight">
                    {type.fullName}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                viewMode === "table"
                  ? "bg-education-primary text-white"
                  : "bg-gray-100 text-education-primary hover:bg-gray-200"
              }`}
            >
              Tampilan Tabel
            </button>
            <button
              onClick={() => setViewMode("card")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                viewMode === "card"
                  ? "bg-education-primary text-white"
                  : "bg-gray-100 text-education-primary hover:bg-gray-200"
              }`}
            >
              Tampilan Kartu
            </button>
          </div>

          {/* Table View */}
          {viewMode === "table" ? (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="table-header">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs">Event</th>
                      <th className="px-6 py-4 text-left text-xs">Paket</th>
                      <th className="px-6 py-4 text-left text-xs">Durasi</th>
                      <th className="px-6 py-4 text-left text-xs">Target</th>
                      <th className="px-6 py-4 text-left text-xs">Harga</th>
                      <th className="px-6 py-4 text-left text-xs">Status</th>
                      <th className="px-6 py-4 text-left text-xs">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((event) => (
                        <tr
                          key={event.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">
                                {getEventTypeInfo(event.event_type)?.icon}
                              </div>
                              <div>
                                <p className="font-semibold text-education-primary">
                                  {event.event_name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {getEventTypeInfo(event.event_type)?.fullName}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">
                            {event.package}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {event.duration}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold">
                            {event.guest_count}/{event.target_peserta}
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-education-accent">
                            Rp {event.harga.toLocaleString("id-ID")}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(event.status)}`}>
                              {event.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleViewDetail(event)}
                                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                title="Lihat Detail"
                              >
                                <FaEye className="w-4 h-4" />
                              </button>
                              <button className="p-2 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-200 transition-colors" title="Edit">
                                <FaEdit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(event.id)}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                title="Hapus"
                              >
                                <FaTrash className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                          Tidak ada event yang sesuai dengan filter
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Card View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="card card-hover flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-3xl mb-2">
                        {getEventTypeInfo(event.event_type)?.icon}
                      </p>
                      <h3 className="font-bold text-education-primary mb-1">
                        {event.event_name}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {event.package}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-3 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">
                        Durasi
                      </p>
                      <p className="text-sm text-gray-700">{event.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">
                        Peserta
                      </p>
                      <p className="text-sm text-gray-700">
                        {event.guest_count}/{event.target_peserta} pendaftar
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">
                        Harga
                      </p>
                      <p className="text-lg font-bold text-education-accent">
                        Rp {event.harga.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetail(event)}
                      className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm"
                    >
                      <FaEye className="w-4 h-4" />
                      Detail
                    </button>
                    <button className="px-3 btn-secondary">
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="px-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && selectedEvent && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-education-primary to-education-secondary text-white p-6">
              <h2 className="text-2xl font-bold mb-1">
                {selectedEvent.event_name}
              </h2>
              <p className="text-white/80 text-sm">
                {getEventTypeInfo(selectedEvent.event_type)?.fullName}
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                    Paket
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedEvent.package}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                    Durasi
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedEvent.duration}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                    Peserta
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedEvent.guest_count}/{selectedEvent.target_peserta}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                    Harga
                  </p>
                  <p className="text-lg font-bold text-education-accent">
                    Rp {selectedEvent.harga.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">
                  Status
                </p>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeColor(selectedEvent.status)}`}>
                  {selectedEvent.status}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4 flex gap-3">
                <button className="flex-1 btn-primary">Edit Event</button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
