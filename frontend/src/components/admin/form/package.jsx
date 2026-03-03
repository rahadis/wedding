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
    kategori_id: "",
    nama: "",
    paket: "",
    durasi: "",
    target_peserta: "",
    harga: "",
    foto: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };

    if (initialData) {
      const descParts = initialData.deskripsi?.split('+') || [];
      setFormData({
        ...initialData,
        kategori_id: initialData.kategori_id,
        nama: initialData.nama,
        paket: descParts[0] || "",
        durasi: descParts[1] || "",
        target_peserta: descParts[2] || "",
        harga: initialData.harga,
      });
    } else {
      setFormData({
        kategori_id: "",
        nama: "",
        paket: "",
        durasi: "",
        target_peserta: "",
        harga: "",
        foto: null,
      });
    }

    fetchData();
  }, [initialData, show]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto") {
      setFormData({
        ...formData,
        foto: files[0],
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
    const finalData = {
      ...formData,
      deskripsi: `${formData.paket}+${formData.durasi}+${formData.target_peserta}`,
    };
    onSubmit(finalData);
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content rounded-4 border-0 shadow">
          <form onSubmit={handleSubmit}>
            <div className="modal-header border-bottom-0 p-4">
              <h5 className="modal-title fw-bold text-primary">
                {initialData ? "Edit Data Event" : "Tambah Data Event"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body p-4 pt-0">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Jenis Event</label>
                  <select
                    className="form-control"
                    name="kategori_id"
                    value={formData.kategori_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Jenis</option>
                    {categories.map((kategori) => (
                      <option key={kategori.id} value={kategori.id}>
                        {kategori.category_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Nama Event</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: MPLS 2025"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Paket</label>
                  <input
                    type="text"
                    className="form-control"
                    name="paket"
                    value={formData.paket}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: Gold"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Durasi</label>
                  <input
                    type="text"
                    className="form-control"
                    name="durasi"
                    value={formData.durasi}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: 4 Jam"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Target Peserta</label>
                  <input
                    type="text"
                    className="form-control"
                    name="target_peserta"
                    value={formData.target_peserta}
                    onChange={handleChange}
                    required
                    placeholder="Contoh: SMP/SMA"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Harga (HTM)</label>
                  <div className="input-group">
                    <span className="input-group-text">Rp</span>
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
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Gambar/Flyer</label>
                  <input
                    type="file"
                    className="form-control"
                    name="foto"
                    accept="image/*"
                    onChange={handleChange}
                    required={!initialData}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer border-top-0 p-4">
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={onClose}
              >
                Batal
              </button>
              <button type="submit" className="btn btn-primary px-4">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
