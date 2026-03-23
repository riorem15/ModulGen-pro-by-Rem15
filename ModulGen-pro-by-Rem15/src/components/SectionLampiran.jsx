import React from 'react';
import Editor from './Editor';

const SectionLampiran = ({ data, onChange }) => {
  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <h2>Bagian 4: Lampiran LKPD & Asesmen</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Lampirkan Lembar Kerja Peserta Didik dan instrumen rubrik asesmen di sini.</p>
      </div>

      <div className="form-group mb-5">
        <label style={{ fontSize: '1.2rem', color: 'var(--navy-light)', borderBottom: '2px solid var(--accent)', paddingBottom: '0.25rem', display: 'inline-block' }}>A. Lembar Kerja Peserta Didik (LKPD)</label>
        <p className="text-sm mt-1 mb-2" style={{ color: 'var(--text-secondary)' }}>Gunakan Editor untuk menyusun LKPD, tambahkan tabel atau drag & drop gambar relevan.</p>
        <Editor 
          value={data.lkpd} 
          onChange={(val) => onChange('lkpd', val)} 
        />
      </div>

      <div className="form-group mb-5">
        <label style={{ fontSize: '1.2rem', color: 'var(--navy-light)', borderBottom: '2px solid var(--accent)', paddingBottom: '0.25rem', display: 'inline-block' }}>B. Rubrik / Instrumen Asesmen</label>
        <p className="text-sm mt-1 mb-2" style={{ color: 'var(--text-secondary)' }}>Buat tabel kriteria dan rubrik penilaian siswa.</p>
        <Editor 
          value={data.asesmen} 
          onChange={(val) => onChange('asesmen', val)} 
        />
      </div>

      <div className="form-group mt-8">
        <label style={{ fontSize: '1.2rem', color: 'var(--navy-light)', borderBottom: '2px solid var(--accent)', paddingBottom: '0.25rem', display: 'inline-block' }}>C. Tanda Tangan Pengesahan</label>
        <p className="text-sm mt-1 mb-4" style={{ color: 'var(--text-secondary)' }}>Isi nama dan NIP untuk bagian pengesahan di akhir modul.</p>

        <div className="form-group mb-4" style={{ maxWidth: '300px' }}>
          <label>Tempat & Tanggal Pengesahan</label>
          <input 
            type="text" 
            value={data.tanggalPengesahan || ''} 
            onChange={(e) => onChange('tanggalPengesahan', e.target.value)} 
            placeholder="Contoh: Serang, 20 Maret 2026" 
          />
        </div>
        
        <div className="form-grid-2">
          <div className="form-card" style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--navy)' }}>Kepala Sekolah</h4>
            <div className="form-group mb-3">
              <label>Nama Lengkap</label>
              <input type="text" value={data.kepalaSekolahNama || ''} onChange={(e) => onChange('kepalaSekolahNama', e.target.value)} placeholder="Contoh: Dr. H. Fulan, M.Pd." />
            </div>
            <div className="form-group mb-0">
              <label>NIP</label>
              <input type="text" value={data.kepalaSekolahNip || ''} onChange={(e) => onChange('kepalaSekolahNip', e.target.value)} placeholder="Contoh: 19700101 199512 1 001" />
            </div>
          </div>

          <div className="form-card" style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--navy)' }}>Guru Mata Pelajaran</h4>
            <div className="form-group mb-3">
              <label>Nama Lengkap</label>
              <input type="text" value={data.guruMapelNama || ''} onChange={(e) => onChange('guruMapelNama', e.target.value)} placeholder="Contoh: Rio Refki Maulana, S.Pd." />
            </div>
            <div className="form-group mb-0">
              <label>NIP</label>
              <input type="text" value={data.guruMapelNip || ''} onChange={(e) => onChange('guruMapelNip', e.target.value)} placeholder="NIP / NUPTK / Kosongkan jika tidak ada" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionLampiran;
