import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/admin/sidebar";
import Topbar from "../../../components/admin/topbar";
import { createEventReport, getEventReport, updateEventReport } from "../../../_services/eventReport";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { storageUrl } from "../../../_api";

export default function EventReportForm() {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [evaluation, setEvaluation] = useState("");
  const [documentation, setDocumentation] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [reportId, setReportId] = useState(null);

  useEffect(() => {
    // Check if we are editing
    const searchParams = new URLSearchParams(location.search);
    const editId = searchParams.get("edit");
    
    if (editId) {
      setIsEdit(true);
      setReportId(editId);
      fetchReport(editId);
    }
  }, [location]);

  const fetchReport = async (id) => {
    try {
      const report = await getEventReport(id);
      setEvaluation(report.evaluation);
      if (report.documentation) {
        setPreviewImage(`${storageUrl}/${report.documentation}`);
      }
    } catch (err) {
      console.error("Gagal mengambil data laporan:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append("evaluation", evaluation);
      if (documentation) {
        payload.append("documentation", documentation);
      }

      if (isEdit) {
        await updateEventReport(reportId, payload);
        alert("Laporan berhasil diperbarui!");
      } else {
        payload.append("transaction_id", transactionId);
        await createEventReport(payload);
        alert("Laporan berhasil disimpan!");
      }

      navigate("/admin/event-reports");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan laporan.");
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4">
          <div className="bg-white p-4 rounded-4 shadow-sm">
            <h2 className="fw-bold text-primary mb-4">
              {isEdit ? "Edit Laporan Evaluasi Acara" : "Buat Laporan Evaluasi Acara"}
            </h2>

            <form onSubmit={handleSubmit}>
              {!isEdit && (
                <div className="mb-3">
                  <label className="form-label fw-semibold">ID Transaksi</label>
                  <input
                    type="number"
                    className="form-control bg-light"
                    value={transactionId}
                    disabled
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label fw-semibold">Evaluasi Acara</label>
                <textarea
                  className="form-control"
                  rows="6"
                  placeholder="Masukkan evaluasi detail mengenai jalannya acara..."
                  value={evaluation}
                  onChange={(e) => setEvaluation(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Dokumentasi (Gambar)</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setDocumentation(e.target.files[0]);
                      setPreviewImage(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
                {previewImage && (
                  <div className="mt-3 border rounded p-2 text-center bg-light">
                    <p className="small text-muted mb-2">Preview Gambar:</p>
                    <img src={previewImage} alt="Preview" style={{ maxHeight: "300px", maxWidth: "100%", borderRadius: "8px" }} />
                  </div>
                )}
              </div>

              <div className="d-flex gap-2 justify-content-end">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary px-4"
                  onClick={() => navigate("/admin/event-reports")}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-primary px-4">
                  {isEdit ? "Perbarui Laporan" : "Simpan Laporan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
