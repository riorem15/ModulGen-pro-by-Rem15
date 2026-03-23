import { useState } from 'react';
import { Download, FileText, LayoutDashboard, Settings, Moon, Sun, Sparkles } from 'lucide-react';
import './App.css';

// Components
import Editor from './components/Editor';
import SectionIdentitas from './components/SectionIdentitas';
import SectionInti from './components/SectionInti';
import SectionLangkah from './components/SectionLangkah';
import SectionLampiran from './components/SectionLampiran';
import SectionMateriReferensi from './components/SectionMateriReferensi';
import PreviewModal from './components/PreviewModal';
import MGenAiModal from './components/MGenAiModal';

function App() {
  const [activeTab, setActiveTab] = useState('identitas');
  const [showPreview, setShowPreview] = useState(false);
  const [showMGenAi, setShowMGenAi] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  };

  // Global State for the Module
  const [moduleData, setModuleData] = useState({
    identitas: {
      penyusun: '',
      instansi: '',
      mataPelajaran: '',
      faseKelas: '',
      semester: '',
      materiAjar: '',
      alokasiWaktu: '',
      fontFamily: 'Poppins',
      fontSize: '12pt',
      lineSpacing: '1.5'
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
      pendahuluan: { kegiatan: '', durasi: '' },
      inti: { kegiatan: '', durasi: '' },
      penutup: { kegiatan: '', durasi: '' },
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
  });

  const handleUpdateData = (section, field, value) => {
    setModuleData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleAiUpdate = (data) => {
    setModuleData(prev => ({
      identitas: { ...prev.identitas, ...data.identitas },
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

  const tabs = [
    { id: 'identitas', label: '1. Identitas', icon: <Settings size={18} /> },
    { id: 'inti', label: '2. Komponen Inti', icon: <LayoutDashboard size={18} /> },
    { id: 'materiReferensi', label: '3. Materi & Referensi', icon: <FileText size={18} /> },
    { id: 'langkah', label: '4. Langkah Pembelajaran', icon: <LayoutDashboard size={18} /> },
    { id: 'lampiran', label: '5. Lampiran LKPD & Asesmen', icon: <FileText size={18} /> }
  ];

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
        <h1>MODULGEN PRO <span style={{ fontSize: '0.9rem', opacity: 0.8, fontWeight: 400 }}>by Rem15</span></h1>
        <div className="flex gap-4">
          <button className="btn btn-secondary" onClick={() => setShowMGenAi(true)} style={{ padding: '0.5rem 1rem', backgroundColor: '#e0e7ff', color: '#4338ca', borderColor: '#c7d2fe', fontWeight: 'bold' }}>
            <Sparkles size={18} /> MGen AI
          </button>
          <button className="btn btn-secondary" onClick={toggleTheme} style={{ padding: '0.5rem', backgroundColor: 'transparent', borderColor: 'var(--border-color)', color: 'var(--white)' }}>
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="btn btn-primary" onClick={() => setShowPreview(true)}>
            <Download size={18} /> Preview & Export
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="card">
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

          <div className="tab-content">
            {activeTab === 'identitas' && <SectionIdentitas data={moduleData.identitas} onChange={(f, v) => handleUpdateData('identitas', f, v)} />}
            {activeTab === 'inti' && <SectionInti data={moduleData.inti} onChange={(f, v) => handleUpdateData('inti', f, v)} topic={moduleData.identitas.mataPelajaran} fase={moduleData.identitas.faseKelas} />}
            {activeTab === 'materiReferensi' && <SectionMateriReferensi data={moduleData.materiReferensi} onChange={(f, v) => handleUpdateData('materiReferensi', f, v)} topic={moduleData.identitas.mataPelajaran} fase={moduleData.identitas.faseKelas} />}
            {activeTab === 'langkah' && <SectionLangkah data={moduleData.langkah} onChange={(f, v) => handleUpdateData('langkah', f, v)} />}
            {activeTab === 'lampiran' && <SectionLampiran data={moduleData.lampiran} onChange={(f, v) => handleUpdateData('lampiran', f, v)} />}
          </div>

          <div className="flex justify-between items-center" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '2rem' }}>
            <button 
              className="btn btn-secondary" 
              onClick={handlePrev} 
              disabled={currentTabIndex === 0}
              style={{ opacity: currentTabIndex === 0 ? 0.5 : 1, cursor: currentTabIndex === 0 ? 'not-allowed' : 'pointer' }}
            >
              Sebelumnya
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
              {currentTabIndex === tabs.length - 1 ? 'Selesai & Unduh' : 'Selanjutnya'}
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
