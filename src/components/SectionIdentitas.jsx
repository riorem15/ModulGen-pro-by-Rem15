import React from 'react';
import { Settings, Sparkles, BookOpen, Layers } from 'lucide-react';

const SectionIdentitas = ({ data, onChange, formatType, onFormatChange }) => {
  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <span className="badge-step">1</span>
          <h2>1. IDENTITAS MODUL</h2>
        </div>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Informasi identitas kurikulum dan konfigurasi format dokumen.
        </p>
      </div>

      {/* Format Selector Card */}
      {onFormatChange && (
        <div id="tour-format-selector" className="format-selection-card mb-5">
          <label className="format-selection-label">
            <Layers size={15} /> Format Modul Ajar:
          </label>
          <div className="format-selection-grid">
            <button
              type="button"
              className={`format-choice-card ${formatType === 'deep_learning' ? 'active-dl' : ''}`}
              onClick={() => onFormatChange('deep_learning')}
            >
              <div className="format-choice-icon">
                <Sparkles size={18} />
              </div>
              <div className="format-choice-info">
                <div className="format-choice-title">Modul Deep Learning</div>
                <div className="format-choice-desc">10 Kerangka (Mindful, Meaningful, Joyful)</div>
              </div>
            </button>

            <button
              type="button"
              className={`format-choice-card ${formatType === 'standar' ? 'active-std' : ''}`}
              onClick={() => onFormatChange('standar')}
            >
              <div className="format-choice-icon">
                <BookOpen size={18} />
              </div>
              <div className="format-choice-info">
                <div className="format-choice-title">Standar Merdeka</div>
                <div className="format-choice-desc">Format Ringkas Komponen Inti</div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Pengaturan Font Dokumen */}
      <div className="form-group mb-6 typography-card">
        <h3 className="typography-title">
          <Settings size={15} /> Pengaturan Tipografi Dokumen
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

      {/* Grid Identitas - Clean Professional Placeholders */}
      <div className="form-grid-2">
        <div className="form-group">
          <label>Identitas Penyusun (Nama Guru)</label>
          <input 
            type="text" 
            value={data.penyusun || ''} 
            onChange={(e) => onChange('penyusun', e.target.value)}
            placeholder="Nama lengkap dan gelar guru"
          />
        </div>
        
        <div className="form-group">
          <label>Satuan Pendidikan (Sekolah / Instansi)</label>
          <input 
            type="text" 
            value={data.instansi || ''} 
            onChange={(e) => onChange('instansi', e.target.value)}
            placeholder="Nama sekolah / instansi"
          />
        </div>

        <div className="form-group">
          <label>Mata Pelajaran</label>
          <input 
            type="text" 
            value={data.mataPelajaran || ''} 
            onChange={(e) => onChange('mataPelajaran', e.target.value)}
            placeholder="Mata pelajaran"
          />
        </div>

        <div className="form-group">
          <label>Kelas / Fase</label>
          <input 
            type="text" 
            value={data.faseKelas || ''} 
            onChange={(e) => onChange('faseKelas', e.target.value)}
            placeholder="Fase dan tingkat kelas"
          />
        </div>

        <div className="form-group">
          <label>Semester</label>
          <input 
            type="text" 
            value={data.semester || ''} 
            onChange={(e) => onChange('semester', e.target.value)}
            placeholder="Semester (Ganjil / Genap)"
          />
        </div>

        <div className="form-group">
          <label>Materi Pokok</label>
          <input 
            type="text" 
            value={data.materiAjar || ''} 
            onChange={(e) => onChange('materiAjar', e.target.value)}
            placeholder="Topik materi pokok pembelajaran"
          />
        </div>

        <div className="form-group">
          <label>Bab / Subbab</label>
          <input 
            type="text" 
            value={data.babSubbab || ''} 
            onChange={(e) => onChange('babSubbab', e.target.value)}
            placeholder="Bab dan subbab materi"
          />
        </div>

        <div className="form-group">
          <label>Alokasi Waktu</label>
          <input 
            type="text" 
            value={data.alokasiWaktu || ''} 
            onChange={(e) => onChange('alokasiWaktu', e.target.value)}
            placeholder="Jumlah JP / Alokasi waktu"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionIdentitas;
