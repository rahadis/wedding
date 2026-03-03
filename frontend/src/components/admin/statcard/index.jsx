import React from "react";

export default function StatCard({ icon, title, count, percentage }) {
  const isNegative = percentage?.toString().includes("-");

  return (
    <div
      className="bg-white rounded-4 shadow-sm p-4 border-0 hover-lift"
      style={{ minHeight: "130px", transition: "all 0.3s ease" }}
    >
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div
          className="d-flex align-items-center justify-content-center rounded-3"
          style={{
            width: "48px",
            height: "48px",
            background: "rgba(10, 35, 87, 0.1)",
            color: "#0a2357",
          }}
        >
          {icon}
        </div>
        <div className={`badge ${isNegative ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'} rounded-pill px-2 py-1 small fw-bold`}>
          {isNegative ? '' : '+'}{percentage}
        </div>
      </div>

      <div>
        <small className="text-muted fw-medium d-block mb-1">{title}</small>
        <h4 className="fw-bold mb-0 text-primary">{count}</h4>
      </div>
    </div>
  );
}
