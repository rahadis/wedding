import React from "react";
import "../../../styles/testimony.css";
import { FaGraduationCap, FaQuoteLeft } from "react-icons/fa";

export default function Testimony() {
  const testimonials = [
    {
      title: "MPLS Modern",
      location: "SMAN 1 Bandung",
      date: "Juli 2024",
      client: "Wakasek Kesiswaan",
      testimonial:
        "Program MPLS tahun ini sangat berbeda dan jauh lebih menarik. Siswa baru terlihat antusias dan materi yang dibawakan EduEvent sangat solutif!",
      images: [
        "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      title: "LDKMS Advance",
      location: "SMP IT Nurul Fikri",
      date: "Agustus 2024",
      client: "Pembina OSIS",
      testimonial:
        "Simulasi kepemimpinannya sangat menantang dan mendidik. Anak-anak OSIS jadi lebih solid dan punya inisiatif tinggi setelah ikut program ini.",
      images: [
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      title: "Seminar SNBT",
      location: "SMA Kristen 1 Jakarta",
      date: "September 2024",
      client: "Humas Sekolah",
      testimonial: "Strategi yang dibagikan sangat praktis. Try Out simulasinya juga mirip banget sama sistem asli. Membantu banget buat anak kelas 12.",
      images: [
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      title: "Outbound Leadership",
      location: "SMK Telkom Malang",
      date: "Oktober 2024",
      client: "Guru Pendamping",
      testimonial: "Fasilitatornya seru-seru dan alat outbond-nya aman semua. Outbound bukan cuma main, tapi beneran belajar team building.",
      images: [
        "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      ],
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold text-primary mb-3">
            Apa Kata Mitra Kami?
          </h2>
          <p className="text-muted mx-auto fs-5" style={{ maxWidth: "700px" }}>
            Cerita inspiratif dari berbagai sekolah yang telah mempercayakan event edukasinya kepada EduEvent Pro.
          </p>
        </div>

        <div className="row g-4">
          {testimonials.map((event, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-lift bg-white">
                <div style={{ height: "200px", position: "relative" }}>
                   <img
                     src={event.images[0]}
                     className="w-100 h-100"
                     style={{ objectFit: "cover" }}
                     alt={event.title}
                   />
                   <div className="position-absolute bottom-0 start-0 p-3 w-100" style={{ background: "linear-gradient(to top, rgba(10,35,87,0.8), transparent)" }}>
                      <span className="badge bg-white text-primary rounded-pill small">
                        {event.title}
                      </span>
                   </div>
                </div>

                <div className="card-body p-4 position-relative">
                  <div className="position-absolute top-0 end-0 m-3 opacity-10">
                    <FaQuoteLeft size={40} className="text-primary" />
                  </div>
                  
                  <p className="fst-italic text-dark mb-4 small" style={{ lineHeight: "1.6" }}>
                    “{event.testimonial}”
                  </p>
                  
                  <div className="d-flex align-items-center gap-2 mt-auto">
                    <div className="bg-primary p-2 rounded-circle">
                       <FaGraduationCap color="white" size={14} />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0 small text-primary">{event.client}</h6>
                      <p className="text-muted mb-0" style={{ fontSize: "11px" }}>
                        {event.location} • {event.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
