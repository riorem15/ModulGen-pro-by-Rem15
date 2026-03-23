import React from 'react';

const SectionIdentitas = ({ data, onChange }) => {
  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <h2>Bagian 1: Identitas Modul & Pengaturan Global</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Isi informasi dasar dan atur format cetak dokumen Anda.</p>
      </div>

      <div className="form-group mb-6" style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--navy)' }}>Pengaturan Format Dokumen</h3>
        <div className="form-grid-3">
          <div>
            <label style={{ fontSize: '0.85rem' }}>Jenis Huruf (Font)</label>
            <select value={data.fontFamily || 'Poppins'} onChange={(e) => onChange('fontFamily', e.target.value)}>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Poppins">Poppins</option>
              <option value="Verdana">Verdana</option>
              <option value="Tahoma">Tahoma</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.85rem' }}>Ukuran Huruf</label>
            <select value={data.fontSize || '11pt'} onChange={(e) => onChange('fontSize', e.target.value)}>
              <option value="10pt">10</option>
              <option value="11pt">11</option>
              <option value="12pt">12</option>
              <option value="14pt">14</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.85rem' }}>Jarak Baris (Spasi)</label>
            <select value={data.lineSpacing || '1.5'} onChange={(e) => onChange('lineSpacing', e.target.value)}>
              <option value="1">1.0</option>
              <option value="1.15">1.15</option>
              <option value="1.5">1.5</option>
              <option value="2">2.0</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-group">
          <label>Nama Penyusun</label>
          <input 
            type="text" 
            value={data.penyusun} 
            onChange={(e) => onChange('penyusun', e.target.value)}
            placeholder="Contoh: Rio Refki Maulana"
          />
        </div>
        
        <div className="form-group">
          <label>Instansi / Sekolah</label>
          <input 
            type="text" 
            value={data.instansi} 
            onChange={(e) => onChange('instansi', e.target.value)}
            placeholder="Contoh: SMA Negeri 1 Banten"
          />
        </div>

        <div className="form-group">
          <label>Mata Pelajaran</label>
          <input 
            type="text" 
            value={data.mataPelajaran} 
            onChange={(e) => onChange('mataPelajaran', e.target.value)}
            placeholder="Contoh: Sejarah"
          />
        </div>

        <div className="form-group">
          <label>Fase / Kelas</label>
          <input 
            type="text" 
            value={data.faseKelas} 
            onChange={(e) => onChange('faseKelas', e.target.value)}
            placeholder="Contoh: Fase E / Kelas 10"
          />
        </div>

        <div className="form-group">
          <label>Semester</label>
          <input 
            type="text" 
            value={data.semester || ''} 
            onChange={(e) => onChange('semester', e.target.value)}
            placeholder="Contoh: 2"
          />
        </div>

        <div className="form-group">
          <label>Materi Ajar</label>
          <input 
            type="text" 
            value={data.materiAjar || ''} 
            onChange={(e) => onChange('materiAjar', e.target.value)}
            placeholder="Contoh: Masa Praksara"
          />
        </div>

        <div className="form-group" style={{ gridColumn: 'span 2' }}>
          <label>Alokasi Waktu</label>
          <input 
            type="text" 
            value={data.alokasiWaktu} 
            onChange={(e) => onChange('alokasiWaktu', e.target.value)}
            placeholder="Contoh: 2 x 45 Menit (1 Pertemuan)"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionIdentitas;
