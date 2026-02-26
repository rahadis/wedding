import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/admin/sidebar";
import Topbar from "../../../components/admin/topbar";
import TableCard from "../../../components/admin/table";
import {
  getConfirmations,
  updateConfirmations,
} from "../../../_services/confirmation";
import { getUsers } from "../../../_services/user";
import { FaEdit } from "react-icons/fa";
import FormEditStatusKonfirmasi from "../../../components/admin/form/konfirmasi";

export default function LaporanKonfirmasi() {
  const [confirmations, setConfirmations] = useState([]);
  const [, setCustomers] = useState([]);
  const [, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  

  const columns = [
    { title: "Konfirmasi ID", dataIndex: "id" },
    { title: "Transaksi ID", dataIndex: "transactions_id" },
    {
      title: "Bukti Pembayaran",
      dataIndex: "image",
      render: (image) =>
        image ? (
          <img
            src={`/storage/${image}`}
            alt="Bukti"
            style={{ width: "80px", borderRadius: "10px" }}
          />
        ) : (
          "Tidak ada gambar"
        ),
    },
    { title: "Tanggal Pembayaran", dataIndex: "payment_date" },
    { title: "Status", dataIndex: "status" },
    {
      title: "Metode pembayaran",
      dataIndex: "payment_method",
    },
    { title: "Nama Customer", dataIndex: "user_name" },
    {
      title: "Nama Admin",
      dataIndex: "admin_name",
      render: (text) => (text ? text : "Belum diverifikasi"),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [confirmationsData, userData] = await Promise.all([
          getConfirmations(),
          getUsers(),
        ]);
        setConfirmations(confirmationsData);
        console.log(confirmationsData);
        setCustomers(userData.filter((u) => u.role === "user"));
        setAdmins(userData.filter((u) => u.role === "admin"));
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        alert("Gagal mengambil data confirmations dan user.");
      }
    };

    fetchData();
  }, []);
  

  const handleEditClick = (data) => {
    setEditData(data);
    setShowForm(true);
  };

  const handleSubmitForm = async (dataFromForm) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const adminName = userInfo?.name || "Admin";

    try {
      const payload = new FormData();
      payload.append("status", dataFromForm.status);
      payload.append("_method", "PUT");

      await updateConfirmations(editData.id, payload);

      const updatedList = confirmations.map((item) =>
        item.id === editData.id
          ? { ...item, status: dataFromForm.status, admin_name: adminName }
          : item
      );

      setConfirmations(updatedList);
      setShowForm(false);
      setEditData(null);
      alert("Status berhasil diperbarui!");
    } catch (error) {
      console.error("Gagal memperbarui status:", error);
      alert("Gagal memperbarui status transaksi.");
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4">
          <TableCard
            title="Laporan Konfirmasi Pembayaran"
            columns={columns}
            data={confirmations}
            renderAction={(confirmation) => (
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => handleEditClick(confirmation)}
                title="Edit"
              >
                <FaEdit />
              </button>
            )}
          />

          <FormEditStatusKonfirmasi
            show={showForm}
            onClose={() => {
              setShowForm(false);
              setEditData(null);
            }}
            onSubmit={handleSubmitForm}
            initialData={editData}
          />
        </div>
      </div>
    </div>
  );
}
