import React from 'react';
import Editor from './Editor';
import { Tv, Building2 } from 'lucide-react';

const SectionMediaSarana = ({ data, onChange, topic, fase }) => {
  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <span className="badge-step">5 & 6</span>
          <h2>MEDIA, SARANA & PRASARANA PEMBELAJARAN</h2>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Rincikan media pembelajaran interaktif serta ketersediaan sarana dan prasarana penunjang aktivitas mendalam.
        </p>
      </div>

      {/* 5. Media Pembelajaran */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Tv size={18} color="#2563EB" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: 'var(--navy-light)' }}>
            5. MEDIA PEMBELAJARAN
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Media ajar yang digunakan untuk memperkuat pemahaman konsep (Video interaktif, Slide canva, Alat peraga konkrit, Flashcard, LKPD digital, Simulasi virtual).
        </p>
        <Editor 
          value={data.mediaPembelajaran || ''} 
          onChange={(val) => onChange('mediaPembelajaran', val)} 
          topic={topic}
          fase={fase}
          placeholder="Contoh: <ul><li>Video animasi pembelajaran YouTube tentang mekanisme sistem peredaran darah.</li><li>Slide presentasi interaktif Canva / Quizizz.</li><li>Model torso / alat peraga organ manusia 3D.</li><li>Lembar Kerja Peserta Didik (LKPD) digital & cetak.</li></ul>"
        />
      </div>

      {/* 6. Sarana dan Prasarana */}
      <div className="form-group">
        <div className="flex items-center gap-2 mb-2">
          <Building2 size={18} color="#059669" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: 'var(--navy-light)' }}>
            6. SARANA DAN PRASARANA
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Fasilitas dan peralatan yang mendukung proses pembelajaran di satuan pendidikan.
        </p>
        <Editor 
          value={data.saranaPrasarana || ''} 
          onChange={(val) => onChange('saranaPrasarana', val)} 
          topic={topic}
          fase={fase}
          placeholder="Contoh: <ul><li><strong>Sarana:</strong> Laptop, LCD Proyektor, Speaker aktif, Jaringan Internet/Wi-Fi, Papan Tulis & Spidol, Buku Teks Siswa.</li><li><strong>Prasarana:</strong> Ruang Kelas yang nyaman dan fleksibel untuk kerja kelompok, Ruang Laboratorium IPA/Komputer, Perpustakaan Sekolah.</li></ul>"
        />
      </div>
    </div>
  );
};

export default SectionMediaSarana;
