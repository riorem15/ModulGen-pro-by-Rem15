import React from 'react';
import { Settings, Sparkles, BookOpen, Layers } from 'lucide-react';

const SectionIdentitas = ({ data, onChange, formatType, onFormatChange }) => {
  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="badge-step">1</span>
            <h2>1. IDENTITAS MODUL & PENGATURAN</h2>
          </div>
          
          {onFormatChange && (
            <div className="format-type-toggle flex items-center gap-2">
              <button
                type="button"
                className={`format-pill-btn ${formatType === 'deep_learning' ? 'active-dl' : ''}`}
                onClick={() => onFormatChange('deep_learning')}
              >
                <Sparkles size={14} /> Format Deep Learning (10 Kerangka)
              </button>
              <button
                type="button"
                className={`format-pill-btn ${formatType === 'standar' ? 'active-std' : ''}`}
                onClick={() => onFormatChange('standar')}
              >
                <BookOpen size={14} /> Format Standar (Merdeka)
              </button>
            </div>
          )}
        </div>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Isi informasi identitas kurikulum modul dan konfigurasi tampilan dokumen cetak.
        </p>
      </div>

      {/* Pengaturan Font Dokumen */}
      <div className="form-group mb-6" style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Settings size={16} /> Pengaturan Tipografi Dokumen
        </h3>
        <div className="form-grid-3">
          <div>
            <label style={{ fontSize: '0.85rem' }}>Jenis Huruf (Font)</label>
            <select value={data.fontFamily || 'Poppins'} onChange={(e) => onChange('fontFamily', e.target.value)}>
              <option value="Poppins">Poppins</option>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Verdana">Verdana</option>
              <option value="Tahoma">Tahoma</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.85rem' }}>Ukuran Huruf</label>
            <select value={data.fontSize || '11pt'} onChange={(e) => onChange('fontSize', e.target.value)}>
              <option value="10pt">10 pt</option>
              <option value="11pt">11 pt</option>
              <option value="12pt">12 pt</option>
              <option value="13pt">13 pt</option>
              <option value="14pt">14 pt</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.85rem' }}>Jarak Baris (Spasi)</label>
            <select value={data.lineSpacing || '1.5'} onChange={(e) => onChange('lineSpacing', e.target.value)}>
              <option value="1">1.0 (Rapat)</option>
              <option value="1.15">1.15 (Proporsional)</option>
              <option value="1.5">1.5 (Standar RPP)</option>
              <option value="2">2.0 (Ganda)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Identitas */}
      <div className="form-grid-2">
        <div className="form-group">
          <label>Identitas Penyusun (Nama Guru)</label>
          <input 
            type="text" 
            value={data.penyusun || ''} 
            onChange={(e) => onChange('penyusun', e.target.value)}
            placeholder="Contoh: Rio Refki Maulana, S.Pd."
          />
        </div>
        
        <div className="form-group">
          <label>Satuan Pendidikan (Sekolah / Instansi)</label>
          <input 
            type="text" 
            value={data.instansi || ''} 
            onChange={(e) => onChange('instansi', e.target.value)}
            placeholder="Contoh: SMA Negeri 1 Banten"
          />
        </div>

        <div className="form-group">
          <label>Mata Pelajaran</label>
          <input 
            type="text" 
            value={data.mataPelajaran || ''} 
            onChange={(e) => onChange('mataPelajaran', e.target.value)}
            placeholder="Contoh: Biologi / IPA"
          />
        </div>

        <div className="form-group">
          <label>Kelas / Fase</label>
          <input 
            type="text" 
            value={data.faseKelas || ''} 
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
            placeholder="Contoh: Genap (2)"
          />
        </div>

        <div className="form-group">
          <label>Materi Pokok</label>
          <input 
            type="text" 
            value={data.materiAjar || ''} 
            onChange={(e) => onChange('materiAjar', e.target.value)}
            placeholder="Contoh: Sistem Sirkulasi dan Peredaran Darah"
          />
        </div>

        <div className="form-group">
          <label>Bab / Subbab</label>
          <input 
            type="text" 
            value={data.babSubbab || ''} 
            onChange={(e) => onChange('babSubbab', e.target.value)}
            placeholder="Contoh: Bab 4 / Subbab 4.2 Struktur Jantung & Pembuluh Darah"
          />
        </div>

        <div className="form-group">
          <label>Alokasi Waktu</label>
          <input 
            type="text" 
            value={data.alokasiWaktu || ''} 
            onChange={(e) => onChange('alokasiWaktu', e.target.value)}
            placeholder="Contoh: 2 x 45 Menit (1 Pertemuan / 2 JP)"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionIdentitas;
