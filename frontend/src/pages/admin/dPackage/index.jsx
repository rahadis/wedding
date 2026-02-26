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
    { title: "Nama Package", dataIndex: "name" },
    { title: "Deskripsi", dataIndex: "description" },
    { title: "Harga", dataIndex: "price" },
    { title: "Kategori", dataIndex: "category_name" },
    {
      title: "Gambar",
      dataIndex: "image",
      render: (image) =>
        image ? (
          <img
            src={`${packagesImage}/${image}`}
            alt="Package"
            style={{ width: "100px", objectFit: "cover" }}
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
        alert("Gagal mengambil data packages dan categories.");
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
      alert("Gagal ambil data packages untuk diedit.");
    }
  };

  const handleSubmit = async (dataFromForm) => {
    if (packageEdit) {
      try {
        const payload = new FormData();
        payload.append("name", dataFromForm.nama);
        payload.append("description", dataFromForm.deskripsi);
        payload.append("price", dataFromForm.harga);
        payload.append("categories_id", dataFromForm.kategori_id);

        if (dataFromForm.foto instanceof File) {
          payload.append("image", dataFromForm.foto);
        }

        payload.append("_method", "PUT");
        await updatePackages(packageEdit.id, payload);

        setPackages((prevPackages) =>
          prevPackages.map((pkg) =>
            pkg.id === packageEdit.id ? { ...pkg, ...dataFromForm } : pkg
          )
        );

        setPackageEdit(null);
        setShowForm(false);

        alert("Berhasil update package!");
        window.location.reload();
      } catch (err) {
        console.error("Gagal update package:", err);
        console.log("Data dari form:", dataFromForm);
        alert("Terjadi kesalahan saat mengupdate package.");
      }
    } else {
      try {
        const payload = new FormData();
        payload.append("name", dataFromForm.nama);
        payload.append("description", dataFromForm.deskripsi);
        payload.append("price", dataFromForm.harga);
        payload.append("categories_id", dataFromForm.kategori_id);

        if (dataFromForm.foto instanceof File) {
          payload.append("image", dataFromForm.foto);
        }

        const savedPackages = await createPackages(payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setPackages([...packages, savedPackages]);
        setShowForm(false);
        window.location.reload();
        alert("Berhasil menambahkan package!");
      } catch (err) {
        console.error(
          "Gagal tambah package:",
          err.response ? err.response.data : err
        );
        alert("Terjadi kesalahan saat menambahkan package.");
      }
    }
  };

  const handleDelete = async (id) => {
    const paket = packages.find((k) => k.id === id);
    const confirmDelete = window.confirm(
      `Yakin ingin hapus packages "${paket?.name}"?`
    );

    if (confirmDelete) {
      try {
        await deletePackages(id);
        setPackages((prev) => prev.filter((k) => k.id !== id));
        alert("Berhasil menghapus packages");
      } catch (error) {
        console.error("Gagal hapus packages:", error);
        alert("Gagal hapus packages, coba lagi.");
      }
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4">
          <div className="mb-3 text-end">
            <button
              className="btn btn-success"
              onClick={() => {
                setPackageEdit(null);
                setShowForm(true);
              }}
            >
              + Tambah Data
            </button>
          </div>

          <div style={{ marginTop: "-20px" }}>
            <TableCard
              title="Daftar Package Event"
              columns={columns}
              data={packages}
              renderAction={(paket) => (
                <>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleChange(paket)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(paket.id)}
                    title="Hapus"
                  >
                    <FaTrash />
                  </button>
                </>
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