export default function Contactus() {
  return (
    <section className="container my-5" id="contact">
      <div className="row g-0 shadow rounded overflow-hidden">
        {/* Info Kontak (kanan) */}
        <div
          className="col-md-6 p-4 d-flex flex-column justify-content-center align-items-start"
          style={{ background: "#fff", minHeight: "520px", textAlign: "left" }}
        >
          <h4
            className="mb-4"
            style={{
              color: "#BC691C",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            Kontak
          </h4>
          <div className="mb-3 d-flex align-items-center justify-content-start" style={{ color: "#1E1E1E", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}>
            <i className="fa-solid fa-phone me-3"></i>
            <span style={{ fontWeight: 500 }}>(085)425367143</span>
          </div>
          <div className="mb-3 d-flex align-items-center justify-content-start" style={{ color: "#1E1E1E", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}>
            <i className="fa-brands fa-instagram me-3"></i>
            <span style={{ fontWeight: 500 }}>@event.pora</span>
          </div>
          <div className="mb-3 d-flex align-items-center justify-content-start" style={{ color: "#1E1E1E", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}>
            <i className="fa-brands fa-youtube me-3"></i>
            <span style={{ fontWeight: 500 }}>@eventpora.official</span>
          </div>
          <div className="mb-3 d-flex align-items-start justify-content-start" style={{ color: "#1E1E1E", fontFamily: "Poppins, sans-serif", fontWeight: 500 }}>
            <i className="fa-solid fa-location-dot me-3 mt-1"></i>
            <span style={{ fontWeight: 500, textAlign: "left" }}>
              Jl. Jend. Basuki Rachmat No. 8-12, Surabaya, Jawa Timur 60261, Indonesia.
            </span>
          </div>
          <div className="rounded overflow-hidden mt-3" style={{ border: "1px solid #eee", width: "100%", minHeight: "160px" }}>
            <iframe
              title="maps"
              src="https://www.google.com/maps?q=-7.265757,112.752088&z=15&output=embed"
              width="100%"
              height="160"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Form (kiri) */}
        <div
          className="col-md-6 d-flex flex-column justify-content-center align-items-center p-4"
          style={{
            backgroundImage: "url('/BgFlower.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "520px",
          }}
        >
          <div className="w-100" style={{ maxWidth: 370 }}>
            <h4
              className="mb-4 text-center"
              style={{
                color: "#fff",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              TINGGALKAN PESAN
            </h4>
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nama Lengkap"
                  style={{
                    background: "#FFF5D4",
                    color: "#64748B",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nomor Telpon"
                  style={{
                    background: "#FFF5D4",
                    color: "#64748B",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  style={{
                    background: "#FFF5D4",
                    color: "#64748B",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                  }}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Pesan"
                  style={{
                    background: "#FFF5D4",
                    color: "#64748B",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                  }}
                  rows={3}
                ></textarea>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn"
                  style={{
                    background: "#BC691C",
                    color: "#fff",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    minWidth: "120px",
                    padding: "8px 0",
                  }}
                >
                  Kirim Pesan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}