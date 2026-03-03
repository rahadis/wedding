import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/admin/sidebar";
import Topbar from "../../../components/admin/topbar";
import TableCard from "../../../components/admin/table";
import { getEventReports } from "../../../_services/eventReport";

export default function DEventReport() {
  const [reports, setReports] = useState([]);

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Transaction ID", dataIndex: "transaction_id" },
    { title: "Evaluasi", dataIndex: "evaluation" },
    {
      title: "Dokumentasi",
      dataIndex: "documentation",
      render: (doc) =>
        doc ? (
          <img
            src={`/storage/${doc}`}
            alt="Dokumentasi"
            style={{ width: "80px" }}
          />
        ) : (
          "Tidak ada"
        ),
    },
    { title: "Tanggal", dataIndex: "created_at" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEventReports();
      setReports(data);
    };

    fetchData();
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4">
          <TableCard
            title="Daftar Laporan Event"
            columns={columns}
            data={reports}
          />
        </div>
      </div>
    </div>
  );
}