import React from 'react';
import Editor from './Editor';
import { Target, CheckCircle2, Award, ListFilter } from 'lucide-react';

const SectionDesainPembelajaran = ({ data, onChange, topic, fase }) => {
  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <span className="badge-step">3</span>
          <h2>3. DESAIN PEMBELAJARAN</h2>
        </div>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Capaian Pembelajaran, Tujuan Pembelajaran, kriteria KKTP, dan rubrik ketercapaian.
        </p>
      </div>

      {/* 3.1 Capaian Pembelajaran (CP) */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Target size={18} color="#2563EB" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            A. Capaian Pembelajaran (CP)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Kompetensi akhir fase/elemen yang ditargetkan pada mata pelajaran.
        </p>
        <Editor 
          value={data.capaianPembelajaran || ''} 
          onChange={(val) => onChange('capaianPembelajaran', val)} 
          topic={topic}
          fase={fase}
          placeholder="Tuliskan rumusan Capaian Pembelajaran (CP)..."
        />
      </div>

      {/* 3.2 Tujuan Pembelajaran (TP) */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 size={18} color="#059669" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            B. Tujuan Pembelajaran (TP)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Tujuan pembelajaran spesifik (kognitif, afektif, dan aplikasi nyata).
        </p>
        <Editor 
          value={data.tujuanPembelajaran || ''} 
          onChange={(val) => onChange('tujuanPembelajaran', val)} 
          topic={topic}
          fase={fase}
          placeholder="Tuliskan tujuan pembelajaran yang ingin dicapai..."
        />
      </div>

      {/* 3.3 KKTP */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <ListFilter size={18} color="#D97706" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            C. Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Indikator deskripsi kriteria bukti penguasaan materi oleh siswa.
        </p>
        <Editor 
          value={data.kktp || ''} 
          onChange={(val) => onChange('kktp', val)} 
          topic={topic}
          fase={fase}
          placeholder="Tuliskan kriteria indikator ketercapaian..."
        />
      </div>

      {/* 3.4 Kategori Ketercapaian */}
      <div className="form-group">
        <div className="flex items-center gap-2 mb-2">
          <Award size={18} color="#7C3AED" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            D. Kategori Ketercapaian & Tindak Lanjut
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Interval skor atau rubrik kualitatif beserta tindak lanjut remedial/pengayaan.
        </p>
        <Editor 
          value={data.kategoriKetercapaian || ''} 
          onChange={(val) => onChange('kategoriKetercapaian', val)} 
          topic={topic}
          fase={fase}
          placeholder="Tuliskan tabel kategori interval ketercapaian dan tindak lanjutnya..."
        />
      </div>
    </div>
  );
};

export default SectionDesainPembelajaran;
