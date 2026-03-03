import React, { useState } from "react";
import Sidebar from "../../../components/admin/sidebar";
import Topbar from "../../../components/admin/topbar";
import { createEventReport } from "../../../_services/eventReport";
import { useParams, useNavigate } from "react-router-dom";

export default function EventReportForm() {
  const { transactionId } = useParams();
  const navigate = useNavigate();

  const [evaluation, setEvaluation] = useState("");
  const [documentation, setDocumentation] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append("transaction_id", transactionId);
      payload.append("evaluation", evaluation);
      payload.append("documentation", documentation);

      await createEventReport(payload);

      alert("Laporan berhasil disimpan!");

      navigate("/admin/event-reports"); // ⬅ pindah ke list laporan
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
          <h2>Buat Laporan Evaluasi Acara</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>ID Transaksi</label>
              <input
                type="number"
                className="form-control"
                value={transactionId}
                disabled
              />
            </div>

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
                onChange={(e) => setDocumentation(e.target.files[0])}
              />
            </div>

            <button className="btn btn-primary">
              Simpan Laporan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}