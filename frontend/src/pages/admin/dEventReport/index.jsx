import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "../../../components/admin/sidebar";
import Topbar from "../../../components/admin/topbar";
import TableCard from "../../../components/admin/table";
import { getEventReports, deleteEventReport } from "../../../_services/eventReport";
import { useNavigate } from "react-router-dom";
import { storageUrl } from "../../../_api";

export default function DEventReport() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const navigate = useNavigate();

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Transaction ID", dataIndex: "transaction_id" },
    { title: "Evaluasi", dataIndex: "evaluation" },
    {
      title: "Dokumentasi",
      dataIndex: "documentation",
      render: (doc) =>
        doc ? (
          <img
            src={`${storageUrl}/${doc}`}
            alt="Dokumentasi"
            style={{ width: "80px" }}
          />
        ) : (
          "Tidak ada"
        ),
    },
    { title: "Tanggal", dataIndex: "created_at" },
  ];

  const fetchData = async () => {
    try {
        const data = await getEventReports();
        setReports(data);
    } catch (err) {
        console.error("Gagal mengambil data laporan:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleView = (report) => {
    setSelectedReport(report);
    setShowViewModal(true);
  };

  const handleEdit = (report) => {
    navigate(`/admin/event-report/${report.transaction_id}?edit=${report.id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus laporan ini?")) {
      try {
        await deleteEventReport(id);
        alert("Laporan berhasil dihapus");
        fetchData();
      } catch (err) {
        console.error(err);
        alert("Gagal menghapus laporan");
      }
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4">
          <TableCard
            title="Daftar Laporan Event"
            columns={columns}
            data={reports}
            renderAction={(report) => (
              <div className="d-flex gap-1">
                <button
                  className="btn btn-sm btn-info text-white"
                  title="Lihat"
                  onClick={() => handleView(report)}
                >
                  <FaEye />
                </button>
                <button
                  className="btn btn-sm btn-warning text-white"
                  title="Edit"
                  onClick={() => handleEdit(report)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-sm btn-danger text-white"
                  title="Hapus"
                  onClick={() => handleDelete(report.id)}
                >
                  <FaTrash />
                </button>
              </div>
            )}
          />
        </div>
      </div>

      {showViewModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detail Laporan Event</h5>
                <button type="button" className="btn-close" onClick={() => setShowViewModal(false)}></button>
              </div>
              <div className="modal-body">
                {selectedReport && (
                  <div>
                    <p><strong>ID Laporan:</strong> {selectedReport.id}</p>
                    <p><strong>ID Transaksi:</strong> {selectedReport.transaction_id}</p>
                    <p><strong>Evaluasi:</strong></p>
                    <div className="border p-2 bg-light mb-3" style={{ whiteSpace: "pre-wrap" }}>
                        {selectedReport.evaluation}
                    </div>
                    <p><strong>Dokumentasi:</strong></p>
                    {selectedReport.documentation ? (
                      <img
                        src={`${storageUrl}/${selectedReport.documentation}`}
                        alt="Dokumentasi"
                        style={{ maxWidth: "100%", borderRadius: "8px" }}
                      />
                    ) : (
                      <p className="text-muted italic">Tidak ada dokumentasi</p>
                    )}
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowViewModal(false)}>
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
