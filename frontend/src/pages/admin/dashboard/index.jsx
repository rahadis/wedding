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
import { getPackages } from "../../../_services/packages";
import {
  FaUsers,
  FaCalendarCheck,
  FaClock,
  FaInfoCircle,
  FaMoneyBill,
} from "react-icons/fa";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaksi, setSelectedTransaksi] = useState(null);
  const [transaction, setTransaction] = useState([]);
  const [, setUser] = useState([]);
  const [topPackages, setTopPackages] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const sortedTransactions = [...transaction].sort((a, b) => {
    const dateA = new Date(a.transaction_date);
    const dateB = new Date(b.transaction_date);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const displayedTransactions = sortedTransactions.slice(0, 7);

  const [statistik, setStatistik] = useState({
    totalEvent: 0,
    totalPending: 0,
    totalUsers: 0,
    pendingPercentage: "0%",
    eventPercentage: "0%",
    userPercentage: "0%",
  });

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Nama Event", dataIndex: "event_name" },
    { title: "Total", dataIndex: "total" },
    { title: "Status", dataIndex: "status" },
    { title: "Tanggal", dataIndex: "transaction_date" },
  ];

  const getStartOfWeek = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.getFullYear(), date.getMonth(), diff);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [transactionData, packageData, userData] = await Promise.all([
          getTransactions(),
          getPackages(),
          getUsers(),
        ]);

        setTransaction(transactionData);
        setUser(userData);

        const today = new Date();
        const startOfWeek = getStartOfWeek(new Date());

        console.log("today", today);
        console.log("startOfWeek", startOfWeek);
        console.log(
          "transactions",
          transactionData.map((t) => t.transaction_date)
        );

        const trasactionThisWeek = transactionData.filter((trx) => {
          const transactionDate = new Date(`${trx.transaction_date}T00:00:00`);
          return transactionDate >= startOfWeek && transactionDate <= today;
        });

        console.log("transactions this week", trasactionThisWeek);

        const totalTransactionThisWeek = trasactionThisWeek.length || 1;
        const EventInThisWeek = trasactionThisWeek.filter(
          (trx) => trx.status === "Paid"
        ).length;
        const pendingTransaction = trasactionThisWeek.filter(
          (trx) => trx.status === "Waiting verification"
        ).length;

        const eventPercentage =
          ((EventInThisWeek / totalTransactionThisWeek) * 100).toFixed(1) + "%";
        const pendingPercentage =
          ((pendingTransaction / totalTransactionThisWeek) * 100).toFixed(1) +
          "%";

        setStatistik({
          totalEvent: transactionData.filter((trx) => trx.status === "Paid")
            .length,
          totalPending: transactionData.filter(
            (trx) => trx.status === "Waiting verification"
          ).length,
          totalUsers: userData.filter((u) => u.role === "user").length,
          eventPercentage,
          pendingPercentage,
          userPercentage:
            (
              (userData.filter((u) => u.role === "user").length / 1000) *
              100
            ).toFixed(1) + "%",
        });

        const paidTransactions = transactionData.filter(
          (trx) => trx.status === "Paid"
        );
        const countMap = {};
        paidTransactions.forEach(({ packages_id }) => {
          countMap[packages_id] = (countMap[packages_id] || 0) + 1;
        });

        const packagesStats = Object.entries(countMap).map(
          ([packagesId, count]) => {
            const packages = packageData.find(
              (p) => p.id === parseInt(packagesId)
            );
            return {
              packagesName: packages
                ? packages.name
                : "Packages Tidak Diketahui",
              total: count,
              percentage:
                EventInThisWeek > 0 ? (count / EventInThisWeek) * 100 : 0,
            };
          }
        );

        const totalPercentage = packagesStats.reduce(
          (sum, stat) => sum + stat.percentage,
          0
        );
        if (totalPercentage > 100) {
          const normalizationFactor = 100 / totalPercentage;
          packagesStats.forEach((stat) => {
            stat.percentage *= normalizationFactor;
          });
        }
        packagesStats.forEach((stat) => {
          stat.percentage = Math.round(stat.percentage);
        });

        setTopPackages(packagesStats);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    }

    fetchData();
  }, []);

  const handleDetail = (event) => {
    alert(`Detail event: ${event.event_name}`);
    setSelectedTransaksi(event);
    setShowModal(true);
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4" style={{ backgroundColor: "#f5f7fa", minHeight: "calc(100vh - 120px)" }}>
          <div className="mb-4">
            <h2 style={{ color: "#001f3f", fontWeight: "700", marginBottom: "4px" }}>
              Selamat Datang, {userInfo?.name || "Admin"}
            </h2>
            <p style={{ color: "#6c757d", fontSize: "14px", margin: 0 }}>
              Kelola semua acara pendidikan Anda dari sini
            </p>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-6 col-lg-3">
              <StatCard
                icon={<FaCalendarCheck size={24} />}
                title="Total Event Pendidikan"
                count={statistik.totalEvent}
                percentage={statistik.eventPercentage}
                trend="up"
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <StatCard
                icon={<FaUsers size={24} />}
                title="Total Peserta"
                count={statistik.totalUsers}
                percentage={statistik.userPercentage}
                trend="up"
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <StatCard
                icon={<FaClock size={24} />}
                title="Transaksi Pending"
                count={statistik.totalPending}
                percentage={statistik.pendingPercentage}
                trend={statistik.pendingPercentage.includes('0') ? "down" : "up"}
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <StatCard
                icon={<FaMoneyBill size={24} />}
                title="Total Pendapatan"
                count={statistik.totalEvent * 1000}
                percentage={statistik.eventPercentage}
                trend="up"
              />
            </div>
          </div>

          <div className="row g-3">
            <div className="col-lg-8">
              <TableCard
                title="Event Terbaru"
                columns={columns}
                data={displayedTransactions}
                renderAction={(event) => (
                  <button
                    className="btn btn-sm btn-primary"
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

            <div className="col-lg-4">
              <SideCard1 data={topPackages.slice(0, 3)} />
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
