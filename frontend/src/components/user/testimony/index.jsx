import React from "react";
import "../../../styles/testimony.css";

export default function Testimony() {
  const testimonials = [
    {
      title: "Wedding Intimate",
      location: "Bandung",
      date: "12 Mar 2025",
      time: "10:00 AM",
      client: "Andini & Rama",
      testimonial:
        "Pora EO mewujudkan pernikahan impian kami. Timnya ramah dan profesional!",
      images: [
        "https://media.viding.co/dmlkaW5nIGNvIGltYWdlIHByb3h5IGJ5IGZseS5pbw/rs:auto:0:0:1/g:no/aHR0cHM6Ly92aWRpbmcuc2dwMS5kaWdpdGFsb2NlYW5zcGFjZXMuY29tL2FydGljbGUvS2tuQm5uUXVETHB4bWxjdXBoZ3NaSWFXcklPZ3VWZGhIUDNoYWZHRC5qcGc.jpg",
        "https://zetizens.id/wp-content/uploads/2025/02/Intimate-Wedding.jpg",
      ],
    },
    {
      title: "Product Launch",
      location: "Jakarta",
      date: "23 Apr 2025",
      time: "02:00 PM",
      client: "PT Sinar Tech",
      testimonial:
        "Peluncuran produk kami berjalan lancar berkat dukungan luar biasa dari Pora EO.",
      images: [
        "https://media.licdn.com/dms/image/v2/D4D12AQGcjQYopfX1-Q/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1690199856774?e=2147483647&v=beta&t=ysAO2eguFY2HMz9Vou2p9NCpOnczsxUXBsQ-bcRRg20",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXOgs9jPDzYfs6L8dcfC20QmICuEZegu-6xyh_hcdX0AGD69pNQ6LsLhD-RR2PPeDGT1I&usqp=CAU",
      ],
    },
    {
      title: "Akustik Night",
      location: "Yogyakarta",
      date: "5 May 2025",
      time: "07:00 PM",
      client: "Komunitas Musik Jogja",
      testimonial:
        "Suasananya cozy dan intim, semua penonton happy banget. Great job Pora!",
      images: [
        "https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/indizone/2023/04/01/r8s9P5x/forest-music-festival-acara-musik-akustik-yang-digelar-di-hutan28.jpg",
        "https://humas.paserkab.go.id/assets/upload/26-08-2023-06-34-59-8279.jpg",
      ],
    },
    {
      title: "Seminar Digital",
      location: "Surabaya",
      date: "9 Jun 2025",
      time: "01:00 PM",
      client: "Digital Insight",
      testimonial: "Seminar berjalan profesional dan rapi. Semua peserta puas!",
      images: [
        "https://rectmedia.com/wp-content/uploads/2018/08/seminar-digital-marketing-semarang-1.jpg",
        "https://rectmedia.com/wp-content/uploads/2018/04/IMG_8726.jpg",
      ],
    },
  ];

  return (
    <section className="container my-5">
      <h2 className="mb-3 fw-bold text-center text-primary-custom">
        Apa Kata Klien Kami
      </h2>
      <p className="text-center text-muted mb-4">
        Cerita nyata dari acara nyata — kepercayaan yang tumbuh dari kepuasan
        klien kami.
      </p>

      <div className="row g-4">
        {testimonials.map((event, index) => {
          const carouselId = `carousel-${index}`;
          return (
            <div className="col-md-3" key={index}>
              <div className="card h-100 shadow-sm border-0 rounded-4 event-card overflow-hidden">
                {/* Carousel */}
                <div
                  id={carouselId}
                  className="carousel slide"
                  data-bs-ride="carousel"
                  data-bs-interval="2000"
                >
                  <div className="carousel-inner" style={{ height: "180px" }}>
                    {event.images.map((img, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`carousel-item ${
                          imgIndex === 0 ? "active" : ""
                        }`}
                      >
                        <img
                          src={img}
                          className="d-block w-100"
                          style={{ objectFit: "cover", height: "180px" }}
                          alt={`${event.title} ${imgIndex + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-body">
                  <h5 className="card-title fw-semibold text-primary-custom">
                    {event.title}
                  </h5>
                  <p className="card-text text-muted small mb-1">
                    <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
                    {event.location}
                  </p>
                  <p className="card-text text-muted small mb-2">
                    <i className="bi bi-calendar-event me-2 text-primary"></i>
                    {event.date} • {event.time}
                  </p>
                  <p className="fst-italic text-muted small">
                    “{event.testimonial}”
                  </p>
                  <p className="fw-medium text-end text-dark mb-0">
                    — {event.client}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
