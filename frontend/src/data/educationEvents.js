// Education event types and packages
export const EVENT_TYPES = {
  MPLS: {
    id: "mpls",
    name: "MPLS",
    fullName: "Masa Pengenalan Lingkungan Sekolah",
    color: "#0066cc",
    icon: "📚",
    targetAudience: "SMP/MTs, SMK/SMA/MA",
    packages: [
      {
        name: "Gold",
        duration: "4 Jam",
        price: 1000000,
        facilities: [
          "Pemateri",
          "Fasilitator",
          "Konsep & Rundown Acara",
          "Tim Dokumentasi",
          "Konsumsi",
        ],
      },
      {
        name: "Silver",
        duration: "4 Jam",
        price: 700000,
        facilities: ["Pemateri", "Fasilitator", "Tim Dokumentasi"],
      },
      {
        name: "Classic",
        duration: "4 Jam",
        price: 500000,
        facilities: ["Fasilitator", "Tim Dokumentasi"],
      },
    ],
  },
  LDKMS: {
    id: "ldkms",
    name: "LDKMS",
    fullName: "Latihan Dasar Kepemimpinan Mahasiswa Sekolah",
    color: "#00b4d8",
    icon: "👥",
    targetAudience: "SMA/SMK/MA, Mahasiswa",
    packages: [
      {
        name: "Advance Leader",
        duration: "3 Hari 2 Malam",
        price: 1500000,
        facilities: [
          "Fasilitator Berpengalaman",
          "Akomodasi & Konsumsi",
          "Materi Kepemimpinan",
          "Dokumentasi",
        ],
      },
      {
        name: "Intermediate Leader",
        duration: "2 Hari 1 Malam",
        price: 1000000,
        facilities: [
          "Fasilitator",
          "Akomodasi & Konsumsi",
          "Materi Kepemimpinan",
        ],
      },
      {
        name: "Basic Leader",
        duration: "1 Hari",
        price: 700000,
        facilities: ["Fasilitator", "Materi Dasar", "Konsumsi"],
      },
    ],
  },
  BIMBEL_SNBT: {
    id: "bimbel_snbt",
    name: "Bimbel SNBT",
    fullName: "Bimbingan Belajar Seleksi Nasional",
    color: "#48cae4",
    icon: "📖",
    targetAudience: "SMA/SMK/MA Kelas 12",
    materials: [
      "TPS",
      "Literasi BI",
      "Literasi Inggris",
      "Penalaran Matematika",
      "Try Out",
    ],
    facilities: [
      "Mentor Bersertifikat",
      "Modul Digital",
      "Simulasi Try Out",
      "Progress Report",
    ],
  },
  SEMINAR: {
    id: "seminar",
    name: "Seminar",
    fullName: "Seminar Pendidikan",
    color: "#90e0ef",
    icon: "🎤",
    targetAudience: "Umum, Pelajar, Pendidik",
    materials: [
      "Motivasi Akademik",
      "Personal Branding",
      "Public Speaking",
    ],
    facilities: [
      "Pemateri Profesional",
      "Moderator",
      "Dokumentasi",
      "Sertifikat",
    ],
  },
  OUTBOND: {
    id: "outbond",
    name: "Outbond",
    fullName: "Kegiatan Outbound Tim",
    color: "#10b981",
    icon: "🏕️",
    targetAudience: "Sekolah, Komunitas, Perusahaan",
    materials: [
      "Team Building",
      "Leadership Simulation",
      "Problem Solving",
    ],
    facilities: [
      "Fasilitator Terlatih",
      "Peralatan Outbond",
      "Dokumentasi",
      "Konsumsi",
    ],
  },
};

// Dummy event data for UI preview
export const DUMMY_EVENTS = [
  {
    id: 1,
    event_name: "MPLS 2024 - SMA Negeri 1",
    event_type: "mpls",
    package: "Gold",
    duration: "4 Jam",
    target_peserta: 500,
    harga: 1000000,
    status: "Paid",
    transaction_date: "2024-01-15",
    guest_count: 480,
  },
  {
    id: 2,
    event_name: "LDKMS Batch 3",
    event_type: "ldkms",
    package: "Advance Leader",
    duration: "3 Hari 2 Malam",
    target_peserta: 60,
    harga: 1500000,
    status: "Paid",
    transaction_date: "2024-01-12",
    guest_count: 58,
  },
  {
    id: 3,
    event_name: "Bimbel SNBT - Kelas A",
    event_type: "bimbel_snbt",
    package: "Regular",
    duration: "8 Minggu",
    target_peserta: 30,
    harga: 2500000,
    status: "Waiting verification",
    transaction_date: "2024-01-20",
    guest_count: 28,
  },
  {
    id: 4,
    event_name: "Seminar Personal Branding",
    event_type: "seminar",
    package: "Standard",
    duration: "2 Jam",
    target_peserta: 200,
    harga: 800000,
    status: "Paid",
    transaction_date: "2024-01-18",
    guest_count: 195,
  },
  {
    id: 5,
    event_name: "Outbond PT Tech Indonesia",
    event_type: "outbond",
    package: "Corporate",
    duration: "1 Hari",
    target_peserta: 100,
    harga: 5000000,
    status: "Paid",
    transaction_date: "2024-01-10",
    guest_count: 95,
  },
  {
    id: 6,
    event_name: "MPLS 2024 - SMA Negeri 5",
    event_type: "mpls",
    package: "Silver",
    duration: "4 Jam",
    target_peserta: 400,
    harga: 700000,
    status: "Paid",
    transaction_date: "2024-01-08",
    guest_count: 385,
  },
];

// Event type breakdown statistics
export const getEventTypeStats = () => {
  const stats = {};
  Object.keys(EVENT_TYPES).forEach((key) => {
    stats[key] = Math.floor(Math.random() * 20) + 5;
  });
  return stats;
};

// Dashboard statistics
export const getDashboardStats = () => {
  const totalEvents = DUMMY_EVENTS.length;
  const totalPeserta = DUMMY_EVENTS.reduce((sum, event) => sum + event.guest_count, 0);
  const totalPendapatan = DUMMY_EVENTS.reduce((sum, event) => sum + event.harga, 0);
  const paidEvents = DUMMY_EVENTS.filter((e) => e.status === "Paid").length;

  return {
    totalEvents,
    totalPeserta,
    totalPendapatan,
    paidTransactions: paidEvents,
    pendingTransactions: totalEvents - paidEvents,
    conversionRate: ((paidEvents / totalEvents) * 100).toFixed(1),
  };
};
