/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Send, 
  RefreshCcw, 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  Users, 
  Clock, 
  Layout, 
  Award, 
  Loader2, 
  AlertCircle, 
  FileEdit, 
  Download,
  Sparkles,
  Settings,
  Layers,
  Lightbulb,
  CheckCircle2,
  FileCheck2,
  Info,
  Plus,
  Trash2,
  Lock,
  Database,
  LogOut,
  Key
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// @ts-ignore
import html2pdf from 'html2pdf.js';

import {
  ELEMEN_INFORMATIKA_VIII,
  DIMENSI_PANCASILA,
  SARANA_PRASARANA_LIST,
  METODE_PEMBELAJARAN_LIST,
  LINGKUP_MATERI_MAP_VIII
} from './constants';

import { useDraftStore, type ModulData, DEFAULT_FORM_DATA } from './store';

export function getTopicImage(topicName: string): string {
  const name = (topicName || "").toLowerCase();
  
  // Algoritma & Pemrograman
  if (name.includes("scratch")) {
    return "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("blockly") || name.includes("maze") || name.includes("puzzle")) {
    return "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("music") || name.includes("nada") || name.includes("musik")) {
    return "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("sprite") || name.includes("koordinat")) {
    return "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("robot") || name.includes("ozobot") || name.includes("line follower")) {
    return "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("prosedural") || name.includes("procedural")) {
    return "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("problem solving") || name.includes("bintang") || name.includes("diamond")) {
    return "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80";
  }

  // Jaringan Komputer & Internet
  if (name.includes("jaringan") || name.includes("network") || name.includes("routing") || name.includes("lokal")) {
    return "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("ponsel") || name.includes("smartphone") || name.includes("sinyal") || name.includes("komunikasi data")) {
    return "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("aman") || name.includes("keamanan") || name.includes("browser") || name.includes("enkripsi")) {
    return "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80";
  }

  // Berpikir Komputasional
  if (name.includes("fungsi") || name.includes("mesin pembentuk") || name.includes("input-proses")) {
    return "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("himpunan") || name.includes("bilangan") || name.includes("desimal") || name.includes("biner") || name.includes("oktal")) {
    return "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("algoritma") || name.includes("menyulam")) {
    return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("stack") || name.includes("tumpukan") || name.includes("struktur data")) {
    return "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=80";
  }

  // Teknologi Informasi & Komunikasi
  if (name.includes("perangkat lunak") || name.includes("fitur aplikasi") || name.includes("format file")) {
    return "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("laporan") || name.includes("perkantoran") || name.includes("integrasi") || name.includes("word") || name.includes("excel")) {
    return "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("merangkum") || name.includes("narasi") || name.includes("bacaan") || name.includes("konten digital")) {
    return "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("laboratorium") || name.includes("maya") || name.includes("virtual lab")) {
    return "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&fit=crop&q=80";
  }

  // Sistem Komputer
  if (name.includes("komponen") || name.includes("sistem komputer") || name.includes("hardware") || name.includes("perangkat keras")) {
    return "https://images.unsplash.com/photo-1591405351990-4726e331f141?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("memori") || name.includes("pengalamatan") || name.includes("heksadesimal")) {
    return "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("cpu") || name.includes("central processing") || name.includes("gerbang") || name.includes("sirkuit")) {
    return "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80";
  }

  // Analisis Data
  if (name.includes("pencarian data") || name.includes("vlookup") || name.includes("hlookup")) {
    return "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("visualisasi") || name.includes("chart") || name.includes("grafik")) {
    return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("peringkasan") || name.includes("pivot") || name.includes("tabel silang")) {
    return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("pengelolaan data") || name.includes("tables")) {
    return "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("studi kasus") || name.includes("banjir") || name.includes("bencana")) {
    return "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80";
  }

  // Dampak Sosial Informatika
  if (name.includes("dampak") || name.includes("media sosial") || name.includes("hoaks") || name.includes("informasi")) {
    return "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("bullying") || name.includes("cyberbullying") || name.includes("perundungan")) {
    return "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80";
  }

  // Praktik Lintas Bidang
  if (name.includes("lempeng bumi") || name.includes("tektonik") || name.includes("geografi")) {
    return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("koin") || name.includes("mesin hitung") || name.includes("uang")) {
    return "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80";
  }

  // IP (Informatika dan Pembelajarannya)
  if (name.includes("refleksi")) {
    return "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("perencanaan") || name.includes("rencana")) {
    return "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=80";
  }

  // Fallback to general study and technology images based on some keywords
  if (name.includes("informatika") || name.includes("komputer") || name.includes("programming") || name.includes("coding")) {
    return "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80";
  }
  if (name.includes("belajar") || name.includes("kelas") || name.includes("guru") || name.includes("siswa")) {
    return "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80";
  }

  // General fallback
  return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80";
}

export default function App() {
  const {
    drafts,
    activeDraftId,
    loadDraftsFromStorage,
    setActiveDraft,
    createNewDraft,
    saveDraft,
    deleteDraft,
    currentUser,
    isAuthLoaded,
    login,
    registerUser,
    logout,
    updateUserProfile
  } = useDraftStore();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ModulData>({ ...DEFAULT_FORM_DATA });
  const [generatedModul, setGeneratedModul] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRevising, setIsRevising] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [revisionText, setRevisionText] = useState('');
  const [copied, setCopied] = useState(false);
  const cleanModul = React.useMemo(() => {
    if (!generatedModul) return "";
    let cleaned = generatedModul.replace(/!\[.*?\]\(.*?\)/gi, "");
    const lines = cleaned.split("\n");
    const filtered = lines.filter(line => {
      const trimmed = line.trim().toLowerCase();
      // If the line starts with or is wrapped in bold/italics for "gambar" or "ilustrasi" and is short (caption length)
      if (
        trimmed.startsWith("*gambar") || 
        trimmed.startsWith("_gambar") || 
        trimmed.startsWith("gambar") || 
        trimmed.startsWith("*ilustrasi") || 
        trimmed.startsWith("_ilustrasi") || 
        trimmed.startsWith("ilustrasi")
      ) {
        if (trimmed.length < 150) {
          return false;
        }
      }
      // If the line contains both "gambar" and "ilustrasi" and is short, it is almost certainly a caption
      if (trimmed.includes("gambar") && trimmed.includes("ilustrasi") && trimmed.length < 150) {
        return false;
      }
      return true;
    });

    const outputLines: string[] = [];
    
    for (let i = 0; i < filtered.length; i++) {
      const line = filtered[i];
      const lowerLine = line.toLowerCase();
      
      // Skip splitting if it's likely an answer key or explanation
      if (lowerLine.includes("kunci jawaban") || lowerLine.includes("pembahasan")) {
        outputLines.push(line);
        continue;
      }

      // Find all option markers in the line (A., B., C., D. with or without bold or parens)
      const regex = /(?:^|[\s\.,;:!?'"\-\*\(\)\$\[\]])(?:\*\*([A-D])\.\*\*|\*\*([A-D])\*\*|\*([A-D])\.\*|([A-D])\.|([A-D])\)|\(([A-D])\))(?=\s|\d|$)/gi;
      const matches: { index: number; label: string; fullMatch: string }[] = [];
      let match;
      const tempRegex = new RegExp(regex);
      while ((match = tempRegex.exec(line)) !== null) {
        const label = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
        matches.push({
          index: match.index,
          label: label.toUpperCase(),
          fullMatch: match[0]
        });
      }

      const isOptionLine = matches.length > 0 && (
        matches.length > 1 || 
        ["A", "B", "C", "D"].includes(matches[0].label)
      );

      if (isOptionLine) {
        const firstMatch = matches[0];
        const startIndex = firstMatch.index + firstMatch.fullMatch.length;
        const endIndex = (1 < matches.length) ? matches[1].index : line.length;
        const optText = line.substring(startIndex, endIndex).trim();

        // If there's only 1 match and its text is empty, treat as regular line
        if (matches.length === 1 && optText.length === 0) {
          outputLines.push(line);
          continue;
        }

        // Extract any text (like the question) before the first option marker
        const beforeText = line.substring(0, firstMatch.index).trim();
        if (beforeText) {
          outputLines.push(beforeText + "  ");
        } else {
          // If there's no text before Option A on this line, the question is on the previous line.
          // Let's add two spaces to the end of the previous line so that Markdown wraps it properly!
          if (outputLines.length > 0) {
            const prevIdx = outputLines.length - 1;
            if (!outputLines[prevIdx].endsWith("  ") && outputLines[prevIdx].trim() !== "") {
              outputLines[prevIdx] = outputLines[prevIdx] + "  ";
            }
          }
        }

        // Process each option found in the line
        for (let j = 0; j < matches.length; j++) {
          const current = matches[j];
          const optStart = current.index + current.fullMatch.length;
          const optEnd = (j + 1 < matches.length) ? matches[j + 1].index : line.length;
          let optionText = line.substring(optStart, optEnd).trim();
          
          // Clean trailing commas, semicolons, slashes, dashes, or periods
          optionText = optionText.replace(/[,;\s\-\/]+$/, "").trim();

          const hasBold = current.fullMatch.includes("**");
          const formattedLabel = `**${current.label}.**`;

          outputLines.push(`&nbsp;&nbsp;&nbsp;&nbsp;${formattedLabel} ${optionText}  `);
        }
      } else {
        outputLines.push(line);
      }
    }

    return outputLines.join("\n").trim();
  }, [generatedModul]);
  const [error, setError] = useState<string | null>(null);
  const [draftToDelete, setDraftToDelete] = useState<string | null>(null);

  // Authentication UI state
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState('');
  const [authNamaGuru, setAuthNamaGuru] = useState('');
  const [authNamaSekolah, setAuthNamaSekolah] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  const modulRef = useRef<HTMLDivElement>(null);
  const isSyncingRef = useRef(false);
  const lastDraftIdRef = useRef<string | null>(null);

  // Reset local state when user changes (logout/login) to prevent leakage of old draft/form data
  useEffect(() => {
    if (currentUser) {
      lastDraftIdRef.current = null;
      setGeneratedModul('');
      setStep(1);
      setFormData({
        ...DEFAULT_FORM_DATA,
        nama_guru: currentUser.nama_guru,
        nama_sekolah: currentUser.nama_sekolah
      });
    } else {
      lastDraftIdRef.current = null;
      setFormData({ ...DEFAULT_FORM_DATA });
      setGeneratedModul('');
      setStep(1);
    }
  }, [currentUser]);

  // Load drafts on mount
  useEffect(() => {
    loadDraftsFromStorage();
  }, [loadDraftsFromStorage]);

  // Sync state when active draft changes (only when switching to a different draft to avoid desync on keystroke)
  useEffect(() => {
    if (activeDraftId && activeDraftId !== lastDraftIdRef.current) {
      lastDraftIdRef.current = activeDraftId;
      const activeDraft = drafts.find(d => d.id === activeDraftId);
      if (activeDraft) {
        isSyncingRef.current = true;
        setFormData(activeDraft.formData);
        setGeneratedModul(activeDraft.generatedModul);
        setStep(activeDraft.step);
        
        const timer = setTimeout(() => {
          isSyncingRef.current = false;
        }, 60);
        return () => clearTimeout(timer);
      }
    }
  }, [activeDraftId, drafts]);

  // Keep storing current draft edit automatically
  useEffect(() => {
    if (activeDraftId && activeDraftId === lastDraftIdRef.current && !isSyncingRef.current) {
      saveDraft(activeDraftId, formData, generatedModul, step);
    }
  }, [formData, generatedModul, step, activeDraftId, saveDraft]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: 'metode_pembelajaran' | 'profil_pelajar_pancasila' | 'sarana_prasarana', item: string) => {
    setFormData(prev => {
      const current = prev[field];
      const updated = current.includes(item)
        ? current.filter(i => i !== item)
        : [...current, item];
      return { ...prev, [field]: updated };
    });
  };

  const handleElemenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const found = ELEMEN_INFORMATIKA_VIII.find(el => el.id === selectedId);
    if (found) {
      const options = LINGKUP_MATERI_MAP_VIII[selectedId] || [];
      const defaultOpt = options[0];
      setFormData(prev => ({
        ...prev,
        elemen_informatika: found.nama,
        capaian_pembelajaran: found.cp,
        tujuan_pembelajaran: defaultOpt ? defaultOpt.tujuanPembelajaran : found.tp_default,
        topik_materi: defaultOpt ? defaultOpt.lingkupMateri : found.topik_default,
        alokasi_waktu: prev.alokasi_waktu
      }));
    }
  };

  const generateModul = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const payload = {
        ...formData,
        metode_pembelajaran: formData.metode_pembelajaran.join(", "),
        profil_pelajar_pancasila: formData.profil_pelajar_pancasila.join(", "),
        sarana_prasarana: [
          ...formData.sarana_prasarana,
          ...(formData.sarana_prasarana_kustom ? [formData.sarana_prasarana_kustom] : [])
        ].join(", ")
      };

      const response = await fetch('/api/generate-modul', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || `Error ${response.status}: Gagal menyusun modul.`);
      }

      let modulText = data.modul;
      if (modulText) {
        modulText = modulText
          .replace(/=== MODUL AJAR SELESAI DIGENERATE ===/gi, '')
          .replace(/Modul Ajar Selesai Digenerate/gi, '')
          .replace(/Modul Ajar Generate Selesai/gi, '')
          .trim();
      }
      setGeneratedModul(modulText);
      setStep(3); // Go to preview
      if (activeDraftId) {
        saveDraft(activeDraftId, formData, modulText, 3);
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat generate modul. Pastikan koneksi internet Anda stabil.');
    } finally {
      setIsGenerating(false);
    }
  };

  const reviseModul = async () => {
    if (!revisionText.trim()) return;
    setIsRevising(true);
    setError(null);
    try {
      const response = await fetch('/api/revise-modul', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modul_sebelumnya: generatedModul,
          instruksi_revisi: revisionText,
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || `Error ${response.status}: Gagal memproses revisi.`);
      }

      let modulText = data.modul;
      if (modulText) {
        modulText = modulText
          .replace(/=== MODUL AJAR SELESAI DIGENERATE ===/gi, '')
          .replace(/Modul Ajar Selesai Digenerate/gi, '')
          .replace(/Modul Ajar Generate Selesai/gi, '')
          .trim();
      }
      setGeneratedModul(modulText);
      setRevisionText('');
      if (activeDraftId) {
        saveDraft(activeDraftId, formData, modulText, 3);
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat proses revisi.');
    } finally {
      setIsRevising(false);
    }
  };

  const downloadWordDocument = () => {
    if (!modulRef.current) return;
    setIsDownloading(true);

    try {
      // 1. Get the word-document container
      const docElement = modulRef.current.querySelector('.word-document');
      if (!docElement) throw new Error('Elemen dokumen tidak ditemukan');

      // 2. Clone it to manipulate offscreen
      const clone = docElement.cloneNode(true) as HTMLElement;

      // 3. Remove all 'no-print' header/footer references
      const noPrintEls = clone.querySelectorAll('.no-print');
      noPrintEls.forEach(el => el.remove());

      // 4. Remove horizontal rules
      const hrs = clone.querySelectorAll('hr');
      hrs.forEach(hr => hr.remove());

      // 5. Build rich HTML content specially tailored for Microsoft Word
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' 
              xmlns:w='urn:schemas-microsoft-com:office:word' 
              xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>Modul Ajar Kurikulum Merdeka</title>
          <!--[if gte mso 9]>
          <xml>
            <w:WordDocument>
              <w:View>Print</w:View>
              <w:Zoom>100</w:Zoom>
              <w:DoNotOptimizeForBrowser/>
            </w:WordDocument>
          </xml>
          <![endif]-->
          <style>
            @page {
              size: 21cm 29.7cm; /* A4 size */
              margin: 4cm 3cm 3cm 4cm; /* standard 4-4-3-3 margins: Top=4cm, Right=3cm, Bottom=3cm, Left=4cm */
            }
            body {
              font-family: "Times New Roman", Times, serif;
              font-size: 12pt;
              line-height: 130% !important;
              color: #000000;
              margin: 0;
              padding: 0;
            }
            h1 {
              font-family: "Times New Roman", Times, serif;
              font-size: 14pt;
              font-weight: bold;
              text-transform: uppercase;
              text-align: center;
              margin-top: 0pt;
              margin-bottom: 12pt;
              line-height: 130% !important;
              color: #000000;
              page-break-after: avoid;
            }
            h2 {
              font-family: "Times New Roman", Times, serif;
              font-size: 13pt;
              font-weight: bold;
              text-transform: uppercase;
              margin-top: 12pt;
              margin-bottom: 5pt;
              line-height: 120% !important;
              color: #000000;
              page-break-after: avoid;
            }
            h3 {
              font-family: "Times New Roman", Times, serif;
              font-size: 12pt;
              font-weight: bold;
              margin-top: 10pt;
              margin-bottom: 3pt;
              line-height: 120% !important;
              color: #000000;
              page-break-after: avoid;
            }
            h4 {
              font-family: "Times New Roman", Times, serif;
              font-size: 11pt;
              font-weight: bold;
              margin-top: 8pt;
              margin-bottom: 3pt;
              line-height: 120% !important;
              color: #000000;
              page-break-after: avoid;
            }
            p {
              font-family: "Times New Roman", Times, serif;
              font-size: 12pt;
              margin-top: 0pt;
              margin-bottom: 5pt;
              text-align: justify;
              line-height: 125% !important;
            }
            p.multiple-choice-option {
              font-family: "Times New Roman", Times, serif;
              font-size: 11pt !important;
              margin-top: 1pt !important;
              margin-bottom: 2pt !important;
              padding-left: 18pt !important;
              text-indent: -18pt !important;
              line-height: 115% !important;
              text-align: justify;
            }
            ol {
              margin-top: 0pt;
              margin-bottom: 5pt;
              padding-left: 18pt;
              line-height: 125% !important;
            }
            ul {
              margin-top: 0pt;
              margin-bottom: 5pt;
              padding-left: 16pt;
              line-height: 125% !important;
            }
            li {
              font-family: "Times New Roman", Times, serif;
              font-size: 12pt;
              margin-top: 0pt;
              margin-bottom: 2pt;
              text-align: justify;
              line-height: 125% !important;
            }
            /* Tighten up nested lists inside markdown list items */
            li p {
              margin-top: 0px !important;
              margin-bottom: 0px !important;
              display: inline !important;
            }
            ol ol, ul ul, ol ul, ul ol {
              margin-top: 1pt !important;
              margin-bottom: 1pt !important;
              padding-left: 14pt !important;
            }
            /* Tighten up table spacing and remove cell paragraph margins */
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 8pt;
              margin-bottom: 10pt;
            }
            th, td {
              border: 1px solid #111111;
              padding: 5pt 7pt;
              text-align: left;
              font-size: 11pt;
              vertical-align: top;
              line-height: 115% !important;
              font-family: "Times New Roman", Times, serif;
            }
            th {
              background-color: #f2f2f2;
              font-weight: bold;
            }
            td p, th p {
              margin-top: 0px !important;
              margin-bottom: 0px !important;
              padding: 0px !important;
              line-height: 115% !important;
            }
            td ul, td ol, th ul, th ol {
              margin-top: 0px !important;
              margin-bottom: 0px !important;
              padding-left: 12pt !important;
            }
            td li, th li {
              font-size: 10.5pt !important;
              margin-top: 0px !important;
              margin-bottom: 2pt !important;
              line-height: 115% !important;
            }
          </style>
        </head>
        <body>
          <div class="printable-content">
            ${clone.innerHTML}
          </div>
        </body>
        </html>
      `;

      // 6. Convert string to Blob with application/msword type
      const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword;charset=utf-8' });
      
      // 7. Trigger the client-side download
      const filename = `Modul_Ajar_${formData.nama_guru.replace(/\s+/g, '_') || 'Informatika'}.doc`;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Word export error:', err);
      setError('Gagal mengunduh file Word. Silakan coba kembali.');
    } finally {
      setIsDownloading(false);
    }
  };

  const copyToClipboard = () => {
    if (cleanModul) {
      navigator.clipboard.writeText(cleanModul);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    const username = authUsername.trim();
    const password = authPassword;

    if (!username || !password) {
      setAuthError('Username dan Password wajib diisi.');
      return;
    }

    if (authMode === 'register' && password !== authConfirmPassword) {
      setAuthError('Konfirmasi password tidak cocok dengan password.');
      return;
    }

    if (authMode === 'login') {
      const res = login(username, password);
      if (res.success) {
        setAuthUsername('');
        setAuthPassword('');
        setAuthConfirmPassword('');
        setStep(1); // Reset to step 1 index
      } else {
        setAuthError(res.message);
      }
    } else {
      const nameGuru = authNamaGuru.trim();
      const schoolName = authNamaSekolah.trim();

      if (!nameGuru || !schoolName) {
        setAuthError('Nama Guru dan Nama Sekolah wajib diisi untuk registrasi baru.');
        return;
      }

      const res = registerUser(username, password, nameGuru, schoolName);
      if (res.success) {
        setAuthSuccess(res.message);
        setAuthMode('login');
        setAuthPassword(''); // Keep username, clear password for entering
        setAuthConfirmPassword('');
        setAuthNamaGuru('');
        setAuthNamaSekolah('');
      } else {
        setAuthError(res.message);
      }
    }
  };

  if (!isAuthLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-[#14b8a6] animate-spin mx-auto" />
          <p className="text-sm font-extrabold text-slate-650">Memuat Layanan Kurikulum...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-slate-200/60 space-y-6">
          {/* Header branding */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-[#14b8a6] shadow-sm mx-auto">
              <Lock size={26} className="text-[#14b8a6]" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-800">
              {authMode === 'login' ? 'Masuk Pendidik' : 'Pendaftaran Guru'}
            </h2>
            <p className="text-slate-500 font-medium text-xs leading-relaxed">
              {authMode === 'login' 
                ? 'Gunakan akun Anda untuk mengaktifkan sesi penyusunan modul ajar.' 
                : 'Daftarkan akun guru baru untuk mulai mendesain modul ajar mandiri.'}
            </p>
          </div>

          {/* Error or Success notification blocks */}
          {authError && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-2xl flex items-center gap-2.5">
              <AlertCircle size={16} className="text-rose-500 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {authSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-250 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>{authSuccess}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 tracking-widest uppercase">
                Username *
              </label>
              <input
                type="text"
                required
                value={authUsername}
                onChange={(e) => {
                  setAuthUsername(e.target.value);
                  if (authError) setAuthError(null);
                }}
                placeholder="Contoh: guru_informatika"
                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#14b8a6] focus:ring-4 focus:ring-[#14b8a6]/10 transition-all font-semibold text-slate-700 placeholder-slate-400 bg-slate-50/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 tracking-widest uppercase">
                Password *
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => {
                  setAuthPassword(e.target.value);
                  if (authError) setAuthError(null);
                }}
                placeholder="••••••••"
                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#14b8a6] focus:ring-4 focus:ring-[#14b8a6]/10 transition-all font-semibold text-slate-700 bg-slate-50/50"
              />
            </div>

            {authMode === 'register' && (
              <>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600 tracking-widest uppercase">
                    Konfirmasi Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={authConfirmPassword}
                    onChange={(e) => {
                      setAuthConfirmPassword(e.target.value);
                      if (authError) setAuthError(null);
                    }}
                    placeholder="••••••••"
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#14b8a6] focus:ring-4 focus:ring-[#14b8a6]/10 transition-all font-semibold text-slate-700 bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600 tracking-widest uppercase">
                    Nama Lengkap Guru beserta Gelar *
                  </label>
                  <input
                    type="text"
                    required
                    value={authNamaGuru}
                    onChange={(e) => setAuthNamaGuru(e.target.value)}
                    placeholder="Contoh: Fatmawati, S.Pd., Gr."
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#14b8a6] focus:ring-4 focus:ring-[#14b8a6]/10 transition-all font-medium text-slate-700 bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600 tracking-widest uppercase">
                    Asal Sekolah / Madrasah *
                  </label>
                  <input
                    type="text"
                    required
                    value={authNamaSekolah}
                    onChange={(e) => setAuthNamaSekolah(e.target.value)}
                    placeholder="Contoh: SMP Negeri 1 Banda Aceh"
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#14b8a6] focus:ring-4 focus:ring-[#14b8a6]/10 transition-all font-medium text-slate-700 bg-slate-50/50"
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#14b8a6] hover:bg-[#0d9488] text-white font-bold rounded-2xl shadow-lg hover:shadow-[0_8px_20px_rgba(20,184,166,0.3)] transition-all active:scale-[0.98] mt-2 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Key size={15} />
              <span>{authMode === 'login' ? 'Masuk Sekarang' : 'Daftarkan Akun'}</span>
            </button>
          </form>

          {/* Account Toggle option */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-400">
              {authMode === 'login' ? 'Pengguna Baru?' : 'Sudah Punya Akun?'}
            </span>
            <button
              onClick={() => {
                setAuthMode(authMode === 'login' ? 'register' : 'login');
                setAuthPassword('');
                setAuthConfirmPassword('');
                setAuthError(null);
                setAuthSuccess(null);
              }}
              className="text-slate-600 hover:text-[#14b8a6] font-bold transition-all cursor-pointer underline decoration-[#14b8a6] decoration-2"
            >
              {authMode === 'login' ? 'Buat Akun Baru' : 'Log In di Sini'}
            </button>
          </div>

          {/* Test credentials box */}
          <div className="bg-[#14b8a6]/10 border border-[#14b8a6]/25 rounded-2xl p-4.5 space-y-2 mt-4 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <Info size={14} className="text-[#14b8a6]" />
              <span>Kredensial Pengujian (Praktis!)</span>
            </div>
            <p className="text-slate-650 leading-relaxed font-semibold text-[11px]">
              Gunakan akun demo berikut untuk masuk dengan cepat tanpa mendaftar:
            </p>
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-dashed border-slate-200 font-mono text-[11px] font-semibold text-slate-650">
              <div>User: <span className="text-slate-800 font-bold">guru_informatika</span></div>
              <div>Pass: <span className="text-slate-800 font-bold">password123</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <style>{`
        .printable-content {
          font-family: "Times New Roman", Times, serif;
          color: #000000;
        }
        .printable-content, .printable-content * {
          line-height: 1.3 !important;
        }
        .word-document {
          background-color: #ffffff;
          box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.01);
          border: 1px solid #e2e8f0;
          padding: 2.5rem 2rem;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
          max-width: 820px;
          position: relative;
          font-family: "Times New Roman", Times, serif;
        }
        @media (min-width: 768px) {
          .word-document {
            padding: 4rem 5rem;
          }
        }
        .printable-content h1 { font-size: 14pt !important; font-weight: bold; margin-bottom: 12pt; text-transform: uppercase; color: #000000; border-bottom: none !important; text-align: center; }
        .printable-content h2 { font-size: 13pt !important; font-weight: bold; margin-top: 12pt; margin-bottom: 5pt; color: #000000; border-bottom: none !important; padding-bottom: 0px; box-shadow: none !important; text-transform: uppercase; }
        .printable-content h3 { font-size: 12pt !important; font-weight: bold; margin-top: 10pt; margin-bottom: 3pt; color: #000000; border-bottom: none !important; }
        .printable-content h4 { font-size: 11pt !important; font-weight: bold; margin-top: 8pt; margin-bottom: 3pt; color: #000000; border-bottom: none !important; }
        .printable-content p { font-size: 12pt !important; text-align: justify; color: #000000; margin-bottom: 5pt; }
        
        .printable-content p.multiple-choice-option {
          font-size: 11pt !important;
          margin-top: 1px !important;
          margin-bottom: 2px !important;
          padding-left: 18pt !important;
          text-indent: -18pt !important;
          line-height: 1.15 !important;
          text-align: justify !important;
        }

        /* Rigid Fix for Numbered and Bullet List Alignment */
        .printable-content ol, .printable-content .prose ol {
          list-style-type: decimal !important;
          padding-left: 18pt !important;
          margin-top: 4pt !important;
          margin-bottom: 5pt !important;
          list-style-position: outside !important;
        }

        /* Auto-formatting nested lists for Multiple Choice Questions (A, B, C, D) */
        .printable-content ol ol, .printable-content .prose ol ol {
          list-style-type: upper-alpha !important;
          padding-left: 16pt !important;
          margin-top: 1pt !important;
          margin-bottom: 1pt !important;
        }
        .printable-content ol ol li, .printable-content .prose ol ol li {
          list-style-type: upper-alpha !important;
          margin-bottom: 2pt !important;
        }
        .printable-content ol ol li::marker, .printable-content .prose ol ol li::marker {
          content: counter(list-item, upper-alpha) ". " !important;
          font-weight: normal !important;
          color: #000000 !important;
        }

        .printable-content ul, .printable-content .prose ul {
          list-style-type: disc !important;
          padding-left: 16pt !important;
          margin-top: 4pt !important;
          margin-bottom: 5pt !important;
          list-style-position: outside !important;
        }
        .printable-content li, .printable-content .prose li {
          display: list-item !important;
          list-style-position: outside !important;
          font-size: 12pt !important;
          line-height: 1.25 !important;
          text-align: justify !important;
          color: #000000 !important;
          padding-left: 4pt !important;
          margin-bottom: 2pt !important;
        }

        /* Completely eliminate Tailwind prose's absolute elements/unwanted pseudo counters that conflict with browser lists */
        .printable-content ol > li::before,
        .printable-content .prose ol > li::before,
        .printable-content ul > li::before,
        .printable-content .prose ul > li::before,
        .printable-content li::before,
        .printable-content .prose li::before {
          content: none !important;
          display: none !important;
        }

        /* Tighten up nested lists inside markdown list items */
        .printable-content li p, .printable-content .prose li p {
          margin-top: 0px !important;
          margin-bottom: 0px !important;
          display: inline !important;
        }

        /* Force standard bullet/number color to be black */
        .printable-content ol li::marker,
        .printable-content ul li::marker {
          color: #000000 !important;
        }

        /* Rigid Fix for Table cut-off, horizontal flow and page breaks */
        .printable-content table, .printable-content .prose table {
          width: 100% !important;
          max-width: 100% !important;
          table-layout: auto !important;
          border-collapse: collapse !important;
          margin: 10pt 0 !important;
          background-color: transparent !important;
          page-break-inside: auto !important;
        }

        .printable-content tr, .printable-content .prose tr {
          page-break-inside: avoid !important;
          page-break-after: auto !important;
        }

        .printable-content thead, .printable-content .prose thead {
          display: table-header-group !important;
        }

        .printable-content th, .printable-content td,
        .printable-content .prose th, .printable-content .prose td {
          border: 1px solid #111111 !important;
          padding: 6pt 8pt !important;
          text-align: left !important;
          color: #000000 !important;
          font-size: 11pt !important; /* Set to 11pt for standard compliant size inside tables */
          line-height: 1.2 !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
          vertical-align: top !important;
        }

        .printable-content td p, .printable-content th p,
        .printable-content .prose td p, .printable-content .prose th p {
          margin-top: 0px !important;
          margin-bottom: 0px !important;
          padding: 0px !important;
          line-height: 1.15 !important;
        }

        .printable-content td ul, .printable-content td ol,
        .printable-content .prose td ul, .printable-content .prose td ol {
          margin-top: 0px !important;
          margin-bottom: 0px !important;
          padding-left: 12pt !important;
        }

        .printable-content td li, .printable-content .prose td li {
          font-size: 10.5pt !important;
          margin-top: 0px !important;
          margin-bottom: 2pt !important;
          line-height: 1.15 !important;
        }

        .printable-content th, .printable-content .prose th {
          background-color: #f2f2f2 !important;
          font-weight: bold !important;
        }
        .printable-content hr { display: none !important; }
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .print-container { padding: 0 !important; box-shadow: none !important; border: none !important; }
          .word-document {
            box-shadow: none !important;
            border: none !important;
            padding: 0px !important;
            margin: 0px !important;
            background: transparent !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>
      
      {/* Elegantly Crafted Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/65 shadow-sm no-print">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center text-[#14b8a6] border border-slate-200 shadow-sm">
              <FileEdit size={22} className="text-[#14b8a6]" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight text-slate-850">Modul Ajar Generator</h1>
              <p className="text-xs text-slate-500 font-medium">Informatika Kurikulum Merdeka SMP</p>
            </div>
          </div>
          
          {/* Badge & Info */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => logout()}
              className="text-rose-600 hover:text-rose-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer hover:underline py-1.5 px-2 rounded-lg"
              title={`Keluar dari akun ${currentUser?.username}`}
            >
              <LogOut size={13} />
              <span>Keluar <span className="hidden sm:inline">({currentUser?.username})</span></span>
            </button>

            <div className="hidden lg:flex items-center gap-1.5 select-none font-bold text-xs text-slate-500 uppercase tracking-wider">
              <span>Siswa SMP/MTs</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        
        {/* Crisp Progress Stepper Tracker */}
        <div className="max-w-2xl mx-auto mb-12 no-print">
          <div className="flex items-center justify-between relative">
            
            {/* Step Line */}
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-slate-200 -translate-y-1/2 z-0 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#14b8a6] transition-all duration-500"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
            </div>

            {/* Step Nodes */}
            {[
              { num: 1, label: 'Identitas Sekolah' },
              { num: 2, label: 'Konten & Tujuan' },
              { num: 3, label: 'Pratinjau & Cetak' }
            ].map((s) => {
              const active = step >= s.num;
              const current = step === s.num;
              return (
                <div key={s.num} className="z-10 flex flex-col items-center gap-2">
                  <button
                    onClick={() => {
                      if (s.num < step || (s.num === 2 && formData.nama_sekolah && formData.nama_guru) || (s.num === 3 && generatedModul)) {
                        setStep(s.num);
                      }
                    }}
                    disabled={s.num === 3 && !generatedModul}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm cursor-pointer
                      ${current ? 'bg-white text-[#14b8a6] ring-4 ring-[#14b8a6]/20 border-2 border-[#14b8a6] scale-110' : 
                        active ? 'bg-[#14b8a6] text-white hover:bg-[#0d9488]' : 'bg-white text-slate-400 border border-slate-200'}`}
                  >
                    {active && s.num < step ? <Check size={16} /> : s.num}
                  </button>
                  <span className={`text-[11px] font-bold tracking-wide uppercase ${current ? 'text-slate-800 font-extrabold' : 'text-slate-400'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}

          </div>
        </div>

        {/* Master Responsive Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Mobile/Tablet Drafts Carousel Tracker */}
          <div className="lg:hidden col-span-1 bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_25px_-12px_rgba(0,0,0,0.04)] mb-2 no-print space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                <FileText size={15} /> Draf Tersimpan ({drafts.length})
              </span>
              <button
                onClick={() => createNewDraft(formData.nama_guru, formData.nama_sekolah)}
                className="text-xs font-extrabold text-white bg-[#14b8a6] hover:bg-[#0d9488] hover:shadow-md px-3.5 py-2 rounded-xl flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus size={13} /> Draf Baru
              </button>
            </div>
            
            <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-200">
              {drafts.map((draft) => {
                const isActive = draft.id === activeDraftId;
                const titleText = draft.title || "Tanpa Judul";
                const displayTitle = titleText.length > 20 ? titleText.substring(0, 20) + '...' : titleText;
                return (
                  <div
                    key={draft.id}
                    onClick={() => setActiveDraft(draft.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border shrink-0 cursor-pointer transition-all select-none text-xs font-bold
                      ${isActive 
                        ? 'bg-[#14b8a6]/10 border-[#14b8a6] text-[#0d9488] shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-350'}`}
                  >
                    {draft.generatedModul ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Selesai Digenerate" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" title="Draf Konsep" />
                    )}
                    <span>{displayTitle}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDraftToDelete(draft.id);
                      }}
                      className="text-slate-400 hover:text-rose-600 p-0.5 shrink-0 transition-all cursor-pointer"
                      title="Hapus draf"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Left Sidebar: Draft Manager */}
          <div className="hidden lg:block lg:col-span-3 space-y-4 no-print sticky top-24">
            <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_4px_30px_-12px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#14b8a6]/15 flex items-center justify-center text-[#0d9488]">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-800 tracking-tight">Draf Modul</h3>
                    <p className="text-[10px] text-slate-400 font-bold">{drafts.length} Tersimpan</p>
                  </div>
                </div>
                <button
                  onClick={() => createNewDraft(formData.nama_guru, formData.nama_sekolah)}
                  title="Buat draf baru"
                  className="w-8 h-8 rounded-lg bg-[#14b8a6] hover:bg-[#0d9488] text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Scrollable Draft List */}
              <div className="mt-4 space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {drafts.map((draft) => {
                  const isActive = draft.id === activeDraftId;
                  const shortTopic = draft.title || "Tanpa Judul";
                  const elAbbr = draft.formData.elemen_informatika 
                    ? (draft.formData.elemen_informatika.match(/\(([^)]+)\)/)?.[1] || "BK")
                    : "CP";
                  
                  return (
                    <div
                      key={draft.id}
                      className={`group/draft relative p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5 select-none
                        ${isActive 
                          ? 'bg-[#14b8a6]/10 border-[#14b8a6]/40 shadow-[0_2px_10px_-4px_rgba(20,184,166,0.12)] font-bold ring-1 ring-[#14b8a6]/20' 
                          : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/50 text-slate-650'}`}
                      onClick={() => setActiveDraft(draft.id)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1 w-full min-w-0">
                          <p className={`text-[11px] leading-tight truncate font-bold
                            ${isActive ? 'text-slate-800' : 'text-slate-700'}`}
                          >
                            {shortTopic}
                          </p>
                          <div className="flex flex-wrap items-center gap-1 border-slate-100 pb-0.5">
                            <span className={`text-[8px] px-1.5 py-0.5 rounded font-extrabold uppercase shrink-0
                              ${isActive ? 'bg-[#14b8a6]/20 text-[#0d9488]' : 'bg-slate-100 text-slate-500'}`}
                            >
                              {elAbbr}
                            </span>
                            {draft.generatedModul ? (
                              <span className="text-[8px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 bg-emerald-100/90 text-emerald-800 flex items-center gap-0.5">
                                ✓ Selesai
                              </span>
                            ) : (
                              <span className="text-[8px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 bg-amber-50 text-amber-600 border border-amber-200/40">
                                Draf
                              </span>
                            )}
                            <span className="text-[9px] text-slate-400 font-semibold truncate leading-none">
                              Semester {draft.formData.semester}
                            </span>
                          </div>
                        </div>

                        {/* Delete button option */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDraftToDelete(draft.id);
                          }}
                          className={`${drafts.length > 1 ? 'opacity-0 group-hover/draft:opacity-100' : 'opacity-100'} hover:text-rose-650 p-1 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all cursor-pointer shrink-0`}
                          title="Hapus draf"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      
                      {/* Last updated timestamp */}
                      <div className="text-[8px] text-slate-400 font-medium self-end leading-none pt-0.5 border-t border-slate-50 w-full text-right">
                        Edit: {new Date(draft.updatedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Sidebar Footer help text */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                <span>Auto-save Aktif</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
            </div>
          </div>

          {/* Form / Content Area occupying remaining space */}
          <div className="lg:col-span-9 space-y-8 min-w-0">
            
            {/* Content Wrapper */}
            <AnimatePresence mode="wait">
              
              {/* EMPTY STATE WELCOME CARD */}
              {drafts.length === 0 && (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-8 md:p-12 rounded-[32px] shadow-[0_12px_45px_-16px_rgba(71,60,51,0.08)] border border-slate-100 text-center space-y-6 max-w-xl mx-auto my-10"
                >
                  <div className="w-16 h-16 bg-[#14b8a6]/10 rounded-3xl flex items-center justify-center text-[#14b8a6] mx-auto">
                    <FileText size={32} className="text-[#14b8a6]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-[#473C33]">Belum Ada Draf Modul</h3>
                    <p className="text-slate-550 font-semibold text-sm leading-relaxed">
                      Selamat datang di <strong>Informatika Modul Ajar Generator</strong>. Anda belum memiliki draf modul aktif di akun ini.
                    </p>
                  </div>
                  <button
                    onClick={() => createNewDraft(currentUser?.nama_guru, currentUser?.nama_sekolah)}
                    className="inline-flex items-center gap-2 bg-[#14b8a6] hover:bg-[#0d9488] text-white px-8 py-3.5 rounded-full font-extrabold shadow-lg hover:shadow-[0_8px_20px_rgba(20,184,166,0.3)] transition-all active:scale-95 cursor-pointer text-sm"
                  >
                    <Plus size={18} />
                    <span>Buat Draf Modul Pertama</span>
                  </button>
                </motion.div>
              )}
          
              {/* STEP 1: IDENTITAS MODUL */}
              {drafts.length > 0 && step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 no-print"
            >
              {/* Header Intro */}
              <div className="text-center space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#473C33] bg-[#473C33]/5 px-3 py-1 rounded-full border border-[#473C33]/15 inline-block">
                  Langkah Pertama
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#473C33]">
                  Identitas Modul Ajar
                </h2>
                <p className="text-slate-550 max-w-lg mx-auto text-base font-medium">
                  Isi data administrasi umum sekolah. AI akan menyematkan informasi ini ke seluruh dokumen dan rujukan kurikulum secara tepat.
                </p>
              </div>

              {/* Form Grid */}
              <div className="bg-white p-6 md:p-10 rounded-[24px] shadow-[0_12px_45px_-16px_rgba(71,60,51,0.08)] border border-slate-100 space-y-6">
                
                {/* School Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#473C33] flex items-center gap-2">
                    <BookOpen size={14} className="text-[#14b8a6]" /> Nama Sekolah / Madrasah *
                  </label>
                  <input
                    type="text"
                    name="nama_sekolah"
                    value={formData.nama_sekolah}
                    onChange={handleInputChange}
                    placeholder="Contoh: SMP Negeri 1 Banda Aceh"
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#473C33] focus:ring-4 focus:ring-[#14b8a6]/20 transition-all font-medium text-slate-700 placeholder-slate-400 bg-slate-50/30"
                  />
                </div>

                {/* Grid for parameters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Guru */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#473C33] flex items-center gap-2">
                      <Users size={14} className="text-[#14b8a6]" /> Nama Guru Pengampu *
                    </label>
                    <input
                      type="text"
                      name="nama_guru"
                      value={formData.nama_guru}
                      onChange={handleInputChange}
                      placeholder="Contoh: Fatmawati, S.Pd., Gr."
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#473C33] focus:ring-4 focus:ring-[#14b8a6]/20 transition-all font-medium text-slate-700 bg-slate-50/30"
                    />
                  </div>

                  {/* Mata Pelajaran (Read Only) */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#473C33] flex items-center gap-2">
                      <Layers size={14} className="text-[#14b8a6]" /> Mata Pelajaran
                    </label>
                    <input
                      type="text"
                      name="mata_pelajaran"
                      value={formData.mata_pelajaran}
                      readOnly
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-100/50 cursor-not-allowed font-semibold text-slate-550 focus:outline-none"
                    />
                  </div>

                  {/* Semester Dropdown */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#473C33]">
                      Semester
                    </label>
                    <div className="relative">
                      <select
                        name="semester"
                        value={formData.semester}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#473C33] focus:ring-4 focus:ring-[#14b8a6]/20 transition-all font-semibold text-slate-700 bg-slate-50/30 cursor-pointer appearance-none"
                      >
                        <option value="Ganjil">Ganjil</option>
                        <option value="Genap">Genap</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 font-bold">
                        &darr;
                      </div>
                    </div>
                  </div>

                  {/* Tahun Pelajaran */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#473C33]">
                      Tahun Pelajaran
                    </label>
                    <input
                      type="text"
                      name="tahun_pelajaran"
                      value={formData.tahun_pelajaran}
                      onChange={handleInputChange}
                      placeholder="Contoh: 2026/2027"
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#473C33] focus:ring-4 focus:ring-[#14b8a6]/20 transition-all font-medium text-slate-700 bg-slate-50/30"
                    />
                  </div>

                  {/* Alokasi Waktu */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#473C33] flex items-center gap-2">
                      <Clock size={14} className="text-[#14b8a6]" /> Alokasi Waktu (JP)
                    </label>
                    <input
                      type="text"
                      name="alokasi_waktu"
                      value={formData.alokasi_waktu}
                      onChange={handleInputChange}
                      placeholder="Contoh: 2 JP (2 x 40 Menit)"
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#473C33] focus:ring-4 focus:ring-[#14b8a6]/20 transition-all font-medium text-slate-700 bg-slate-50/30"
                    />
                  </div>

                  {/* Jumlah Pertemuan */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#473C33] flex items-center gap-2">
                      <Layout size={14} className="text-[#14b8a6]" /> Jumlah Pertemuan (1-3)
                    </label>
                    <div className="relative">
                      <select
                        name="jumlah_pertemuan"
                        value={formData.jumlah_pertemuan}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#473C33] focus:ring-4 focus:ring-[#14b8a6]/20 transition-all font-semibold text-slate-700 bg-slate-50/30 cursor-pointer appearance-none"
                      >
                        <option value="1 Pertemuan">1 Pertemuan</option>
                        <option value="2 Pertemuan">2 Pertemuan</option>
                        <option value="3 Pertemuan">3 Pertemuan</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 font-bold">
                        &darr;
                      </div>
                    </div>
                  </div>

                  {/* Model Pembelajaran */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#473C33] flex items-center gap-2">
                      <Award size={14} className="text-[#14b8a6]" /> Model Pembelajaran
                    </label>
                    <div className="relative">
                      <select
                        name="model_pembelajaran"
                        value={formData.model_pembelajaran}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#473C33] focus:ring-4 focus:ring-[#14b8a6]/20 transition-all font-semibold text-slate-700 appearance-none bg-slate-50/30 cursor-pointer"
                      >
                        <option value="Problem Based Learning (PBL)">Problem Based Learning (PBL)</option>
                        <option value="Project Based Learning (PjBL)">Project Based Learning (PjBL)</option>
                        <option value="Discovery Learning">Discovery Learning</option>
                        <option value="Inquiry Learning">Inquiry Learning</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 font-bold">
                        &darr;
                      </div>
                    </div>
                  </div>

                </div>

                {/* Metode Pembelajaran (Checkbox Grid) */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#473C33]">
                    Metode Pembelajaran Yang Digunakan
                  </label>
                  <p className="text-xs text-slate-400">Pilih salah satu atau beberapa metode interaktif berikut:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {METODE_PEMBELAJARAN_LIST.map((metode) => {
                      const isChecked = formData.metode_pembelajaran.includes(metode);
                      return (
                        <div
                          key={metode}
                          onClick={() => handleCheckboxChange('metode_pembelajaran', metode)}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none
                            ${isChecked 
                              ? 'bg-[#14b8a6]/10 border-[#14b8a6] shadow-[0_2px_8px_rgba(20,184,166,0.05)] font-bold' 
                              : 'bg-white border-slate-200 hover:border-slate-300'}`}
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all shrink-0
                            ${isChecked ? 'bg-[#14b8a6] border-[#14b8a6] text-white' : 'border-slate-300 bg-white'}`}
                          >
                            {isChecked && <Check size={12} className="stroke-[3]" />}
                          </div>
                          <span className="text-xs font-bold text-slate-700">{metode}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={nextStep}
                  disabled={!formData.nama_sekolah || !formData.nama_guru || formData.metode_pembelajaran.length === 0}
                  className="flex items-center gap-2 bg-[#14b8a6] hover:bg-[#0d9488] text-white px-8 py-3.5 rounded-full font-extrabold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_8px_25px_-4px_rgba(20,184,166,0.2)] hover:shadow-[0_12px_30px_-4px_rgba(20,184,166,0.3)] group cursor-pointer"
                >
                  Langkah Selanjutnya 
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: CAPAIAN & TUJUAN PEMBELAJARAN */}
          {drafts.length > 0 && step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 no-print"
            >
              {/* Header Intro */}
              <div className="text-center space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#473C33] bg-[#473C33]/5 px-3 py-1 rounded-full border border-[#473C33]/15 inline-block">
                  Langkah Kedua
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#473C33]">
                  Kurikulum & Konten Ajar
                </h2>
                <p className="text-slate-550 max-w-lg mx-auto text-base font-medium">
                  Pilih elemen Informatika, dan sesuaikan tujuan pembelajaran, sarana prasarana, serta profil Pelajar Pancasila.
                </p>
              </div>              <div className="bg-white p-6 md:p-10 rounded-[24px] shadow-[0_12px_45px_-16px_rgba(71,60,51,0.08)] border border-slate-100 space-y-6">

                {/* Elemen Informatika (SMP Fase D Kelas VIII) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#473C33] flex items-center gap-1.5">
                    <Layers size={14} className="text-[#14b8a6]" /> Elemen Capaian Pembelajaran Informatika
                  </label>
                  <p className="text-xs text-slate-400">Pilih salah satu elemen Informatika Kurikulum Merdeka untuk mengisi otomatis CP dan TP:</p>
                  <div className="relative">
                    <select
                      value={ELEMEN_INFORMATIKA_VIII.find(el => el.nama === formData.elemen_informatika)?.id || "BK"}
                      onChange={handleElemenChange}
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#473C33] focus:ring-4 focus:ring-[#14b8a6]/20 transition-all font-semibold text-slate-700 bg-slate-50/30 cursor-pointer appearance-none"
                    >
                      {ELEMEN_INFORMATIKA_VIII.map(el => (
                        <option key={el.id} value={el.id}>{el.nama}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 font-bold">
                      &darr;
                    </div>
                  </div>
                </div>

                {/* Pilihan Lingkup Materi (Buku Paket Kelas 8) */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-[#473C33] flex items-center gap-1.5">
                      <BookOpen size={14} className="text-[#14b8a6]" /> Pilihan Lingkup Materi (Silabus Acuan Buku Paket VIII)
                    </label>
                    <span className="text-[10px] text-slate-400 font-semibold">Klik salah satu materi di bawah:</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(() => {
                      const currentElement = ELEMEN_INFORMATIKA_VIII.find(el => el.nama === formData.elemen_informatika) || ELEMEN_INFORMATIKA_VIII[0];
                      const currentElementId = currentElement?.id || "BK";
                      const options = LINGKUP_MATERI_MAP_VIII[currentElementId] || [];
                      
                      return options.map((opt) => {
                        const isSelected = formData.topik_materi === opt.lingkupMateri;
                        const imageUrl = getTopicImage(opt.lingkupMateri);
                        return (
                          <div
                            key={opt.lingkupMateri}
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                topik_materi: opt.lingkupMateri,
                                tujuan_pembelajaran: opt.tujuanPembelajaran,
                                alokasi_waktu: prev.alokasi_waktu
                              }));
                            }}
                            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer group flex gap-3.5 items-start justify-between relative overflow-hidden select-none min-h-[135px]
                              ${isSelected 
                                ? 'bg-[#14b8a6]/10 border-[#14b8a6] shadow-md ring-2 ring-[#14b8a6]/20' 
                                : 'bg-white border-slate-200 hover:border-[#14b8a6]/40 hover:bg-slate-50/40 hover:shadow-sm'}`}
                          >
                            <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                              <div>
                                <span className="text-slate-800 text-xs font-extrabold leading-snug group-hover:text-[#0d9488] transition-colors block pr-4">
                                  {opt.lingkupMateri}
                                </span>
                              </div>

                              <div className="space-y-1 mt-3.5 pt-2 border-t border-dashed border-slate-100">
                                <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider flex items-center gap-1">
                                  <Sparkles size={10} className="text-[#FDA769]" /> Contoh Kegiatan:
                                </div>
                                <p className="text-[10px] text-slate-500 leading-normal font-medium whitespace-pre-line line-clamp-2">
                                  {opt.kegiatanPembelajaran}
                                </p>
                              </div>
                            </div>

                            {/* Beautiful visual thumbnail representation of the topic */}
                            <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl overflow-hidden border border-slate-100 relative mt-0.5 shadow-sm">
                              <img 
                                src={imageUrl} 
                                alt={opt.lingkupMateri} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                referrerPolicy="no-referrer" 
                              />
                            </div>

                            {/* Check circle for active state */}
                            {isSelected && (
                              <div className="absolute right-2 top-2 text-[#14b8a6]">
                                <CheckCircle2 size={15} className="fill-[#14b8a6] text-white" />
                              </div>
                            )}
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* Topik / Materi Pembelajaran */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#473C33]">
                    Sesuaikan / Isikan Manual Lingkup Materi
                  </label>
                  <input
                    type="text"
                    name="topik_materi"
                    value={formData.topik_materi}
                    onChange={handleInputChange}
                    placeholder="Contoh: Logika Boole, Operator Pemrograman Genap, dll."
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#473C33] focus:ring-4 focus:ring-[#14b8a6]/20 transition-all font-medium text-slate-700 bg-slate-50/30"
                  />
                  <p className="text-[11px] text-slate-400">Guru bisa mengubah langsung penamaan materi acuan di atas atau mengetikkan materi kustom yang lain.</p>
                </div>

                {/* Alokasi Waktu & Jumlah Pertemuan (Bisa Disesuaikan Lagi Di Sini) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#473C33] flex items-center gap-2">
                      <Clock size={14} className="text-[#14b8a6]" /> Sesuaikan Alokasi Waktu (JP)
                    </label>
                    <input
                      type="text"
                      name="alokasi_waktu"
                      value={formData.alokasi_waktu}
                      onChange={handleInputChange}
                      placeholder="Contoh: 3 JP (3 x 40 Menit)"
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#473C33] focus:ring-4 focus:ring-[#14b8a6]/20 transition-all font-medium text-slate-700 bg-slate-50/30"
                    />
                    <p className="text-[11px] text-slate-400">Ubah nilai ini jika ingin alokasi waktu yang berbeda (misal: 3 JP, 4 JP, dst).</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#473C33] flex items-center gap-2">
                      <Layout size={14} className="text-[#14b8a6]" /> Jumlah Pertemuan
                    </label>
                    <div className="relative">
                      <select
                        name="jumlah_pertemuan"
                        value={formData.jumlah_pertemuan}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#473C33] focus:ring-4 focus:ring-[#14b8a6]/20 transition-all font-semibold text-slate-700 bg-slate-50/30 cursor-pointer appearance-none"
                      >
                        <option value="1 Pertemuan">1 Pertemuan</option>
                        <option value="2 Pertemuan">2 Pertemuan</option>
                        <option value="3 Pertemuan">3 Pertemuan</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 font-bold">
                        &darr;
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400">Jumlah pertemuan pendukung alokasi waktu terkait.</p>
                  </div>
                </div>

                {/* CP */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#473C33]">
                      Capaian Pembelajaran (CP) Elemen Terpilih
                    </label>
                    <span className="text-[10px] text-[#0d9488] font-extrabold uppercase bg-[#14b8a6]/15 px-2 py-0.5 rounded">Otomatis Terisi</span>
                  </div>
                  <textarea
                    name="capaian_pembelajaran"
                    value={formData.capaian_pembelajaran}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Pada akhir fase D, peserta didik mampu..."
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#473C33] focus:ring-4 focus:ring-[#14b8a6]/20 transition-all font-medium text-slate-700 placeholder-slate-400 bg-slate-50/30 resize-y min-h-[100px]"
                  />
                </div>

                {/* TP */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#473C33] flex items-center gap-1">
                      Tujuan Pembelajaran (TP) * 
                      <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <span className="text-[10px] text-[#0d9488] font-extrabold uppercase bg-[#14b8a6]/15 px-2 py-0.5 rounded">Otomatis Terisi</span>
                  </div>
                  <textarea
                    name="tujuan_pembelajaran"
                    value={formData.tujuan_pembelajaran}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Tuliskan tujuan pembelajaran terperinci di sini..."
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#473C33] focus:ring-4 focus:ring-[#14b8a6]/20 transition-all font-medium text-slate-700 placeholder-slate-400 bg-slate-50/30 resize-y min-h-[120px]"
                  />
                  <p className="text-[11px] text-slate-400">Guru dipersilakan mengedit, menambah, atau menyesuaikan butir-butir tujuan pembelajaran di atas.</p>
                </div>

                {/* Profil Pelajar Pancasila (Checkbox Grid) */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#473C33]">
                    Dimensi Profil Pelajar Pancasila yang Dibentuk
                  </label>
                  <p className="text-xs text-slate-400">Pilih dimensi karakter Pancasila yang ingin ditekankan dalam pembelajaran ini:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {DIMENSI_PANCASILA.map((dimensi) => {
                      const isChecked = formData.profil_pelajar_pancasila.includes(dimensi);
                      return (
                        <div
                          key={dimensi}
                          onClick={() => handleCheckboxChange('profil_pelajar_pancasila', dimensi)}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none
                            ${isChecked 
                              ? 'bg-[#14b8a6]/10 border-[#14b8a6] shadow-[0_2px_8px_rgba(20,184,166,0.05)] font-bold' 
                              : 'bg-white border-slate-200 hover:border-slate-300'}`}
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all shrink-0
                            ${isChecked ? 'bg-[#14b8a6] border-[#14b8a6] text-white' : 'border-slate-300 bg-white'}`}
                          >
                            {isChecked && <Check size={12} className="stroke-[3]" />}
                          </div>
                          <span className="text-xs text-slate-700 font-medium">{dimensi}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sarana & Prasarana (Checkbox Grid) */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#473C33]">
                      Sarana dan Prasarana Pendukung
                    </label>
                    <p className="text-xs text-slate-400">Pilih sarana & prasarana yang tersedia atau yang akan digunakan:</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {SARANA_PRASARANA_LIST.map((sarpras) => {
                      const isChecked = formData.sarana_prasarana.includes(sarpras);
                      return (
                        <div
                          key={sarpras}
                          onClick={() => handleCheckboxChange('sarana_prasarana', sarpras)}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none
                            ${isChecked 
                              ? 'bg-[#14b8a6]/10 border-[#14b8a6] shadow-[0_2px_8px_rgba(20,184,166,0.05)] font-bold' 
                              : 'bg-white border-slate-200 hover:border-slate-300'}`}
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all shrink-0
                            ${isChecked ? 'bg-[#14b8a6] border-[#14b8a6] text-white' : 'border-slate-300 bg-white'}`}
                          >
                            {isChecked && <Check size={12} className="stroke-[3]" />}
                          </div>
                          <span className="text-xs text-slate-700 font-medium">{sarpras}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Kustom Sarana Prasarana Tambahan */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Sarana & Prasarana Tambahan Lainnya (Opsional)
                    </label>
                    <input
                      type="text"
                      name="sarana_prasarana_kustom"
                      value={formData.sarana_prasarana_kustom}
                      onChange={handleInputChange}
                      placeholder="Contoh: Kertas millimeter block, smartphone siswa, papan tulis interaktif, dll."
                      className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#473C33] focus:ring-4 focus:ring-[#14b8a6]/20 transition-all text-xs font-medium text-slate-700 bg-slate-50/20"
                    />
                  </div>
                </div>



                {/* Asesmen Info Banner */}
                <div className="bg-[#14b8a6]/10 border border-[#14b8a6]/25 rounded-2xl p-4 flex gap-3 text-[#473C33] items-start">
                  <Info size={18} className="text-[#14b8a6] mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-extrabold uppercase tracking-wide text-[#473C33]">Asesmen Komprehensif Berkelanjutan</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                      Sesuai Panduan Pembelajaran dan Asesmen Kurikulum Merdeka, modul ajar yang digenerate AI akan otomatis memuat seluruh jenis penilaian: <strong>Asesmen Diagnostik</strong> (kemampuan awal), <strong>Asesmen Formatif</strong> (proses penilaian interaktif), dan <strong>Asesmen Sumatif</strong> (evaluasi capaian belajar, lengkap dengan kisi-kisi, rubrik penskoran, remedial, dan pengayaan).
                    </p>
                  </div>
                </div>

              </div>

              {/* Nav actions */}
              <div className="flex justify-between pt-2">
                <button
                  onClick={prevStep}
                  className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 hover:text-[#0d9488] hover:bg-slate-50 font-extrabold px-6 py-3 rounded-full transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  <ChevronLeft size={18} /> Kembali
                </button>
                
                <button
                  onClick={generateModul}
                  disabled={isGenerating || !formData.tujuan_pembelajaran || formData.profil_pelajar_pancasila.length === 0}
                  className="flex items-center gap-2 bg-[#14b8a6] hover:bg-[#0d9488] text-white px-8 py-3.5 rounded-full font-extrabold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_8px_25px_-4px_rgba(20,184,166,0.2)] hover:shadow-[0_12px_30px_-4px_rgba(20,184,166,0.3)] cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={18} className="animate-spin text-white" /> Menyusun Modul (AI)...
                    </>
                  ) : (
                    <>
                      Mulai Kirim ke AI <Sparkles size={18} className="text-white" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PREVIEW & DOWNLOAD */}
          {drafts.length > 0 && step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
                         {/* Header actions at top */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/90 p-5 rounded-[20px] shadow-sm border border-slate-200/60 no-print">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700">
                    <CheckCircle2 size={12} /> Modul Telah Siap!
                  </span>
                  <h2 className="text-xl font-extrabold text-[#473C33]">Pratinjau Modul Ajar</h2>
                  <p className="text-xs text-slate-550 font-semibold">Bisa Anda salin atau langsung unduh File Word rujukan di bawah.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => createNewDraft(formData.nama_guru, formData.nama_sekolah)}
                    className="flex items-center gap-1.5 bg-white border border-[#14b8a6]/25 hover:border-[#14b8a6]/50 px-4 py-2.5 rounded-xl text-xs font-bold text-[#0d9488] hover:bg-[#14b8a6]/10 transition-all cursor-pointer"
                  >
                    <Plus size={13} /> Buat Modul Baru
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-[#0d9488] hover:bg-[#14b8a6]/10 transition-all cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                    {copied ? 'Tersalin!' : 'Salin Teks'}
                  </button>
                  <button
                    onClick={downloadWordDocument}
                    disabled={isDownloading}
                    className="flex items-center gap-2 bg-[#14b8a6] hover:bg-[#0d9488] px-5 py-2.5 rounded-xl text-xs font-extrabold text-white transition-all shadow-[0_4px_12px_rgba(20,184,166,0.25)] hover:shadow-[0_6px_16px_rgba(20,184,166,0.35)] disabled:opacity-60 cursor-pointer"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 size={14} className="animate-spin text-white" /> Menyiapkan Word...
                      </>
                    ) : (
                      <>
                        <Download size={14} className="text-white" /> Download Word Resmi
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Printable Viewer Document */}
              <div className="bg-slate-100/60 p-4 md:p-8 rounded-[24px] border border-slate-200/50 print-container space-y-8">
                <div className="flex items-center justify-between px-2 text-slate-500 font-bold text-[11px] uppercase tracking-wider no-print">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#14b8a6] animate-pulse"></span>
                    <span>Tampilan Dokumen Terstandar</span>
                  </div>
                  <span>Gunakan tombol "Download Word Resmi" untuk menyimpan</span>
                </div>

                <div 
                  ref={modulRef}
                  id="modul-content"
                  className="printable-content"
                >
                  <div className="word-document">
                    {/* Word Page Header Accent */}
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200 text-[10px] uppercase font-semibold text-slate-400 mb-6 select-none leading-none w-full no-print">
                      <span>Modul Ajar Kurikulum Merdeka</span>
                      <span>Informatika SMP</span>
                    </div>


                    
                     {/* Content Area */}
                    <div className="prose prose-slate max-w-none leading-relaxed">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          img: () => null,
                          p: ({ node, children, ...props }) => {
                            let isOption = false;
                            
                            if (Array.isArray(children)) {
                              const first = children[0];
                              const second = children[1];
                              if (
                                typeof first === 'string' &&
                                (first.includes('\u00a0') || first.includes('&nbsp;') || first.trim() === '') &&
                                second &&
                                typeof second === 'object' &&
                                'props' in second
                              ) {
                                const strongVal = String(second.props?.children || '');
                                if (/^[A-D]\.$/i.test(strongVal.trim())) {
                                  isOption = true;
                                }
                              }
                            }
                            
                            if (!isOption && children) {
                              const getRawText = (n: any): string => {
                                if (!n) return '';
                                if (typeof n === 'string') return n;
                                if (typeof n === 'number') return String(n);
                                if (Array.isArray(n)) return n.map(getRawText).join('');
                                if (n.props && n.props.children) return getRawText(n.props.children);
                                return '';
                              };
                              const raw = getRawText(children).trim();
                              if (/^(?:&nbsp;|\u00a0|\s)*[A-D]\./i.test(raw)) {
                                isOption = true;
                              }
                            }

                            if (isOption) {
                              return (
                                <p className="multiple-choice-option" {...props}>
                                  {children}
                                </p>
                              );
                            }
                            return <p {...props}>{children}</p>;
                          }
                        }}
                      >
                        {cleanModul}
                      </ReactMarkdown>
                    </div>
                    
                    {/* Word Page Footer Accent */}
                    <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-[10px] uppercase font-semibold text-slate-400 mt-8 select-none leading-none w-full no-print">
                      <span>SMP / MTs E-Learning</span>
                      <span>Modul Terintegrasi AI</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selesai Line requested by system instruction (Keep intact) */}
              <div className="hidden">
                === MODUL AJAR SELESAI DIGENERATE ===
              </div>

              {/* Interactive Revision Panel */}
              <div className="bg-white border border-slate-200/95 rounded-[24px] p-6 md:p-8 text-slate-800 space-y-6 shadow-sm no-print relative overflow-hidden">
                
                <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-48 h-48 bg-[#14b8a6]/5 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-11 h-11 bg-[#14b8a6]/10 rounded-xl flex items-center justify-center border border-[#14b8a6]/20 shadow-inner">
                    <RefreshCcw size={20} className="text-[#14b8a6]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg leading-tight text-slate-800">Minta Revisi atau Tambah Parameter</h3>
                    <p className="text-[#0d9488] text-xs font-semibold">Beri perintah revisi, AI akan merapikan struktur lama secara instan.</p>
                  </div>
                </div>

                <div className="relative z-10">
                  <textarea
                    value={revisionText}
                    onChange={(e) => setRevisionText(e.target.value)}
                    placeholder="Contoh: 'Tolong tambahkan soal bermuatan HOTS di Asesmen Sumatif' atau 'Ganti metode ajarnya menjadi Project Based Learning'..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] transition-all min-h-[110px] resize-none text-sm font-medium shadow-inner"
                  />
                  <button
                    onClick={reviseModul}
                    disabled={isRevising || !revisionText.trim()}
                    className="absolute bottom-4.5 right-4 bg-[#14b8a6] hover:bg-[#0d9488] text-white disabled:opacity-40 text-xs font-bold px-4 py-2 rounded-lg transition-all shadow flex items-center gap-1 cursor-pointer"
                  >
                    {isRevising ? (
                      <>
                        <Loader2 size={14} className="animate-spin text-white" /> Memproses...
                      </>
                    ) : (
                      <>
                        Revisi Modul <Send size={12} />
                      </>
                    )}
                  </button>
                </div>
                
                <div className="flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed pt-3 border-t border-slate-100">
                  <Lightbulb size={14} className="text-[#14b8a6] shrink-0 mt-0.5" />
                  <p>AI akan mempertahankan bagian lain yang tidak Anda minta untuk diubah, lalu secara otomatis menandai judul bagian yang diperbarui dengan simbol ✏️.</p>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

          </div> {/* Close Form Content Area */}
        </div> {/* Close Master Grid */}

        {/* Global Floating Error Block */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-700 font-semibold text-sm no-print shadow-sm"
          >
            <AlertCircle size={20} className="text-rose-500 shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}
      </main>

      {/* Modern Footer section */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-slate-200/80 no-print">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 font-medium">
          <p className="text-xs tracking-wider flex items-center gap-1.5 font-bold uppercase text-[#473C33]/70">
            Powered by Gemini 3.5 &bull; Kurikulum Merdeka SMP Fase D
          </p>
          <p className="text-xs">
            &copy; 2026 Informatika Modul Generator. Semua Hak Cipta Dilindungi.
          </p>
        </div>
      </footer>

      {/* Custom Deletion Confirmation Modal */}
      <AnimatePresence>
        {draftToDelete && (() => {
          const targetDraft = drafts.find(d => d.id === draftToDelete);
          if (!targetDraft) return null;

          const isLastDraft = drafts.length === 1;
          const draftTitle = targetDraft.title || "Tanpa Judul";

          return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 no-print text-slate-800" id="delete-confirm-overlay">
              {/* Overlay background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDraftToDelete(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm shadow-inner cursor-default"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="relative bg-white rounded-[24px] max-w-sm w-full p-6 shadow-2xl border border-slate-100 overflow-hidden z-10"
                id="delete-confirm-box"
              >
                {/* Decorative border bar at top */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-rose-500" />

                <div className="flex items-start gap-4 mt-2">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                    <Trash2 size={24} className="stroke-[2.2]" />
                  </div>
                  <div className="space-y-1.5 w-full">
                    <h3 className="text-sm font-extrabold text-slate-800 leading-snug">
                      Hapus Draf Modul Ajar?
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                      {isLastDraft ? (
                        <>
                          Anda akan menghapus <span className="font-extrabold text-slate-800 underline decoration-rose-500/30">satu-satunya draf</span> yang ada. Tindakan ini akan mengosongkan daftar draf Anda dan mengembalikan Anda ke layar utama.
                        </>
                      ) : (
                        <>
                          Apakah Anda yakin ingin menghapus draf <span className="font-extrabold text-slate-800">"{draftTitle}"</span>? Tindakan ini tidak dapat dibatalkan.
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDraftToDelete(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-200 shrink-0"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deleteDraft(draftToDelete);
                      setDraftToDelete(null);
                    }}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-rose-600/10 hover:shadow-md cursor-pointer shrink-0"
                  >
                    Hapus Permanen
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
