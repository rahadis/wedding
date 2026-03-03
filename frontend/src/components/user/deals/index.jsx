import React, { useEffect, useState } from "react";
import "../../../styles/deals.css";
import { getPackages } from "../../../_services/packages";
import { packagesImage } from "../../../_api";
import { useNavigate } from "react-router";
import { FaCheckCircle, FaClock, FaUsers } from "react-icons/fa";

export default function Deals() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const packagesData = await getPackages();
        setPackages(packagesData.slice(0, 6)); // Show more programs
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectPackage = (pkg) => {
    navigate("/transaction", { state: { package: pkg } });
  };

  return (
    <section id="deals" className="py-5 bg-light deals-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-primary mb-3">
            Program Unggulan Kami
          </h2>
          <p className="text-muted fs-5 mx-auto" style={{ maxWidth: "700px" }}>
            Pilih program pendidikan terbaik yang dirancang khusus untuk meningkatkan kompetensi dan karakter siswa.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {packages.length > 0 ? (
            packages.map((pkg, i) => {
              const [paket, durasi, target] = (pkg.description || "").split("+");
              return (
                <div key={i} className="col-md-6 col-lg-4">
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-lift">
                    <div className="position-relative">
                      {pkg.image ? (
                        <img
                          src={`${packagesImage}/${pkg.image}`}
                          alt={pkg.name}
                          className="card-img-top"
                          style={{ height: "220px", objectFit: "cover" }}
                        />
                      ) : (
                        <div className="bg-secondary d-flex align-items-center justify-content-center" style={{ height: "220px" }}>
                          <span className="text-white">Flyer Event</span>
                        </div>
                      )}
                      <div className="position-absolute top-0 end-0 m-3">
                        <span className="badge bg-primary px-3 py-2 rounded-pill shadow">
                          {pkg.category_name || "Program"}
                        </span>
                      </div>
                    </div>

                    <div className="card-body p-4 d-flex flex-column">
                      <h4 className="card-title fw-bold mb-3">{pkg.name}</h4>
                      
                      <div className="d-flex gap-3 mb-3 text-muted small fw-medium">
                        <span className="d-flex align-items-center gap-1">
                          <FaClock className="text-primary" /> {durasi || "-"}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                          <FaUsers className="text-primary" /> {target || "-"}
                        </span>
                      </div>

                      <div className="mb-4">
                        <h6 className="fw-bold mb-2">Fasilitas & Materi:</h6>
                        <ul className="list-unstyled mb-0">
                          <li className="mb-1 small d-flex align-items-center gap-2">
                            <FaCheckCircle className="text-success" /> Paket {paket || "Standar"}
                          </li>
                          <li className="mb-1 small d-flex align-items-center gap-2">
                            <FaCheckCircle className="text-success" /> Pemateri Profesional
                          </li>
                          <li className="mb-1 small d-flex align-items-center gap-2">
                            <FaCheckCircle className="text-success" /> Sertifikat Peserta
                          </li>
                        </ul>
                      </div>

                      <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
                        <div>
                          <span className="text-muted small d-block">Harga (HTM)</span>
                          <span className="fs-4 fw-bold text-primary">
                            Rp {pkg.price.toLocaleString("id-ID")}
                          </span>
                        </div>
                        <button
                          className="btn btn-primary px-4 py-2 rounded-pill fw-bold"
                          onClick={() => handleSelectPackage(pkg)}
                        >
                          Daftar Sekarang
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // Fallback to static dummy if no data (for preview UI)
            <div className="text-center py-5">
              <p className="text-muted">Mengambil data program...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
