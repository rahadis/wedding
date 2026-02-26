import React from "react";
import styles from "./index.module.css";

export default function NotifikasiCard({ data }) {
  const getStatusClass = (status) => {
    switch (status) {
      case "Paid":
        return "bg-success text-white";
      case "Rejected":
        return "bg-danger text-white";
      case "Waiting verification":
        return "bg-warning text-dark";
      default:
        return "bg-secondary text-white";
    }
  };

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="bg-white rounded-4 shadow-sm p-4"
      style={{ marginTop: "25px" }}
    >
      <h6 className="fw-bold text-primary mb-3">Menunggu Konfirmasi</h6>
      {data.length === 0 ? (
        <p className="text-muted mb-0">Tidak ada notifikasi saat ini.</p>
      ) : (
        <ul className="list-unstyled mb-0">
          {data.map((item, index) => (
            <li
              key={index}
              className={`mb-3 border-bottom pb-2 ${styles["list-item-hover"]}`}
              style={{ cursor: "pointer", transition: "background-color 0.3s" }}
              onClick={() => handleClick(item.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f0f0f0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <span
                className={`px-2 py-1 rounded-2 fw-semibold ${getStatusClass(
                  item.status
                )}`}
                style={{ fontSize: "0.85rem" }}
              >
                {item.status}
              </span>{" "}
              - {item.event}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}