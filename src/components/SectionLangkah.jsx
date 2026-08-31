import React from 'react';
import Editor from './Editor';
import { PlayCircle, Award, CheckCircle2, Clock } from 'lucide-react';

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
        <div className="flex items-center gap-2">
          <span className="badge-step">10</span>
          <h2>LANGKAH-LANGKAH PEMBELAJARAN (DEEP LEARNING)</h2>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Susun skenario kegiatan pembelajaran yang mengintegrasikan pilar <em>Mindful</em>, <em>Meaningful</em>, dan <em>Joyful</em> dalam alur pendahuluan, inti, dan penutup.
        </p>
      </div>

      {/* 1. Pendahuluan */}
      <div className="card shadow-sm mb-5" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
        <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <PlayCircle size={20} color="#2563EB" />
            <h3 style={{ fontSize: '1.1rem', color: '#1E293B', margin: 0 }}>
              1. Kegiatan Pendahuluan (Mindful & Orientasi Pemantik)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} color="#64748B" />
            <label className="text-sm font-medium" style={{ margin: 0 }}>Durasi:</label>
            <div className="flex items-center gap-1">
              <input 
                type="number" 
                style={{ width: '70px', padding: '0.25rem 0.5rem', textAlign: 'center' }} 
                value={data.pendahuluan.durasi || '15'} 
                onChange={(e) => handleChange('pendahuluan', 'durasi', e.target.value)}
                placeholder="15"
              />
              <span className="text-sm text-muted">Menit</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted mb-2">
          💡 <em>Tips Deep Learning:</em> Sertakan salam hangat, doa & hening sadar (Mindful check-in), presensi, apersepsi kontekstual, penyampaian tujuan pembelajaran, dan pertanyaan pemantik awal.
        </p>
        <Editor 
          value={data.pendahuluan.kegiatan || ''} 
          onChange={(val) => handleChange('pendahuluan', 'kegiatan', val)} 
          placeholder="<ol><li>Guru membuka pembelajaran dengan salam hangat dan mengajak siswa hening sejenak (Mindful Breathing) untuk memfokuskan pikiran.</li><li>Guru menanyakan kesiapan dan perasaan siswa hari ini (Check-in Emosi).</li><li>Guru memberikan apersepsi kontekstual dengan menampilkan gambar/video singkat terkait materi.</li><li>Guru menyampaikan tujuan pembelajaran dan memantik rasa ingin tahu murid melalui pertanyaan esensial.</li></ol>"
        />
      </div>

      {/* 2. Kegiatan Inti */}
      <div className="card shadow-sm mb-5" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
        <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Award size={20} color="#059669" />
            <h3 style={{ fontSize: '1.1rem', color: '#065F46', margin: 0 }}>
              2. Kegiatan Inti (Sintaks Deep Learning: Memahami, Mengaplikasi, Merefleksi)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} color="#059669" />
            <label className="text-sm font-medium" style={{ color: '#065F46', margin: 0 }}>Durasi:</label>
            <div className="flex items-center gap-1">
              <input 
                type="number" 
                style={{ width: '70px', padding: '0.25rem 0.5rem', borderColor: '#86EFAC', textAlign: 'center' }} 
                value={data.inti.durasi || '60'} 
                onChange={(e) => handleChange('inti', 'durasi', e.target.value)}
                placeholder="60"
              />
              <span className="text-sm text-muted">Menit</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted mb-2">
          💡 <em>Tips Deep Learning:</em> Alur aktivitas mendalam berorientasi pada pemahaman konsep (Meaningful), kolaborasi kelompok berdiferensiasi, eksplorasi penyelidikan aktif, dan unjuk kreasi yang menyenangkan (Joyful).
        </p>
        <Editor 
          value={data.inti.kegiatan || ''} 
          onChange={(val) => handleChange('inti', 'kegiatan', val)} 
          placeholder="<ol><li><strong>Fase 1 (Orientasi Masalah):</strong> Siswa mencermati kasus nyata yang disajikan oleh guru.</li><li><strong>Fase 2 (Penyelidikan Kolaboratif):</strong> Siswa bekerja dalam kelompok kecil berbasis diferensiasi minat untuk menganalisis data menggunakan LKPD.</li><li><strong>Fase 3 (Pengembangan Karya):</strong> Setiap kelompok merumuskan solusi dan membuat media presentasi kreatif.</li><li><strong>Fase 4 (Presentasi & Joyful Sharing):</strong> Sesi Gallery Walk di mana kelompok saling berkunjung, memberikan apresiasi stiker bintang, dan umpan balik konstruktif.</li></ol>"
        />
      </div>

      {/* 3. Kegiatan Penutup */}
      <div className="card shadow-sm" style={{ backgroundColor: '#FFF7ED', border: '1px solid #FED7AA' }}>
        <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={20} color="#EA580C" />
            <h3 style={{ fontSize: '1.1rem', color: '#9A3412', margin: 0 }}>
              3. Kegiatan Penutup (Refleksi Bermakna, Apresiasi & Tindak Lanjut)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} color="#EA580C" />
            <label className="text-sm font-medium" style={{ color: '#9A3412', margin: 0 }}>Durasi:</label>
            <div className="flex items-center gap-1">
              <input 
                type="number" 
                style={{ width: '70px', padding: '0.25rem 0.5rem', borderColor: '#FDBA74', textAlign: 'center' }} 
                value={data.penutup.durasi || '15'} 
                onChange={(e) => handleChange('penutup', 'durasi', e.target.value)}
                placeholder="15"
              />
              <span className="text-sm text-muted">Menit</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted mb-2">
          💡 <em>Tips Deep Learning:</em> Ajak siswa merefleksikan proses belajar (metakognisi), merangkum kesimpulan bersama, memberikan apresiasi atas keterlibatan seluruh murid, dan menyampaikan rencana pertemuan berikutnya.
        </p>
        <Editor 
          value={data.penutup.kegiatan || ''} 
          onChange={(val) => handleChange('penutup', 'kegiatan', val)} 
          placeholder="<ol><li>Siswa bersama guru menyimpulkan poin kunci pembelajaran hari ini.</li><li>Siswa mengisi lembar refleksi singkat (3-2-1: 3 hal baru yang dipahami, 2 hal menarik, 1 pertanyaan yang masih muncul).</li><li>Guru memberikan apresiasi atas dedikasi dan kerja sama positif seluruh siswa.</li><li>Guru menyampaikan topik pembelajaran untuk pertemuan berikutnya serta menutup kelas dengan doa bersama.</li></ol>"
        />
      </div>
    </div>
  );
};

export default SectionLangkah;
