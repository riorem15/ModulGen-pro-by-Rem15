import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Layers, BookOpen, Download, HelpCircle, ArrowRight, ArrowLeft, 
  CheckCircle2, X, Play, Compass, Lightbulb 
} from 'lucide-react';
import './TutorialModal.css';

const TOUR_STEPS = [
  {
    id: 'welcome',
    targetId: null, // Centered Modal Intro
    title: 'Selamat Datang di MODULGEN PRO',
    subtitle: 'Generator Modul Ajar AI Generasi Baru',
    description: 'MODULGEN PRO dirancang khusus untuk mempermudah Bapak/Ibu Guru dalam menyusun perangkat pembelajaran dan modul ajar secara instan, terstruktur, dan sesuai standar Kurikulum Merdeka serta Pendekatan Deep Learning.',
    icon: <Sparkles size={26} color="#3B82F6" />,
    badge: 'Tentang Aplikasi'
  },
  {
    id: 'format-pilihan',
    targetId: 'tour-format-selector',
    title: '1. Pilihan Format Modul Ajar',
    subtitle: 'Deep Learning vs Standar Merdeka',
    description: 'Pilih format dokumen sesuai kebutuhan sekolah Anda:\n• 🌟 Format Deep Learning: Mendukung 10 kerangka komprehensif (Mindful, Meaningful, Joyful).\n• 📘 Format Standar Merdeka: Format ringkas komponen inti kurikulum merdeka.',
    icon: <Layers size={24} color="#7C3AED" />,
    badge: 'Format Dokumen',
    position: 'bottom'
  },
  {
    id: 'alur-pengisian',
    targetId: 'tour-tabs-nav',
    title: '2. Alur Pengisian 11 Komponen',
    subtitle: 'Navigasi Tab Terstruktur & Fleksibel',
    description: 'Isi atau sesuaikan modul Anda melalui 11 tab sistematis—mulai dari Identitas, Profil Lulusan, Desain Pembelajaran, Praktik Pedagogis, hingga Langkah 10 dan Lampiran LKPD/Asesmen/Pengesahan.',
    icon: <Compass size={24} color="#059669" />,
    badge: 'Langkah Pengisian',
    position: 'bottom'
  },
  {
    id: 'mgen-ai',
    targetId: 'tour-btn-ai',
    title: '3. MGen AI: Asisten Pembuat Otomatis',
    subtitle: 'Buat Seluruh Modul dalam Sekali Klik',
    description: 'Klik tombol MGen AI untuk membuat draf modul ajar lengkap secara otomatis berbasis kecerdasan buatan. Cukup ketik topik materi atau lampirkan silabus/dokumen acuan!',
    icon: <Sparkles size={24} color="#F59E0B" />,
    badge: 'Fitur AI Cerdas',
    position: 'bottom-left'
  },
  {
    id: 'preview-export',
    targetId: 'tour-btn-preview',
    title: '4. Pratinjau & Ekspor Word / PDF',
    subtitle: 'Layout Fleksibel & Tema Warna Menarik',
    description: 'Pratinjau dokumen dengan pilihan Format Kotak Modern atau Format Tabel Matriks RPP, sesuaikan tema warna tabel (Hijau Zamrud, Biru, dll.), dan unduh instan dalam format Word (.docx) atau PDF siap cetak!',
    icon: <Download size={24} color="#2563EB" />,
    badge: 'Ekspor Dokumen',
    position: 'bottom-left'
  }
];

const TutorialModal = ({ isOpen, onClose, onNavigateTab }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const [isIntroMode, setIsIntroMode] = useState(true);
  const tooltipRef = useRef(null);

  const step = TOUR_STEPS[currentStepIndex];

  // Calculate target element position on screen
  const updateTargetPosition = () => {
    if (isIntroMode || !step.targetId) {
      setTargetRect(null);
      return;
    }

    const targetEl = document.getElementById(step.targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        const rect = targetEl.getBoundingClientRect();
        setTargetRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          bottom: rect.bottom,
          right: rect.right
        });
      }, 200);
    } else {
      setTargetRect(null);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (currentStepIndex === 0) {
        setIsIntroMode(true);
      } else {
        setIsIntroMode(false);
      }
      updateTargetPosition();
    }
  }, [isOpen, currentStepIndex, isIntroMode]);

  useEffect(() => {
    const handleResize = () => updateTargetPosition();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
    };
  }, [currentStepIndex, isIntroMode]);

  if (!isOpen) return null;

  const handleStartTour = () => {
    setIsIntroMode(false);
    setCurrentStepIndex(1); // Jump to step 1 (Format Pilihan)
  };

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      if (nextIdx === 1 && onNavigateTab) {
        onNavigateTab('identitas');
      }
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 1) {
      setCurrentStepIndex(currentStepIndex - 1);
    } else if (currentStepIndex === 1) {
      setIsIntroMode(true);
      setCurrentStepIndex(0);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('modulgen_pro_tutorial_seen', 'true');
    onClose();
  };

  const handleSkip = () => {
    localStorage.setItem('modulgen_pro_tutorial_seen', 'true');
    onClose();
  };

  // 1. INTRO / WELCOME POPUP
  if (isIntroMode || currentStepIndex === 0) {
    return (
      <div className="tour-backdrop animate-fade-in">
        <div className="tour-welcome-card">
          <button className="tour-btn-close" onClick={handleSkip} title="Tutup">
            <X size={18} />
          </button>

          <div className="tour-welcome-header">
            <div className="tour-welcome-icon-glow">
              <img src="/favicon.svg" alt="ModulGen Logo" className="tour-logo-img" />
            </div>
            <span className="tour-badge-pill">Panduan Penggunaan</span>
            <h2 className="tour-welcome-title">Selamat Datang di MODULGEN PRO</h2>
            <p className="tour-welcome-desc">
              Platform pintar pembuatan Modul Ajar Kurikulum Merdeka & Pendekatan Deep Learning terintegrasi secara otomatis, cepat, dan profesional.
            </p>
          </div>

          <div className="tour-features-summary">
            <div className="tour-feature-item">
              <div className="feature-icon" style={{ background: 'rgba(37,99,235,0.12)', color: '#2563EB' }}>
                <Layers size={18} />
              </div>
              <div className="feature-text">
                <strong>Format Deep Learning & Standar</strong>
                <span>10 Kerangka lengkap (Mindful, Meaningful, Joyful).</span>
              </div>
            </div>

            <div className="tour-feature-item">
              <div className="feature-icon" style={{ background: 'rgba(124,58,237,0.12)', color: '#7C3AED' }}>
                <Sparkles size={18} />
              </div>
              <div className="feature-text">
                <strong>Asisten MGen AI Terintegrasi</strong>
                <span>Rancang seluruh konten modul dalam hitungan detik.</span>
              </div>
            </div>

            <div className="tour-feature-item">
              <div className="feature-icon" style={{ background: 'rgba(5,150,105,0.12)', color: '#059669' }}>
                <Download size={18} />
              </div>
              <div className="feature-text">
                <strong>Ekspor Word (.docx) & PDF Cepat</strong>
                <span>Siap cetak dengan pilihan layout kotak & tabel matriks RPP.</span>
              </div>
            </div>
          </div>

          <div className="tour-welcome-actions">
            <button className="btn btn-primary tour-btn-start" onClick={handleStartTour}>
              <Play size={16} /> Ikuti Panduan Tur Interaktif
            </button>
            <button className="btn btn-secondary tour-btn-skip" onClick={handleSkip}>
              Lewati & Langsung Mulai
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. INTERACTIVE STEP-BY-STEP HIGHLIGHT TOUR
  return (
    <div className="tour-interactive-overlay">
      {/* Target Element Spotlight Cutout */}
      {targetRect && (
        <div 
          className="tour-spotlight-box"
          style={{
            top: `${Math.max(0, targetRect.top - 6)}px`,
            left: `${Math.max(0, targetRect.left - 6)}px`,
            width: `${targetRect.width + 12}px`,
            height: `${targetRect.height + 12}px`
          }}
        />
      )}

      {/* Floating Tooltip Card */}
      <div 
        ref={tooltipRef}
        className="tour-step-card animate-fade-in"
        style={getTooltipPlacementStyle(targetRect, step.position)}
      >
        {/* Pointer Arrow Indicator */}
        <div className={`tour-pointer-arrow arrow-${step.position || 'bottom'}`}>
          <div className="arrow-triangle" />
          <div className="arrow-pulse" />
        </div>

        {/* Step Header */}
        <div className="tour-step-header">
          <div className="flex items-center gap-2">
            <span className="tour-step-counter">
              Langkah {currentStepIndex} / {TOUR_STEPS.length - 1}
            </span>
            <span className="tour-step-badge">{step.badge}</span>
          </div>
          <button className="tour-btn-close-sm" onClick={handleSkip} title="Lewati Tur">
            <X size={15} />
          </button>
        </div>

        {/* Step Body */}
        <div className="tour-step-body">
          <div className="flex items-start gap-3">
            <div className="tour-step-icon">
              {step.icon}
            </div>
            <div>
              <h3 className="tour-step-title">{step.title}</h3>
              <div className="tour-step-subtitle">{step.subtitle}</div>
            </div>
          </div>
          <div className="tour-step-desc">
            {step.description.split('\n').map((line, i) => (
              <p key={i} style={{ margin: '0 0 4px 0' }}>{line}</p>
            ))}
          </div>
        </div>

        {/* Step Progress Indicators */}
        <div className="tour-step-progress-row">
          <div className="tour-dots-wrapper">
            {TOUR_STEPS.slice(1).map((_, idx) => (
              <span 
                key={idx} 
                className={`tour-dot ${idx + 1 === currentStepIndex ? 'active' : idx + 1 < currentStepIndex ? 'done' : ''}`}
                onClick={() => setCurrentStepIndex(idx + 1)}
              />
            ))}
          </div>
        </div>

        {/* Step Navigation Actions */}
        <div className="tour-step-actions">
          <button 
            className="btn btn-secondary tour-btn-nav" 
            onClick={handlePrev}
          >
            <ArrowLeft size={14} /> Kembali
          </button>

          <button 
            className="btn btn-primary tour-btn-nav tour-btn-next" 
            onClick={handleNext}
          >
            {currentStepIndex === TOUR_STEPS.length - 1 ? (
              <><CheckCircle2 size={15} /> Selesai & Mulai</>
            ) : (
              <>Lanjut <ArrowRight size={14} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate tooltip positioning
function getTooltipPlacementStyle(rect, position = 'bottom') {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    return {
      position: 'fixed',
      bottom: '16px',
      left: '12px',
      right: '12px',
      maxWidth: 'calc(100vw - 24px)',
      zIndex: 10002
    };
  }

  if (!rect) {
    return {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 10002
    };
  }

  let top = rect.bottom + 14;
  let left = rect.left;

  if (position === 'bottom-left') {
    left = Math.max(16, rect.right - 380);
    top = rect.bottom + 14;
  } else if (position === 'bottom') {
    left = Math.max(16, Math.min(window.innerWidth - 400, rect.left + (rect.width / 2) - 190));
    top = rect.bottom + 14;
  } else if (position === 'top') {
    top = Math.max(16, rect.top - 240);
    left = Math.max(16, rect.left);
  }

  // Prevent overflow outside viewport
  if (top + 280 > window.innerHeight) {
    top = Math.max(16, rect.top - 250);
  }

  return {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    zIndex: 10002
  };
}

export default TutorialModal;
