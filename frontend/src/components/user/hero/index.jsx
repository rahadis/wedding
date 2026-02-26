import React from "react";
import "../../../styles/hero.css";

export default function Hero() {
  const stats = [
    { value: "150+", label: "Events handled" },
    { value: "120+", label: "Happy clients" },
    { value: "20K+", label: "Total attendees" },
  ];

  return (
    <>
      <div
        id="home"
        className="hero-container d-flex align-items-center justify-content-center text-center"
      >
        <div className="hero-content w-100 px-0">
          <h1 className="hero-title fw-bold mb-4">
            MAKE YOU’RE BEAUTIFUL MOMENT WITH <br /> EVENT PORA
          </h1>
          <hr className="hero-divider" />
        </div>
      </div>

      <section className="bg-light py-5">
        <div className="container text-center">
          <div className="row justify-content-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="col-6 col-md-4 mb-4 mb-md-0 stats-col"
              >
                <h2 className="text-primary fw-bold">{stat.value}</h2>
                <p className="text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
