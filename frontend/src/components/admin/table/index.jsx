import { BsFilter } from "react-icons/bs";

export default function TableCard({
  title,
  columns,
  data,
  renderAction,
  sortOrder,
  onSortChange,
}) {
  return (
    <div
      className="bg-white rounded-3 shadow-sm p-4"
      style={{ 
        marginTop: "25px",
        border: "1px solid #e5e7eb",
        overflow: "hidden"
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold m-0" style={{ color: "#001f3f", fontSize: "18px" }}>
          {title}
        </h5>
        {onSortChange && (
          <div className="dropdown">
            <button
              className="btn btn-sm dropdown-toggle"
              type="button"
              id="filterDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                border: "1px solid #e5e7eb",
                color: "#001f3f",
                backgroundColor: "#f5f7fa",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#003d7a";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.borderColor = "#003d7a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f5f7fa";
                e.currentTarget.style.color = "#001f3f";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              <BsFilter size={16} className="me-2" />
              Urutkan
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="filterDropdown"
              style={{ borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 31, 63, 0.15)" }}
            >
              <li>
                <button
                  className={`dropdown-item ${
                    sortOrder === "newest" ? "active" : ""
                  }`}
                  onClick={() => onSortChange("newest")}
                  style={sortOrder === "newest" ? { backgroundColor: "#001f3f", color: "#ffffff" } : {}}
                >
                  Terbaru
                </button>
              </li>
              <li>
                <button
                  className={`dropdown-item ${
                    sortOrder === "oldest" ? "active" : ""
                  }`}
                  onClick={() => onSortChange("oldest")}
                  style={sortOrder === "oldest" ? { backgroundColor: "#001f3f", color: "#ffffff" } : {}}
                >
                  Terlama
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="table-responsive">
        <table className="table align-middle mb-0" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#001f3f", color: "#ffffff" }}>
              {columns.map((col) => (
                <th 
                  key={col.dataIndex}
                  style={{
                    padding: "16px",
                    fontWeight: "600",
                    fontSize: "14px",
                    letterSpacing: "0.5px",
                    borderBottom: "2px solid #003d7a"
                  }}
                >
                  {col.title}
                </th>
              ))}
              <th 
                style={{
                  padding: "16px",
                  fontWeight: "600",
                  fontSize: "14px",
                  letterSpacing: "0.5px",
                  borderBottom: "2px solid #003d7a",
                  color: "#ffffff"
                }}
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((row, idx) => (
                <tr 
                  key={row.id}
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                    transition: "all 0.2s ease",
                    backgroundColor: idx % 2 === 0 ? "#f9fafb" : "#ffffff"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f0f4f8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = idx % 2 === 0 ? "#f9fafb" : "#ffffff";
                  }}
                >
                  {columns.map((col, index) => (
                    <td 
                      key={`${row.id}-${col.dataIndex}-${index}`}
                      style={{
                        padding: "14px 16px",
                        color: "#1a2332",
                        fontSize: "14px"
                      }}
                    >
                      {col.render
                        ? col.render(row[col.dataIndex], row)
                        : row[col.dataIndex]}
                    </td>
                  ))}
                  <td style={{ padding: "14px 16px" }}>
                    {renderAction && renderAction(row)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length + 1} 
                  className="text-center"
                  style={{
                    padding: "32px 16px",
                    color: "#6c757d",
                    fontSize: "14px"
                  }}
                >
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
