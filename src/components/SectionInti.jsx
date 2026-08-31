import React from 'react';
import Editor from './Editor';

const SectionInti = ({ data, onChange, topic, fase }) => {
  const profilOptions = [
    "Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia",
    "Berkebinekaan Global",
    "Bergotong Royong",
    "Mandiri",
    "Bernalar Kritis",
    "Kreatif"
  ];

  const handleProfilToggle = (option) => {
    const current = data.profilPancasila || [];
    if (current.includes(option)) {
      onChange('profilPancasila', current.filter(item => item !== option));
    } else {
      onChange('profilPancasila', [...current, option]);
    }
  };

  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <h2>Bagian 2: Komponen Inti</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Definisikan tujuan, capaian, dan pemahaman bermakna untuk peserta didik.</p>
      </div>

      <div className="form-group mb-6">
        <label>Profil Pelajar Pancasila</label>
        <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>Klik untuk memilih satu atau lebih profil pelajar yang sesuai:</p>
        <div className="flex" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
          {profilOptions.map((opt, idx) => {
            const isActive = (data.profilPancasila || []).includes(opt);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleProfilToggle(opt)}
                className={`profil-pill ${isActive ? 'active' : ''}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div className="form-group">
        <label>Model Pembelajaran</label>
        <Editor 
          value={data.modelPembelajaran} 
          onChange={(val) => onChange('modelPembelajaran', val)} 
          topic={topic} fase={fase}
        />
      </div>

      <div className="form-group">
        <label>Metode Pembelajaran</label>
        <Editor 
          value={data.metodePembelajaran} 
          onChange={(val) => onChange('metodePembelajaran', val)} 
          topic={topic} fase={fase}
        />
      </div>

      <div className="form-group">
        <label>Media, Sarana dan Prasarana</label>
        <Editor 
          value={data.mediaSaranaPrasarana} 
          onChange={(val) => onChange('mediaSaranaPrasarana', val)} 
          topic={topic} fase={fase}
        />
      </div>

      <div className="form-group">
        <label>Capaian Pembelajaran</label>
        <Editor 
          value={data.capaianPembelajaran} 
          onChange={(val) => onChange('capaianPembelajaran', val)} 
          topic={topic}
          fase={fase}
        />
      </div>

      <div className="form-group">
        <label>Tujuan Pembelajaran</label>
        <Editor 
          value={data.tujuanPembelajaran} 
          onChange={(val) => onChange('tujuanPembelajaran', val)} 
          topic={topic}
          fase={fase}
        />
      </div>

      <div className="form-group">
        <label>Pemahaman Bermakna</label>
        <Editor 
          value={data.pemahamanBermakna} 
          onChange={(val) => onChange('pemahamanBermakna', val)} 
          topic={topic}
          fase={fase}
        />
      </div>

      <div className="form-group">
        <label>Pertanyaan Pemantik</label>
        <Editor 
          value={data.pertanyaanPemantik} 
          onChange={(val) => onChange('pertanyaanPemantik', val)} 
          topic={topic}
          fase={fase}
        />
      </div>
    </div>
  );
};

export default SectionInti;
