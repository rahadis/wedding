import React from "react";
import styles from "./index.module.css";
import { FaCalendarAlt, FaMoneyBillWave, FaInfoCircle, FaCheckCircle } from "react-icons/fa";

export default function DetailModal({ onClose, transaksi }) {
  if (!transaksi) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={`modal-dialog ${styles.modalDialog}`} role="document">
        <div
          className={`modal-content rounded-4 shadow-lg border-0 ${styles.modalContent}`}
        >
          <div className="modal-header p-4 border-0 d-flex justify-content-between align-items-center bg-primary text-white">
            <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
              <FaInfoCircle /> Detail Pendaftaran #{transaksi.id}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Tutup"
              onClick={onClose}
            />
          </div>
          <div className="modal-body p-4">
            <div className="mb-4">
              <h4 className="fw-bold text-primary mb-3">{transaksi["event_name"]}</h4>
              <span className={`badge px-3 py-2 rounded-pill ${transaksi.status === 'Paid' ? 'bg-success' : 'bg-warning'}`}>
                {transaksi.status}
              </span>
            </div>

            <div className="row g-3">
              <div className="col-6">
                <div className="p-3 bg-light rounded-3">
                  <small className="text-muted d-block mb-1">Total Biaya</small>
                  <div className="fw-bold text-dark d-flex align-items-center gap-2">
                    <FaMoneyBillWave className="text-success" />
                    Rp {transaksi.total?.toLocaleString("id-ID")}
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 bg-light rounded-3">
                  <small className="text-muted d-block mb-1">Tanggal Daftar</small>
                  <div className="fw-bold text-dark d-flex align-items-center gap-2">
                    <FaCalendarAlt className="text-primary" />
                    {transaksi.transaction_date}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 border rounded-3 border-primary border-opacity-25 bg-primary bg-opacity-10">
               <h6 className="fw-bold text-primary small mb-2 d-flex align-items-center gap-2">
                 <FaCheckCircle /> Catatan Sistem
               </h6>
               <p className="small mb-0 text-muted">
                 Pendaftaran ini sedang dalam proses verifikasi oleh tim administrasi EduEvent Pro. Pastikan bukti pembayaran telah diunggah jika belum.
               </p>
            </div>
          </div>
          <div className="modal-footer p-4 border-0">
             <button className="btn btn-primary w-100 py-2 rounded-3 fw-bold" onClick={onClose}>
               Tutup Detail
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
