import { useEffect, useState } from "react";
import { getCategories } from "../../../_services/categories";

export default function Highlight() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesData] = await Promise.all([getCategories()]);
      setCategories(categoriesData);
    };

    fetchData();
  }, []);

  const icon = [
    { name: "Wedding", icon: "fa-ring" },
    { name: "Birthday", icon: "fa-birthday-cake" },
    { name: "Concert & Entertainment", icon: "fa-briefcase" },
    { name: "Graduation Party", icon: "fa-graduation-cap" },
    { name: "Engagement", icon: "fa-heart" },
  ];
  
  return (
    <section
      className="container my-5 text-center"
      style={{ maxWidth: "100%", paddingLeft: 20, paddingRight: 20 }}
    >
      <h2 className="text-center fw-bold text-primary-custom mb-4">
        Butuh Acara Apa? Kami Siap Wujudkan
      </h2>
      <div
        className="d-flex flex-wrap justify-content-center"
        style={{
          gap: "32px",
          justifyContent: "space-between",
        }}
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-light d-flex flex-column align-items-center justify-content-center"
            style={{
              flex: "1 1 14%",
              maxWidth: "14%",
              minWidth: 120,
              height: 120,
              borderRadius: "10px",
              padding: "20px",
              boxSizing: "border-box",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div
              style={{
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                borderRadius: "10px",
                marginBottom: 12,
              }}
            >
              <i
                className={`fa-solid ${
                  icon.find((item) => item.name === cat.category_name)?.icon ||
                  "fa-star"
                }`}
                style={{ fontSize: "28px", color: getColor(index) }}
              ></i>
            </div>
            <span
              style={{
                fontWeight: "600",
                fontSize: "13px",
                color: "#222",
                textAlign: "center",
                userSelect: "none",
              }}
            >
              {cat.category_name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function getColor(index) {
  const colors = ["#E74C3C", "#8E44AD", "#F1C40F", "#1ABC9C", "#3498DB"];
  return colors[index % colors.length];
}
