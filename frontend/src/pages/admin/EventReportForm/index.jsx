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
          <h2>{isEdit ? "Edit Laporan Evaluasi Acara" : "Buat Laporan Evaluasi Acara"}</h2>

          <form onSubmit={handleSubmit}>
            {!isEdit && (
              <div className="mb-3">
                <label>ID Transaksi</label>
                <input
                  type="number"
                  className="form-control"
                  value={transactionId}
                  disabled
                />
              </div>
            )}

            <div className="mb-3">
              <label>Evaluasi Acara</label>
              <textarea
                className="form-control"
                rows="4"
                value={evaluation}
                onChange={(e) => setEvaluation(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label>Upload Dokumentasi</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setDocumentation(e.target.files[0]);
                    setPreviewImage(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
              {previewImage && (
                <div className="mt-2">
                  <img src={previewImage} alt="Preview" style={{ maxWidth: "200px" }} />
                </div>
              )}
            </div>

            <button className="btn btn-primary">
              {isEdit ? "Perbarui Laporan" : "Simpan Laporan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
