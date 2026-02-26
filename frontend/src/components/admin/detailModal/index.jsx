// dari sini
import React from "react";
import styles from "./index.module.css";

export default function DetailModal({ onClose, transaksi }) {
  if (!transaksi) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={`modal-dialog ${styles.modalDialog}`} role="document">
        <div
          className={`modal-content rounded-4 shadow ${styles.modalContent}`}
        >
          <div className="modal-header p-4 pb-3 border-bottom-0">
            <h2 className="fw-bold mb-0">Detail Transaksi: {transaksi.id}</h2>
            <button
              type="button"
              className="btn-close"
              aria-label="Tutup"
              onClick={onClose}
            />
          </div>
          <div className="modal-body p-4 pt-0">
            <p>
              <strong>Nama Event:</strong> {transaksi["event_name"]}
            </p>
            <p>
              <strong>Total:</strong> {transaksi.total}
            </p>
            <p>
              <strong>Status:</strong> {transaksi.status}
            </p>
            <p>
              <strong>Tanggal:</strong> {transaksi.transaction_date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
