import React from 'react';
import Editor from './Editor';
import { Tv, Building2 } from 'lucide-react';

const SectionMediaSarana = ({ data, onChange, topic, fase }) => {
  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <span className="badge-step">5 & 6</span>
          <h2>5 & 6. MEDIA, SARANA & PRASARANA</h2>
        </div>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Media pembelajaran serta sarana dan prasarana penunjang kegiatan.
        </p>
      </div>

      {/* 5. Media Pembelajaran */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Tv size={18} color="#2563EB" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            5. MEDIA PEMBELAJARAN
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Media digital, video interaktif, slide, alat peraga, atau LKPD.
        </p>
        <Editor 
          value={data.mediaPembelajaran || ''} 
          onChange={(val) => onChange('mediaPembelajaran', val)} 
          topic={topic}
          fase={fase}
          placeholder="Tuliskan daftar media pembelajaran..."
        />
      </div>

      {/* 6. Sarana dan Prasarana */}
      <div className="form-group">
        <div className="flex items-center gap-2 mb-2">
          <Building2 size={18} color="#059669" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            6. SARANA DAN PRASARANA
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Fasilitas, perangkat TIK, dan ruang belajar di sekolah.
        </p>
        <Editor 
          value={data.saranaPrasarana || ''} 
          onChange={(val) => onChange('saranaPrasarana', val)} 
          topic={topic}
          fase={fase}
          placeholder="Tuliskan sarana dan prasarana..."
        />
      </div>
    </div>
  );
};

export default SectionMediaSarana;
