import React from "react";
import "../../../styles/testimony.css";

export default function Testimony() {
  const testimonials = [
    {
      title: "MPLS SMA 1 Jakarta",
      location: "Jakarta",
      date: "12 Jul 2024",
      time: "07:00 AM",
      client: "Panitia MPLS SMA 1",
      testimonial:
        "EduEvent Pro membantu kami menyusun konsep MPLS yang edukatif dan menyenangkan. Sangat membantu!",
      images: [
        "https://disdik.jabarprov.go.id/upload/Berita/9944062c3e.jpg",
        "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/13/2023/07/19/IMG-20230718-WA0003-3663172826.jpg",
      ],
    },
    {
      title: "LDKMS SMP 2 Bandung",
      location: "Bandung",
      date: "23 Sep 2024",
      time: "08:00 AM",
      client: "Pembina OSIS SMP 2",
      testimonial:
        "Pelatihan kepemimpinan berjalan sangat tertib dan disiplin berkat manajemen dari EduEvent Pro.",
      images: [
        "https://smpn2madiun.sch.id/wp-content/uploads/2022/10/LDK-OSIS-2022-2.jpg",
        "https://smpn2madiun.sch.id/wp-content/uploads/2022/10/LDK-OSIS-2022-1.jpg",
      ],
    },
    {
      title: "Seminar Parenting",
      location: "Tangerang",
      date: "15 Oct 2024",
      time: "09:00 AM",
      client: "Yayasan Pendidikan Mulia",
      testimonial:
        "Seminar berjalan sangat lancar. Pengaturan sound system dan tata letak sangat profesional.",
      images: [
        "https://www.alazhar-yogyakarta.sch.id/wp-content/uploads/2023/10/IMG_8746-1024x683.jpg",
        "https://www.alazhar-yogyakarta.sch.id/wp-content/uploads/2023/10/IMG_8750-1024x683.jpg",
      ],
    },
    {
      title: "Workshop Kurikulum",
      location: "Bogor",
      date: "5 Jan 2025",
      time: "08:30 AM",
      client: "Dinas Pendidikan Daerah",
      testimonial: "Workshop berjalan profesional dan rapi. Semua peserta puas dengan pelayanannya!",
      images: [
        "https://disdik.purwakartakab.go.id/uploads/berita/img_20221221_114336.jpg",
        "https://disdik.purwakartakab.go.id/uploads/berita/img_20221221_114341.jpg",
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
