import { useState, useEffect } from 'react';
import { 
  Download, FileText, LayoutDashboard, Settings, Moon, Sun, Sparkles, 
  UserCheck, Target, Brain, Tv, Lightbulb, BookOpen, CheckSquare, Award,
  Save, RotateCcw, Check
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
    tanggalPengesahan: 'Serang, 20 Maret 2026'
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(null);

  // Global State for the Module with LocalStorage Auto-Recovery
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

  // Auto-Save Effect whenever data, format, or tab changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(moduleData));
      localStorage.setItem(FORMAT_KEY, formatType);
      localStorage.setItem(TAB_KEY, activeTab);
      const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      setLastSavedTime(timeStr);
    } catch (err) {
      console.error("Gagal menyimpan ke localStorage:", err);
    }
  }, [moduleData, formatType, activeTab]);

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

  const handleResetModule = () => {
    if (window.confirm("Apakah Anda yakin ingin memulai modul baru dari awal? Data teks yang sedang aktif akan direset.")) {
      setModuleData(defaultModuleData);
      setActiveTab('identitas');
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(TAB_KEY);
      setLastSavedTime(null);
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
        { id: 'identitas', label: '1. Identitas', icon: <Settings size={17} /> },
        { id: 'identifikasi', label: '2. Identifikasi', icon: <UserCheck size={17} /> },
        { id: 'desainPembelajaran', label: '3. Desain Pembelajaran', icon: <Target size={17} /> },
        { id: 'pedagogis', label: '4. Pedagogi Deep Learning', icon: <Brain size={17} /> },
        { id: 'mediaSarana', label: '5 & 6. Media & Sarana', icon: <Tv size={17} /> },
        { id: 'pemahamanPemantik', label: '7 & 8. Pemahaman & Pemantik', icon: <Lightbulb size={17} /> },
        { id: 'materiReferensi', label: '9. Materi & Referensi', icon: <FileText size={17} /> },
        { id: 'langkah', label: '10. Langkah Pembelajaran', icon: <LayoutDashboard size={17} /> },
        { id: 'lampiran', label: '11. Lampiran & Pengesahan', icon: <Award size={17} /> }
      ];
    } else {
      return [
        { id: 'identitas', label: '1. Identitas', icon: <Settings size={17} /> },
        { id: 'inti', label: '2. Komponen Inti', icon: <LayoutDashboard size={17} /> },
        { id: 'materiReferensi', label: '3. Materi & Referensi', icon: <FileText size={17} /> },
        { id: 'langkah', label: '4. Langkah Pembelajaran', icon: <LayoutDashboard size={17} /> },
        { id: 'lampiran', label: '5. Lampiran LKPD & Asesmen', icon: <FileText size={17} /> }
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
      <header className="app-header">
        <div className="flex items-center gap-3">
          <h1>MODULGEN PRO <span style={{ fontSize: '0.85rem', opacity: 0.8, fontWeight: 400 }}>by Rem15</span></h1>
          <span className="format-badge-header">
            {formatType === 'deep_learning' ? '⚡ Deep Learning Mode' : '📄 Standar Merdeka'}
          </span>
          {lastSavedTime && (
            <span className="save-badge-indicator" title="Data modul tersimpan otomatis di browser">
              <Check size={12} color="#86efac" /> Tersimpan {lastSavedTime}
            </span>
          )}
        </div>

        <div className="flex gap-2 items-center flex-wrap">
          <button 
            className="btn btn-secondary" 
            onClick={handleResetModule}
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.25)', color: 'var(--white)' }}
            title="Reset & Buat Modul Baru"
          >
            <RotateCcw size={14} /> Buat Baru
          </button>
          <button 
            className="btn btn-magic" 
            onClick={() => setShowMGenAi(true)} 
            style={{ padding: '0.5rem 1rem', fontWeight: '600' }}
          >
            <Sparkles size={18} /> MGen AI
          </button>
          <button className="btn btn-secondary" onClick={toggleTheme} style={{ padding: '0.5rem', backgroundColor: 'transparent', borderColor: 'var(--border-color)', color: 'var(--white)' }} title="Ganti Mode Terang/Gelap">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="btn btn-primary" onClick={() => setShowPreview(true)}>
            <Download size={18} /> Preview & Export
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="card" style={{ padding: '1.75rem' }}>
          
          {/* Tab Navigation (Directly at top of card, clean & sleek) */}
          <div className="tabs-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn flex items-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label}
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
          <div className="flex justify-between items-center" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '2rem' }}>
            <button 
              className="btn btn-secondary" 
              onClick={handlePrev} 
              disabled={currentTabIndex === 0}
              style={{ opacity: currentTabIndex === 0 ? 0.5 : 1, cursor: currentTabIndex === 0 ? 'not-allowed' : 'pointer' }}
            >
              ← Sebelumnya
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
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
    </div>
  );
}

export default App;
