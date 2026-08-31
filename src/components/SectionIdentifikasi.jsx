import React from 'react';
import Editor from './Editor';
import { UserCheck, Sparkles, Compass } from 'lucide-react';

const SectionIdentifikasi = ({ data, onChange, topic, fase }) => {
  const dimensiLulusanOptions = [
    "Keimanan & Ketakwaan terhadap Tuhan YME",
    "Kewarganegaraan & Kebangsaan Global",
    "Penalaran Kritis & Pemecahan Masalah",
    "Kreativitas & Inovasi",
    "Kolaborasi & Gotong Royong",
    "Kemandirian & Regulasi Diri",
    "Komunikasi Efektif",
    "Karakter Moral & Integritas"
  ];

  const handleProfilToggle = (option) => {
    const current = data.profilLulusan || [];
    if (current.includes(option)) {
      onChange('profilLulusan', current.filter(item => item !== option));
    } else {
      onChange('profilLulusan', [...current, option]);
    }
  };

  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <span className="badge-step">2</span>
          <h2>2. IDENTIFIKASI PEMBELAJARAN</h2>
        </div>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Profil lulusan, prasyarat kompetensi awal, dan pemetaan diferensiasi belajar siswa.
        </p>
      </div>

      {/* 2.1 Profil Lulusan */}
      <div className="form-group mb-6 profil-lulusan-card">
        <div className="flex items-center gap-2 mb-2">
          <UserCheck size={18} color="#2563EB" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            A. Profil Lulusan (Dimensi Karakter & Kompetensi)
          </label>
        </div>
        <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
          Pilih dimensi profil lulusan yang dikembangkan pada modul ini:
        </p>
        <div className="flex" style={{ flexWrap: 'wrap', gap: '0.45rem' }}>
          {dimensiLulusanOptions.map((opt, idx) => {
            const isActive = (data.profilLulusan || []).includes(opt);
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

      {/* 2.2 Kompetensi Awal */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={18} color="#7C3AED" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            B. Kompetensi Awal
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Prasyarat pengetahuan atau keterampilan yang dimiliki siswa sebelum pembelajaran.
        </p>
        <Editor 
          value={data.kompetensiAwal || ''} 
          onChange={(val) => onChange('kompetensiAwal', val)} 
          topic={topic}
          fase={fase}
          placeholder="Uraikan kompetensi prasyarat siswa..."
        />
      </div>

      {/* 2.3 Pemetaan Kebutuhan Pembelajaran */}
      <div className="form-group">
        <div className="flex items-center gap-2 mb-2">
          <Compass size={18} color="#059669" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
            C. Pemetaan Kebutuhan Pembelajaran (Diferensiasi)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Pemetaan kesiapan belajar, minat, dan gaya/profil belajar siswa.
        </p>
        <Editor 
          value={data.pemetaanKebutuhan || ''} 
          onChange={(val) => onChange('pemetaanKebutuhan', val)} 
          topic={topic}
          fase={fase}
          placeholder="Tuliskan rancangan diferensiasi kesiapan, minat, dan profil belajar..."
        />
      </div>
    </div>
  );
};

export default SectionIdentifikasi;
