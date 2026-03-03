import React, { useState } from "react";
import "../../../styles/fact.css";

export default function Fact() {
  const faqs = [
    {
      question: "Layanan apa saja yang ditawarkan EduEvent Pro?",
      answer:
        "EduEvent Pro menyediakan layanan lengkap untuk kegiatan edukasi seperti MPLS, LDKMS, seminar akademik, hingga wisuda. Kami menangani konsep acara, pemateri, dekorasi, hingga dokumentasi.",
    },
    {
      question: "Apakah saya bisa menyesuaikan paket dengan kurikulum sekolah?",
      answer:
        "Tentu saja! Kami selalu menyesuaikan konsep acara dengan nilai-nilai dan kurikulum yang diterapkan di institusi pendidikan Anda.",
    },
    {
      question: "Bagaimana proses pemesanan di EduEvent Pro?",
      answer:
        "Anda bisa melakukan pemesanan melalui website kami. Tim kami akan segera menghubungi untuk diskusi detail konsep dan jadwal pelaksanaan.",
    },
    {
      question: "Apakah EduEvent Pro menyediakan pemateri atau instruktur?",
      answer:
        "Ya, kami memiliki jaringan pemateri profesional dan instruktur berpengalaman untuk berbagai tema pelatihan dan seminar.",
    },
    {
      question: "Area mana saja yang dilayani oleh EduEvent Pro?",
      answer:
        "EduEvent Pro melayani institusi pendidikan di seluruh Indonesia dengan sistem koordinasi yang terintegrasi secara profesional.",
    },
  ];
  

  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="container my-5">
      <h2 className="text-center fw-bold text-primary-custom mb-4">
        Mengapa Memilih EduEvent Pro?
        <br />
        Ini Jawabannya!
      </h2>

      <div className="accordion-modern">
        {faqs.map((faq, index) => (
          <div key={index} className="accordion-item-modern">
            <button
              className={`accordion-question ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => toggle(index)}
            >
              <span>{faq.question}</span>
              <span className="icon">{activeIndex === index ? "−" : "+"}</span>
            </button>
            <div
              className={`accordion-answer ${
                activeIndex === index ? "show" : ""
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
