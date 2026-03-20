import React from 'react';
import Editor from './Editor';

const SectionMateriReferensi = ({ data, onChange, topic, fase }) => {
  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <h2>Bagian 3: Materi dan Referensi</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Isi materi pembelajaran dan referensi yang digunakan.</p>
      </div>

      <div className="editor-group mb-6">
        <label>Materi Pembelajaran</label>
        <Editor 
          value={data?.materi || ''} 
          onChange={(val) => onChange('materi', val)} 
          placeholder="Tuliskan materi pembelajaran detail di sini..."
          topic={topic}
          fase={fase}
        />
      </div>

      <div className="editor-group">
        <label>Referensi / Daftar Pustaka</label>
        <Editor 
          value={data?.referensi || ''} 
          onChange={(val) => onChange('referensi', val)} 
          placeholder="Tuliskan referensi (buku, jurnal, dll) di sini..."
        />
      </div>
    </div>
  );
};

export default SectionMateriReferensi;
