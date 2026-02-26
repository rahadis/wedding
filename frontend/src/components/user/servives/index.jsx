import { useNavigate } from "react-router-dom";
import "../../../styles/services.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { getCategories } from "../../../_services/categories";
import Footer from "../footer";

export default function Services() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesData] = await Promise.all([getCategories()]);
      setCategories(categoriesData);
    };

    fetchData();
  }, []);

  const getImageByCategoryId = (id) => {
    const imageMap = {
      1: "/paket1.jpg",
      2: "/paket2.jpeg",
      3: "/paket3.jpeg",
      4: "/paket4.jpg",
      5: "/paket5.jpg",
    };

    return imageMap[id] || "/blank.jpg";
  };
  

  const handleBooking = (categoryId) => {
    navigate(`/kategori/${categoryId}`);
  };

  return (
    <div className="services-wrapper">
      <section className="services-section">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 text-center mb-5">
              <h2 className="services-title">Services & Packages</h2>
              <p className="services-subtitle-desc">
                Pilih kategori event yang sesuai dengan kebutuhan Anda
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12">
              <div className="categories-grid">
                {categories.map((cat) => (
                  <div className="category-card" key={cat.id}>
                    <div className="category-image-container">
                      <img
                        src={getImageByCategoryId(cat.id)}
                        alt={cat.name}
                        className="category-image"
                      />

                      <div className="category-overlay">
                        <button
                          className="category-btn"
                          onClick={() => handleBooking(cat.id)}
                        >
                          Lihat Paket
                        </button>
                      </div>
                    </div>
                    <div className="category-content">
                      <h5 className="category-name">{cat.category_name}</h5>
                      <p className="category-description">{cat.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
