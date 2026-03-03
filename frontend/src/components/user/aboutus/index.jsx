export default function AboutUs() {
  return (
    <section className="container my-5" id="about">
      {/* Bagian 1 */}
      <div
        className="py-5 px-4 px-md-5"
        style={{
          backgroundImage: "url('/BgFlower.png')",
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
          EVENT ORGANIZER
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
          Kami adalah spesialis Event Organizer Pendidikan yang siap menciptakan momen akademik yang berkesan. Tim kami ahli dalam merancang MPLS, LDKMS, Wisuda, dan Seminar Edukasi yang inspiratif bagi siswa dan instansi pendidikan.
        </p>
      </div>

      {/* Bagian 2 */}
      <div className="row align-items-center mb-4 px-1 px-md-4 px-lg-5">
        <div className="col-md-6">
          <h3
            style={{
              color: "#BC691C",
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
            EduEvent Pro melayani jasa event organizer (EO) pendidikan yang telah berpengalaman dalam menyelenggarakan berbagai event akademik, seperti MPLS, LDKMS, wisuda, hingga seminar edukasi dengan konsep yang inspiratif dan menarik.
            <br /><br />
            Tim event organizer (EO) EduEvent Pro akan merancang acara sesuai dengan kebutuhan pendidikan Anda dan membuka diskusi untuk bertukar ide rancangan acara yang akan diselenggarakan nanti. Berbagai instansi pendidikan telah mempercayakan EO kami untuk menyelenggarakan kegiatan kesiswaan serta seminar nasional dan kami juga sebagai EO profesional selalu menentukan venue yang tepat untuk acara Anda. Kami fokus pada memberikan pengalaman yang meriah dan edukatif untuk siswa, guru, hingga praktisi pendidikan.
          </p>
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <img
            src="/image1.png"
            alt="EduEvent Pro"
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