import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../index.css";
import Sidebar from "../../../components/admin/sidebar";
import Topbar from "../../../components/admin/topbar";
import StatCard from "../../../components/admin/statcard";
import TableCard from "../../../components/admin/table";
import DetailModal from "../../../components/admin/detailModal";
import { SideCard1 } from "../../../components/admin/sidecard";
import NotifikasiCard from "../../../components/admin/notifcard";
import { getTransactions } from "../../../_services/transaction";
import { getUsers } from "../../../_services/user";
import {
  FaUsers,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaChartLine,
  FaInfoCircle,
} from "react-icons/fa";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaksi, setSelectedTransaksi] = useState(null);
  const [transaction, setTransaction] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");

  const sortedTransactions = [...transaction].sort((a, b) => {
    const dateA = new Date(a.transaction_date);
    const dateB = new Date(b.transaction_date);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const displayedTransactions = sortedTransactions.slice(0, 7);

  const [statistik, setStatistik] = useState({
    totalEvent: 0,
    totalPeserta: 0,
    totalTransaksi: 0,
    totalPendapatan: 0,
    eventPercentage: "0%",
    pesertaPercentage: "0%",
    transaksiPercentage: "0%",
    pendapatanPercentage: "0%",
  });

  const [eventStats] = useState([
    { packagesName: "MPLS", total: 12, percentage: 35 },
    { packagesName: "LDKMS", total: 8, percentage: 25 },
    { packagesName: "Bimbel SNBT", total: 6, percentage: 20 },
    { packagesName: "Seminar", total: 4, percentage: 12 },
    { packagesName: "Outbond", total: 3, percentage: 8 },
  ]);

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Nama Event", dataIndex: "event_name" },
    { title: "Total", dataIndex: "total", render: (val) => `Rp ${val?.toLocaleString("id-ID")}` },
    { title: "Status", dataIndex: "status" },
    { title: "Tanggal", dataIndex: "transaction_date" },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const [transactionData, userData] = await Promise.all([
          getTransactions(),
          getUsers(),
        ]);

        setTransaction(transactionData);

        const totalPendapatan = transactionData
          .filter(trx => trx.status === "Paid")
          .reduce((acc, curr) => acc + (parseFloat(curr.total) || 0), 0);

        setStatistik({
          totalEvent: transactionData.filter((trx) => trx.status === "Paid").length,
          totalPeserta: userData.filter((u) => u.role === "user").length * 25, // Dummy calculation for participants
          totalTransaksi: transactionData.length,
          totalPendapatan: totalPendapatan,
          eventPercentage: "12.5%",
          pesertaPercentage: "8.4%",
          transaksiPercentage: "5.2%",
          pendapatanPercentage: "15.7%",
        });

      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    }

    fetchData();
  }, []);

  const handleDetail = (event) => {
    setSelectedTransaksi(event);
    setShowModal(true);
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f4f7f6" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4">
          <h4 className="fw-bold text-primary mb-4">Dashboard Overview</h4>
          
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <StatCard
                icon={<FaCalendarCheck size={20} />}
                title="Total Event"
                count={statistik.totalEvent}
                percentage={statistik.eventPercentage}
              />
            </div>
            <div className="col-md-3">
              <StatCard
                icon={<FaUsers size={20} />}
                title="Total Peserta"
                count={statistik.totalPeserta}
                percentage={statistik.pesertaPercentage}
              />
            </div>
            <div className="col-md-3">
              <StatCard
                icon={<FaMoneyBillWave size={20} />}
                title="Total Transaksi"
                count={statistik.totalTransaksi}
                percentage={statistik.transaksiPercentage}
              />
            </div>
            <div className="col-md-3">
              <StatCard
                icon={<FaChartLine size={20} />}
                title="Total Pendapatan"
                count={`Rp ${statistik.totalPendapatan.toLocaleString("id-ID")}`}
                percentage={statistik.pendapatanPercentage}
              />
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-8">
              <TableCard
                title="Riwayat Event Terbaru"
                columns={columns}
                data={displayedTransactions}
                renderAction={(event) => (
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleDetail(event)}
                    title="Detail"
                  >
                    <FaInfoCircle />
                  </button>
                )}
                sortOrder={sortOrder}
                onSortChange={setSortOrder}
              />
            </div>

            <div className="col-md-4">
              <div className="mb-3">
                <SideCard1 title="Statistik Per Jenis Event" data={eventStats} />
              </div>
              <NotifikasiCard
                data={transaction.slice(0, 3).map((trx) => ({
                  event: trx.event_name,
                  status: trx.status,
                }))}
              />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <DetailModal
          transaksi={selectedTransaksi}
          onClose={() => {
            setShowModal(false);
            setSelectedTransaksi(null);
          }}
        />
      )}
    </div>
  );
}
