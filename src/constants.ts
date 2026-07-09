export interface ElementInformatika {
  id: string;
  nama: string;
  cp: string;
  tp_default: string;
  topik_default: string;
}

export const ELEMEN_INFORMATIKA_VIII: ElementInformatika[] = [
  {
    id: "IP",
    nama: "Informatika dan Pembelajarannya (IP)",
    cp: "Pada akhir fase D, peserta didik mampu memahami pentingnya informatika, merefleksikan pembelajaran informatika kelas VII, serta merencanakan peta belajar informatika di kelas VIII.",
    tp_default: "1. Merefleksikan materi Informatika yang sudah diperoleh di kelas VII.\n2. Menjelaskan materi Informatika yang akan dipelajari di kelas VIII.",
    topik_default: "Refleksi Pembelajaran Kelas VII & Perencanaan Pembelajaran Kelas VIII"
  },
  {
    id: "BK",
    nama: "Berpikir Komputasional (BK)",
    cp: "Pada akhir fase D, peserta didik mampu menerapkan berpikir komputasional untuk menghasilkan beberapa solusi dari persoalan dengan data diskrit bervolume kecil serta mendisposisikan berpikir komputasional dalam bidang lain terutama dalam literasi, numerasi, dan literasi sains (computationally literate)",
    tp_default: "1. Mengenal dan mengimplementasikan konsep fungsi (input-proses-output) sebagai mesin komputasi, dan mengeksekusi mesin.\n2. Memodelkan persoalan logika dalam bentuk himpunan.\n3. Mengoperasikan bilangan dalam berbagai representasi.\n4. Mengenal organisasi data terstruktur as tumpukan (stack).\n5. Menyelesaikan persoalan algoritma sederhana.",
    topik_default: "Fungsi (Input-Proses-Output), Himpunan dan Sistem Bilangan, Algoritma, serta Struktur Data (Stack)"
  },
  {
    id: "TIK",
    nama: "Teknologi Informasi dan Komunikasi (TIK)",
    cp: "Pada akhir fase D, peserta didik mampu memanfaatkan aplikasi surel dalam berkomunikasi, aplikasi peramban dalam pencarian informasi di internet, CMS dalam pengelolaan konten digital, dan memanfaatkan perkakas TIK untuk mendukung pembuatan laporan, presentasi serta analisis dan interpretasi data.",
    tp_default: "1. Memahami struktur dari konten dan fitur utama aplikasi pengolah kata, pengolah lembar kerja, dan presentasi.\n2. Membuat laporan dengan menyalin dan memindahkan konten dari satu aplikasi ke aplikasi lain yang dirancang sebagai satu paket aplikasi, yaitu aplikasi perkantoran.\n3. Merangkum, mengevaluasi, dan menyimpulkan beberapa bahan bacaan dalam bentuk digital (file) yang berbeda format, dan merefleksikan isinya.\n4. Menggunakan laboratorium maya untuk eksplorasi dan belajar mandiri dalam menunjang mata pelajaran lainnya.",
    topik_default: "Konsep Perangkat Lunak, Integrasi Konten Aplikasi Perkantoran, Merangkum Narasi Digital, dan Eksplorasi Laboratorium Maya"
  },
  {
    id: "SK",
    nama: "Sistem Komputer (SK)",
    cp: "Pada akhir fase D, peserta didik mampu mendeskripsikan komponen, fungsi, dan cara kerja komputer yang membentuk sebuah sistem komputasi, serta menjelaskan proses dan penggunaan kodifikasi untuk penyimpanan data dalam memori komputer.",
    tp_default: "1. Memahami fungsi sistem komputer (perangkat keras dan sistem operasi) yang memungkinkannya untuk menerima input, menyimpan, memproses dan menyajikan data sesuai dengan spesifikasinya.\n2. Memahami mekanisme internal penyimpanan data pada sistem komputer.\n3. Memahami mekanisme internal pemrosesan data pada unit pengolahan logika dan aritmetika CPU.",
    topik_default: "Komponen Sistem Komputer, Pengalamatan Memori (Sandi Heksadesimal), dan Central Processing Unit (Sirkuit Gerbang Logika)"
  },
  {
    id: "JKI",
    nama: "Jaringan Komputer dan Internet (JKI)",
    cp: "Pada akhir fase D, peserta didik menjelaskan Internet dan jaringan lokal, komunikasi data via ponsel, konektivitas internet melalui jaringan kabel dan nirkabel (bluetooth, wifi, internet), dan memahami enkripsi untuk memproteksi data, serta mampu melakukan koneksi perangkat ke jaringan lokal maupun internet yang tersedia.",
    tp_default: "1. Memahami internet dan jaringan lokal.\n2. Memahami cara kerja pengiriman data dalam konektivitas jaringan.\n3. Memahami teknologi komunikasi pada ponsel.\n4. Memahami bagaimana terhubung ke internet secara aman.",
    topik_default: "Konektivitas Jaringan Komputer, Komunikasi Data pada Ponsel, dan Terhubung ke Internet dengan Aman"
  },
  {
    id: "AD",
    nama: "Analisis Data (AD)",
    cp: "Pada akhir fase D, peserta didik mampu mengakses, mengolah, mengelola, dan menganalisis data secara efisien, terstruktur, dan sistematis untuk menginterpretasi dan memprediksi sekumpulan data dari situasi konkret sehari-hari dengan menggunakan perkakas TIK atau manual.",
    tp_default: "1. Memahami cara pencarian data dalam pengolah lembar kerja.\n2. Memahami cara visualisasi data dalam pengolah lembar kerja (membuat chart).\n3. Menentukan kriteria dan meringkas data berdasarkan kategori tertentu.\n4. Memakai tools seperti pengolah lembar kerja untuk mengelola data dan menampilkan data sesuai dengan tujuan.\n5. Melakukan studi kasus analisis data secara kolaboratif (seperti pengolahan data bantuan banjir).",
    topik_default: "Pencarian Data, Visualisasi Data (Chart), Peringkasan Data (Pivot Table), Pengelolaan Data (Tables), dan Studi Kasus AD"
  },
  {
    id: "AP",
    nama: "Algoritma dan Pemrograman (AP)",
    cp: "Pada akhir fase D, peserta didik mampu mengenali objek-objek dan memahami perintah atau instruksi dalam sebuah lingkungan pemrograman blok/visual untuk mengembangkan program visual sederhana berdasarkan contoh-contoh yang diberikan dan mengembangkan karya digital kreatif (game, animasi, atau presentasi), menerapkan aturan translasi konsep dari satu bahasa visual ke bahasa visual lainnya, serta mengenal pemrograman tekstual sederhana.",
    tp_default: "1. Memakai fitur bahasa pemrograman visual Scratch lanjut yang mengandung variabel dan custom block (prosedur).\n2. Memprogram dalam bahasa pemrograman visual kedua yang mirip Scratch, yaitu Blockly, dalam bentuk permainan (Maze/Music/Sprite).\n3. Membaca dan memahami makna blok penyusun program Blockly (variabel, input, output, ekspresi matematika/logika, percabangan, pengulangan).\n4. Menyusun kode program Blockly (drag and drop, menjalankan, dan merekayasa).\n5. Menyelesaikan persoalan dengan menyusun program prosedural dengan bahasa Blockly (Print Pola Bintang, Diamond, dll).\n6. Memahami dan mengenal cara kerja robot line follower (Ozobot) dan mengeksplorasi perilaku robot.",
    topik_default: "Pemrograman Visual Scratch (Variabel & Custom Block), Blockly Games, Pemrograman Prosedural, dan Robot Ozobot"
  },
  {
    id: "DSI",
    nama: "Dampak Sosial Informatika (DSI)",
    cp: "Pada akhir fase D, peserta didik menyadari keberadaan dunia digital disekitarnya, ketersediaan data dan informasi lewat aplikasi media sosial, serta memahami keterbukaan informasi, memilih informasi yang bersifat publik atau privat, menjaga keamanan dirinya dalam masyarakat digital dan menerapkan etika dunia maya.",
    tp_default: "1. Menjelaskan kegunaan media sosial serta dampak positif dan negatifnya.\n2. Mengkaji kritis informasi atau berita dari media online dan menyimpulkan apakah suatu berita merupakan berita bohong atau bukan.\n3. Menjelaskan cyberbullying dan jenis-jenisnya.\n4. Mengkaji kritis kasus perundungan untuk dapat mengantisipasinya.",
    topik_default: "Dampak Media Sosial, Pengkajian Kritis Informasi Media Sosial (Hoaks), dan Cyberbullying"
  },
  {
    id: "PLB",
    nama: "Praktik Lintas Bidang (PLB)",
    cp: "Pada akhir fase D, peserta didik mampu bergotong royong untuk mengidentifikasi persoalan, merancang, mengimplementasi, menguji, dan menyempurnakan artefak komputasional yang merupakan solusi dari persoalan tersebut, serta mengomunikasikan secara lisan maupun tertulis produk dan proses pengembangan solusinya dalam bentuk karya kreatif yang menyenangkan.",
    tp_default: "1. Berkolaborasi untuk melaksanakan tugas dengan tema komputasi.\n2. Mengidentifikasi dan mendefinisikan persoalan yang penyelesaiannya dapat didukung dengan komputer.\n3. Mengembangkan dan menggunakan abstraksi untuk membangun model komputasional.\n4. Mengembangkan artefak komputasional (seperti media interaktif tentang lempeng bumi dan mesin hitung uang koin) untuk menunjang kegiatan pada mata pelajaran lain.\n5. Melakukan pengujian dan penyempurnaan artefak perangkat lunak untuk memastikan kesesuaian dengan spesifikasi.\n6. Mengomunikasikan (mendemonstrasikan) produk berupa artefak komputasional yang sudah dikembangkan secara lisan maupun tertulis.",
    topik_default: "Kolaborasi Kelompok, Pengembangan Artefak Komputasional (Lempeng Bumi/Mesin Hitung Koin), Pengujian, dan Demonstrasi Karya"
  }
];

export interface LingkupMateriOption {
  lingkupMateri: string;
  tujuanPembelajaran: string;
  kegiatanPembelajaran: string;
  alokasiWaktu: string;
}

export const LINGKUP_MATERI_MAP_VIII: Record<string, LingkupMateriOption[]> = {
  "IP": [
    {
      lingkupMateri: "Refleksi pembelajaran kelas VII",
      tujuanPembelajaran: "1. Merefleksikan materi Informatika yang sudah diperoleh di kelas VII.",
      kegiatanPembelajaran: "Refleksi Materi dari Pengalaman Informatika Kelas VII dan Jurnal Refleksi",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Perencanaan pembelajaran kelas VIII",
      tujuanPembelajaran: "1. Menjelaskan materi Informatika yang akan dipelajari di kelas VIII.",
      kegiatanPembelajaran: "Perencanaan Pembelajaran Informatika kelas VIII",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    }
  ],
  "BK": [
    {
      lingkupMateri: "Fungsi",
      tujuanPembelajaran: "1. Mengenal dan mengimplementasikan konsep fungsi (input-proses-output) sebagai mesin komputasi, dan mengeksekusi mesin.",
      kegiatanPembelajaran: "- Bermain peran Mesin Pembentuk Kue\n- Latihan dan Pengembangan soal Mesin Pembentuk Kue",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Himpunan dan Sistem Bilangan",
      tujuanPembelajaran: "1. Memodelkan persoalan logika dalam bentuk himpunan.\n2. Mengoperasikan bilangan dalam berbagai representasi.",
      kegiatanPembelajaran: "- Menyelesaikan teka-teki logika Pupuk Ajaib\n- Konversi Bilangan Desimal menjadi Bilangan Biner dan Oktal\n- Konversi Bilangan Biner dan Oktal menjadi Bilangan Desimal",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Algoritma",
      tujuanPembelajaran: "1. Memahami konsep algoritma dan menyelesaikan persoalan algoritma sederhana.",
      kegiatanPembelajaran: "- Membaca pola aktivitas Belajar Menyulam\n- Latihan pengembangan soal Belajar Menyulam",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Struktur Data",
      tujuanPembelajaran: "1. Mengenal organisasi data terstruktur as tumpukan (stack) untuk menyelesaikan masalah komputasi.",
      kegiatanPembelajaran: "- Menyelesaikan permainan atau Teka-teki Operasi Perhitungan dengan Tumpukan (Stack)",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    }
  ],
  "TIK": [
    {
      lingkupMateri: "Perangkat Lunak Aplikasi dan Fitur Aplikasi",
      tujuanPembelajaran: "1. Memahami struktur dari konten dan fitur utama aplikasi pengolah kata, pengolah lembar kerja, dan presentasi.",
      kegiatanPembelajaran: "- Eksplorasi berbagai format File\n- Eksplorasi tindakan salin dan tempel pada aplikasi perkantoran\n- Fitur utama aplikasi pengolah kata",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Pembuatan Laporan",
      tujuanPembelajaran: "1. Membuat laporan dengan menyalin dan memindahkan konten dari satu aplikasi ke aplikasi lain yang dirancang sebagai satu paket aplikasi, yaitu aplikasi perkantoran.",
      kegiatanPembelajaran: "- Membuat laporan dokumentasi program dengan aplikasi pengolah kata\n- Membuat laporan kegiatan dengan aplikasi pengolah kata melalui penarikan data dari lembar kerja",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Merangkum Narasi dari Konten Digital",
      tujuanPembelajaran: "1. Merangkum, mengevaluasi, dan menyimpulkan beberapa bahan bacaan dalam bentuk digital (file) yang berbeda format, dan merefleksikan isinya.",
      kegiatanPembelajaran: "- Menelaah dan bereksperimen dengan bacaan digital",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Laboratorium Maya",
      tujuanPembelajaran: "1. Menggunakan laboratorium maya untuk eksplorasi dan belajar mandiri dalam menunjang mata pelajaran lainnya.",
      kegiatanPembelajaran: "- Eksplorasi Laboratorium Maya",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Belajar Koneksi",
      tujuanPembelajaran: "1. Memahami konsep konektivitas antar-perangkat dan integrasi fungsional dalam kehidupan sehari-hari.",
      kegiatanPembelajaran: "- Studi kasus koneksi dan kolaborasi aplikasi perkantoran\n- Simulasi integrasi antar perangkat keras dan lunak",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    }
  ],
  "SK": [
    {
      lingkupMateri: "Komponen Sistem Komputer",
      tujuanPembelajaran: "1. Memahami fungsi sistem komputer (perangkat keras dan sistem operasi) yang memungkinkannya untuk menerima input, menyimpan, memproses dan menyajikan data sesuai dengan spesifikasinya.",
      kegiatanPembelajaran: "- Simulasi komponen komputer dengan Game Online Wordwall",
      alokasiWaktu: "1 JP (1 x 40 Menit)"
    },
    {
      lingkupMateri: "Pengingat Memori",
      tujuanPembelajaran: "1. Memahami mekanisme internal penyimpanan data pada sistem komputer (heksadesimal dan alamat memori).",
      kegiatanPembelajaran: "- Mempelajari Sandi Heksadesimal\n- Menentukan Alamat Memori",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Central Processing Unit",
      tujuanPembelajaran: "1. Memahami mekanisme internal pemrosesan data pada unit pengolahan logika dan aritmetika di CPU.",
      kegiatanPembelajaran: "- Eksplorasi Tabel Logika Gerbang Sirkuit",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    }
  ],
  "JKI": [
    {
      lingkupMateri: "Jaringan Komputer",
      tujuanPembelajaran: "1. Memahami internet and jaringan lokal.\n2. Memahami cara kerja pengiriman data dalam konektivitas jaringan.",
      kegiatanPembelajaran: "- Praktikum Konfigurasi Jaringan Komputer\n- Menganalisis Jalur Routing pengiriman paket data",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Komunikasi Data pada Ponsel",
      tujuanPembelajaran: "1. Memahami teknologi komunikasi pada ponsel.",
      kegiatanPembelajaran: "- Mengukur dan menganalisis kekuatan sinyal ponsel",
      alokasiWaktu: "1 JP (1 x 40 Menit)"
    },
    {
      lingkupMateri: "Terhubung ke Internet dengan Aman",
      tujuanPembelajaran: "1. Memahami bagaimana terhubung ke internet secara aman.",
      kegiatanPembelajaran: "- Mengatur setting keamanan browser / peramban internet",
      alokasiWaktu: "1 JP (1 x 40 Menit)"
    }
  ],
  "AD": [
    {
      lingkupMateri: "Pencarian Data",
      tujuanPembelajaran: "1. Memahami cara pencarian data dalam pengolah lembar kerja.",
      kegiatanPembelajaran: "- Melakukan Pencarian Data dalam Lembar Kerja (VLOOKUP / HLOOKUP)",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Visualisasi Data",
      tujuanPembelajaran: "1. Memahami cara visualisasi data dalam pengolah lembar kerja.",
      kegiatanPembelajaran: "- Membuat Chart di spreadsheet otomatis\n- Membuat Chart Manual pada kertas berpetak",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Pengolahan Data",
      tujuanPembelajaran: "1. Menentukan kriteria, mengelola, dan meringkas data menggunakan tools pengolah lembar kerja.",
      kegiatanPembelajaran: "- Mengolah data dengan rumus statistik dasar, filtering, sorting, dan pivot table",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Studi Kasus",
      tujuanPembelajaran: "1. Melakukan studi kasus analisis data secara kolaboratif menggunakan tools pengolah lembar kerja.",
      kegiatanPembelajaran: "- Studi kasus nyata: Meringkas Data dan Visualisasi Data untuk korban bencana banjir",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    }
  ],
  "AP": [
    {
      lingkupMateri: "Eksplorasi Lanjutan Scratch",
      tujuanPembelajaran: "1. Memakai fitur bahasa pemrograman visual Scratch lanjut yang mengandung variabel dan custom block (prosedur) untuk pengembangan program kreatif.",
      kegiatanPembelajaran: "- Bermain dengan Control, Input dan Variable\n- Bermain dengan prosedur Custom Block",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Pengantar Blockly Games dan Eksplorasi Puzzle Maze",
      tujuanPembelajaran: "1. Memprogram dalam bahasa pemrograman visual kedua yang mirip dengan Scratch, yaitu Blockly, dalam sebuah lingkungan pemrograman blok/visual yang dikemas dalam bentuk permainan.",
      kegiatanPembelajaran: "- Eksplorasi Maze di Blockly Games",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Eksplorasi Blockly Games Music",
      tujuanPembelajaran: "1. Memprogram dalam bahasa pemrograman visual kedua yang mirip dengan Scratch, yaitu Blockly, untuk mengonstruksi alur musik.",
      kegiatanPembelajaran: "- Eksplorasi komposisi nada di Blockly Games Music",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Eksplorasi Sprites dengan Blockly",
      tujuanPembelajaran: "1. Mengerti cara kerja sprite, mendefinisikan pergerakan koordinat sprite, dan memodifikasinya menggunakan Blockly.",
      kegiatanPembelajaran: "- Eksplorasi Games Move a sprite\n- Customize Games Move a sprite",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Pengenalan Pemrograman Prosedural",
      tujuanPembelajaran: "1. Membaca dan memahami makna blok penyusun program prosedural (Variabel, input, output, ekspresi matematika/logika, percabangan, pengulangan).",
      kegiatanPembelajaran: "- Membuat program Hello World\n- Membuat program interaktif Hello Namaku",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Modul Tambahan – Bermain dengan Robot Ozobot",
      tujuanPembelajaran: "1. Memahami dan mengenal cara kerja robot line follower (Ozobot) dan mengeksplorasi perilaku robot via pola warna.",
      kegiatanPembelajaran: "- Menggambar Garis Lajur Ozobot\n- Membuat Lajur Warna Ozobot\n- Menulis kode penanda untuk Mengatur Kecepatan Ozobot",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    }
  ],
  "DSI": [
    {
      lingkupMateri: "Media Sosial",
      tujuanPembelajaran: "1. Menjelaskan kegunaan media sosial serta dampak positif dan negatifnya.",
      kegiatanPembelajaran: "- Diskusi kelompok mengenai jenis dan dampak penggunaan media sosial dalam kehidupan sehari-hari",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Mengkaji Kritis Informasi Media Sosial",
      tujuanPembelajaran: "1. Mengkaji kritis informasi atau berita dari media online untuk mendeteksi kebenaran berita.",
      kegiatanPembelajaran: "- Aktivitas analisis dan Pengkajian kritis berita dari media online",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    },
    {
      lingkupMateri: "Cyberbullying",
      tujuanPembelajaran: "1. Menjelaskan cyberbullying, jenis-jenisnya, dan cara mengantisipasinya.\n2. Mengkaji kritis kasus perundungan siber untuk mengantisipasinya.",
      kegiatanPembelajaran: "- Diskusi kasus Cyberbullying dan solusinya",
      alokasiWaktu: "2 JP (2 x 40 Menit)"
    }
  ],
  "PLB": [
    {
      lingkupMateri: "Media Interaktif Lempeng Bumi",
      tujuanPembelajaran: "1. Berkolaborasi dalam kelompok untuk merancang, menguji, dan menyempurnakan media interaktif bertema Lempeng Bumi sebagai solusi terpadu.",
      kegiatanPembelajaran: "- Membuat Media Interaktif Lempeng Bumi\n- Membuat Media Interaktif Lempeng Tektonik Indonesia di Scratch",
      alokasiWaktu: "4 JP (4 x 40 Menit)"
    },
    {
      lingkupMateri: "Mesin Hitung Uang Koin",
      tujuanPembelajaran: "1. Mengembangkan artefak komputasional berupa mesin mekanis/simulasi penghitung koin.",
      kegiatanPembelajaran: "- Merancang program Mesin hitung uang Koin menggunakan Scratch",
      alokasiWaktu: "3 JP (3 x 40 Menit)"
    },
    {
      lingkupMateri: "Modifikasi Tampilan Mesin Hitung Uang Koin",
      tujuanPembelajaran: "1. Melakukan modifikasi dan penyempurnaan instruksi kode serta tampilan dari mesin hitung uang koin.",
      kegiatanPembelajaran: "- Modifikasi tampilan program mesin hitung\n- Modifikasi mesin hitung untuk menghitung uang",
      alokasiWaktu: "3 JP (3 x 40 Menit)"
    }
  ]
};

export const DIMENSI_PANCASILA = [
  "Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia",
  "Berkebinekaan Global",
  "Gotong Royong",
  "Mandiri",
  "Bernalar Kritis",
  "Kreatif"
];

export const SARANA_PRASARANA_LIST = [
  "Laboratorium Komputer Sekolah",
  "Proyektor LCD & Layar Lebar",
  "Koneksi Internet (Wi-Fi/LAN)",
  "Laptop / Komputer Siswa",
  "Buku Paket Siswa Informatika Kelas VIII",
  "Lembar Kerja Peserta Didik (LKPD)",
  "Papan Tulis & Spidol",
  "Slide Presentasi Pembelajaran (PPT/Canva)",
  "Software Simulasi (Scratch / Excel / Penyandi Biner)",
  "Smartphone / Gadget Pendukung"
];

export const METODE_PEMBELAJARAN_LIST = [
  "Diskusi Kelompok",
  "Tanya Jawab Interaktif",
  "Praktikum Langsung / Hands-on",
  "Discovery / Eksplorasi Mandiri",
  "Presentasi Hasil Karya",
  "Ceramah & Demonstrasi Guru",
  "Penugasan Terstruktur",
  "Permainan Edukatif (Unplugged)"
];
