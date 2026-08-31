import React from 'react';
import Editor from './Editor';
import { BookOpen, BookmarkCheck } from 'lucide-react';

const SectionMateriReferensi = ({ data, onChange, topic, fase }) => {
  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <span className="badge-step">9</span>
          <h2>9. MATERI PEMBELAJARAN DAN REFERENSI</h2>
        </div>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Uraian ringkasan materi inti dan daftar referensi pustaka.
        </p>
      </div>

      <div className="editor-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={18} color="#2563EB" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            A. Materi Pembelajaran (Ringkasan & Konsep Kunci)
          </label>
        </div>
        <Editor 
          value={data?.materi || ''} 
          onChange={(val) => onChange('materi', val)} 
          placeholder="Tuliskan ringkasan konsep materi pembelajaran di sini..."
          topic={topic}
          fase={fase}
        />
      </div>

      <div className="editor-group">
        <div className="flex items-center gap-2 mb-2">
          <BookmarkCheck size={18} color="#059669" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            B. Referensi & Daftar Pustaka
          </label>
        </div>
        <Editor 
          value={data?.referensi || ''} 
          onChange={(val) => onChange('referensi', val)} 
          placeholder="Tuliskan sumber buku teks, jurnal, modul, atau website referensi..."
        />
      </div>
    </div>
  );
};

export default SectionMateriReferensi;
