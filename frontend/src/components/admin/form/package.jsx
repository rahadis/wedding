import { useEffect, useState } from "react";
import { getCategories } from "../../../_services/categories";

export default function FormTambahPackageEvent({
  show,
  onClose,
  onSubmit,
  initialData,
}) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    kategori_id: 0,
    nama: "",
    deskripsi: "",
    harga: 0,
    foto: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesData] = await Promise.all([getCategories()]);
      setCategories(categoriesData);
      console.log(categoriesData);
    };

    if (initialData) {
      setFormData(initialData);
      console.log("Data sebelum di-edit:", initialData);
    } else {
      setFormData({
        kategori_id: "",
        nama: "",
        deskripsi: "",
        harga: "",
        foto: null,
      });
    }

    fetchData();
  }, [initialData, show]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {initialData ? "Edit Package Event" : "Tambah Package Event"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Kategori</label>
                <select
                  className="form-control"
                  name="kategori_id"
                  value={formData.kategori_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((kategori) => (
                    <option key={kategori.id} value={kategori.id}>
                      {kategori.category_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Nama</label>
                <input
                  type="text"
                  className="form-control"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Deskripsi</label>
                <textarea
                  className="form-control"
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Harga</label>
                <input
                  type="number"
                  className="form-control"
                  name="harga"
                  value={formData.harga}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Foto</label>
                <input
                  type="file"
                  className="form-control"
                  name="foto"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
