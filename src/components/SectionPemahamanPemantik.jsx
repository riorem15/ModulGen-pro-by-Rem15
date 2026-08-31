import React from 'react';
import Editor from './Editor';
import { HelpCircle, Lightbulb } from 'lucide-react';

const SectionPemahamanPemantik = ({ data, onChange, topic, fase }) => {
  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <span className="badge-step">7 & 8</span>
          <h2>7 & 8. PEMAHAMAN BERMAKNA & PERTANYAAN PEMANTIK</h2>
        </div>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Intisari pemahaman konsep esensial dan pertanyaan terbuka pemantik daya nalar.
        </p>
      </div>

      {/* 7. Pemahaman Bermakna */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb size={18} color="#D97706" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            7. PEMAHAMAN BERMAKNA
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Konsep esensial yang bermakna jangka panjang bagi kehidupan siswa.
        </p>
        <Editor 
          value={data.pemahamanBermakna || ''} 
          onChange={(val) => onChange('pemahamanBermakna', val)} 
          topic={topic}
          fase={fase}
          placeholder="Tuliskan pemahaman bermakna..."
        />
      </div>

      {/* 8. Pertanyaan Pemantik */}
      <div className="form-group">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle size={18} color="#2563EB" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            8. PERTANYAAN PEMANTIK
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Pertanyaan terbuka (open-ended) yang memantik rasa penasaran dan diskusi kritis.
        </p>
        <Editor 
          value={data.pertanyaanPemantik || ''} 
          onChange={(val) => onChange('pertanyaanPemantik', val)} 
          topic={topic}
          fase={fase}
          placeholder="Tuliskan pertanyaan pemantik..."
        />
      </div>
    </div>
  );
};

export default SectionPemahamanPemantik;
