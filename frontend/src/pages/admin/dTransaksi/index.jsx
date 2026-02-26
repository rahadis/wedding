import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../../components/admin/sidebar";
import Topbar from "../../../components/admin/topbar";
import FormTambahTransaksi from "../../../components/admin/form/transaksi";
import {
  deleteTransactions,
  getTransactions,
} from "../../../_services/transaction";
import TableCard from "../../../components/admin/table";

export default function DaftarTransaksi() {
  const [transactions, setTransactions] = useState([]);
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "User", dataIndex: "user_name" },
    { title: "Package", dataIndex: "package_name" },
    { title: "Nama Event", dataIndex: "event_name" },
    { title: "Tanggal Event", dataIndex: "event_date" },
    { title: "Permintaan Tambahan", dataIndex: "special_request" },
    { title: "Venue", dataIndex: "venue" },
    { title: "Jumlah Tamu", dataIndex: "guest_count" },
    { title: "Metode Pembayaran", dataIndex: "payment_method" },
    { title: "Tanggal Transaksi", dataIndex: "transaction_date" },
    { title: "Total", dataIndex: "total" },
    { title: "Status", dataIndex: "status" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsData] = await Promise.all([getTransactions()]);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        alert("Gagal mengambil data transactions dan categories.");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const paket = transactions.find((k) => k.id === id);
    const confirmDelete = window.confirm(
      `Yakin ingin menghapus "${paket?.event_name}"?`
    );

    if (confirmDelete) {
      try {
        await deleteTransactions(id);
        setTransactions((prev) => prev.filter((k) => k.id !== id));
        alert("Berhasil menghapus transaksi");
      } catch (error) {
        console.error("Gagal hapus transaksi:", error);
        alert("Gagal hapus transaksi, coba lagi.");
      }
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4">
          <div className="mb-3 text-end"></div>

          <div style={{ marginTop: "-20px" }}>
            <TableCard
              title="Daftar Transaksi Event"
              columns={columns}
              data={transactions}
              renderAction={(transaksi) => (
                <>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(transaksi.id)}
                    title="Hapus"
                  >
                    <FaTrash />
                  </button>
                </>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
