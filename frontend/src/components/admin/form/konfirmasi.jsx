import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { confirmationImage } from "../../../_api";

export default function FormEditStatusKonfirmasi({
  show,
  onClose,
  onSubmit,
  initialData,
}) {
  const [formData, setFormData] = useState({
    status: "",
  });

  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({ status: initialData.status });
    } else {
      setFormData({ status: "" });
    }
  }, [initialData, show]);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({ status: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!show) return null;

  return (
    <>
      <div
        className="modal d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Edit Status Konfirmasi</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                ></button>
              </div>

              <div className="modal-body">
                {initialData?.image && (
                  <div className="mb-3 text-center">
                    <label className="form-label">Bukti Pembayaran</label>
                    <img
                      src={`${confirmationImage}/${initialData.image}`}
                      alt="Bukti Pembayaran"
                      style={{
                        maxWidth: "100%",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedImage(
                          `${confirmationImage}/${initialData.image}`
                        );
                        setShowImageModal(true);
                      }}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    className="form-select"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Pilih Status --</option>
                    <option value="Waiting verification">
                      Waiting Verification
                    </option>
                    <option value="Paid">Paid</option>
                    <option value="Rejected">Rejected</option>
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

      {showImageModal && selectedImage && (
        <div
          className="modal d-block"
          tabIndex="-1"
          onClick={() => setShowImageModal(false)}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content bg-transparent border-0">
              <img
                src={selectedImage}
                alt="Preview"
                className="img-fluid rounded shadow"
                style={{
                  maxWidth: "80%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  margin: "auto",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
