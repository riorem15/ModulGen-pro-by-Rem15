import React from 'react';
import Editor from './Editor';
import { BookOpen, BookmarkCheck } from 'lucide-react';

const SectionMateriReferensi = ({ data, onChange, topic, fase }) => {
  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <span className="badge-step">9</span>
          <h2>MATERI PEMBELAJARAN DAN REFERENSI</h2>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Uraikan ringkasan materi pembelajaran inti secara konseptual dan cantumkan daftar pustaka/sumber referensi yang kredibel.
        </p>
      </div>

      <div className="editor-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={18} color="#2563EB" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: 'var(--navy-light)' }}>
            A. Materi Pembelajaran (Ringkasan & Peta Konsep)
          </label>
        </div>
        <Editor 
          value={data?.materi || ''} 
          onChange={(val) => onChange('materi', val)} 
          placeholder="Tuliskan ringkasan materi pembelajaran mendalam, konsep kunci, definisi, atau tabel penjelasan di sini..."
          topic={topic}
          fase={fase}
        />
      </div>

      <div className="editor-group">
        <div className="flex items-center gap-2 mb-2">
          <BookmarkCheck size={18} color="#059669" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: 'var(--navy-light)' }}>
            B. Referensi / Sumber Belajar / Daftar Pustaka
          </label>
        </div>
        <Editor 
          value={data?.referensi || ''} 
          onChange={(val) => onChange('referensi', val)} 
          placeholder="Tuliskan daftar buku teks utama, modul kemdikbud, jurnal ilmiah, website terpercaya, atau media digital referensi..."
        />
      </div>
    </div>
  );
};

export default SectionMateriReferensi;
