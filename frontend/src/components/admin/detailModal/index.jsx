import React from "react";
import styles from "./index.module.css";
import { FaTimes } from "react-icons/fa";

export default function DetailModal({ onClose, transaksi }) {
  if (!transaksi) return null;

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "Paid":
        return { backgroundColor: "#10b981", color: "#ffffff" };
      case "Waiting verification":
        return { backgroundColor: "#f59e0b", color: "#ffffff" };
      default:
        return { backgroundColor: "#6c757d", color: "#ffffff" };
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={`modal-dialog ${styles.modalDialog}`} 
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`modal-content ${styles.modalContent}`}>
          <div 
            className="modal-header"
            style={{
              background: "linear-gradient(135deg, #001f3f 0%, #003d7a 100%)",
              color: "#ffffff",
              border: "none",
              padding: "24px 24px 16px",
            }}
          >
            <h2 style={{ fontWeight: "700", marginBottom: 0, fontSize: "20px" }}>
              Detail Transaksi #{transaksi.id}
            </h2>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Tutup"
              onClick={onClose}
              style={{
                padding: "4px",
                opacity: "0.8",
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
            />
          </div>

          <div 
            className="modal-body"
            style={{
              padding: "24px",
              color: "#1a2332",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <p style={{ marginBottom: "12px", display: "flex", alignItems: "center" }}>
                <strong style={{ color: "#001f3f", marginRight: "12px", minWidth: "120px" }}>
                  Nama Event:
                </strong>
                <span style={{ fontSize: "14px" }}>{transaksi.event_name}</span>
              </p>
              <p style={{ marginBottom: "12px", display: "flex", alignItems: "center" }}>
                <strong style={{ color: "#001f3f", marginRight: "12px", minWidth: "120px" }}>
                  Total:
                </strong>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#0066cc" }}>
                  Rp {parseInt(transaksi.total)?.toLocaleString("id-ID")}
                </span>
              </p>
              <p style={{ marginBottom: "12px", display: "flex", alignItems: "center" }}>
                <strong style={{ color: "#001f3f", marginRight: "12px", minWidth: "120px" }}>
                  Status:
                </strong>
                <span
                  style={{
                    ...getStatusBadgeStyle(transaksi.status),
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {transaksi.status}
                </span>
              </p>
              <p style={{ marginBottom: "0", display: "flex", alignItems: "center" }}>
                <strong style={{ color: "#001f3f", marginRight: "12px", minWidth: "120px" }}>
                  Tanggal:
                </strong>
                <span style={{ fontSize: "14px" }}>{transaksi.transaction_date}</span>
              </p>
            </div>

            <hr style={{ borderColor: "#e5e7eb", margin: "20px 0" }} />

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  backgroundColor: "#001f3f",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
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
                Edit
              </button>
              <button
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  backgroundColor: "#f5f7fa",
                  color: "#001f3f",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onClick={onClose}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e5e7eb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f5f7fa";
                }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
