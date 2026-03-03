import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Sidebar from "../../../components/admin/sidebar";
import Topbar from "../../../components/admin/topbar";
import TableCard from "../../../components/admin/table";
import FormTambahPackageEvent from "../../../components/admin/form/package";
import {
  getPackages,
  updatePackages,
  createPackages,
  deletePackages,
  showPackages,
} from "../../../_services/packages";

import { getCategories } from "../../../_services/categories";
import { packagesImage } from "../../../_api";

export default function DaftarPackageEvent() {
  const [packages, setPackages] = useState([]);
  const [, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [packageEdit, setPackageEdit] = useState(null);

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Nama Event", dataIndex: "name" },
    { title: "Paket", dataIndex: "description", render: (desc) => desc?.split('+')[0] || desc },
    { title: "Durasi", dataIndex: "description", render: (desc) => desc?.split('+')[1] || "-" },
    { title: "Target Peserta", dataIndex: "description", render: (desc) => desc?.split('+')[2] || "-" },
    { title: "Harga (HTM)", dataIndex: "price", render: (price) => `Rp ${price?.toLocaleString("id-ID")}` },
    {
      title: "Gambar",
      dataIndex: "image",
      render: (image) =>
        image ? (
          <img
            src={`${packagesImage}/${image}`}
            alt="Package"
            style={{ width: "80px", height: "50px", objectFit: "cover", borderRadius: "8px" }}
          />
        ) : (
          "Tidak ada gambar"
        ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packagesData, categoriesData] = await Promise.all([
          getPackages(),
          getCategories(),
        ]);

        setPackages(packagesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = async (paket) => {
    try {
      const paketData = await showPackages(paket.id);
      setPackageEdit({
        id: paketData.id,
        nama: paketData.name,
        deskripsi: paketData.description,
        harga: paketData.price,
        kategori_id: paketData.categories_id,
        image: paketData.image,
      });
      setShowForm(true);
    } catch (error) {
      console.error("Gagal ambil data packages:", error);
    }
  };

  const handleSubmit = async (dataFromForm) => {
    try {
      const payload = new FormData();
      payload.append("name", dataFromForm.nama);
      payload.append("description", dataFromForm.deskripsi);
      payload.append("price", dataFromForm.harga);
      payload.append("categories_id", dataFromForm.kategori_id);

      if (dataFromForm.foto instanceof File) {
        payload.append("image", dataFromForm.foto);
      }

      if (packageEdit) {
        payload.append("_method", "PUT");
        await updatePackages(packageEdit.id, payload);
      } else {
        await createPackages(payload);
      }

      setShowForm(false);
      setPackageEdit(null);
      window.location.reload();
    } catch (err) {
      console.error("Gagal simpan package:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
    if (confirmDelete) {
      try {
        await deletePackages(id);
        setPackages((prev) => prev.filter((k) => k.id !== id));
      } catch (error) {
        console.error("Gagal hapus packages:", error);
      }
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f4f7f6" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-primary m-0">Manajemen Event</h4>
            <button
              className="btn btn-primary px-4"
              onClick={() => {
                setPackageEdit(null);
                setShowForm(true);
              }}
            >
              + Tambah Event
            </button>
          </div>

          <div style={{ marginTop: "-10px" }}>
            <TableCard
              title="Daftar Program Pendidikan"
              columns={columns}
              data={packages}
              renderAction={(paket) => (
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-warning"
                    onClick={() => handleChange(paket)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(paket.id)}
                    title="Hapus"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            />
          </div>

          <FormTambahPackageEvent
            show={showForm}
            onClose={() => {
              setShowForm(false);
              setPackageEdit(null);
            }}
            onSubmit={handleSubmit}
            initialData={packageEdit}
          />
        </div>
      </div>
    </div>
  );
}
