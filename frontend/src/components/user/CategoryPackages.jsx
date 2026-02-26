import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPackages } from "../../_services/packages";
import { packagesImage } from "../../_api";
import "../../styles/CategoryPackage.css";
import { getCategories } from "../../_services/categories";

export default function CategoryPackage() {
  const { id } = useParams();
  const [packages, setPackages] = useState([]);
  const [, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesData, packagesData] = await Promise.all([
        getCategories(),
        getPackages(),
      ]);
      setCategories(categoriesData);

      const categoryId = Number.parseInt(id);
      const filteredPackages = packagesData.filter(
        (pkg) => pkg.categories_id === categoryId
      );

      setPackages(filteredPackages);
    };

    fetchData();
  }, [id]);

  // Format harga ke Rupiah
  const formatPrice = (price) => {
    return "Rp " + price.toLocaleString("id-ID");
  };

  // Hitung harga asli (asumsi diskon 30%)
  const getOriginalPrice = (currentPrice) => {
    return Math.round(currentPrice / 0.7);
  };

  // Hitung persentase diskon dari harga asli
  const getDiscount = (currentPrice, originalPrice) => {
    return Math.round((1 - currentPrice / originalPrice) * 100);
  };

  const getFeatures = (description) => {
    return description
      .split("+")
      .map((item) => item.trim())
      .filter((item) => item !== "");
  };

 const handleSelectPackage = (pkg) => {
  const user = JSON.parse(localStorage.getItem("userInfo")); 

    if (!user || !user.id) {
      navigate("/login");
      return;
    }

    navigate("/transaction", { state: { package: pkg } });
  };


  
  const categoryName = packages[0]?.category_name || "Unknown";

  return (
    <div className="category-package">
      <div className="container">
        {/* Header */}
        <div className="header">
          <button className="back-btn" onClick={() => navigate("/service")}>
            ← Kembali
          </button>
          <h1>Paket {categoryName}</h1>
          <p>Pilih paket yang sesuai dengan kebutuhan acara Anda</p>
        </div>

        {/* Packages */}
        <div className="packages-grid">
          {packages.map((pkg) => {
            const originalPrice = getOriginalPrice(pkg.price);
            const discount = getDiscount(pkg.price, originalPrice);
            const features = getFeatures(pkg.description);
            const packageImage = pkg.image
              ? `${packagesImage}/${pkg.image}`
              : "/images/default_package.jpg";
          
            return (
              <div key={pkg.id} className="package-card">
                {/* Gambar */}
                <div className="image-container">
                  <img src={packageImage} alt={pkg.name} />

                  <div className="discount">HEMAT {discount}%</div>
                </div>

                {/* Konten */}
                <div className="content">
                  <h3>{pkg.name}</h3>

                  {/* Fitur */}
                  <div className="features">
                    <h4>Yang Anda Dapatkan:</h4>
                    <ul>
                      {features.map((feature, index) => (
                        <li key={index}>
                          <span className="check">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Harga */}
                  <div className="price">
                    <span className="old-price">
                      {formatPrice(originalPrice)}
                    </span>
                    <span className="new-price">{formatPrice(pkg.price)}</span>
                  </div>

                  {/* Tombol */}
                  <button
                    className="select-btn"
                    onClick={() => handleSelectPackage(pkg)}
                    style={{ cursor: "pointer" }}
                  >
                    Pilih Paket Ini
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}