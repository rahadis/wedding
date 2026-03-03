import { BsFilter, BsArrowDownUp } from "react-icons/bs";

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
      className="bg-white rounded-4 shadow-sm p-4 border-0"
    >
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <h5 className="fw-bold text-primary m-0">{title}</h5>
        {onSortChange && (
          <div className="dropdown">
            <button
              className="btn btn-light btn-sm dropdown-toggle d-flex align-items-center gap-2 border"
              type="button"
              id="filterDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <BsArrowDownUp size={14} />
              Urutkan
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end shadow-sm border-0 rounded-3 mt-2"
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
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.dataIndex} className="text-muted fw-semibold small text-uppercase py-3">
                  {col.title}
                </th>
              ))}
              <th className="text-muted fw-semibold small text-uppercase py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((row) => (
                <tr key={row.id}>
                  {columns.map((col, index) => (
                    <td key={`${row.id}-${col.dataIndex}-${index}`} className="py-3">
                      {col.render
                        ? col.render(row[col.dataIndex], row)
                        : row[col.dataIndex]}
                    </td>
                  ))}
                  <td className="py-3 text-end">{renderAction && renderAction(row)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-5 text-muted">
                  Belum ada data tersedia
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
