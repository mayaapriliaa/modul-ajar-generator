import { create } from 'zustand';
import { ELEMEN_INFORMATIKA_VIII } from './constants';

export interface ModulData {
  nama_sekolah: string;
  nama_guru: string;
  mata_pelajaran: string;
  kelas: string;
  semester: string;
  tahun_pelajaran: string;
  elemen_informatika: string;
  topik_materi: string;
  capaian_pembelajaran: string;
  tujuan_pembelajaran: string;
  alokasi_waktu: string;
  jumlah_pertemuan: string;
  model_pembelajaran: string;
  metode_pembelajaran: string[];
  profil_pelajar_pancasila: string[];
  sarana_prasarana: string[];
  sarana_prasarana_kustom: string;
  target_peserta_didik: string;
}

export interface ModulDraft {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  formData: ModulData;
  generatedModul: string;
  step: number;
}

export interface UserAccount {
  username: string;
  nama_guru: string;
  nama_sekolah: string;
}

export const DEFAULT_FORM_DATA: ModulData = {
  nama_sekolah: '',
  nama_guru: '',
  mata_pelajaran: 'Informatika',
  kelas: 'VIII',
  semester: 'Ganjil',
  tahun_pelajaran: '2026/2027',
  elemen_informatika: ELEMEN_INFORMATIKA_VIII[0].nama,
  topik_materi: ELEMEN_INFORMATIKA_VIII[0].topik_default,
  capaian_pembelajaran: ELEMEN_INFORMATIKA_VIII[0].cp,
  tujuan_pembelajaran: ELEMEN_INFORMATIKA_VIII[0].tp_default,
  alokasi_waktu: '2 JP (2 x 40 Menit)',
  jumlah_pertemuan: '1 Pertemuan',
  model_pembelajaran: 'Problem Based Learning (PBL)',
  metode_pembelajaran: ['Diskusi Kelompok', 'Tanya Jawab Interaktif', 'Praktikum Langsung / Hands-on'],
  profil_pelajar_pancasila: ['Gotong Royong', 'Bernalar Kritis', 'Kreatif'],
  sarana_prasarana: ['Laboratorium Komputer Sekolah', 'Proyektor LCD & Layar Lebar', 'Lembar Kerja Peserta Didik (LKPD)'],
  sarana_prasarana_kustom: '',
  target_peserta_didik: 'Peserta didik reguler/tipikal, tidak ada kesulitan dalam mencerna dan memahami materi ajar.',
};

/**
 * SKEMA DATABASE RELASIONAL YANG DISIMULASIKAN (ERD CONCEPT):
 * 
 * 1. Tabel users
 *    - id (BIGINT PK Auto Increment)
 *    - username (VARCHAR UNIQUE)
 *    - password (VARCHAR Hashed)
 * 
 * 2. Tabel guru
 *    - id (BIGINT PK Auto Increment)
 *    - user_id (BIGINT FK references users.id ON DELETE CASCADE)
 *    - nama_guru (VARCHAR)
 *    - nama_sekolah (VARCHAR)
 *    - created_at (TIMESTAMP)
 *    - updated_at (TIMESTAMP)
 * 
 * 3. Tabel modul
 *    - id (BIGINT PK Auto Increment)
 *    - guru_id (BIGINT FK references guru.id ON DELETE CASCADE)
 *    - mata_pelajaran (VARCHAR)
 *    - kelas (VARCHAR)
 *    - semester (VARCHAR)
 *    - tahun_pelajaran (VARCHAR)
 *    - elemen_informatika (TEXT)
 *    - topik_materi (TEXT)
 *    - capaian_pembelajaran (TEXT)
 *    - tujuan_pembelajaran (TEXT)
 *    - alokasi_waktu (VARCHAR)
 *    - jumlah_pertemuan (VARCHAR)
 *    - model_pembelajaran (VARCHAR)
 *    - metode_pembelajaran (TEXT - JSON/Comma Separated)
 *    - profil_pelajar_pancasila (TEXT - JSON/Comma Separated)
 *    - sarana_prasarana (TEXT - JSON/Comma Separated)
 *    - target_peserta_didik (TEXT)
 *    - generated_modul (TEXT)
 *    - created_at (TIMESTAMP)
 *    - updated_at (TIMESTAMP)
 */

interface DraftState {
  // Auth state
  currentUser: UserAccount | null;
  usersList: { username: string; password_hash: string; nama_guru: string; nama_sekolah: string }[];
  isAuthLoaded: boolean;
  
  // Draft / Module state
  drafts: ModulDraft[];
  activeDraftId: string | null;
  
  // Auth actions
  loadDraftsFromStorage: () => void;
  login: (username: string, password: string) => { success: boolean; message: string };
  registerUser: (username: string, password_hash: string, nama_guru: string, nama_sekolah: string) => { success: boolean; message: string };
  logout: () => void;
  updateUserProfile: (nama_guru: string, nama_sekolah: string) => void;
  
  // Draft actions
  setActiveDraft: (id: string | null) => void;
  createNewDraft: (initialNameGuru?: string, initialNamaSekolah?: string) => string;
  saveDraft: (id: string, formData: ModulData, generatedModul: string, step: number) => void;
  deleteDraft: (id: string) => void;
}

export const useDraftStore = create<DraftState>((set, get) => ({
  currentUser: null,
  usersList: [],
  isAuthLoaded: false,
  drafts: [],
  activeDraftId: null,

  loadDraftsFromStorage: () => {
    try {
      // 1. Load users list
      let users = [];
      const storedUsers = localStorage.getItem('smp_inf_users');
      if (storedUsers) {
        users = JSON.parse(storedUsers);
      } else {
        // Seed default account
        users = [{
          username: 'guru_informatika',
          password_hash: 'password123', // Clean password for simplify
          nama_guru: 'Fatmawati, S.Pd., Gr.',
          nama_sekolah: 'SMP Negeri 1 Banda Aceh'
        }];
        localStorage.setItem('smp_inf_users', JSON.stringify(users));
      }

      // 2. Load current session
      const storedActiveUser = localStorage.getItem('smp_inf_current_user');
      let currentSession: UserAccount | null = null;
      if (storedActiveUser) {
        currentSession = JSON.parse(storedActiveUser);
      }

      set({ usersList: users, currentUser: currentSession, isAuthLoaded: true });

      // 3. Load user-specific drafts if logged in
      if (currentSession) {
        const userDraftKey = `smp_inf_drafts_${currentSession.username}`;
        const activeDraftKey = `smp_inf_active_id_${currentSession.username}`;
        
        const storedDrafts = localStorage.getItem(userDraftKey);
        const activeId = localStorage.getItem(activeDraftKey);

        if (storedDrafts) {
          const parsed = JSON.parse(storedDrafts) as ModulDraft[];
          set({ 
            drafts: parsed, 
            activeDraftId: activeId && parsed.some(d => d.id === activeId) ? activeId : (parsed.length > 0 ? parsed[0].id : null) 
          });
        } else {
          // New accounts start with an empty draft list
          set({ drafts: [], activeDraftId: null });
        }
      } else {
        set({ drafts: [], activeDraftId: null });
      }

    } catch (e) {
      console.error("Gagal sinkronisasi data dengan Storage", e);
    }
  },

  login: (username, password) => {
    const list = get().usersList;
    const found = list.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password_hash === password);
    
    if (found) {
      const userObj: UserAccount = {
        username: found.username,
        nama_guru: found.nama_guru,
        nama_sekolah: found.nama_sekolah
      };
      
      localStorage.setItem('smp_inf_current_user', JSON.stringify(userObj));
      set({ currentUser: userObj });
      
      // Reload user drafts immediately
      get().loadDraftsFromStorage();
      return { success: true, message: 'Berhasil login.' };
    }
    
    return { success: false, message: 'Username atau Password salah.' };
  },

  registerUser: (username, password, nama_guru, nama_sekolah) => {
    const list = get().usersList;
    const normalizedUsername = username.trim().toLowerCase();
    
    if (!normalizedUsername || !password.trim()) {
      return { success: false, message: 'Username dan Password wajib diisi.' };
    }
    
    if (list.some(u => u.username.toLowerCase() === normalizedUsername)) {
      return { success: false, message: 'Username sudah digunakan oleh guru lain.' };
    }

    const newUser = {
      username: username.trim(),
      password_hash: password,
      nama_guru: nama_guru.trim() || 'Guru Informatika',
      nama_sekolah: nama_sekolah.trim() || 'SMP Negeri 1 Asal'
    };

    const updated = [...list, newUser];
    localStorage.setItem('smp_inf_users', JSON.stringify(updated));
    set({ usersList: updated });

    return { success: true, message: 'Registrasi berhasil! Silakan masuk.' };
  },

  logout: () => {
    localStorage.removeItem('smp_inf_current_user');
    set({ currentUser: null, drafts: [], activeDraftId: null });
  },

  updateUserProfile: (nama_guru, nama_sekolah) => {
    const user = get().currentUser;
    if (!user) return;

    const updatedUser = { ...user, nama_guru, nama_sekolah };
    localStorage.setItem('smp_inf_current_user', JSON.stringify(updatedUser));

    // Update in usersList as well
    const updatedUsersList = get().usersList.map(u => {
      if (u.username.toLowerCase() === user.username.toLowerCase()) {
        return { ...u, nama_guru, nama_sekolah };
      }
      return u;
    });
    localStorage.setItem('smp_inf_users', JSON.stringify(updatedUsersList));

    set({ currentUser: updatedUser, usersList: updatedUsersList });
  },

  setActiveDraft: (id) => {
    const user = get().currentUser;
    if (!user) return;

    const activeDraftKey = `smp_inf_active_id_${user.username}`;
    if (id === null) {
      localStorage.removeItem(activeDraftKey);
    } else {
      localStorage.setItem(activeDraftKey, id);
    }
    set({ activeDraftId: id });
  },

  createNewDraft: (initialNameGuru = '', initialNamaSekolah = '') => {
    const user = get().currentUser;
    if (!user) return '';

    const newId = 'draft_' + Date.now();
    const userDraftKey = `smp_inf_drafts_${user.username}`;
    const activeDraftKey = `smp_inf_active_id_${user.username}`;

    const cleanFormData = {
      ...DEFAULT_FORM_DATA,
      nama_guru: initialNameGuru || user.nama_guru,
      nama_sekolah: initialNamaSekolah || user.nama_sekolah
    };

    let initialTitle = 'Informatika VIII';
    if (cleanFormData.topik_materi) {
      let cleanTopik = cleanFormData.topik_materi.trim();
      cleanTopik = cleanTopik.replace(/\bdraft\b/gi, '').replace(/\bdraf\b/gi, '').replace(/\s+/g, ' ').trim();
      const words = cleanTopik.split(/\s+/);
      initialTitle = words.slice(0, 6).join(' ');
    }

    const newDraft: ModulDraft = {
      id: newId,
      title: initialTitle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      formData: cleanFormData,
      generatedModul: '',
      step: 1
    };

    const updated = [newDraft, ...get().drafts];
    localStorage.setItem(userDraftKey, JSON.stringify(updated));
    localStorage.setItem(activeDraftKey, newId);
    set({ drafts: updated, activeDraftId: newId });
    return newId;
  },

  saveDraft: (id, formData, generatedModul, step) => {
    const user = get().currentUser;
    if (!user) return;

    const userDraftKey = `smp_inf_drafts_${user.username}`;

    // Generate title dynamically based on user rules (Max 6 words, no 'Draft/Draf', direct topic name)
    let title = 'Tanpa Judul';
    if (formData.topik_materi && formData.topik_materi.trim()) {
      let cleanTopik = formData.topik_materi.trim();
      cleanTopik = cleanTopik.replace(/\bdraft\b/gi, '').replace(/\bdraf\b/gi, '').replace(/\s+/g, ' ').trim();
      const words = cleanTopik.split(/\s+/);
      title = words.slice(0, 6).join(' ');
    } else if (formData.elemen_informatika) {
      const cleanElemen = formData.elemen_informatika.split(' (')[0].trim();
      const words = cleanElemen.split(/\s+/);
      title = words.slice(0, 6).join(' ');
    }

    const updatedDrafts = get().drafts.map(draft => {
      if (draft.id === id) {
        return {
          ...draft,
          title,
          updatedAt: new Date().toISOString(),
          formData,
          generatedModul,
          step
        };
      }
      return draft;
    });

    localStorage.setItem(userDraftKey, JSON.stringify(updatedDrafts));
    set({ drafts: updatedDrafts });
  },

  deleteDraft: (id) => {
    const user = get().currentUser;
    if (!user) return;

    const userDraftKey = `smp_inf_drafts_${user.username}`;
    const activeDraftKey = `smp_inf_active_id_${user.username}`;

    const remaining = get().drafts.filter(d => d.id !== id);
    let nextActiveId = get().activeDraftId;
    let finalDrafts = remaining;
    
    if (remaining.length === 0) {
      finalDrafts = [];
      nextActiveId = null;
    } else if (get().activeDraftId === id) {
      nextActiveId = remaining[0].id;
    }

    localStorage.setItem(userDraftKey, JSON.stringify(finalDrafts));
    if (nextActiveId) {
      localStorage.setItem(activeDraftKey, nextActiveId);
    } else {
      localStorage.removeItem(activeDraftKey);
    }
    set({ drafts: finalDrafts, activeDraftId: nextActiveId });
  }
}));
