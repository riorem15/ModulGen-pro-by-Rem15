import React from 'react';
import Editor from './Editor';
import { Brain, HeartHandshake, Smile, Layers, GitFork, Lightbulb } from 'lucide-react';

const SectionPedagogisDeepLearning = ({ data, onChange, topic, fase }) => {
  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <span className="badge-step">4</span>
          <h2>PRAKTIK PEDAGOGIS DEEP LEARNING</h2>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Integrasikan 3 pilar utama Pembelajaran Mendalam (Mindful, Meaningful, Joyful) serta model dan metode pembelajaran yang memberdayakan.
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
            Hadir seutuhnya, kesadaran penuh, fokus, reflektif, dan keterbukaan pikiran saat belajar.
          </p>
        </div>

        <div className="pilar-card pilar-meaningful">
          <div className="flex items-center gap-2 mb-1">
            <HeartHandshake size={18} color="#059669" />
            <h4 style={{ margin: 0, color: '#047857' }}>Meaningful Learning</h4>
          </div>
          <p className="text-xs text-muted" style={{ margin: 0 }}>
            Relevan dengan dunia nyata, menghubungkan konsep dengan pengalaman hidup siswa.
          </p>
        </div>

        <div className="pilar-card pilar-joyful">
          <div className="flex items-center gap-2 mb-1">
            <Smile size={18} color="#D97706" />
            <h4 style={{ margin: 0, color: '#B45309' }}>Joyful Learning</h4>
          </div>
          <p className="text-xs text-muted" style={{ margin: 0 }}>
            Menyenangkan, memicu rasa ingin tahu (curiosity), apresiatif, dan menggembirakan.
          </p>
        </div>
      </div>

      {/* 4.1 Mindful Learning */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Brain size={18} color="#0284C7" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: '#0369A1' }}>
            A. Mindful Learning (Pembelajaran Berkesadaran / Sadar Penuh)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Bagaimana guru menumbuhkan fokus, rasa ingin tahu yang tenang, teknik 'STOP'/hening sejenak, atau latihan metakognisi sebelum dan saat belajar.
        </p>
        <Editor 
          value={data.mindfulLearning || ''} 
          onChange={(val) => onChange('mindfulLearning', val)} 
          topic={topic}
          fase={fase}
          placeholder="Contoh: Mengawali sesi dengan teknik pernapasan sadar (STOP: Stop, Take a breath, Observe, Proceed) untuk memusatkan perhatian, mengajak siswa mengamati diri dan menyadari tujuan belajarnya hari ini."
        />
      </div>

      {/* 4.2 Meaningful Learning */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <HeartHandshake size={18} color="#059669" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: '#047857' }}>
            B. Meaningful Learning (Pembelajaran Bermakna & Relevan)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Bagaimana materi dikaitkan dengan konteks kehidupan sehari-hari siswa, pemecahan masalah otentik, dan nilai kemanfaatannya bagi masa depan.
        </p>
        <Editor 
          value={data.meaningfulLearning || ''} 
          onChange={(val) => onChange('meaningfulLearning', val)} 
          topic={topic}
          fase={fase}
          placeholder="Contoh: Siswa menganalisis kasus nyata kebiasaan konsumsi makanan di lingkungan sekitar, menghubungkan dengan data kesehatan keluarga, sehingga konsep nutrisi menjadi relevan langsung dengan kesehariannya."
        />
      </div>

      {/* 4.3 Joyful Learning */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Smile size={18} color="#D97706" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: '#B45309' }}>
            C. Joyful Learning (Pembelajaran Menggembirakan / Menyenangkan)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Strategi membuat atmosfer belajar yang hangat, antusias, interaktif melalui gamifikasi edukatif, simulasi seru, atau apresiasi karya murid.
        </p>
        <Editor 
          value={data.joyfulLearning || ''} 
          onChange={(val) => onChange('joyfulLearning', val)} 
          topic={topic}
          fase={fase}
          placeholder="Contoh: Menggunakan kuis interaktif berhadiah bintang apresiasi, simulasi peran detektif sains, serta galeri walk di mana setiap kelompok saling memberi stiker tepuk tangan/umpan balik positif."
        />
      </div>

      {/* 4.4 Model Pembelajaran */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Layers size={18} color="#7C3AED" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: 'var(--navy-light)' }}>
            D. Model Pembelajaran
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Pilih atau uraikan model pembelajaran mendalam yang digunakan (misal: Problem Based Learning, Project Based Learning, Inquiry Learning, Deep Learning Cycle).
        </p>
        <Editor 
          value={data.modelPembelajaran || ''} 
          onChange={(val) => onChange('modelPembelajaran', val)} 
          topic={topic}
          fase={fase}
          placeholder="Contoh: Problem Based Learning (PBL) terintegrasi dengan Siklus Pembelajaran Mendalam (Deep Learning Cycle: Memahami, Mengaplikasi, Merefleksi)."
        />
      </div>

      {/* 4.5 Metode Pembelajaran */}
      <div className="form-group">
        <div className="flex items-center gap-2 mb-2">
          <GitFork size={18} color="#2563EB" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: 'var(--navy-light)' }}>
            E. Metode Pembelajaran
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Kombinasi metode yang bervariasi (Diskusi Kelompok, Eksperimen/Praktikum, Studi Kasus, Presentasi, Refleksi Diri).
        </p>
        <Editor 
          value={data.metodePembelajaran || ''} 
          onChange={(val) => onChange('metodePembelajaran', val)} 
          topic={topic}
          fase={fase}
          placeholder="Contoh: Diskusi kolaboratif, investigasi kelompok, tanya jawab reflektif, demonstrasi, dan presentasi unjuk karya (Gallery Walk)."
        />
      </div>
    </div>
  );
};

export default SectionPedagogisDeepLearning;
