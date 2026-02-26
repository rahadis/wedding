import { useState, useEffect, useMemo } from "react";
import "../../../styles/Transaksi.css";
import { getTransactions } from "../../../_services/transaction";
import { getPackages } from "../../../_services/packages";

export default function Transaksi() {
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [packages, setPackages] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsData, packageData] = await Promise.all([
          getTransactions(),
          getPackages(),
        ]);
        setTransactions(transactionsData);
        setPackages(packageData);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        alert("Gagal mengambil data transactions dan user.");
      }
    };

    if (userId) fetchData();
  }, [userId]);

  const getPackage = (id) => {
    const found = packages.find((pkg) => pkg.id === id);
    return found ? found.name : `Paket #${id}`;
  };

  const filteredTransaksi = useMemo(() => {
    return transactions
      .filter((item) => item.user_id === userId)
      .filter((item) => {
        const matchStatus = filterStatus === "" || item.status === filterStatus;
        const searchLower = searchTerm.toLowerCase();
        const matchSearch =
          searchTerm === "" ||
          item.event_name?.toLowerCase().includes(searchLower) ||
          item.id.toString().toLowerCase().includes(searchLower) ||
          item.packages_id?.toString().toLowerCase().includes(searchLower) ||
          item.event_date?.toLowerCase().includes(searchLower) ||
          item.total?.toString().toLowerCase().includes(searchLower);

        return matchStatus && matchSearch;
      });
  }, [transactions, filterStatus, searchTerm, userId]);

  const handleStatusChange = (e) => setFilterStatus(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const clearFilters = () => {
    setFilterStatus("");
    setSearchTerm("");
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      Rejected: "status-cancelled",
      "Waiting verification": "status-pending",
      Paid: "status-completed",
    };
    return statusClasses[status] || "status-default";
  };

  const displayedTransaksi = filteredTransaksi;

  return (
    <div className="transaksi-user-page">
      <div className="transaksi-header">
        <h1 className="transaksi-title">Riwayat Pesanan Saya</h1>
        <p className="transaksi-subtitle">
          Lihat semua event yang pernah Anda pesan
        </p>
      </div>

      <div className="transaksi-filter-simple">
        <div className="filter-group">
          <select
            className="filter-select"
            value={filterStatus}
            onChange={handleStatusChange}
          >
            <option value="">Semua Status</option>
            <option value="Paid">Selesai</option>
            <option value="Waiting verification">Menunggu verifikasi</option>
            <option value="Rejected">Dibatalkan</option>
          </select>
        </div>
        <div className="filter-group">
          <input
            type="text"
            className="filter-input"
            placeholder="Cari nama event, ID pesanan, paket, tanggal, atau harga..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {(filterStatus || searchTerm) && (
          <button className="btn-clear-filter" onClick={clearFilters}>
            Reset
          </button>
        )}
      </div>

      <div className="transaksi-grid">
        {displayedTransaksi.length > 0 ? (
          displayedTransaksi.map((item) => (
            <div key={item.id} className="transaksi-card">
              <div className="card-header">
                <div className="event-info">
                  <h3 className="event-name">{item.event_name}</h3>
                  <p className="event-date">{item.event_date}</p>
                </div>
                <span className={`status-badge ${getStatusBadge(item.status)}`}>
                  {item.status}
                </span>
              </div>

              <div className="card-body">
                <div className="package-info">
                  <p className="package-name">{getPackage(item.packages_id)}</p>
                  <p className="order-id">ID Pesanan: {item.id}</p>
                </div>

                <div className="price-rating">
                  <div className="price">
                    Rp {Number(item.total).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="card-actions">
                {item.status === "Menunggu Pembayaran" && (
                  <button className="btn-pay">Bayar Sekarang</button>
                )}
                <button className="btn-detail">Lihat Detail</button>
                {(item.status === "Selesai" || item.status === "Paid") && (
                  <button className="btn-reorder">Pesan Lagi</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>Belum Ada Pesanan</h3>
            <p>
              Anda belum memiliki riwayat pesanan yang sesuai dengan pencarian
            </p>
            <button className="btn-browse" onClick={clearFilters}>
              Lihat Semua Pesanan
            </button>
          </div>
        )}
      </div>

      <div className="user-summary">
        <div className="summary-card">
          <h3>Ringkasan Pesanan Anda</h3>
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-number">
                {filteredTransaksi.filter((t) => t.status === "Paid").length}
              </span>
              <span className="stat-label">Event Selesai</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {
                  filteredTransaksi.filter(
                    (t) => t.status === "Waiting verification"
                  ).length
                }
              </span>
              <span className="stat-label">Menunggu Verifikasi</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {
                  filteredTransaksi.filter((t) => t.status === "Rejected")
                    .length
                }
              </span>
              <span className="stat-label">Dibatalkan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
