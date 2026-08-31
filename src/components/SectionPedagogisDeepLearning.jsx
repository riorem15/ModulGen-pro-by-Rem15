import React from 'react';
import Editor from './Editor';
import { Brain, HeartHandshake, Smile, Layers, GitFork } from 'lucide-react';

const SectionPedagogisDeepLearning = ({ data, onChange, topic, fase }) => {
  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <span className="badge-step">4</span>
          <h2>4. PRAKTIK PEDAGOGIS DEEP LEARNING</h2>
        </div>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Integrasi 3 pilar Pembelajaran Mendalam (Mindful, Meaningful, Joyful) serta model dan metode pembelajaran.
        </p>
      </div>

      {/* 3 Pilar Banner */}
      <div className="pilar-grid mb-6">
        <div className="pilar-card pilar-mindful">
          <div className="flex items-center gap-2 mb-1">
            <Brain size={18} color="#0284C7" />
            <h4 style={{ margin: 0, color: '#0369A1' }}>Mindful Learning</h4>
          </div>
          <p className="text-xs text-muted" style={{ margin: 0 }}>
            Kesadaran penuh, fokus, reflektif, dan keterbukaan pikiran saat belajar.
          </p>
        </div>

        <div className="pilar-card pilar-meaningful">
          <div className="flex items-center gap-2 mb-1">
            <HeartHandshake size={18} color="#059669" />
            <h4 style={{ margin: 0, color: '#047857' }}>Meaningful Learning</h4>
          </div>
          <p className="text-xs text-muted" style={{ margin: 0 }}>
            Kontekstual, menghubungkan materi dengan dunia nyata dan pengalaman siswa.
          </p>
        </div>

        <div className="pilar-card pilar-joyful">
          <div className="flex items-center gap-2 mb-1">
            <Smile size={18} color="#D97706" />
            <h4 style={{ margin: 0, color: '#B45309' }}>Joyful Learning</h4>
          </div>
          <p className="text-xs text-muted" style={{ margin: 0 }}>
            Menyenangkan, memicu antusiasme, apresiatif, dan menggembirakan.
          </p>
        </div>
      </div>

      {/* 4.1 Mindful Learning */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Brain size={18} color="#0284C7" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            A. Mindful Learning (Pembelajaran Berkesadaran)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Strategi menumbuhkan fokus, latihan kesadaran/hening sejenak, atau refleksi diri siswa.
        </p>
        <Editor 
          value={data.mindfulLearning || ''} 
          onChange={(val) => onChange('mindfulLearning', val)} 
          topic={topic}
          fase={fase}
          placeholder="Uraikan penerapan Mindful Learning..."
        />
      </div>

      {/* 4.2 Meaningful Learning */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <HeartHandshake size={18} color="#059669" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            B. Meaningful Learning (Pembelajaran Bermakna)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Pengaitan materi dengan konteks kehidupan nyata, pemecahan masalah, dan kebermanfaatan.
        </p>
        <Editor 
          value={data.meaningfulLearning || ''} 
          onChange={(val) => onChange('meaningfulLearning', val)} 
          topic={topic}
          fase={fase}
          placeholder="Uraikan penerapan Meaningful Learning..."
        />
      </div>

      {/* 4.3 Joyful Learning */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Smile size={18} color="#D97706" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            C. Joyful Learning (Pembelajaran Menggembirakan)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Aktivitas interaktif, gamifikasi edukatif, simulasi seru, atau apresiasi karya murid.
        </p>
        <Editor 
          value={data.joyfulLearning || ''} 
          onChange={(val) => onChange('joyfulLearning', val)} 
          topic={topic}
          fase={fase}
          placeholder="Uraikan penerapan Joyful Learning..."
        />
      </div>

      {/* 4.4 Model Pembelajaran */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Layers size={18} color="#7C3AED" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            D. Model Pembelajaran
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Model pembelajaran yang diterapkan (PBL, PjBL, Inquiry, Deep Learning Cycle).
        </p>
        <Editor 
          value={data.modelPembelajaran || ''} 
          onChange={(val) => onChange('modelPembelajaran', val)} 
          topic={topic}
          fase={fase}
          placeholder="Tuliskan model pembelajaran..."
        />
      </div>

      {/* 4.5 Metode Pembelajaran */}
      <div className="form-group">
        <div className="flex items-center gap-2 mb-2">
          <GitFork size={18} color="#2563EB" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            E. Metode Pembelajaran
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Metode kegiatan (Diskusi, Eksperimen, Studi Kasus, Presentasi, Gallery Walk).
        </p>
        <Editor 
          value={data.metodePembelajaran || ''} 
          onChange={(val) => onChange('metodePembelajaran', val)} 
          topic={topic}
          fase={fase}
          placeholder="Tuliskan metode pembelajaran..."
        />
      </div>
    </div>
  );
};

export default SectionPedagogisDeepLearning;
