import React from 'react';
import Editor from './Editor';
import { FileCheck, ClipboardList, PenTool } from 'lucide-react';

const SectionLampiran = ({ data, onChange }) => {
  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <span className="badge-step">11</span>
          <h2>LAMPIRAN LKPD, ASESMEN & PENGESAHAN</h2>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Lengkapi modul ajar dengan Lembar Kerja Peserta Didik (LKPD), instrumen asesmen/rubrik penilaian, dan lembar pengesahan resmi.
        </p>
      </div>

      {/* A. LKPD */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FileCheck size={20} color="#2563EB" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: 'var(--navy-light)' }}>
            A. Lembar Kerja Peserta Didik (LKPD)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Petunjuk aktivitas kelompok/individu, tabel data pengamatan, dan panduan tugas murid.
        </p>
        <Editor 
          value={data.lkpd || ''} 
          onChange={(val) => onChange('lkpd', val)} 
          placeholder="Tuliskan format LKPD, pertanyaan investigasi, atau rancangan tugas siswa..."
        />
      </div>

      {/* B. Asesmen & Rubrik */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <ClipboardList size={20} color="#059669" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: 'var(--navy-light)' }}>
            B. Instrumen & Rubrik Asesmen (Diagnostik, Formatif, Sumatif)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Kriteria penilaian proses (observasi sikap/profil lulusan), asesmen performa unjuk kerja, dan tes formatif/sumatif.
        </p>
        <Editor 
          value={data.asesmen || ''} 
          onChange={(val) => onChange('asesmen', val)} 
          placeholder="Tuliskan tabel rubrik penilaian kualitatif, kriteria skor, dan pedoman penskoran di sini..."
        />
      </div>

      {/* C. Tanda Tangan Pengesahan */}
      <div className="card shadow-sm mt-8" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
        <div className="flex items-center gap-2 mb-4">
          <PenTool size={20} color="#7C3AED" />
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1E293B' }}>
            C. Lembar Tanda Tangan Pengesahan
          </h3>
        </div>

        <div className="form-group mb-4" style={{ maxWidth: '320px' }}>
          <label>Tempat & Tanggal Pengesahan</label>
          <input 
            type="text" 
            value={data.tanggalPengesahan || ''} 
            onChange={(e) => onChange('tanggalPengesahan', e.target.value)} 
            placeholder="Contoh: Serang, 20 Maret 2026" 
          />
        </div>
        
        <div className="form-grid-2">
          <div className="form-card" style={{ padding: '1rem', background: 'white', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--navy)' }}>Kepala Satuan Pendidikan</h4>
            <div className="form-group mb-3">
              <label>Nama Lengkap & Gelar</label>
              <input type="text" value={data.kepalaSekolahNama || ''} onChange={(e) => onChange('kepalaSekolahNama', e.target.value)} placeholder="Contoh: Dr. H. Fulan, M.Pd." />
            </div>
            <div className="form-group mb-0">
              <label>NIP / NUPTK</label>
              <input type="text" value={data.kepalaSekolahNip || ''} onChange={(e) => onChange('kepalaSekolahNip', e.target.value)} placeholder="Contoh: 19700101 199512 1 001" />
            </div>
          </div>

          <div className="form-card" style={{ padding: '1rem', background: 'white', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--navy)' }}>Guru Mata Pelajaran</h4>
            <div className="form-group mb-3">
              <label>Nama Lengkap & Gelar</label>
              <input type="text" value={data.guruMapelNama || ''} onChange={(e) => onChange('guruMapelNama', e.target.value)} placeholder="Contoh: Rio Refki Maulana, S.Pd." />
            </div>
            <div className="form-group mb-0">
              <label>NIP / NUPTK</label>
              <input type="text" value={data.guruMapelNip || ''} onChange={(e) => onChange('guruMapelNip', e.target.value)} placeholder="NIP / NUPTK / Kosongkan jika tidak ada" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionLampiran;
