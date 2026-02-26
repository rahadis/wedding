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
      className="bg-white rounded-4 shadow-sm p-4"
      style={{ marginTop: "25px" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold text-primary m-0">{title}</h5>
        {onSortChange && (
          <div className="dropdown">
            <button
              className="btn btn-outline-primary btn-sm dropdown-toggle"
              type="button"
              id="filterDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <BsFilter size={18} />
              Urutkan
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="filterDropdown"
            >
              <li>
                <button
                  className={`dropdown-item ${
                    sortOrder === "newest" ? "active" : ""
                  }`}
                  onClick={() => onSortChange("newest")}
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
                >
                  Terlama
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              {columns.map((col) => (
                <th key={col.dataIndex}>{col.title}</th>
              ))}
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((row) => (
                <tr key={row.id}>
                  {columns.map((col, index) => (
                    <td key={`${row.id}-${col.dataIndex}-${index}`}>
                      {row[col.dataIndex]}
                    </td>
                  ))}
                  <td>{renderAction && renderAction(row)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="text-center">
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
