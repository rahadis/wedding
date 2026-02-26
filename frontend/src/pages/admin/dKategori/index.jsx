import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Sidebar from "../../../components/admin/sidebar";
import Topbar from "../../../components/admin/topbar";
import TableCard from "../../../components/admin/table";
import FormTambahKategori from "../../../components/admin/form/kategori";
import {
  getCategories,
  updateCategories,
  createCategories,
  deleteCategories,
  showCategories,
} from "../../../_services/categories";

export default function DaftarKategoriEvent() {
  const [category, setCategory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [kategoriEdit, setKategoriEdit] = useState(null);

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Nama Kategori", dataIndex: "category_name" },
    { title: "Deskripsi", dataIndex: "description" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData] = await Promise.all([getCategories()]);
        setCategory(categoryData);
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = async (kategori) => {
    try {
      const kategoriData = await showCategories(kategori.id);
      setKategoriEdit({
        id: kategoriData.id,
        nama: kategoriData.category_name,
        deskripsi: kategoriData.description,
      });
      setShowForm(true);
    } catch (error) {
      console.error("Gagal ambil data kategori:", error);
      alert("Gagal ambil data kategori untuk diedit.");
    }
  };

  const handleSubmit = async (dataFromForm) => {
    if (kategoriEdit) {
      try {
        const payload = new FormData();
        payload.append("category_name", dataFromForm.nama);
        payload.append("description", dataFromForm.deskripsi);
        payload.append("_method", "PUT");

        await updateCategories(kategoriEdit.id, payload);

        const updatedList = category.map((k) =>
          k.id === kategoriEdit.id
            ? {
                ...k,
                category_name: dataFromForm.nama,
                description: dataFromForm.deskripsi,
              }
            : k
        );

        setCategory(updatedList);
        setKategoriEdit(null);
        setShowForm(false);

        alert("Berhasil update kategori!");
        window.location.reload();
      } catch (err) {
        console.error("Gagal update kategori:", err);
        alert("Terjadi kesalahan saat mengupdate kategori.");
      }
    } else {
      try {
        const payload = new FormData();
        payload.append("category_name", dataFromForm.nama);
        payload.append("description", dataFromForm.deskripsi);

        const savedCategory = await createCategories(payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setCategory([...category, savedCategory]);
        setShowForm(false);
        window.location.reload();
        alert("Berhasil menambahkan kategori!");
      } catch (err) {
        console.error("Gagal tambah kategori:", err);
        alert("Terjadi kesalahan saat menambahkan kategori.");
      }
    }
  };

  const handleDelete = async (id) => {
    const kategori = category.find((k) => k.id === id);
    const confirmDelete = window.confirm(
      `Yakin ingin hapus kategori "${kategori?.category_name}"?`
    );

    if (confirmDelete) {
      try {
        await deleteCategories(id);
        setCategory((prevCategory) => prevCategory.filter((k) => k.id !== id));
        alert("Berhasil menghapus kategori");
      } catch (error) {
        console.error("Gagal hapus kategori:", error);
        alert("Gagal hapus kategori, coba lagi.");
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
                setKategoriEdit(null);
                setShowForm(true);
              }}
            >
              + Tambah Data
            </button>
          </div>

          <div style={{ marginTop: "-20px" }}>
            <TableCard
              title="Daftar Kategori Event"
              columns={columns}
              data={category}
              renderAction={(kategori) => (
                <>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleChange(kategori)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(kategori.id)}
                    title="Hapus"
                  >
                    <FaTrash />
                  </button>
                </>
              )}
            />
          </div>

          <FormTambahKategori
            show={showForm}
            onClose={() => {
              setShowForm(false);
              setKategoriEdit(null);
            }}
            onSubmit={handleSubmit}
            initialData={kategoriEdit}
          />
        </div>
      </div>
    </div>
  );
}
