import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../../components/admin/sidebar";
import Topbar from "../../../components/admin/topbar";
import TableCard from "../../../components/admin/table";
import { getUsers } from "../../../_services/user";

export default function DaftarAdmin() {
  const [users, setUsers] = useState([]);

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Nama Admin", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "No Hp", dataIndex: "phone" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const [userData] = await Promise.all([getUsers()]);
      const adminOnly = userData.filter((user) => user.role === "admin");
      setUsers(adminOnly);
    };

    fetchData();
  }, []);
  
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4">
          <div style={{ marginTop: "-20px" }}>
            <TableCard title="Daftar Admin" columns={columns} data={users} />
          </div>
        </div>
      </div>
    </div>
  );
}
