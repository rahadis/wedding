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
          Kami adalah jasa Event Planner Organizer secara Online dan Offline profesional yang siap menciptakan nuansa acara berkesan dan tentunya menjadi memori terbaik. Tim EO kami akan membantu Anda menemukan konsep terbaik untuk acara seminar, konser musik, bazaar, outbound dan event lain yang tidak akan terlupakan!
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
            Event Pora melayani jasa event organizer (EO) di Surabaya yang telah berpengalaman dalam menyelenggarakan berbagai event indoor ataupun outdoor, seperti bazaar produk perusahaan, wisuda kuliah, konser musik, hingga event outbound dengan konsep yang unik dan menarik.
            <br /><br />
            Tim event organizer (EO) Event Pora akan merancang acara sesuai dengan kebutuhan Anda dan membuka diskusi untuk bertukar ide rancangan acara yang akan diselenggarakan nanti. Beberapa perusahaan telah mempercayakan EO kami untuk menyelenggarakan event bazaar serta kegiatan outbound dan kami juga sebagai EO profesional selalu menentukan venue yang tepat untuk acara Anda. Kami tidak hanya berkontribusi untuk acara perkantoran saja, tapi kami juga memberikan acara yang meriah untuk anak-anak sekolah/kuliah, nikah online atau offline, reuni keluarga, pagelaran, hingga beberapa jenis acara yang meriah dan mengesankan.
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