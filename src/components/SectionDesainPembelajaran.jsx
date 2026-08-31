import React from 'react';
import Editor from './Editor';
import { Target, CheckCircle2, Award, ListFilter } from 'lucide-react';

const SectionDesainPembelajaran = ({ data, onChange, topic, fase }) => {
  return (
    <div className="section-container animate-fade-in">
      <div className="section-header">
        <div className="flex items-center gap-2">
          <span className="badge-step">3</span>
          <h2>DESAIN PEMBELAJARAN (DEEP LEARNING)</h2>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Rancang capaian, tujuan pembelajaran mendalam, indikator KKTP, dan kategori ketercapaian siswa.
        </p>
      </div>

      {/* 3.1 Capaian Pembelajaran (CP) */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Target size={18} color="#2563EB" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: 'var(--navy-light)' }}>
            A. Capaian Pembelajaran (CP)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Rumusan kompetensi akhir fase/elemen yang ditargetkan pada pembelajaran ini.
        </p>
        <Editor 
          value={data.capaianPembelajaran || ''} 
          onChange={(val) => onChange('capaianPembelajaran', val)} 
          topic={topic}
          fase={fase}
          placeholder="Tuliskan Capaian Pembelajaran resmi atau hasil analisis fase di sini..."
        />
      </div>

      {/* 3.2 Tujuan Pembelajaran (TP) */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 size={18} color="#059669" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: 'var(--navy-light)' }}>
            B. Tujuan Pembelajaran (TP)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Tujuan pembelajaran spesifik (memuat kompetensi kognitif tingkat tinggi, afektif, dan psikomotorik/aplikasi).
        </p>
        <Editor 
          value={data.tujuanPembelajaran || ''} 
          onChange={(val) => onChange('tujuanPembelajaran', val)} 
          topic={topic}
          fase={fase}
          placeholder="Contoh: <ol><li>Peserta didik mampu menganalisis keterkaitan antara struktur organ dan fungsinya melalui penyelidikan ilmiah.</li><li>Peserta didik mampu merancang solusi gaya hidup sehat berbasis data.</li></ol>"
        />
      </div>

      {/* 3.3 KKTP (Kriteria Ketercapaian Tujuan Pembelajaran) */}
      <div className="form-group mb-6">
        <div className="flex items-center gap-2 mb-2">
          <ListFilter size={18} color="#D97706" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: 'var(--navy-light)' }}>
            C. Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Indikator ketercapaian tujuan pembelajaran (deskripsi kriteria kinerja bukti pemahaman siswa).
        </p>
        <Editor 
          value={data.kktp || ''} 
          onChange={(val) => onChange('kktp', val)} 
          topic={topic}
          fase={fase}
          placeholder="Contoh: <ol><li>Mampu mengidentifikasi minimal 4 organ utama dengan tepat.</li><li>Mampu menjelaskan mekanisme proses secara runtut dan logis.</li><li>Mampu menghubungkan gangguan kesehatan dengan faktor penyebabnya.</li></ol>"
        />
      </div>

      {/* 3.4 Kategori Ketercapaian */}
      <div className="form-group">
        <div className="flex items-center gap-2 mb-2">
          <Award size={18} color="#7C3AED" />
          <label style={{ margin: 0, fontWeight: 600, fontSize: '1.05rem', color: 'var(--navy-light)' }}>
            D. Kategori Ketercapaian (Interval / Rubrik Kualitatif)
          </label>
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Kategori rentang ketercapaian (misal: Perlu Bimbingan [0-60%], Cukup [61-70%], Baik [71-85%], Sangat Baik / Mahir [86-100%]) beserta tindak lanjutnya.
        </p>
        <Editor 
          value={data.kategoriKetercapaian || ''} 
          onChange={(val) => onChange('kategoriKetercapaian', val)} 
          topic={topic}
          fase={fase}
          placeholder="Contoh: <table style='width:100%; border-collapse: collapse;'><thead><tr style='background:#f1f5f9;'><th>Kategori</th><th>Interval</th><th>Deskripsi Kinerja</th><th>Tindak Lanjut</th></tr></thead><tbody><tr><td>Perlu Bimbingan</td><td>0 - 65%</td><td>Belum mencapai ketuntasan minimal</td><td>Remedial terbimbing</td></tr><tr><td>Cukup</td><td>66 - 75%</td><td>Mencapai sebagian besar kriteria</td><td>Penguatan mandiri</td></tr><tr><td>Baik</td><td>76 - 88%</td><td>Mencapai seluruh kriteria dengan tepat</td><td>Tugas pengembangan</td></tr><tr><td>Sangat Baik</td><td>89 - 100%</td><td>Menguasai secara mendalam & aplikatif</td><td>Pengayaan / Tutor sebaya</td></tr></tbody></table>"
        />
      </div>
    </div>
  );
};

export default SectionDesainPembelajaran;
