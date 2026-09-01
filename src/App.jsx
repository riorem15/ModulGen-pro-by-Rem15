import { useState, useEffect } from 'react';
import { 
  Download, FileText, LayoutDashboard, Settings, Moon, Sun, Sparkles, 
  UserCheck, Target, Brain, Tv, Lightbulb, BookOpen, Award, HelpCircle,
  RotateCcw, CheckCircle2
} from 'lucide-react';
import './App.css';

// Components
import SectionIdentitas from './components/SectionIdentitas';
import SectionIdentifikasi from './components/SectionIdentifikasi';
import SectionDesainPembelajaran from './components/SectionDesainPembelajaran';
import SectionPedagogisDeepLearning from './components/SectionPedagogisDeepLearning';
import SectionMediaSarana from './components/SectionMediaSarana';
import SectionPemahamanPemantik from './components/SectionPemahamanPemantik';
import SectionInti from './components/SectionInti';
import SectionMateriReferensi from './components/SectionMateriReferensi';
import SectionLangkah from './components/SectionLangkah';
import SectionLampiran from './components/SectionLampiran';
import PreviewModal from './components/PreviewModal';
import MGenAiModal from './components/MGenAiModal';
import TutorialModal from './components/TutorialModal';
import ResetConfirmModal from './components/ResetConfirmModal';

const STORAGE_KEY = 'modulgen_pro_saved_data_v3';
const FORMAT_KEY = 'modulgen_pro_format_type_v3';
const TAB_KEY = 'modulgen_pro_active_tab_v3';

const defaultModuleData = {
  formatType: 'deep_learning',
  identitas: {
    penyusun: '',
    instansi: '',
    mataPelajaran: '',
    faseKelas: '',
    semester: '',
    materiAjar: '',
    babSubbab: '',
    alokasiWaktu: '',
    fontFamily: 'Poppins',
    fontSize: '11pt',
    lineSpacing: '1.5'
  },
  identifikasi: {
    profilLulusan: [
      "Penalaran Kritis & Pemecahan Masalah",
      "Kreativitas & Inovasi",
      "Kolaborasi & Gotong Royong"
    ],
    kompetensiAwal: '',
    pemetaanKebutuhan: ''
  },
  desainPembelajaran: {
    capaianPembelajaran: '',
    tujuanPembelajaran: '',
    kktp: '',
    kategoriKetercapaian: ''
  },
  pedagogisDeepLearning: {
    mindfulLearning: '',
    meaningfulLearning: '',
    joyfulLearning: '',
    modelPembelajaran: 'Problem Based Learning (PBL) terintegrasi Deep Learning Cycle',
    metodePembelajaran: 'Diskusi kelompok kolaboratif, eksplorasi penyelidikan, dan refleksi bermakna'
  },
  mediaSarana: {
    mediaPembelajaran: '',
    saranaPrasarana: ''
  },
  pemahamanPemantik: {
    pemahamanBermakna: '',
    pertanyaanPemantik: ''
  },
  inti: {
    profilPancasila: [],
    modelPembelajaran: '',
    metodePembelajaran: '',
    mediaSaranaPrasarana: '',
    capaianPembelajaran: '',
    tujuanPembelajaran: '',
    pemahamanBermakna: '',
    pertanyaanPemantik: ''
  },
  materiReferensi: {
    materi: '',
    referensi: ''
  },
  langkah: {
    pendahuluan: { kegiatan: '', durasi: '15' },
    inti: { kegiatan: '', durasi: '60' },
    penutup: { kegiatan: '', durasi: '15' },
  },
    lampiran: {
    lkpd: '',
    asesmen: '',
    kepalaSekolahNama: '',
    kepalaSekolahNip: '',
    guruMapelNama: '',
    guruMapelNip: '',
    tanggalPengesahan: '' // Resolves dynamically to real-time today's date
  }
};

function App() {
  // Format state initialized from localStorage
  const [formatType, setFormatType] = useState(() => {
    return localStorage.getItem(FORMAT_KEY) || 'deep_learning';
  });

  // Active tab initialized from localStorage
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem(TAB_KEY) || 'identitas';
  });

  const [showPreview, setShowPreview] = useState(false);
  const [showMGenAi, setShowMGenAi] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [toastNotification, setToastNotification] = useState(null);
  const [showTutorial, setShowTutorial] = useState(() => {
    return !localStorage.getItem('modulgen_pro_tutorial_seen');
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Global State for the Module with LocalStorage Auto-Recovery (Silent in background)
  const [moduleData, setModuleData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultModuleData,
          ...parsed,
          identitas: { ...defaultModuleData.identitas, ...parsed.identitas },
          identifikasi: { ...defaultModuleData.identifikasi, ...parsed.identifikasi },
          desainPembelajaran: { ...defaultModuleData.desainPembelajaran, ...parsed.desainPembelajaran },
          pedagogisDeepLearning: { ...defaultModuleData.pedagogisDeepLearning, ...parsed.pedagogisDeepLearning },
          mediaSarana: { ...defaultModuleData.mediaSarana, ...parsed.mediaSarana },
          pemahamanPemantik: { ...defaultModuleData.pemahamanPemantik, ...parsed.pemahamanPemantik },
          inti: { ...defaultModuleData.inti, ...parsed.inti },
          materiReferensi: { ...defaultModuleData.materiReferensi, ...parsed.materiReferensi },
          langkah: {
            pendahuluan: { ...defaultModuleData.langkah.pendahuluan, ...parsed.langkah?.pendahuluan },
            inti: { ...defaultModuleData.langkah.inti, ...parsed.langkah?.inti },
            penutup: { ...defaultModuleData.langkah.penutup, ...parsed.langkah?.penutup }
          },
          lampiran: { ...defaultModuleData.lampiran, ...parsed.lampiran }
        };
      }
    } catch (err) {
      console.error("Gagal memulihkan data dari localStorage:", err);
    }
    return defaultModuleData;
  });

  // Auto-Save Effect whenever data, format, or tab changes (always active & silent)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(moduleData));
      localStorage.setItem(FORMAT_KEY, formatType);
      localStorage.setItem(TAB_KEY, activeTab);
    } catch (err) {
      console.error("Gagal menyimpan ke localStorage:", err);
    }
  }, [moduleData, formatType, activeTab]);

  // Toast Notification Auto-Dismiss
  useEffect(() => {
    if (toastNotification) {
      const timer = setTimeout(() => {
        setToastNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastNotification]);

  const handleConfirmReset = () => {
    const freshData = {
      formatType: formatType,
      identitas: {
        penyusun: '',
        instansi: '',
        mataPelajaran: '',
        faseKelas: '',
        semester: '',
        materiAjar: '',
        babSubbab: '',
        alokasiWaktu: '',
        fontFamily: 'Poppins',
        fontSize: '11pt',
        lineSpacing: '1.5'
      },
      identifikasi: {
        profilLulusan: [
          "Penalaran Kritis & Pemecahan Masalah",
          "Kreativitas & Inovasi",
          "Kolaborasi & Gotong Royong"
        ],
        kompetensiAwal: '',
        pemetaanKebutuhan: ''
      },
      desainPembelajaran: {
        capaianPembelajaran: '',
        tujuanPembelajaran: '',
        kktp: '',
        kategoriKetercapaian: ''
      },
      pedagogisDeepLearning: {
        mindfulLearning: '',
        meaningfulLearning: '',
        joyfulLearning: '',
        modelPembelajaran: 'Problem Based Learning (PBL) terintegrasi Deep Learning Cycle',
        metodePembelajaran: 'Diskusi kelompok kolaboratif, eksplorasi penyelidikan, dan refleksi bermakna'
      },
      mediaSarana: {
        mediaPembelajaran: '',
        saranaPrasarana: ''
      },
      pemahamanPemantik: {
        pemahamanBermakna: '',
        pertanyaanPemantik: ''
      },
      inti: {
        profilPancasila: [],
        modelPembelajaran: '',
        metodePembelajaran: '',
        mediaSaranaPrasarana: '',
        capaianPembelajaran: '',
        tujuanPembelajaran: '',
        pemahamanBermakna: '',
        pertanyaanPemantik: ''
      },
      materiReferensi: {
        materi: '',
        referensi: ''
      },
      langkah: {
        pendahuluan: { kegiatan: '', durasi: '15' },
        inti: { kegiatan: '', durasi: '60' },
        penutup: { kegiatan: '', durasi: '15' },
      },
      lampiran: {
        lkpd: '',
        asesmen: '',
        kepalaSekolahNama: '',
        kepalaSekolahNip: '',
        guruMapelNama: '',
        guruMapelNip: '',
        tanggalPengesahan: ''
      }
    };

    setModuleData(freshData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(freshData));
    } catch (err) {
      console.error("Gagal mereset localStorage:", err);
    }
    setActiveTab('identitas');
    setShowResetModal(false);
    setToastNotification('Formulir berhasil direset! Silakan mulai mengisi modul baru.');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  };

  const handleUpdateData = (section, field, value) => {
    setModuleData(prev => {
      const updatedSection = {
        ...prev[section],
        [field]: value
      };

      const updated = {
        ...prev,
        [section]: updatedSection
      };

      // Two-way sync between Deep Learning and Standard fields for convenience
      if (section === 'desainPembelajaran') {
        if (field === 'capaianPembelajaran') updated.inti = { ...prev.inti, capaianPembelajaran: value };
        if (field === 'tujuanPembelajaran') updated.inti = { ...prev.inti, tujuanPembelajaran: value };
      }
      if (section === 'pemahamanPemantik') {
        if (field === 'pemahamanBermakna') updated.inti = { ...prev.inti, pemahamanBermakna: value };
        if (field === 'pertanyaanPemantik') updated.inti = { ...prev.inti, pertanyaanPemantik: value };
      }
      if (section === 'pedagogisDeepLearning') {
        if (field === 'modelPembelajaran') updated.inti = { ...prev.inti, modelPembelajaran: value };
        if (field === 'metodePembelajaran') updated.inti = { ...prev.inti, metodePembelajaran: value };
      }
      if (section === 'inti') {
        if (field === 'capaianPembelajaran') updated.desainPembelajaran = { ...prev.desainPembelajaran, capaianPembelajaran: value };
        if (field === 'tujuanPembelajaran') updated.desainPembelajaran = { ...prev.desainPembelajaran, tujuanPembelajaran: value };
        if (field === 'pemahamanBermakna') updated.pemahamanPemantik = { ...prev.pemahamanPemantik, pemahamanBermakna: value };
        if (field === 'pertanyaanPemantik') updated.pemahamanPemantik = { ...prev.pemahamanPemantik, pertanyaanPemantik: value };
      }

      return updated;
    });
  };

  const handleFormatChange = (newFormat) => {
    setFormatType(newFormat);
    setModuleData(prev => ({ ...prev, formatType: newFormat }));
    const newTabs = getTabsForFormat(newFormat);
    if (!newTabs.some(t => t.id === activeTab)) {
      setActiveTab('identitas');
    }
  };

  const handleAiUpdate = (data) => {
    setModuleData(prev => ({
      ...prev,
      formatType: data.formatType || prev.formatType,
      identitas: { ...prev.identitas, ...data.identitas },
      identifikasi: { ...prev.identifikasi, ...data.identifikasi },
      desainPembelajaran: { 
        ...prev.desainPembelajaran, 
        ...data.desainPembelajaran,
        capaianPembelajaran: data.desainPembelajaran?.capaianPembelajaran || data.inti?.capaianPembelajaran || prev.desainPembelajaran.capaianPembelajaran,
        tujuanPembelajaran: data.desainPembelajaran?.tujuanPembelajaran || data.inti?.tujuanPembelajaran || prev.desainPembelajaran.tujuanPembelajaran,
      },
      pedagogisDeepLearning: {
        ...prev.pedagogisDeepLearning,
        ...data.pedagogisDeepLearning,
        modelPembelajaran: data.pedagogisDeepLearning?.modelPembelajaran || data.inti?.modelPembelajaran || prev.pedagogisDeepLearning.modelPembelajaran,
        metodePembelajaran: data.pedagogisDeepLearning?.metodePembelajaran || data.inti?.metodePembelajaran || prev.pedagogisDeepLearning.metodePembelajaran,
      },
      mediaSarana: { ...prev.mediaSarana, ...data.mediaSarana },
      pemahamanPemantik: {
        ...prev.pemahamanPemantik,
        ...data.pemahamanPemantik,
        pemahamanBermakna: data.pemahamanPemantik?.pemahamanBermakna || data.inti?.pemahamanBermakna || prev.pemahamanPemantik.pemahamanBermakna,
        pertanyaanPemantik: data.pemahamanPemantik?.pertanyaanPemantik || data.inti?.pertanyaanPemantik || prev.pemahamanPemantik.pertanyaanPemantik,
      },
      inti: { ...prev.inti, ...data.inti },
      materiReferensi: { ...prev.materiReferensi, ...data.materiReferensi },
      langkah: {
        pendahuluan: { ...prev.langkah.pendahuluan, ...data.langkah?.pendahuluan },
        inti: { ...prev.langkah.inti, ...data.langkah?.inti },
        penutup: { ...prev.langkah.penutup, ...data.langkah?.penutup }
      },
      lampiran: { ...prev.lampiran, ...data.lampiran }
    }));
  };

  const getTabsForFormat = (fmt) => {
    if (fmt === 'deep_learning') {
      return [
        { id: 'identitas', label: '1. Identitas', icon: <Settings size={16} /> },
        { id: 'identifikasi', label: '2. Identifikasi', icon: <UserCheck size={16} /> },
        { id: 'desainPembelajaran', label: '3. Desain Pembelajaran', icon: <Target size={16} /> },
        { id: 'pedagogis', label: '4. Pedagogi Deep Learning', icon: <Brain size={16} /> },
        { id: 'mediaSarana', label: '5 & 6. Media & Sarana', icon: <Tv size={16} /> },
        { id: 'pemahamanPemantik', label: '7 & 8. Pemahaman & Pemantik', icon: <Lightbulb size={16} /> },
        { id: 'materiReferensi', label: '9. Materi & Referensi', icon: <FileText size={16} /> },
        { id: 'langkah', label: '10. Langkah Pembelajaran', icon: <LayoutDashboard size={16} /> },
        { id: 'lampiran', label: '11. Lampiran & Pengesahan', icon: <Award size={16} /> }
      ];
    } else {
      return [
        { id: 'identitas', label: '1. Identitas', icon: <Settings size={16} /> },
        { id: 'inti', label: '2. Komponen Inti', icon: <LayoutDashboard size={16} /> },
        { id: 'materiReferensi', label: '3. Materi & Referensi', icon: <FileText size={16} /> },
        { id: 'langkah', label: '4. Langkah Pembelajaran', icon: <LayoutDashboard size={16} /> },
        { id: 'lampiran', label: '5. Lampiran LKPD & Asesmen', icon: <FileText size={16} /> }
      ];
    }
  };

  const tabs = getTabsForFormat(formatType);
  const currentTabIndex = tabs.findIndex(t => t.id === activeTab);

  const handleNext = () => {
    if (currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1].id);
    } else {
      setShowPreview(true);
    }
  };

  const handlePrev = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1].id);
    }
  };

  return (
    <div className="app-container">
      {/* Clean, Modern Header with Logo */}
      <header className="app-header">
        <div className="header-brand">
          <img src="/favicon.svg" alt="ModulGen Logo" className="app-header-logo" />
          <h1>MODULGEN PRO <span className="brand-by">by Rem15</span></h1>
        </div>

        <div className="header-actions">
          <button 
            id="tour-btn-ai"
            className="btn btn-magic header-btn-ai" 
            onClick={() => setShowMGenAi(true)} 
            title="Buka AI Generator Modul"
          >
            <Sparkles size={16} />
            <span className="btn-label">MGen AI</span>
          </button>

          <button 
            id="tour-btn-reset"
            className="btn btn-secondary header-btn-reset" 
            onClick={() => setShowResetModal(true)} 
            title="Buat Modul Baru / Kosongkan Formulir"
          >
            <RotateCcw size={15} color="#F87171" />
            <span className="btn-label">Buat Baru</span>
          </button>
          
          <button 
            className="btn btn-secondary header-btn-tutorial" 
            onClick={() => setShowTutorial(true)} 
            title="Buka Panduan & Tutorial Penggunaan"
          >
            <HelpCircle size={16} color="#3B82F6" />
            <span className="btn-label">Panduan</span>
          </button>

          <button 
            className={`btn header-btn-theme ${isDarkMode ? 'dark-active' : ''}`}
            onClick={toggleTheme} 
            title={isDarkMode ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
          >
            {isDarkMode ? <Sun size={17} color="#FDE047" /> : <Moon size={17} />}
          </button>

          <button 
            id="tour-btn-preview"
            className="btn btn-primary header-btn-preview" 
            onClick={() => setShowPreview(true)}
            title="Pratinjau & Unduh Dokumen"
          >
            <Download size={16} />
            <span className="btn-label">Preview & Export</span>
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="card main-card">
          
          {/* Tab Navigation (Directly at top of card, touch scrollable) */}
          <div id="tour-tabs-nav" className="tabs-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'identitas' && (
              <SectionIdentitas 
                data={moduleData.identitas} 
                onChange={(f, v) => handleUpdateData('identitas', f, v)}
                formatType={formatType}
                onFormatChange={handleFormatChange}
              />
            )}

            {/* Deep Learning Specific Tabs */}
            {formatType === 'deep_learning' && (
              <>
                {activeTab === 'identifikasi' && (
                  <SectionIdentifikasi 
                    data={moduleData.identifikasi} 
                    onChange={(f, v) => handleUpdateData('identifikasi', f, v)} 
                    topic={moduleData.identitas.mataPelajaran} 
                    fase={moduleData.identitas.faseKelas} 
                  />
                )}
                {activeTab === 'desainPembelajaran' && (
                  <SectionDesainPembelajaran 
                    data={moduleData.desainPembelajaran} 
                    onChange={(f, v) => handleUpdateData('desainPembelajaran', f, v)} 
                    topic={moduleData.identitas.mataPelajaran} 
                    fase={moduleData.identitas.faseKelas} 
                  />
                )}
                {activeTab === 'pedagogis' && (
                  <SectionPedagogisDeepLearning 
                    data={moduleData.pedagogisDeepLearning} 
                    onChange={(f, v) => handleUpdateData('pedagogisDeepLearning', f, v)} 
                    topic={moduleData.identitas.mataPelajaran} 
                    fase={moduleData.identitas.faseKelas} 
                  />
                )}
                {activeTab === 'mediaSarana' && (
                  <SectionMediaSarana 
                    data={moduleData.mediaSarana} 
                    onChange={(f, v) => handleUpdateData('mediaSarana', f, v)} 
                    topic={moduleData.identitas.mataPelajaran} 
                    fase={moduleData.identitas.faseKelas} 
                  />
                )}
                {activeTab === 'pemahamanPemantik' && (
                  <SectionPemahamanPemantik 
                    data={moduleData.pemahamanPemantik} 
                    onChange={(f, v) => handleUpdateData('pemahamanPemantik', f, v)} 
                    topic={moduleData.identitas.mataPelajaran} 
                    fase={moduleData.identitas.faseKelas} 
                  />
                )}
              </>
            )}

            {/* Standard Mode Komponen Inti */}
            {formatType === 'standar' && activeTab === 'inti' && (
              <SectionInti 
                data={moduleData.inti} 
                onChange={(f, v) => handleUpdateData('inti', f, v)} 
                topic={moduleData.identitas.mataPelajaran} 
                fase={moduleData.identitas.faseKelas} 
              />
            )}

            {/* Shared Tabs */}
            {activeTab === 'materiReferensi' && (
              <SectionMateriReferensi 
                data={moduleData.materiReferensi} 
                onChange={(f, v) => handleUpdateData('materiReferensi', f, v)} 
                topic={moduleData.identitas.mataPelajaran} 
                fase={moduleData.identitas.faseKelas} 
              />
            )}

            {activeTab === 'langkah' && (
              <SectionLangkah 
                data={moduleData.langkah} 
                onChange={(f, v) => handleUpdateData('langkah', f, v)} 
              />
            )}

            {activeTab === 'lampiran' && (
              <SectionLampiran 
                data={moduleData.lampiran} 
                onChange={(f, v) => handleUpdateData('lampiran', f, v)} 
              />
            )}
          </div>

          {/* Navigation Controls */}
          <div className="nav-controls-footer">
            <button 
              className="btn btn-secondary nav-btn-prev" 
              onClick={handlePrev} 
              disabled={currentTabIndex === 0}
            >
              ← Sebelumnya
            </button>
            <button className="btn btn-primary nav-btn-next" onClick={handleNext}>
              {currentTabIndex === tabs.length - 1 ? 'Selesai & Unduh 🎉' : 'Selanjutnya →'}
            </button>
          </div>
        </div>
      </main>

      {showPreview && (
        <PreviewModal 
          data={moduleData} 
          onClose={() => setShowPreview(false)} 
        />
      )}
      
      {showMGenAi && (
        <MGenAiModal
          currentData={moduleData}
          onClose={() => setShowMGenAi(false)}
          onGenerate={handleAiUpdate}
        />
      )}

      {showTutorial && (
        <TutorialModal 
          isOpen={showTutorial}
          onClose={() => setShowTutorial(false)}
          onNavigateTab={(tab) => setActiveTab(tab)}
        />
      )}

      {/* Reset / Buat Baru Confirmation Modal */}
      <ResetConfirmModal 
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleConfirmReset}
      />

      {/* Toast Notification */}
      {toastNotification && (
        <div className="toast-notification-banner animate-slide-down">
          <CheckCircle2 size={18} color="#10B981" />
          <span className="toast-text">{toastNotification}</span>
          <button 
            type="button" 
            className="toast-close-btn" 
            onClick={() => setToastNotification(null)}
            title="Tutup Notifikasi"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
