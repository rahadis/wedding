import React, { useState, useMemo } from "react";
import { BsFilter } from "react-icons/bs";

export function SideCard1({ data }) {
  const [filter, setFilter] = useState("terlaris");

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (filter === "terlaris") {
      return [...data].sort((a, b) => b.total - a.total).slice(0, 3);
    } else if (filter === "kurang_laris") {
      return [...data].sort((a, b) => a.total - b.total).slice(0, 3);
    }
    return data.slice(0, 3);
  }, [data, filter]);

  return (
    <div
      className="bg-white rounded-4 shadow-sm p-3"
      style={{ marginTop: "25px" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold text-primary m-0">
          {filter === "terlaris" ? "Paket Terlaris" : "Paket Kurang Laris"}
        </h6>

        <div className="dropdown">
          <button
            className="btn btn-outline-primary btn-sm dropdown-toggle d-flex align-items-center gap-1"
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
                  filter === "terlaris" ? "active" : ""
                }`}
                onClick={() => setFilter("terlaris")}
                type="button"
              >
                Terlaris
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${
                  filter === "kurang_laris" ? "active" : ""
                }`}
                onClick={() => setFilter("kurang_laris")}
                type="button"
              >
                Kurang Laris
              </button>
            </li>
          </ul>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <p>Tidak ada data paket.</p>
      ) : (
        filteredData.map(({ packagesName, percentage = 0 }, index) => (
          <div key={packagesName || index} className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="fw-semibold">{packagesName}</div>
              <div className="text-muted">{percentage}%</div>
            </div>
            <div
              className="progress"
              style={{ height: "6px", borderRadius: "3px" }}
            >
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percentage}%` }}
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
