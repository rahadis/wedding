export default function AboutUs() {
  return (
    <section className="container my-5" id="about">
      {/* Bagian 1 */}
      <div
        className="py-5 px-4 px-md-5"
        style={{
          backgroundColor: "#0a2357",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "16px",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            color: "#fff",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            letterSpacing: "1px",
            marginBottom: "24px",
            fontSize: "3rem",
            textShadow: "0 2px 16px rgba(0,0,0,0.18)"
          }}
        >
          EDUCATIONAL EVENT EXPERTS
        </h2>
        <p
          style={{
            color: "#fff",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: "0.8rem",
            maxWidth: 800,
            margin: "0 auto",
            textShadow: "0 2px 8px rgba(0,0,0,0.10)"
          }}
        >
          EduEvent Pro adalah mitra profesional dalam menyelenggarakan berbagai kegiatan edukasi, mulai dari orientasi siswa (MPLS), pelatihan kepemimpinan (LDKMS), hingga seminar akademik. Kami berkomitmen menciptakan pengalaman belajar yang inspiratif dan berkesan bagi seluruh civitas akademika.
        </p>
      </div>

      {/* Bagian 2 */}
      <div className="row align-items-center mb-4 px-1 px-md-4 px-lg-5">
        <div className="col-md-6">
          <h3
            style={{
              color: "#0a2357",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              marginBottom: "18px",
            }}
          >
            Tentang Kami
          </h3>
          <p
            style={{
              color: "#000",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: "1rem",
              textAlign: "justify",
            }}
          >
            EduEvent Pro adalah penyedia layanan manajemen acara pendidikan yang berfokus pada pengembangan potensi siswa dan mahasiswa. Dengan pengalaman luas dalam menangani berbagai skala acara sekolah dan universitas, kami hadir untuk mempermudah institusi dalam menyelenggarakan kegiatan berkualitas tinggi.
            <br /><br />
            Tim kami terdiri dari para ahli yang memahami dinamika dunia pendidikan. Kami melayani berbagai kebutuhan, mulai dari Masa Pengenalan Lingkungan Sekolah (MPLS), Latihan Dasar Kepemimpinan Mahasiswa/Siswa (LDKMS), seminar nasional, hingga wisuda. EduEvent Pro berkomitmen untuk memberikan solusi kreatif dan terorganisir, sehingga institusi pendidikan dapat fokus pada esensi pembelajaran sementara kami menangani detail operasional acara.
          </p>
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <img
            src="/image1.png"
            alt="Event Pora"
            style={{
              maxWidth: "100%",
              borderRadius: "12px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            }}
          />
        </div>
      </div>

      {/* Baris gambar bawah */}
      <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
        <img src="/image2.png" alt="Event 2" style={{ height: 40, borderRadius: 8, margin: "0 12px" }} />
        <img src="/image3.png" alt="Event 3" style={{ height: 40, borderRadius: 8, margin: "0 12px" }} />
        <img src="/image4.png" alt="Event 4" style={{ height: 40, borderRadius: 8, margin: "0 12px" }} />
        <img src="/image5.png" alt="Event 5" style={{ height: 40, borderRadius: 8, margin: "0 12px" }} />
      </div>
    </section>
  );
}