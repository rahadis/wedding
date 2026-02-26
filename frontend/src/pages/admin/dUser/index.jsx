import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../../components/admin/sidebar";
import Topbar from "../../../components/admin/topbar";
import TableCard from "../../../components/admin/table";
import { deleteUsers, getUsers } from "../../../_services/user";

export default function DUser() {
  const [users, setUsers] = useState([]);

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Nama", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "No Hp", dataIndex: "phone" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const [userData] = await Promise.all([getUsers()]);
      const userOnly = userData.filter((user) => user.role === "user");
      setUsers(userOnly);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const user = users.find((k) => k.id === id);
    const confirmDelete = window.confirm(
      `Yakin ingin hapus user "${user?.name}"?`
    );

    if (confirmDelete) {
      try {
        await deleteUsers(id);
        setUsers((prevUsersusers) => prevUsersusers.filter((k) => k.id !== id));
        alert("Berhasil menghapus user");
      } catch (error) {
        console.error("Gagal hapus user:", error);
        alert("Gagal hapus user, coba lagi.");
      }
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4">
          <div style={{ marginTop: "-20px" }}>
            <TableCard
              title="Daftar User"
              columns={columns}
              data={users}
              renderAction={(users) => (
                <>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(users.id)}
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
