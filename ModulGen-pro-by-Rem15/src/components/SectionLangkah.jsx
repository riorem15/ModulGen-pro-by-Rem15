import React from 'react';
import Editor from './Editor';

const SectionLangkah = ({ data, onChange }) => {
  const handleChange = (phase, field, value) => {
    onChange(phase, {
      ...data[phase],
      [field]: value
    });
  };

  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <h2>Bagian 3: Langkah Pembelajaran</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Jabarkan kegiatan pembelajaran dari awal hingga akhir beserta durasinya.</p>
      </div>

      <div className="card shadow-sm mb-4" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="flex justify-between items-center mb-2">
          <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-light)' }}>1. Pendahuluan</h3>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Durasi (Menit):</label>
            <input 
              type="number" 
              style={{ width: '80px', padding: '0.25rem 0.5rem' }} 
              value={data.pendahuluan.durasi} 
              onChange={(e) => handleChange('pendahuluan', 'durasi', e.target.value)}
              placeholder="15"
            />
          </div>
        </div>
        <Editor 
          value={data.pendahuluan.kegiatan} 
          onChange={(val) => handleChange('pendahuluan', 'kegiatan', val)} 
        />
      </div>

      <div className="card shadow-sm mb-4" style={{ backgroundColor: '#F0FDF4' }}>
        <div className="flex justify-between items-center mb-2">
          <h3 style={{ fontSize: '1.1rem', color: 'var(--success)' }}>2. Kegiatan Inti</h3>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium" style={{ color: 'var(--success)' }}>Durasi (Menit):</label>
            <input 
              type="number" 
              style={{ width: '80px', padding: '0.25rem 0.5rem', borderColor: '#86efac' }} 
              value={data.inti.durasi} 
              onChange={(e) => handleChange('inti', 'durasi', e.target.value)}
              placeholder="60"
            />
          </div>
        </div>
        <Editor 
          value={data.inti.kegiatan} 
          onChange={(val) => handleChange('inti', 'kegiatan', val)} 
        />
      </div>

      <div className="card shadow-sm" style={{ backgroundColor: '#FFF7ED' }}>
        <div className="flex justify-between items-center mb-2">
          <h3 style={{ fontSize: '1.1rem', color: '#EA580C' }}>3. Penutup</h3>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium" style={{ color: '#EA580C' }}>Durasi (Menit):</label>
            <input 
              type="number" 
              style={{ width: '80px', padding: '0.25rem 0.5rem', borderColor: '#fdba74' }} 
              value={data.penutup.durasi} 
              onChange={(e) => handleChange('penutup', 'durasi', e.target.value)}
              placeholder="15"
            />
          </div>
        </div>
        <Editor 
          value={data.penutup.kegiatan} 
          onChange={(val) => handleChange('penutup', 'kegiatan', val)} 
        />
      </div>
    </div>
  );
};

export default SectionLangkah;
