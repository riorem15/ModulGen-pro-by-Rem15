import React from 'react';
import Editor from './Editor';
import { HelpCircle, Lightbulb } from 'lucide-react';

const SectionPemahamanPemantik = ({ data, onChange, topic, fase }) => {
  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <span className="badge-step">7 & 8</span>
          <h2>PEMAHAMAN BERMAKNA & PERTANYAAN PEMANTIK</h2>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Rumuskan intisari pemahaman yang akan diingat siswa seumur hidup dan pertanyaan esensial pemantik rasa ingin tahu.
        </p>
      </div>

      {/* 7. Pemahaman Bermakna */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb size={18} color="#D97706" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: 'var(--navy-light)' }}>
            7. PEMAHAMAN BERMAKNA (BIG IDEA / ENDURING UNDERSTANDING)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Uraikan pemahaman mendalam yang diperoleh siswa setelah mempelajari topik ini yang bermanfaat bagi kehidupannya.
        </p>
        <Editor 
          value={data.pemahamanBermakna || ''} 
          onChange={(val) => onChange('pemahamanBermakna', val)} 
          topic={topic}
          fase={fase}
          placeholder="Contoh: <p>Siswa menyadari bahwa tubuh manusia merupakan sistem yang saling terhubung dan bergantung satu sama lain; menjaga satu bagian tubuh berarti memelihara keseimbangan seluruh kehidupan kita.</p>"
        />
      </div>

      {/* 8. Pertanyaan Pemantik */}
      <div className="form-group">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle size={18} color="#2563EB" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: 'var(--navy-light)' }}>
            8. PERTANYAAN PEMANTIK (ESSENTIAL QUESTIONS)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Pertanyaan esensial terbuka (open-ended) yang memicu diskusi mendalam, rasa penasaran, dan eksplorasi berpikir tingkat tinggi.
        </p>
        <Editor 
          value={data.pertanyaanPemantik || ''} 
          onChange={(val) => onChange('pertanyaanPemantik', val)} 
          topic={topic}
          fase={fase}
          placeholder="Contoh: <ol><li>Mengapa ketika kita berolahraga kencang, detak jantung dan napas kita berdetak jauh lebih cepat?</li><li>Apa yang akan terjadi jika salah satu organ tubuh kita berhenti berfungsi selama 5 menit saja?</li><li>Bagaimana pola makan kita hari ini menentukan kualitas kesehatan kita di usia senja?</li></ol>"
        />
      </div>
    </div>
  );
};

export default SectionPemahamanPemantik;
