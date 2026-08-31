import React from 'react';
import Editor from './Editor';
import { FileCheck, ClipboardList, PenTool } from 'lucide-react';

const SectionLampiran = ({ data, onChange }) => {
  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <span className="badge-step">11</span>
          <h2>11. LAMPIRAN LKPD, ASESMEN & PENGESAHAN</h2>
        </div>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Lembar Kerja Peserta Didik (LKPD), instrumen asesmen/rubrik penilaian, dan lembar pengesahan.
        </p>
      </div>

      {/* A. LKPD */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FileCheck size={20} color="#2563EB" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            A. Lembar Kerja Peserta Didik (LKPD)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Panduan tugas investigasi, studi kasus, atau aktivitas kelompok/mandiri siswa.
        </p>
        <Editor 
          value={data.lkpd || ''} 
          onChange={(val) => onChange('lkpd', val)} 
          placeholder="Tuliskan format panduan LKPD atau lembar tugas siswa..."
        />
      </div>

      {/* B. Asesmen & Rubrik */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <ClipboardList size={20} color="#059669" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            B. Instrumen & Rubrik Asesmen
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Rubrik penilaian proses, asesmen performa unjuk kerja, dan kriteria evaluasi.
        </p>
        <Editor 
          value={data.asesmen || ''} 
          onChange={(val) => onChange('asesmen', val)} 
          placeholder="Tuliskan format instrumen asesmen dan kriteria rubrik penilaian..."
        />
      </div>

      {/* C. Tanda Tangan Pengesahan */}
      <div className="pengesahan-container card mt-6">
        <div className="flex items-center gap-2 mb-4">
          <PenTool size={18} color="#7C3AED" />
          <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 600 }}>
            C. Lembar Pengesahan
          </h3>
        </div>

        <div className="form-group mb-4" style={{ maxWidth: '320px' }}>
          <label>Tempat & Tanggal Pengesahan</label>
          <input 
            type="text" 
            value={data.tanggalPengesahan || ''} 
            onChange={(e) => onChange('tanggalPengesahan', e.target.value)} 
            placeholder="Kota, Tanggal Bulan Tahun" 
          />
        </div>
        
        <div className="form-grid-2">
          <div className="pengesahan-card">
            <h4 style={{ marginBottom: '0.85rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>Kepala Satuan Pendidikan</h4>
            <div className="form-group mb-3">
              <label>Nama Lengkap & Gelar</label>
              <input type="text" value={data.kepalaSekolahNama || ''} onChange={(e) => onChange('kepalaSekolahNama', e.target.value)} placeholder="Nama Kepala Sekolah dan Gelar" />
            </div>
            <div className="form-group mb-0">
              <label>NIP / NUPTK</label>
              <input type="text" value={data.kepalaSekolahNip || ''} onChange={(e) => onChange('kepalaSekolahNip', e.target.value)} placeholder="NIP Kepala Sekolah" />
            </div>
          </div>

          <div className="pengesahan-card">
            <h4 style={{ marginBottom: '0.85rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>Guru Mata Pelajaran</h4>
            <div className="form-group mb-3">
              <label>Nama Lengkap & Gelar</label>
              <input type="text" value={data.guruMapelNama || ''} onChange={(e) => onChange('guruMapelNama', e.target.value)} placeholder="Nama Guru Pengampu dan Gelar" />
            </div>
            <div className="form-group mb-0">
              <label>NIP / NUPTK</label>
              <input type="text" value={data.guruMapelNip || ''} onChange={(e) => onChange('guruMapelNip', e.target.value)} placeholder="NIP Guru Pengampu (Opsional)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionLampiran;
