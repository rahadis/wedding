import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../../components/admin/sidebar";
import Topbar from "../../../components/admin/topbar";
import TableCard from "../../../components/admin/table";
import { getTransactions } from "../../../_services/transaction";

// Dummy education event data
const educationEventTypes = [
  {
    id: 1,
    name: "MPLS",
    fullName: "Masa Pengenalan Lingkungan Sekolah",
    color: "#0066cc",
    icon: "📚",
    count: 12,
  },
  {
    id: 2,
    name: "LDKMS",
    fullName: "Latihan Dasar Kepemimpinan Mahasiswa",
    color: "#00b4d8",
    icon: "👥",
    count: 8,
  },
  {
    id: 3,
    name: "Bimbel SNBT",
    fullName: "Bimbingan Belajar Seleksi Nasional",
    color: "#48cae4",
    icon: "📖",
    count: 15,
  },
  {
    id: 4,
    name: "Seminar",
    fullName: "Seminar Pendidikan",
    color: "#90e0ef",
    icon: "🎤",
    count: 6,
  },
  {
    id: 5,
    name: "Outbond",
    fullName: "Kegiatan Outbound Tim",
    color: "#10b981",
    icon: "🏕️",
    count: 4,
  },
];

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("table"); // table or card
  const [selectedType, setSelectedType] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsData = await getTransactions();
        setEvents(transactionsData);
        setFilteredEvents(transactionsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTypeFilter = (typeId) => {
    setSelectedType(selectedType === typeId ? null : typeId);
    if (selectedType === typeId) {
      setFilteredEvents(events);
    } else {
      // Filter by type (simplified for demo)
      setFilteredEvents(events);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Nama Event", dataIndex: "event_name" },
    { title: "Total Peserta", dataIndex: "guest_count" || "0" },
    { title: "Status", dataIndex: "status" },
    { title: "Tanggal", dataIndex: "transaction_date" },
  ];

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4" style={{ backgroundColor: "#f5f7fa", minHeight: "calc(100vh - 120px)" }}>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <h2 style={{ color: "#001f3f", fontWeight: "700", marginBottom: "4px" }}>
                Manajemen Event Pendidikan
              </h2>
              <p style={{ color: "#6c757d", fontSize: "14px", margin: 0 }}>
                Kelola semua acara pendidikan dan peserta Anda
              </p>
            </div>
            <button
              className="btn"
              style={{
                backgroundColor: "#001f3f",
                color: "#ffffff",
                fontWeight: "600",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#003d7a";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 31, 63, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#001f3f";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <FaPlus size={16} />
              Buat Event Baru
            </button>
          </div>

          {/* Event Type Filter Cards */}
          <div className="row g-3 mb-4">
            {educationEventTypes.map((type) => (
              <div key={type.id} className="col-md-6 col-lg-4 col-xl-2.4">
                <div
                  onClick={() => handleTypeFilter(type.id)}
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    backgroundColor: selectedType === type.id ? type.color : "#ffffff",
                    border: selectedType === type.id ? "2px solid" + type.color : "1px solid #e5e7eb",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedType !== type.id) {
                      e.currentTarget.style.backgroundColor = "#f5f7fa";
                      e.currentTarget.style.borderColor = type.color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedType !== type.id) {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                      e.currentTarget.style.borderColor = "#e5e7eb";
                    }
                  }}
                >
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>
                    {type.icon}
                  </div>
                  <h6
                    style={{
                      color: selectedType === type.id ? "#ffffff" : "#001f3f",
                      fontWeight: "700",
                      marginBottom: "4px",
                      fontSize: "13px",
                    }}
                  >
                    {type.name}
                  </h6>
                  <p
                    style={{
                      color: selectedType === type.id ? "rgba(255,255,255,0.8)" : "#6c757d",
                      fontSize: "11px",
                      margin: "4px 0 8px 0",
                    }}
                  >
                    {type.fullName}
                  </p>
                  <span
                    style={{
                      display: "inline-block",
                      backgroundColor: selectedType === type.id ? "rgba(255,255,255,0.3)" : "#f0f4f8",
                      color: selectedType === type.id ? "#ffffff" : "#001f3f",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {type.count} event
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* View Toggle */}
          <div className="d-flex gap-2 mb-4">
            <button
              className="btn btn-sm"
              style={{
                backgroundColor: view === "table" ? "#001f3f" : "#ffffff",
                color: view === "table" ? "#ffffff" : "#001f3f",
                border: "1px solid #e5e7eb",
                fontWeight: "600",
                padding: "8px 16px",
              }}
              onClick={() => setView("table")}
            >
              Tampilan Tabel
            </button>
            <button
              className="btn btn-sm"
              style={{
                backgroundColor: view === "card" ? "#001f3f" : "#ffffff",
                color: view === "card" ? "#ffffff" : "#001f3f",
                border: "1px solid #e5e7eb",
                fontWeight: "600",
                padding: "8px 16px",
              }}
              onClick={() => setView("card")}
            >
              Tampilan Kartu
            </button>
          </div>

          {/* Events Table */}
          {view === "table" ? (
            <TableCard
              title="Daftar Event"
              columns={columns}
              data={filteredEvents}
              renderAction={(event) => (
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm"
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#0066cc",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    title="Lihat Detail"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#003d7a")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#0066cc")
                    }
                  >
                    <FaEye size={14} />
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#f59e0b",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    title="Edit"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#d97706")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f59e0b")
                    }
                  >
                    <FaEdit size={14} />
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#ef4444",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    title="Hapus"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#dc2626")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#ef4444")
                    }
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              )}
            />
          ) : (
            <div className="row g-3">
              {filteredEvents.slice(0, 6).map((event) => (
                <div key={event.id} className="col-md-6 col-lg-4">
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "12px",
                      padding: "16px",
                      border: "1px solid #e5e7eb",
                      transition: "all 0.3s ease",
                      height: "100%",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 12px 24px rgba(0, 31, 63, 0.15)";
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <h5
                      style={{
                        color: "#001f3f",
                        fontWeight: "700",
                        marginBottom: "8px",
                      }}
                    >
                      {event.event_name}
                    </h5>
                    <p
                      style={{
                        color: "#6c757d",
                        fontSize: "13px",
                        margin: "8px 0",
                      }}
                    >
                      <strong>Tanggal:</strong> {event.transaction_date}
                    </p>
                    <p
                      style={{
                        color: "#6c757d",
                        fontSize: "13px",
                        margin: "8px 0",
                      }}
                    >
                      <strong>Status:</strong>{" "}
                      <span
                        style={{
                          backgroundColor:
                            event.status === "Paid" ? "#10b981" : "#f59e0b",
                          color: "#ffffff",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          fontSize: "11px",
                        }}
                      >
                        {event.status}
                      </span>
                    </p>
                    <div className="d-flex gap-2 mt-3">
                      <button
                        className="btn btn-sm flex-grow-1"
                        style={{
                          backgroundColor: "#0066cc",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "12px",
                        }}
                      >
                        <FaEye size={12} className="me-1" />
                        Detail
                      </button>
                      <button
                        className="btn btn-sm flex-grow-1"
                        style={{
                          backgroundColor: "#f59e0b",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "12px",
                        }}
                      >
                        <FaEdit size={12} className="me-1" />
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
