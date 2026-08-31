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
          <h2>IDENTIFIKASI PEMBELAJARAN (DEEP LEARNING)</h2>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Petakan profil lulusan yang disasar, prasyarat kompetensi awal, dan kebutuhan belajar peserta didik.
        </p>
      </div>

      {/* 2.1 Profil Lulusan */}
      <div className="form-group mb-6 card" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
        <div className="flex items-center gap-2 mb-2">
          <UserCheck size={18} color="#2563EB" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: '#1E293B' }}>
            A. Profil Lulusan (Dimensi Karakter & Kompetensi)
          </label>
        </div>
        <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
          Pilih dimensi profil lulusan yang dikembangkan dalam modul pembelajaran ini:
        </p>
        <div className="flex" style={{ flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          {dimensiLulusanOptions.map((opt, idx) => {
            const isActive = (data.profilLulusan || []).includes(opt);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleProfilToggle(opt)}
                className={`profil-pill ${isActive ? 'active' : ''}`}
                style={{ fontSize: '0.85rem' }}
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
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: 'var(--navy-light)' }}>
            B. Kompetensi Awal (Prasyarat Pengetahuan/Keterampilan)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Tuliskan pengetahuan atau keterampilan yang harus sudah dimiliki murid sebelum mempelajari materi ini.
        </p>
        <Editor 
          value={data.kompetensiAwal || ''} 
          onChange={(val) => onChange('kompetensiAwal', val)} 
          topic={topic}
          fase={fase}
          placeholder="Contoh: Peserta didik telah memahami konsep dasar organ tubuh manusia dan fungsi umumnya..."
        />
      </div>

      {/* 2.3 Pemetaan Kebutuhan Pembelajaran */}
      <div className="form-group">
        <div className="flex items-center gap-2 mb-2">
          <Compass size={18} color="#059669" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: 'var(--navy-light)' }}>
            C. Pemetaan Kebutuhan Pembelajaran (Diferensiasi)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Petakan kesiapan belajar, minat, dan profil belajar murid (Visual, Auditori, Kinestetik) untuk memfasilitasi diferensiasi pembelajaran mendalam.
        </p>
        <Editor 
          value={data.pemetaanKebutuhan || ''} 
          onChange={(val) => onChange('pemetaanKebutuhan', val)} 
          topic={topic}
          fase={fase}
          placeholder="Contoh: <ul><li><strong>Kesiapan Belajar:</strong> Dikelompokkan berdasarkan pemahaman awal konsep.</li><li><strong>Minat:</strong> Diberi kebebasan memilih media presentasi produk.</li><li><strong>Profil Belajar:</strong> Disediakan modul teks, video interaktif, dan alat peraga manipulatif.</li></ul>"
        />
      </div>
    </div>
  );
};

export default SectionIdentifikasi;
