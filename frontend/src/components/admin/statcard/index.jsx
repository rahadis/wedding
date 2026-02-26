export default function StatCard({ icon, title, count, percentage }) {
  return (
    <div
      className="bg-white rounded-4 shadow-sm p-3 position-relative overflow-hidden"
      style={{ minHeight: "110px" }}
    >
      <div
        className="position-absolute"
        style={{
          top: "12px",
          left: "12px",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "linear-gradient(to right, #033b5d, #064e7d)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <span className="text-white fs-5">{icon}</span>
      </div>

      <div
        className="d-flex flex-column align-items-end"
        style={{ marginLeft: "60px" }}
      >
        <small className="text-secondary mb-1">{title}</small>
        <h5 className="fw-bold text-primary mb-1">{count}</h5>
      </div>

      <hr className="my-2" />

      <div className="text-muted text-start fw-medium small">+{percentage} dari minggu</div>
    </div>
  );
}
