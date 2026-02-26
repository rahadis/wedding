import React, { useEffect, useState } from "react";
import "../../../styles/deals.css";
import { getPackages } from "../../../_services/packages";
import { packagesImage } from "../../../_api";
import { useNavigate } from "react-router";

export default function Deals() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const [packagesData] = await Promise.all([getPackages()]);
      setPackages(packagesData.slice(0, 3));
    };

    fetchData();
  }, []);

  const handleSelectPackage = (pkg) => {
    navigate("/transaction", { state: { package: pkg } });
  };

  return (
    <section className="container my-5 deals-section">
      <h2 className="text-center fw-bold text-primary-custom mb-4">
        Paling Laris & Paling Dicari!
      </h2>
      <div className="row justify-content-center gx-4 gy-5">
        {packages.map((pkg, i) => (
          <div
            key={i}
            className="col-sm-8 col-md-5 col-lg-4"
            style={{ maxWidth: "350px" }}
          >
            <div className="card card-deal h-100 custom-radius">
              {pkg.image && (
                <img
                  src={`${packagesImage}/${pkg.image}`}
                  alt={pkg.name}
                  className="card-img-top"
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{pkg.name}</h5>
                <ul>
                  <div className="features">
                    <ul>
                      {(pkg.description || "").split("+").map((item, idx) => (
                        <li key={idx}>{item.trim()}</li>
                      ))}
                    </ul>
                  </div>
                </ul>

                <div className="price">
                  Rp {pkg.price.toLocaleString("id-ID")}
                </div>
                <button
                  className="select-btn mt-auto"
                  onClick={() => handleSelectPackage(pkg)}
                >
                  Pesan Sekarang
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
