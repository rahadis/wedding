import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FormTambahTransaksi({
  show,
  onClose,
  onSubmit,
  initialData,
}) {
  const [formData, setFormData] = useState({
    userId: "",
    packageId: "",
    namaEvent: "",
    tanggalEvent: "",
    detailEvent: "",
    venue: "",
    guestCount: "",
    paymentMethod: "",
    specialRequest: "",
    tanggalTransaksi: "",
    total: "",
    status: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        userId: "",
        packageId: "",
        namaEvent: "",
        tanggalEvent: "",
        detailEvent: "",
        venue: "",
        guestCount: "",
        paymentMethod: "",
        specialRequest: "",
        tanggalTransaksi: "",
        total: "",
        status: "",
      });
    }
  }, [initialData, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {initialData ? "Edit Transaksi" : "Tambah Transaksi"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body row">
              <div className="mb-3 col-md-6">
                <label className="form-label">User ID</label>
                <input
                  type="number"
                  className="form-control"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3 col-md-6">
                <label className="form-label">Package ID</label>
                <input
                  type="number"
                  className="form-control"
                  name="packageId"
                  value={formData.packageId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3 col-md-6">
                <label className="form-label">Nama Event</label>
                <input
                  type="text"
                  className="form-control"
                  name="namaEvent"
                  value={formData.namaEvent}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3 col-md-6">
                <label className="form-label">Tanggal Event</label>
                <input
                  type="date"
                  className="form-control"
                  name="tanggalEvent"
                  value={formData.tanggalEvent}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3 col-md-12">
                <label className="form-label">Detail Event</label>
                <textarea
                  className="form-control"
                  name="detailEvent"
                  value={formData.detailEvent}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="mb-3 col-md-6">
                <label className="form-label">Venue</label>
                <input
                  type="text"
                  className="form-control"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3 col-md-6">
                <label className="form-label">Jumlah Tamu</label>
                <input
                  type="number"
                  className="form-control"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3 col-md-6">
                <label className="form-label">Metode Pembayaran</label>
                <select
                  className="form-control"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Pilih Metode --</option>
                  <option value="Transfer Bank">Transfer Bank</option>
                  <option value="Kartu Kredit">Kartu Kredit</option>
                  <option value="Tunai">Tunai</option>
                </select>
              </div>

              <div className="mb-3 col-md-6">
                <label className="form-label">Permintaan Khusus</label>
                <input
                  type="text"
                  className="form-control"
                  name="specialRequest"
                  value={formData.specialRequest}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 col-md-6">
                <label className="form-label">Tanggal Transaksi</label>
                <input
                  type="date"
                  className="form-control"
                  name="tanggalTransaksi"
                  value={formData.tanggalTransaksi}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3 col-md-6">
                <label className="form-label">Total (Rp)</label>
                <input
                  type="number"
                  className="form-control"
                  name="total"
                  value={formData.total}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3 col-md-12">
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Pilih Status --</option>
                  <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                  <option value="Lunas">Lunas</option>
                  <option value="Dibatalkan">Dibatalkan</option>
                </select>
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
