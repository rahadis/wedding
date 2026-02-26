import { useState, useEffect } from "react";
import "../../../styles/Profile.css";
import { showUsers, updateUsers } from "../../../_services/user";

export default function Profile() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    createdAt: "",
  });

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?.id;
  console.log(userId)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await showUsers(userId);
        setFormData({
          nama: user.name,
          email: user.email,
          telepon: user.phone,
          createdAt: user.created_at,
        });
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await updateUsers(userId, {
        name: formData.nama,
        email: formData.email,
        phone: formData.telepon,
      });
      alert("Profil berhasil diperbarui!");
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Terjadi kesalahan saat menyimpan profil.");
    }
  };

  return (
    <div className="profil-dashboard-content">
      <div
        className="profil-header"
        style={{ padding: "10px 20px", marginBottom: "12px" }}
      >
        <h2
          className="profil-main-title"
          style={{ fontSize: "18px", marginBottom: "4px" }}
        >
          Profil Saya
        </h2>
        <p className="profil-subtitle" style={{ fontSize: "14px", margin: 0 }}>
          Kelola informasi pribadi Anda dengan mudah dan aman
        </p>
      </div>

      <div className="profil-container">
        {/* Form Kiri */}
        <div className="profil-form-section">
          <div className="profil-form-card">
            <h4 className="profil-section-title">Informasi Pribadi</h4>

            <div className="profil-form-group">
              <label className="profil-label">Nama Lengkap</label>
              <input
                type="text"
                className="profil-input"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div className="profil-form-group">
              <label className="profil-label">Email</label>
              <input
                type="email"
                className="profil-input"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email aktif"
              />
            </div>

            <div className="profil-form-group">
              <label className="profil-label">No. Telepon</label>
              <input
                type="text"
                className="profil-input"
                name="telepon"
                value={formData.telepon}
                onChange={handleChange}
                placeholder="Masukkan nomor telepon"
              />
            </div>

            <div className="profil-form-actions">
              <button className="profil-btn profil-btn-cancel">Batal</button>
              <button
                className="profil-btn profil-btn-save"
                onClick={handleSave}
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>

        {/* Foto Profil Kanan */}
        <div className="profil-photo-section">
          <div className="profil-photo-card">
            <div className="profil-photo-container">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  formData.nama || "User"
                )}&background=2563eb&color=fff&size=200`}
                className="profil-photo"
                alt="Profile"
              />
            </div>

            <div className="profil-photo-info">
              <h5 className="profil-photo-title">Foto Profil</h5>
              <div className="profil-photo-requirements">
                <small>• Tidak perlu diunggah</small>
                <small>• Gunakan nama lengkap agar lebih rapi</small>
              </div>
            </div>
          </div>

          <div className="profil-info-card">
            <h6 className="profil-info-title">Status Akun</h6>
            <div className="profil-status-item">
              <span className="profil-status-label">Verifikasi Email</span>
              <span className="profil-status-badge profil-status-verified">
                Terverifikasi
              </span>
            </div>
            <div className="profil-status-item">
              <span className="profil-status-label">Bergabung Sejak</span>
              <span className="profil-status-value">
                {formData.createdAt
                  ? new Intl.DateTimeFormat("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(formData.createdAt))
                  : "-"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
