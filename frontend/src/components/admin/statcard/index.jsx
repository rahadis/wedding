export default function StatCard({ icon, title, count, percentage, trend = "up" }) {
  const getTrendColor = () => {
    if (typeof percentage === 'string' && percentage.includes('%')) {
      return trend === "up" ? "#10b981" : "#ef4444";
    }
    return "#10b981";
  };

  return (
    <div
      className="bg-white rounded-3 shadow-sm p-4 position-relative overflow-hidden"
      style={{ 
        minHeight: "140px",
        border: "1px solid #e5e7eb",
        transition: "all 0.3s ease",
        cursor: "pointer"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 31, 63, 0.15)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        className="position-absolute"
        style={{
          top: "16px",
          left: "16px",
          width: "52px",
          height: "52px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #001f3f 0%, #003d7a 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0, 31, 63, 0.2)",
          fontSize: "24px"
        }}
      >
        <span className="text-white">{icon}</span>
      </div>

      <div
        className="d-flex flex-column"
        style={{ marginLeft: "76px", height: "100%" }}
      >
        <small className="text-muted mb-2" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>
          {title.toUpperCase()}
        </small>
        <h3 className="fw-bold mb-3" style={{ color: "#001f3f" }}>
          {typeof count === 'number' ? count.toLocaleString('id-ID') : count}
        </h3>
        <div className="d-flex align-items-center gap-2" style={{ marginTop: "auto" }}>
          <span style={{ fontSize: "12px", color: getTrendColor(), fontWeight: "600" }}>
            {trend === "up" ? "↑" : "↓"} {percentage}
          </span>
          <span className="text-muted" style={{ fontSize: "11px" }}>
            dari minggu lalu
          </span>
        </div>
      </div>
    </div>
  );
}
