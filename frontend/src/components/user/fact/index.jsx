import React, { useState } from "react";
import "../../../styles/fact.css";

export default function Fact() {
  const faqs = [
    {
      question: "Layanan apa saja yang ditawarkan EduEvent Pro?",
      answer:
        "EduEvent Pro menyediakan layanan lengkap untuk berbagai jenis acara pendidikan seperti MPLS, LDKMS, Seminar, hingga Workshop. Termasuk dekorasi, sistem suara, katering, dan dokumentasi.",
    },
    {
      question: "Apakah saya bisa meminta tema acara khusus?",
      answer:
        "Tentu saja! Tim kreatif EduEvent Pro siap mewujudkan ide dan konsep acara impian Anda.",
    },
    {
      question: "Bagaimana proses pemesanan di EduEvent Pro?",
      answer:
        "Anda bisa memesan langsung melalui website kami atau konsultasi via WhatsApp. Setelah dikonfirmasi, kami akan mengirimkan invoice dan timeline produksi acara.",
    },
    {
      question: "Apakah saya bisa membatalkan setelah booking?",
      answer:
        "Bisa, namun akan dikenakan biaya pembatalan sesuai dengan waktu pembatalan berdasarkan kebijakan EduEvent Pro.",
    },
    {
      question: "EduEvent Pro melayani area mana saja?",
      answer:
        "Kami berbasis di Jawa Barat, namun EduEvent Pro siap mengorganisir acara di seluruh Indonesia dengan penyesuaian transportasi dan akomodasi.",
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
