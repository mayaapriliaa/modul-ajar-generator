import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Initialize Gemini API
let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY_MISSING: Kunci API (GEMINI_API_KEY) belum dikonfigurasi di Environment Variables Vercel Anda.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// Helper function to call Gemini with multiple fallback models and exponential backoff retry on transient 503/UNAVAILABLE errors
async function generateContentWithRetry(params: { model: string; contents: any; config?: any }, retries = 2, delay = 1000) {
  const ai = getAI();
  
  // Build fallback model chain starting with the requested model
  const modelsToTry = [params.model];
  if (params.model === "gemini-3.5-flash") {
    modelsToTry.push("gemini-3.1-flash-lite");
    modelsToTry.push("gemini-flash-latest");
  } else if (params.model === "gemini-flash-latest") {
    modelsToTry.push("gemini-3.1-flash-lite");
    modelsToTry.push("gemini-3.5-flash");
  } else {
    modelsToTry.push("gemini-3.1-flash-lite");
    modelsToTry.push("gemini-3.5-flash");
    modelsToTry.push("gemini-flash-latest");
  }

  let finalError: any = null;

  for (let m = 0; m < modelsToTry.length; m++) {
    const currentModel = modelsToTry[m];
    let currentDelay = delay;
    const isFallback = m > 0;
    
    console.log(`[AI-GENERATOR] Attempting generation with model: ${currentModel}${isFallback ? " (FALLBACK MODEL)" : ""}`);
    
    for (let i = 0; i < retries; i++) {
      try {
        const result = await ai.models.generateContent({
          ...params,
          model: currentModel
        });
        console.log(`[AI-GENERATOR] Generation SUCCESSFUL with model: ${currentModel}`);
        return result;
      } catch (error: any) {
        finalError = error;
        console.error(`[AI-GENERATOR] Attempt ${i + 1}/${retries} failed for model ${currentModel}:`, error);
        
        const isHighDemand = 
          error?.status === 503 ||
          error?.code === 503 ||
          error?.status === "UNAVAILABLE" ||
          (error?.message && (
            error.message.includes("503") ||
            error.message.includes("UNAVAILABLE") ||
            error.message.includes("high demand") ||
            error.message.includes("temporary")
          ));
          
        if (isHighDemand) {
          console.warn(`[AI-GENERATOR] Model ${currentModel} is reporting high demand / unavailable. Switching to next model immediately to avoid timeout.`);
          break; // Break the inner retry loop, proceeds immediately to the next fallback model in modelsToTry
        }
        
        const isRetryable = 
          error?.status === 429 ||
          error?.code === 429 ||
          (error?.message && (
            error.message.includes("429") ||
            error.message.includes("rate limit")
          ));
          
        if (isRetryable && i < retries - 1) {
          console.warn(`[AI-GENERATOR] Transient rate limit on model ${currentModel}. Retrying in ${currentDelay}ms...`);
          await new Promise(resolve => setTimeout(resolve, currentDelay));
          currentDelay *= 1.5; // Exponential backoff
          continue;
        }
        
        // For other errors, break and try the next fallback model
        break;
      }
    }
  }
  
  throw finalError;
}

// API endpoint for generating the initial module
app.post("/api/generate-modul", async (req, res) => {
  const { 
    nama_sekolah, nama_guru, mata_pelajaran, kelas, semester, tahun_pelajaran,
    elemen_informatika, topik_materi, capaian_pembelajaran, tujuan_pembelajaran, 
    alokasi_waktu, jumlah_pertemuan, model_pembelajaran, metode_pembelajaran,
    profil_pelajar_pancasila, sarana_prasarana, target_peserta_didik
  } = req.body;

  const targetSiswa = target_peserta_didik || "Peserta didik reguler/tipikal, tidak ada kesulitan dalam mencerna dan memahami materi ajar.";

  const prompt = `
Anda adalah pakar kurikulum dan asisten AI profesional yang ahli dalam menyusun Modul Ajar Kurikulum Merdeka untuk tingkat SMP, khususnya mata pelajaran Informatika Kelas VIII (Fase D) secara eksklusif.

Tugas Anda adalah menghasilkan Modul Ajar Kelas VIII yang SANGAT LENGKAP, DETAIL, RAPI, PRINTER-FRIENDLY (layaknya dokumen Microsoft Word resmi), dan mengikuti dokumen panduan Kurikulum Merdeka secara substantif.

DOKUMEN HARUS MEMILIKI SEKSI-SEKSI BERIKUT INI SECARA BERURUTAN:

## I. IDENTITAS MODUL
(Sajikan dalam format tabel dua kolom Markdown: Komponen | Keterangan. Sesuai ketentuan resmi Kemendikbudristek, seluruh baris dan informasi identitas di bawah ini wajib ditampilkan RATA KIRI (left aligned) secara rapi dan tidak boleh berada di tengah halaman. Isi tabel dengan data berikut):
- Nama Penyusun / Guru: ${nama_guru}
- Nama Sekolah: ${nama_sekolah}
- Tahun Pelajaran: ${tahun_pelajaran}
- Jenjang / Kelas: SMP / VIII (Delapan)
- Semester: ${semester}
- Mata Pelajaran: ${mata_pelajaran}
- Elemen: ${elemen_informatika}
- Topik / Materi Ajar: ${topik_materi}
- Alokasi Waktu: ${alokasi_waktu}
- Jumlah Pertemuan: ${jumlah_pertemuan}
- Model Pembelajaran: ${model_pembelajaran}
- Pendekatan Pembelajaran: Pendekatan Saintifik (Scientific Approach), TPACK (Technological Pedagogical Content Knowledge), dan Student-Centered Learning

## II. KOMPETENSI AWAL
(Tulis 2-3 prasyarat pemahaman atau kompetensi yang harus sudah dimiliki peserta didik sebelum mempelajari materi ${topik_materi} ini. Uraikan secara deskriptif).

## III. PROFIL PELAJAR PANCASILA
(Sebutkan dimensi berikut yang dipilih oleh guru: ${profil_pelajar_pancasila}. Serta jelaskan untuk masing-masing dimensi terpilih tersebut, bentuk penerapannya secara konkret dalam aktivitas pembelajaran ini).

## IV. SARANA DAN PRASARANA
(Rinci sarana dan prasarana penunjang berikut secara rapi: ${sarana_prasarana}).

## V. TARGET PESERTA DIDIK
(Isi dengan target spesifik: ${targetSiswa}).

## VI. MODEL DAN PENDEKATAN PEMBELAJARAN
(Jelaskan bagaimana implementasi Model ${model_pembelajaran} dan Pendekatan Pembelajaran dalam membimbing alur berpikir peserta didik).

## VII. KOMPONEN INTI

### A. CAPAIAN PEMBELAJARAN (CP)
**(CRITICAL: Salin teks Capaian Pembelajaran (CP) berikut secara UTUH, HARFIAH, LENGKAP dan MURNI tanpa dipotong, tanpa dimodifikasi, dan tanpa disesuaikan demi mencocokkan sub-topik materi tertentu. Ini adalah teks CP resmi keputusan Kemendikbudristek):**
"${capaian_pembelajaran}"

### B. TUJUAN PEMBELAJARAN (TP)
(Cantumkan dan jabarkan tujuan pembelajaran berikut yang dirancang selaras dengan kurikulum dan CP Kemendikbudristek di atas:
${tujuan_pembelajaran})

### C. ASESMEN / PENILAIAN LENGKAP
(Uraikan ketiga jenis asesmen berikut secara lengkap):

#### 1. Asesmen Diagnostik (Sebelum Pembelajaran)
- Berikan minimal 3 pertanyaan diagnostik non-kognitif/kognitif awal untuk mendeteksi kesiapan siswa kelas 8 dalam topik ini.
- Berikan Kunci Jawaban / kriteria pemetaan kesiapan peserta didik serta tindak lanjutnya.

#### 2. Asesmen Formatif (Proses Pembelajaran)
- Tuliskan Teknik Penilaian (misal: Observasi Sikap dan Unjuk Kerja Diskusi/Praktik Komputer).
- Sediakan **Tabel Rubrik Penilaian** secara lengkap dan substantif dengan kriteria:
  | Aspek Penilaian | Indikator Sangat Baik (4) | Indikator Baik (3) | Indikator Cukup (2) | Indikator Perlu Bimbingan (1) |
  (Berikan deskripsi indikator yang lengkap sesuai topik ajar).

#### 3. Asesmen Sumatif (Akhir Pembelajaran/Penilaian Harian)
- Sediakan minimal **5 Soal Pilihan Ganda bermuatan HOTS (Higher Order Thinking Skills)** secara rapi dan profesional. Setiap butir soal wajib dipisahkan oleh satu baris kosong (blank line) dari soal berikutnya. Setiap soal harus diberi nomor urut yang jelas (Contoh: 1, 2, 3, 4, 5). Pilihan jawaban A, B, C, dan D wajib disusun rapi secara vertikal di baris baru yang terpisah (bukan digabung dalam satu baris) demi menjaga keterbacaan yang tinggi, spasi antar soal yang konsisten, dan estetika cetak yang bersih tanpa teks berhimpitan. Format pilihan jawaban wajib menggunakan indentasi spasi dan huruf kapital diikuti titik dan spasi di baris baru masing-masing, persis seperti ini:
  A. [Teks pilihan kesatu]
  B. [Teks pilihan kedua]
  C. [Teks pilihan ketiga]
  D. [Teks pilihan keempat]
JANGAN pernah menuliskan pilihan secara mendatar/horizontal (A. ... B. ... C. ... D. ...). JANGAN menambahkan tanda koma (,), titik koma (;), atau tanda hubung lainnya di antara pilihan atau di akhir teks pilihan jawaban. Setiap pilihan jawaban wajib berdiri sendiri di baris barunya secara vertikal dengan rapi.
- Sediakan minimal **3 Soal Uraian** dengan penomoran yang jelas, terpisah masing-masing dengan baris kosong.
- Sediakan Kunci Jawaban Lengkap untuk Pilihan Ganda dan Uraian, serta **Pedoman Penskoran / Bobot Skor** dengan heading yang sangat jelas, rapi, dan terstruktur.

### D. PEMAHAMAN BERMAKNA
(Tulis 1-2 paragraf mengenai manfaat praktis bagi kehidupan sehari-hari peserta didik setelah menguasai materi ${topik_materi}).

### E. PERTANYAAN PEMANTIK
(Berikan minimal 3 pertanyaan pemantik diskusi di awal kelas yang menantang dan memantik nalar kritis siswa).

## VIII. MATERI PEMBELAJARAN
(Sajikan rangkuman teori konsep materi ajar utama ${topik_materi} secara mendalam, substantif, minimal 4 paragraf. Tulis secara jelas tanpa singkatan agar guru memiliki bahan ajar yang solid. JANGAN memasukkan gambar ilustrasi atau foto dekoratif, cukup sajikan uraian teori materi yang mendalam secara tertulis saja).

## IX. KEGIATAN PEMBELAJARAN
(Susun rincian langkah aktivitas belajar **LENGKAP per-Pertemuan** sesuai jumlah yang dipilih: ${jumlah_pertemuan}. Setiap pertemuan wajib memiliki):
- **Aktivitas Pendahuluan** (Apersepsi, Motivasi, Penyampaian Tujuan - Jelas dengan durasi menit)
- **Aktivitas Inti** (Langkah-langkah taktis terperinci dari sintak model pembelajaran ${model_pembelajaran}, seperti orientasi masalah, kerja kelompok, unjuk hasil karya, dsb. - Jelas dengan durasi menit)
- **Aktivitas Penutup** (Kesimpulan bersama, refleksi singkat, dan doa/penutupan - Jelas dengan durasi menit)

## X. REFLEKSI PEMBELAJARAN
Sajikan dalam bentuk tabel instrumen refleksi Markdown yang rapi:
- **Tabel Refleksi Peserta Didik** (Berisi minimal 4 kolom / baris pertanyaan refleksi diri siswa)
- **Tabel Refleksi Guru** (Berisi minimal 4 kolom / baris pertanyaan evaluasi diri pendidik)

## XI. LAMPIRAN

### A. LEMBAR KERJA PESERTA DIDIK (LKPD)
(Sajikan rancangan LKPD mandiri/kelompok lengkap yang memuat: Petunjuk Belajar, Tugas Terstruktur atau Masalah Praktikum sesuai topik, dan format penulisan laporan siswa).

### B. PEDOMAN PENSKORAN & EVALUASI
(Gambarkan rumus perhitungan nilai akhir gabungan proses dan hasil belajar siswa secara eksplisit).

### C. PENGAYAAN DAN REMEDIAL
(Program tindakan konkret bagi siswa yang di atas rata-rata/pengayaan dan di bawah Kriteria Ketercapaian/Remedial).

### D. BAHAN BACAAN GURU DAN PESERTA DIDIK
(Artikel literasi ringkas berisi info pendukung materi untuk dibaca).

### E. GLOSARIUM
(Minimal 5 daftar istilah penting dalam topik ini beserta arti harfiahnya).

### F. DAFTAR PUSTAKA
(Tulis 3 referensi buku/situs resmi Kurikulum Merdeka Kemendikbudristek sesuai aturan Harvard atau APA style).

---

ATURAN PRINTING & ESTETIKA (CRITICAL):
1. JANGAN pernah menggunakan baris garis pemisah buatan seperti deretan tanda hubung berulang, tanda sama dengan berulang (misalnya: ======================= atau ------------------------- atau ______________________ atau * * *). Cukup gunakan pemisahan heading Markdown standar demi tampilan dokumen Word yang bersih dan elegan ketika dicetak di kertas A4.
2. Gunakan Bahasa Indonesia formal yang baku (EYD) yang sesuai untuk guru SMP, inspiratif, berbobot, dan akademis.
3. Seluruh seksi di atas wajib diisi detail dan lengkap tanpa disingkat-singkat.
4. INFORMASI ALOKASI WAKTU DAN JUMLAH PERTEMUAN HANYA BOLEH DICANTUMKAN DI SEKSI "I. IDENTITAS MODUL". Jangan diulang atau ditulis kembali di seksi-seksi lain seperti Kompetensi Awal, Profil Pelajar Pancasila, Sarana Prasarana, Tujuan Pembelajaran, atau Kegiatan Pembelajaran. Biarkan seksi-seksi lainnya murni berisi esensi materi, aktivitas belajar dengan durasi menit instruksional saja, dan asesmen.

Akhiri output persis dengan Daftar Pustaka. JANGAN PERNAH menambahkan teks slogan, keterangan selesai generate, label generator, atau kalimat tambahan apa pun (seperti 'Modul Ajar Selesai', dll) setelah Daftar Pustaka.
`;

  try {
    const response = await generateContentWithRetry({
      model: "gemini-3.5-flash",
      contents: [{ parts: [{ text: prompt }] }],
    });
    res.json({ modul: response.text });
  } catch (error: any) {
    console.error("Error generating modul:", error);
    const isBusy = 
      error?.status === 503 || 
      error?.code === 503 || 
      error?.status === "UNAVAILABLE" || 
      (error?.message && (
        error.message.includes("503") || 
        error.message.includes("UNAVAILABLE") || 
        error.message.includes("high demand")
      ));
    
    if (isBusy) {
      res.status(503).json({ 
        error: "Server Kecerdasan Buatan (Google Gemini) sedang melayani tingkat permintaan yang sangat tinggi saat ini. Silakan coba klik tombol 'Mulai Kirim ke AI' lagi dalam beberapa saat." 
      });
    } else {
      let userFriendlyMessage = "Gagal menyusun modul. Silakan coba beberapa saat lagi atau periksa konfigurasi API Key Anda.";
      if (error?.message) {
        if (error.message.includes("GEMINI_API_KEY_MISSING")) {
          userFriendlyMessage = error.message.replace("Error: ", "");
        } else if (error.message.includes("API_KEY_INVALID") || error.message.includes("API key not valid")) {
          userFriendlyMessage = "Kunci API (API Key) Gemini yang dikonfigurasi di Vercel tidak valid. Silakan pastikan nilainya sudah benar.";
        } else {
          userFriendlyMessage = `Gagal menyusun modul: ${error.message}`;
        }
      }
      res.status(500).json({ error: userFriendlyMessage });
    }
  }
});

// API endpoint for revising the module
app.post("/api/revise-modul", async (req, res) => {
  const { modul_sebelumnya, instruksi_revisi } = req.body;

  const prompt = `
Berikut adalah Modul Ajar Kurikulum Merdeka yang telah dibuat sebelumnya:
---
${modul_sebelumnya}
---

Instruksi Revisi dari Guru:
"${instruksi_revisi}"

Tugas Anda:
1. Lakukan HANYA perubahan/revisi yang diminta oleh guru tersebut.
2. Hasil akhir harus tetap menyajikan seluruh isi Modul Ajar secara LENGKAP tanpa terpotong (jangan menuliskan bagian lain yang tidak berubah sebagai "... rest of code ...").
3. Tandai judul seksi yang Anda perbarui dengan ikon pensil ✏️ di depannya agar guru tahu bagian mana yang direvisi.
4. JANGAN gunakan baris pemisah simbolik buatan (seperti berderet-deret ======= atau ------------).
5. Pastikan output tetap mempertahankan tulisan yang rapi, seluruh baris identitas di seksi 'I. IDENTITAS MODUL' tetap RATA KIRI.
6. WAJIB merapikan format seksi Asesmen Sumatif (Pilihan Ganda) agar seluruh pilihan jawaban A, B, C, dan D tersusun sangat rapi secara vertikal di baris baru masing-masing dengan indentasi spasi yang seragam di bawah soal, contohnya:
  A. Teks pilihan kesatu
  B. Teks pilihan kedua
  C. Teks pilihan ketiga
  D. Teks pilihan keempat
JANGAN pernah menyatukan pilihan jawaban dalam satu baris mendatar (seperti A. ... B. ... C. ... D. ...), dan JANGAN menggunakan tanda koma (,), titik koma (;), atau tanda hubung pemisah lainnya di akhir teks pilihan jawaban. Setiap pilihan jawaban wajib berdiri sendiri secara mandiri di baris baru di bawah soal.

7. OTOMATIS MERAPIKAN PENAMBAHAN/REVISI SOAL (CRITICAL): Jika instruksi revisi meminta penambahan, pengurangan, atau modifikasi soal (baik Pilihan Ganda maupun Uraian/Essay), Anda WAJIB mematuhi aturan berikut agar layout otomatis rapi:
  - **Penomoran Runtut & Logis**: Nomor soal harus melanjutkan nomor sebelumnya secara berurutan secara otomatis (misal jika sebelumnya ada 5 soal, soal berikutnya wajib bernomor 6, 7, dst), atau jika memperbarui keseluruhan soal, gunakan penomoran berurutan 1, 2, 3, dst secara runtut.
  - **Pemisahan Baris Kosong**: Setiap butir soal dan kunci jawabannya wajib dipisahkan oleh minimal satu baris kosong (blank line) agar tidak menempel satu sama lain atau berhimpitan saat dicetak atau diunduh ke Word.
  - **Kunci Jawaban Selaras**: Kunci jawaban dan bobot skor pada bagian akhir wajib diperbarui secara otomatis dengan mencantumkan kunci/jawaban penjelasan untuk soal-soal baru tersebut secara sinkron dan berurutan sesuai nomor soal yang bersangkutan.
  - **Format Pilihan Vertikal Konsisten**: Untuk semua soal pilihan ganda baru maupun revisi, pilihan A, B, C, D wajib ditulis berurutan ke bawah, bukan horizontal, masing-masing berdiri sendiri di baris baru.

Akhiri dengan Daftar Pustaka yang rapi.

Akhiri output persis dengan Daftar Pustaka. JANGAN PERNAH menambahkan teks slogan, keterangan selesai generate, label generator, atau kalimat tambahan apa pun (seperti 'Modul Ajar Selesai', dll) setelah Daftar Pustaka.
`;

  try {
    const response = await generateContentWithRetry({
      model: "gemini-3.5-flash",
      contents: [{ parts: [{ text: prompt }] }],
    });
    res.json({ modul: response.text });
  } catch (error: any) {
    console.error("Error revising modul:", error);
    const isBusy = 
      error?.status === 503 || 
      error?.code === 503 || 
      error?.status === "UNAVAILABLE" || 
      (error?.message && (
        error.message.includes("503") || 
        error.message.includes("UNAVAILABLE") || 
        error.message.includes("high demand")
      ));
      
    if (isBusy) {
      res.status(503).json({ 
        error: "Server Kecerdasan Buatan (Google Gemini) sedang melayani tingkat permintaan yang sangat tinggi saat ini. Silakan coba kirim revisi kembali dalam beberapa saat." 
      });
    } else {
      let userFriendlyMessage = "Gagal memproses revisi modul. Silakan coba beberapa saat lagi.";
      if (error?.message) {
        if (error.message.includes("GEMINI_API_KEY_MISSING")) {
          userFriendlyMessage = error.message.replace("Error: ", "");
        } else if (error.message.includes("API_KEY_INVALID") || error.message.includes("API key not valid")) {
          userFriendlyMessage = "Kunci API (API Key) Gemini yang dikonfigurasi di Vercel tidak valid. Silakan pastikan nilainya sudah benar.";
        } else {
          userFriendlyMessage = `Gagal memproses revisi: ${error.message}`;
        }
      }
      res.status(500).json({ error: userFriendlyMessage });
    }
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;

