import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../../styles/Transaction.css";
import { createTransactions, getTransactions,  } from "../../_services/transaction";
import { packagesImage } from "../../_api";
import { createConfirmations } from "../../_services/confirmation";

export default function Transaction() {
  const navigate = useNavigate();
  const location = useLocation();
  const [transactionId, setTransactionId] = useState(null);

  const selectedPackageFromState = location.state?.package;

  const [selectedPackage, setSelectedPackage] = useState(
    selectedPackageFromState || null
  );

  const [categoryId, setCategoryId] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    event_name: "",
    eventDate: "",
    eventTime: "",
    venue: "",
    guestCount: "",
    specialRequests: "",
  });

  const [paymentStep, setPaymentStep] = useState("form");
  const [selectedBank, setSelectedBank] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?.id;
  
  useEffect(() => {
    if (selectedPackageFromState) {
      setSelectedPackage(selectedPackageFromState);
      setCategoryId(selectedPackageFromState.categories_id);
    }
  }, [selectedPackageFromState]);

  useEffect(() => {
    if (userInfo) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        customerName: userInfo.name || "",
        email: userInfo.email || "",
      }));
    }
  }, []);

  useEffect(() => {
    if (paymentStep === "upload") {
      const savedId = localStorage.getItem("transaction_id");
      if (savedId && !transactionId) {
        setTransactionId(savedId);
      }
    }
  }, [paymentStep]);
  
  useEffect(() => {
    const fetchLatestTransactionId = async () => {
      try {
        const response = await getTransactions();
        const transactions = response?.data || [];

        const maxId = transactions.reduce((max, trx) => {
          return trx.id > max ? trx.id : max;
        }, 0);

        const nextId = maxId + 1;
        localStorage.setItem("transaction_id", nextId);
        console.log("💾 Transaction ID disimpan:", nextId);
      } catch (err) {
        console.error("❌ Gagal ambil data transaksi:", err);
      }
    };

    fetchLatestTransactionId();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBankSelection = (bank) => {
    setSelectedBank(bank);
    setPaymentStep("upload");
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0]);
    }
  };

  const handleConfirmPayment = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let finalTransactionId = transactionId;
    if (!finalTransactionId) {
      finalTransactionId = localStorage.getItem("transaction_id");
    }

    if (!finalTransactionId) {
      alert("❌ ID transaksi belum tersedia. Coba lagi.");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append("transactions_id", finalTransactionId);
      payload.append("user_id", userId);
      payload.append("payment_method", selectedBank);
      payload.append("payment_date", new Date().toISOString().split("T")[0]);
      payload.append("status", "Waiting verification");
      payload.append("image", paymentProof);

      console.log("📤 Kirim bukti pembayaran dengan data:");
      for (let [key, value] of payload.entries()) {
        console.log(`${key}:`, value);
      }

      await createConfirmations(payload);

      showNotification("✅ Bukti pembayaran berhasil dikirim!", "success");
      setPaymentStep("done");
      navigate("/")
    } catch (err) {
      console.error("❌ Gagal upload bukti pembayaran:", err);
      showNotification("Terjadi kesalahan saat upload.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };  
  
  const showNotification = (message, type) => {
    console.log(`📢 Notification: ${message}`);

    const notification = document.createElement("div");
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "#10b981" : "#ef4444"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.2);
      z-index: 10000;
      font-weight: 600;
      animation: slideIn 0.3s ease;
      max-width: 300px;
      word-wrap: break-word;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Ambil id terbaru
      const response = await getTransactions();
      const transactions = response?.data || [];
      const maxId = transactions.reduce(
        (max, trx) => (trx.id > max ? trx.id : max),
        0
      );
      const nextId = maxId + 1;
      localStorage.setItem("transaction_id", nextId);
      console.log("💾 Transaction ID disimpan:", nextId);

      const payload = new FormData();
      payload.append("user_id", userId);
      payload.append("packages_id", selectedPackage.id);
      payload.append("event_name", formData.event_name);
      payload.append("event_date", formData.eventDate);
      payload.append("event_time", formData.eventTime);
      payload.append("venue", formData.venue);
      payload.append("guest_count", formData.guestCount);
      payload.append("special_requests", formData.specialRequests || "");
      payload.append("total", totalPrice);

      await createTransactions(payload);

      setPaymentStep("select");
      alert("✅ Transaksi berhasil dikirim!");
    } catch (err) {
      console.error("❌ Gagal kirim transaksi:", err);
      alert("Terjadi kesalahan saat mengirim transaksi.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const adminFee = 50000;
  const totalPrice = selectedPackage.price + adminFee;

  const bankOptions = [
    { id: "bni", name: "Bank BNI", shortName: "BNI", color: "#1e40af" },
    { id: "bri", name: "Bank BRI", shortName: "BRI", color: "#0ea5e9" },
    {
      id: "mandiri",
      name: "Bank Mandiri",
      shortName: "MANDIRI",
      color: "#dc2626",
    },
    { id: "jatim", name: "Bank Jatim", shortName: "JATIM", color: "#059669" },
    {
      id: "bca",
      name: "Bank Central Asia",
      shortName: "BCA",
      color: "#2563eb",
    },
  ];

  const getStepIndicator = () => {
    const steps = [
      { key: "form", label: "Detail", active: paymentStep === "form" },
      { key: "select", label: "Pembayaran", active: paymentStep === "select" },
      { key: "upload", label: "Upload", active: paymentStep === "upload" },
    ];

    return (
      <div className="step-indicator">
        {steps.map((step, index) => (
          <div key={step.key} className="step-container">
            <div
              className={`step ${step.active ? "active" : ""} ${
                steps.findIndex((s) => s.key === paymentStep) > index
                  ? "completed"
                  : ""
              }`}
            >
              {steps.findIndex((s) => s.key === paymentStep) > index
                ? "✓"
                : index + 1}
            </div>
            <span className="step-label">{step.label}</span>
            {index < steps.length - 1 && <div className="step-line"></div>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="transaction-page">
      <div className="container">
        <div className="page-header">
          <button
            className="back-button"
            onClick={() => navigate(`/kategori/${categoryId || 1}`)}
          >
            ← Kembali
          </button>
          <h1>Konfirmasi Pemesanan</h1>
          {getStepIndicator()}
        </div>

        <div className="content-grid">
          {/* Summary */}
          <div className="summary-sidebar">
            <div className="summary-card">
              <div className="summary-header">
                <h3>Ringkasan Pesanan</h3>
              </div>
              <div className="package-preview">
                <img
                  src={
                    selectedPackage?.image
                      ? `${packagesImage}/${selectedPackage.image}`
                      : "/placeholder.jpg"
                  }
                  alt={selectedPackage?.name || "Paket"}
                  className="package-image"
                />
                <div className="package-details">
                  <h4>{selectedPackage.name}</h4>
                  <p>{selectedPackage.description}</p>
                </div>
              </div>
              <div className="price-breakdown">
                <div className="price-row">
                  <span>Harga Paket</span>
                  <span>Rp {selectedPackage.price.toLocaleString()}</span>
                </div>
                <div className="price-row">
                  <span>Biaya Admin</span>
                  <span>Rp {adminFee.toLocaleString()}</span>
                </div>
                <div className="price-row total">
                  <span>Total Pembayaran</span>
                  <span>Rp {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content">
            {paymentStep === "form" && (
              <div className="form-section">
                <div className="section-header">
                  <h3>Detail Pemesanan</h3>
                  <p>Lengkapi informasi di bawah ini</p>
                </div>

                <form onSubmit={handleSubmit} className="booking-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Nama Lengkap *</label>
                      <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        required
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="contoh@email.com"
                      />
                    </div>
                    <div className="form-group">
                      <label>Nama Event *</label>
                      <input
                        type="text"
                        name="event_name"
                        value={formData.event_name}
                        onChange={handleInputChange}
                        required
                        placeholder="pesta"
                      />
                    </div>
                    <div className="form-group">
                      <label>Jumlah Tamu *</label>
                      <input
                        type="number"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleInputChange}
                        required
                        placeholder="Jumlah tamu"
                        min="1"
                      />
                    </div>
                    <div className="form-group">
                      <label>Tanggal Acara *</label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Waktu Acara *</label>
                      <input
                        type="time"
                        name="eventTime"
                        value={formData.eventTime}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label>Lokasi Acara *</label>
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      required
                      placeholder="Alamat lengkap lokasi acara"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Permintaan Khusus</label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="Permintaan khusus..."
                      rows="4"
                    ></textarea>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => navigate(`/category/${categoryId || 1}`)}
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Menyimpan..." : "Lanjut ke Pembayaran →"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {paymentStep === "select" && (
              <div className="payment-selection">
                <div className="section-header">
                  <h3>Pilih Metode Pembayaran</h3>
                  <p>Pilih bank untuk pembayaran via Virtual Account</p>
                </div>
                <div className="bank-grid">
                  {bankOptions.map((bank) => (
                    <div
                      key={bank.id}
                      className={`bank-card ${
                        selectedBank === bank.id ? "selected" : ""
                      }`}
                      onClick={() => handleBankSelection(bank.id)}
                    >
                      <div
                        className="bank-icon"
                        style={{ backgroundColor: bank.color }}
                      >
                        {bank.shortName.charAt(0)}
                      </div>
                      <div className="bank-info">
                        <h4>{bank.shortName}</h4>
                        <p>Virtual Account</p>
                      </div>
                      <div className="bank-arrow">→</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {paymentStep === "upload" && (
              <div className="payment-upload">
                <div className="section-header">
                  <h3>Upload Bukti Pembayaran</h3>
                  <p>Transfer dan upload bukti pembayaran</p>
                </div>

                <div className="payment-details-card">
                  <div className="bank-header">
                    <div
                      className="bank-icon-large"
                      style={{
                        backgroundColor: bankOptions.find(
                          (b) => b.id === selectedBank
                        )?.color,
                      }}
                    >
                      {bankOptions
                        .find((b) => b.id === selectedBank)
                        ?.shortName.charAt(0)}
                    </div>
                    <div>
                      <h4>
                        {bankOptions.find((b) => b.id === selectedBank)?.name}
                      </h4>
                      <p>Virtual Account</p>
                    </div>
                  </div>

                  <div className="payment-info">
                    <div className="info-row">
                      <span className="label">Nomor Virtual Account</span>
                      <span className="value">
                        8277 {Math.floor(10000000 + Math.random() * 90000000)}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="label">Total Pembayaran</span>
                      <span className="value amount">
                        Rp {totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="upload-section">
                  <div className="upload-area">
                    <input
                      type="file"
                      id="paymentProof"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="upload-input"
                    />
                    <label htmlFor="paymentProof" className="upload-label">
                      <div className="upload-icon">📁</div>
                      <div className="upload-text">
                        {paymentProof ? (
                          <>
                            <span className="file-name">
                              ✅ {paymentProof.name}
                            </span>
                            <span className="file-size">
                              ({(paymentProof.size / 1024 / 1024).toFixed(2)}{" "}
                              MB)
                            </span>
                          </>
                        ) : (
                          <span className="upload-title">
                            Klik untuk upload bukti pembayaran *
                          </span>
                        )}
                      </div>
                    </label>
                  </div>

                  <div className="action-buttons">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setPaymentStep("select")}
                    >
                      ← Kembali
                    </button>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={handleConfirmPayment}
                      disabled={!paymentProof || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner"></span>
                          Memproses...
                        </>
                      ) : (
                        "Konfirmasi Pembayaran"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .file-name {
          color: #10b981;
          font-weight: 600;
        }

        .file-size {
          color: #6b7280;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
      `}</style>
    </div>
  );
}
