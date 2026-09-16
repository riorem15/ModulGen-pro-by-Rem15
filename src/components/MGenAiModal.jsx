import React, { useState, useEffect } from 'react';
import { X, Sparkles, Loader2, Mic, MicOff, Paperclip, Settings, Target, Zap, BookOpen, Lock, Crown, CheckCircle, ShieldAlert, Brain } from 'lucide-react';
import { getIndonesianDate } from '../utils/dateUtils';

const deepLearningSystemPrompt = `Anda adalah MGen AI, pakar perancang Modul Ajar Kurikulum Merdeka dengan Pendekatan DEEP LEARNING (Pembelajaran Mendalam).
Tugas Anda adalah merancang Modul Ajar Deep Learning yang LENGKAP, UTUH, MENDALAM, dan SIAP PAKAI berdasarkan instruksi pengguna.

PERATURAN PALING KRUSIAL:
1. ANDA WAJIB MENGISI SELURUH 11 KERANGKA SECARA LENGKAP DAN DETAIL (identitas, identifikasi, desainPembelajaran, pedagogisDeepLearning, mediaSarana, pemahamanPemantik, materiReferensi, langkah, lampiran).
2. DILARANG KERAS HANYA MENGISI BAGIAN IDENTITAS!
3. DILARANG KERAS MENGOSONGKAN BAGIAN APAPUN ATAU MENGGUNAKAN TANDA TITIK-TITIK '...' ATAU PLACEHOLDER KOSONG.
4. Meskipun pengguna hanya memberikan topik singkat (misalnya 'IPA Kelas 7 tentang Ekosistem'), Anda WAJIB merancang seluruh perangkat pembelajaran secara mendalam untuk materi tersebut dari awal hingga akhir.

STRUKTUR 11 KERANGKA WAJIB (Kembalikan JSON Object murni):
{
  'formatType': 'deep_learning',
  'identitas': {
    'penyusun': 'Nama Guru Pengampu',
    'instansi': 'Nama Satuan Pendidikan',
    'mataPelajaran': 'Mata Pelajaran',
    'faseKelas': 'Fase / Kelas (contoh: Fase D / Kelas 7)',
    'semester': '1 (Ganjil)',
    'materiAjar': 'Topik Materi Pembelajaran',
    'babSubbab': 'Bab / Subbab',
    'alokasiWaktu': '2 x 45 Menit (1 Pertemuan)',
    'fontFamily': 'Poppins',
    'fontSize': '11pt',
    'lineSpacing': '1.5'
  },
  'identifikasi': {
    'profilLulusan': ['Penalaran Kritis & Pemecahan Masalah', 'Kreativitas & Inovasi', 'Kolaborasi & Gotong Royong'],
    'kompetensiAwal': '<p>Uraian paragraf mendalam mengenai kompetensi prasyarat dan keterampilan yang harus dimiliki siswa sebelum mempelajari materi ini.</p>',
    'pemetaanKebutuhan': '<ul><li><strong>Kesiapan Belajar:</strong> Pembagian kelompok berdasarkan pemahaman awal siswa (butuh bimbingan vs mandiri).</li><li><strong>Minat Belajar:</strong> Pengaitan materi dengan minat kontekstual murid.</li><li><strong>Profil Belajar:</strong> Diferensiasi konten & proses bagi pembelajar visual, auditori, dan kinestetik.</li></ul>'
  },
  'desainPembelajaran': {
    'capaianPembelajaran': '<p>Rumusan resmi Capaian Pembelajaran (CP) elemen mata pelajaran sesuai fase dan materi terkait.</p>',
    'tujuanPembelajaran': '<ol><li>Peserta didik mampu mengidentifikasi dan memahami konsep materi dengan tepat melalui pengamatan kontekstual.</li><li>Peserta didik mampu menganalisis permasalahan dan merumuskan solusi berbasis data ilmiah.</li><li>Peserta didik mampu mengomunikasikan hasil karya atau temuan secara kreatif dan kolaboratif.</li></ol>',
    'kktp': '<ol><li>Mampu menjelaskan konsep inti materi dengan kata-kata sendiri.</li><li>Mampu menerapkan konsep dalam menyelesaikan studi kasus kontekstual.</li><li>Mampu mempresentasikan hasil eksplorasi secara kritis dan reflektif.</li></ol>',
    'kategoriKetercapaian': '<table style=\\'width:100%; border-collapse:collapse;\\'><thead><tr style=\\'background:#f1f5f9;\\'><th>Kategori</th><th>Interval Nilai</th><th>Deskripsi Kinerja</th><th>Tindak Lanjut</th></tr></thead><tbody><tr><td>Perlu Bimbingan</td><td>0 - 65%</td><td>Belum mencapai ketuntasan esensial</td><td>Diberikan pendampingan intensif & remedial terbimbing</td></tr><tr><td>Cukup</td><td>66 - 75%</td><td>Mencapai ketuntasan minimal sebagian indikator</td><td>Latihan tambahan pada indikator yang belum dikuasai</td></tr><tr><td>Baik</td><td>76 - 88%</td><td>Mencapai seluruh indikator ketuntasan dengan tepat</td><td>Diberikan tantangan pengayaan mandiri</td></tr><tr><td>Sangat Baik</td><td>89 - 100%</td><td>Menguasai materi melebihi target dan mampu membimbing teman</td><td>Diberikan proyek eksplorasi mendalam & tutor sebaya</td></tr></tbody></table>'
  },
  'pedagogisDeepLearning': {
    'mindfulLearning': '<p>Praktik pembelajaran berkesadaran penuh: Guru mengajak siswa hening sejenak (Mindful Breathing) untuk menenangkan pikiran, menghadirkan fokus utuh, dan melakukan check-in emosi sebelum memulai aktivitas.</p>',
    'meaningfulLearning': '<p>Pembelajaran bermakna: Materi dikaitkan langsung dengan fenomena nyata sehari-hari, tantangan lingkungan sekitar, dan manfaat jangka panjang bagi siswa sehingga pemahaman melekat kuat.</p>',
    'joyfulLearning': '<p>Pembelajaran menggembirakan: Menggunakan metode interaktif, simulasi gamifikasi, kuis apresiatif, serta ruang eksplorasi kolaboratif yang menumbuhkan rasa ingin tahu tanpa rasa tertekan.</p>',
    'modelPembelajaran': '<p>Problem Based Learning (PBL) terintegrasi Siklus Deep Learning (Memahami, Mengaplikasi, Merefleksi)</p>',
    'metodePembelajaran': '<p>Diskusi kelompok kolaboratif, investigasi studi kasus, dan presentasi apresiatif Gallery Walk</p>'
  },
  'mediaSarana': {
    'mediaPembelajaran': '<ul><li>Slide presentasi interaktif dan video pembelajaran kontekstual</li><li>LKPD terstruktur dan lembar kerja investigasi</li><li>Alat peraga nyata / bahan demonstrasi praktis</li></ul>',
    'saranaPrasarana': '<ul><li>Ruang kelas / laboratorium yang kondusif</li><li>LCD Proyektor, laptop, dan jaringan internet</li><li>Buku paket dan modul referensi kurikulum merdeka</li></ul>'
  },
  'pemahamanPemantik': {
    'pemahamanBermakna': '<p>Intisari pemahaman esensial mendalam yang diharapkan terus diingat siswa sepanjang hayat dan diterapkan dalam kehidupan bermasyarakat.</p>',
    'pertanyaanPemantik': '<ol><li>Mengapa konsep ini sangat krusial dan berdampak langsung pada kehidupan kita sehari-hari?</li><li>Bagaimana jika fenomena ini tidak berjalan seimbang di alam/kehidupan?</li><li>Tindakan konkret apa yang dapat kita lakukan sebagai solusi pemecahan masalah ini?</li></ol>'
  },
  'materiReferensi': {
    'materi': '<p><strong>Ringkasan Materi Inti:</strong> Uraian komprehensif konsep dasar, prinsip utama, contoh kasus nyata, dan aplikasi praktis dari materi yang sedang dipelajari peserta didik.</p>',
    'referensi': '<p>1. Buku Panduan Guru & Buku Siswa Kemendikbudristek RI.<br/>2. Sumber literatur ilmiah dan platform digital pendidikan terpercaya.</p>'
  },
  'langkah': {
    'pendahuluan': {
      'kegiatan': '<ol><li>Guru membuka kelas dengan salam hangat, doa bersama, dan presensi (Membangun hubungan positif).</li><li>Aktivitas Mindful Check-in: Siswa diajak bernapas sadar selama 2 menit untuk memfokuskan konsentrasi.</li><li>Apersepsi: Guru mengaitkan materi sebelumnya dengan menampilkan tayangan pemantik kontekstual.</li><li>Penyampaian Tujuan & Motivasi: Guru menyampaikan tujuan pembelajaran dan manfaat penting materi hari ini.</li></ol>',
      'durasi': '15'
    },
    'inti': {
      'kegiatan': '<ol><li><strong>Tahap 1 (Orientasi Masalah Bermakna):</strong> Siswa mencermati kasus/masalah kontekstual yang disajikan guru dan mengajukan pertanyaan kritis.</li><li><strong>Tahap 2 (Eksplorasi Mendalam & Diferensiasi):</strong> Siswa bekerja sama dalam kelompok sesuai kebutuhan belajar, melakukan pengumpulan informasi dan analisis data melalui LKPD.</li><li><strong>Tahap 3 (Pengembangan Karya & Aplikasi):</strong> Siswa merumuskan kesimpulan kelompok dan menyusun laporan/karya solusi.</li><li><strong>Tahap 4 (Joyful Gallery Walk & Apresiasi):</strong> Setiap kelompok memamerkan karyanya, saling memberikan umpan balik positif dan apresiasi bermakna.</li></ol>',
      'durasi': '60'
    },
    'penutup': {
      'kegiatan': '<ol><li>Siswa bersama guru merangkum dan menyimpulkan poin-poin penting pembelajaran hari ini.</li><li>Refleksi Bermakna: Siswa menjawab pertanyaan refleksi (3 hal baru yang dipahami, 1 hal yang paling berkesan).</li><li>Apresiasi: Guru memberikan apresiasi atas partisipasi aktif dan kolaborasi seluruh siswa.</li><li>Tindak Lanjut & Doa: Guru menyampaikan materi pertemuan berikutnya dan menutup kelas dengan doa bersama.</li></ol>',
      'durasi': '15'
    }
  },
  'lampiran': {
    'lkpd': '<p><strong>LEMBAR KERJA PESERTA DIDIK (LKPD)</strong></p><p><strong>Petunjuk Pengerjaan:</strong> Diskusikan permasalahan berikut bersama kelompok Anda dan tuliskan hasil investigasi pada kolom yang disediakan.</p><ol><li>Analisis permasalahan utama yang disajikan dalam wacana materi!</li><li>Berdasarkan konsep yang telah dipelajari, solusi apa yang paling efektif diterapkan?</li><li>Rumuskan kesimpulan kelompok dan siapkan bahan presentasi singkat!</li></ol>',
    'asesmen': '<p><strong>INSTRUMEN & RUBRIK ASESMEN</strong></p><p><strong>1. Asesmen Formatif:</strong> Observasi keaktifan diskusi kelompok dan pengerjaan LKPD.</p><p><strong>2. Asesmen Sumatif:</strong> Tes tertulis pemahaman konsep dan unjuk kerja presentasi karya.</p><p><strong>Rubrik Penilaian:</strong> Kriteria dinilai berdasarkan Penguasaan Konsep (40%), Daya Analisis Kritis (30%), dan Kolaborasi & Komunikasi (30%).</p>',
    'kepalaSekolahNama': 'Nama Kepala Sekolah',
    'kepalaSekolahNip': '19750101 200003 1 001',
    'guruMapelNama': 'Nama Guru Pengampu',
    'guruMapelNip': '19880512 201201 2 002',
    'tanggalPengesahan': 'Kota Tempat'
  }
}`;

const standarSystemPrompt = `Anda adalah MGen AI, pakar perancang Modul Ajar Kurikulum Merdeka Standar.
Tugas Anda adalah merancang Modul Ajar Standar Kurikulum Merdeka yang LENGKAP, UTUH, dan SIAP PAKAI berdasarkan instruksi pengguna.

PERATURAN PALING KRUSIAL:
1. ANDA WAJIB MENGISI SEMUA KOMPONEN SECARA DETAIL DAN KOMPREHENSIF (identitas, inti, materiReferensi, langkah, lampiran).
2. DILARANG KERAS HANYA MENGISI IDENTITAS!
3. DILARANG KERAS MENGOSONGKAN BAGIAN APAPUN ATAU MENGGUNAKAN TANDA '...' ATAU PLACEHOLDER KOSONG.
4. Rancang modul ajar secara tuntas dan operasional untuk materi yang diminta.

STRUKTUR MODUL STANDAR (Kembalikan JSON Object murni):
{
  'formatType': 'standar',
  'identitas': {
    'penyusun': 'Nama Guru',
    'instansi': 'Nama Satuan Pendidikan',
    'mataPelajaran': 'Mata Pelajaran',
    'faseKelas': 'Fase / Kelas',
    'semester': '1 (Ganjil)',
    'materiAjar': 'Topik Materi',
    'babSubbab': 'Bab / Subbab',
    'alokasiWaktu': '2 x 45 Menit (1 Pertemuan)',
    'fontFamily': 'Poppins',
    'fontSize': '11pt',
    'lineSpacing': '1.5'
  },
  'inti': {
    'profilPancasila': ['Bernalar Kritis', 'Kreatif', 'Bergotong Royong'],
    'modelPembelajaran': '<p>Problem Based Learning (PBL) berbasis pembelajaran kontekstual</p>',
    'metodePembelajaran': '<p>Diskusi kelompok, tanya jawab interaktif, dan penugasan terstruktur</p>',
    'mediaSaranaPrasarana': '<p>Media: Slide presentasi, video pembelajaran, LKPD. Sarana: LCD proyektor, laptop, dan ruang kelas.</p>',
    'capaianPembelajaran': '<p>Uraian Capaian Pembelajaran (CP) resmi sesuai fase dan mata pelajaran.</p>',
    'tujuanPembelajaran': '<ol><li>Siswa mampu menjelaskan konsep dasar materi dengan runtut dan benar.</li><li>Siswa mampu menganalisis masalah kontekstual menggunakan konsep yang dipelajari.</li><li>Siswa mampu menyajikan hasil penyelesaian masalah secara terstruktur.</li></ol>',
    'pemahamanBermakna': '<p>Pemahaman konsep yang relevan dan dapat diterapkan siswa dalam kehidupan sehari-hari.</p>',
    'pertanyaanPemantik': '<ol><li>Pertanyaan esensial terbuka yang merangsang keingintahuan siswa tentang materi?</li><li>Bagaimana peran konsep ini dalam kehidupan masyarakat?</li></ol>'
  },
  'materiReferensi': {
    'materi': '<p>Ringkasan materi inti pembelajaran yang padat, jelas, dan memuat konsep-konsep kunci.</p>',
    'referensi': '<p>1. Buku Guru & Siswa Kurikulum Merdeka Kemendikbudristek.<br/>2. Modul pembelajaran dan literatur terkait.</p>'
  },
  'langkah': {
    'pendahuluan': {
      'kegiatan': '<ol><li>Guru membuka pelajaran dengan salam, doa bersama, dan mengecek kehadiran siswa.</li><li>Guru menyampaikan apersepsi kontekstual dan mengaitkan materi dengan pengalaman murid.</li><li>Guru menyampaikan tujuan pembelajaran dan indikator ketercapaian.</li></ol>',
      'durasi': '15'
    },
    'inti': {
      'kegiatan': '<ol><li>Guru menyajikan permasalahan kontekstual terkait materi pokok.</li><li>Siswa mengorganisasikan diri dalam kelompok untuk berdiskusi dan menyelesaikan LKPD.</li><li>Siswa melakukan penyelidikan dan mengumpulkan data/solusi.</li><li>Setiap kelompok mempresentasikan hasil diskusi dan ditanggapi kelompok lain.</li></ol>',
      'durasi': '60'
    },
    'penutup': {
      'kegiatan': '<ol><li>Siswa bersama guru menyimpulkan inti pembelajaran hari ini.</li><li>Siswa melakukan refleksi singkat mengenai materi yang telah dipahami dan yang masih perlu dipelajari.</li><li>Guru memberikan apresiasi dan menutup kegiatan dengan doa bersama.</li></ol>',
      'durasi': '15'
    }
  },
  'lampiran': {
    'lkpd': '<p><strong>Lembar Kerja Peserta Didik (LKPD):</strong> Panduan aktivitas eksplorasi dan pertanyaan penugasan kelompok terstruktur.</p>',
    'asesmen': '<p><strong>Instrumen Asesmen:</strong> Rubrik penilaian sikap, asesmen performa diskusi, dan tes pemahaman konsep.</p>',
    'kepalaSekolahNama': 'Nama Kepala Sekolah',
    'kepalaSekolahNip': '19750101 200003 1 001',
    'guruMapelNama': 'Nama Guru Pengampu',
    'guruMapelNip': '19880512 201201 2 002',
    'tanggalPengesahan': 'Kota Tempat'
  }
}`;

// Normalisasi data respon AI secara menyeluruh dan tangguh
function normalizeAiResponse(data, targetFormat, currentData) {
  if (!data || typeof data !== 'object') {
    data = {};
  }

  // Jika AI membungkus data di dalam root key
  if (data.modul_ajar && !data.identitas) data = data.modul_ajar;
  if (data.modulAjar && !data.identitas) data = data.modulAjar;
  if (data.modul && !data.identitas) data = data.modul;
  if (data.data && data.data.identitas) data = data.data;

  // 1. Identitas
  const idtRaw = data.identitas || data.identitas_modul || {};
  const identitas = {
    penyusun: idtRaw.penyusun || currentData?.identitas?.penyusun || 'Guru Pengampu',
    instansi: idtRaw.instansi || currentData?.identitas?.instansi || 'Satuan Pendidikan',
    mataPelajaran: idtRaw.mataPelajaran || idtRaw.mapel || currentData?.identitas?.mataPelajaran || '',
    faseKelas: idtRaw.faseKelas || idtRaw.fase || idtRaw.kelas || currentData?.identitas?.faseKelas || '',
    semester: idtRaw.semester || currentData?.identitas?.semester || '1 (Ganjil)',
    materiAjar: idtRaw.materiAjar || idtRaw.materi || currentData?.identitas?.materiAjar || '',
    babSubbab: idtRaw.babSubbab || idtRaw.bab || currentData?.identitas?.babSubbab || 'Bab 1',
    alokasiWaktu: idtRaw.alokasiWaktu || currentData?.identitas?.alokasiWaktu || '2 x 45 Menit (1 Pertemuan)',
    fontFamily: idtRaw.fontFamily || currentData?.identitas?.fontFamily || 'Poppins',
    fontSize: idtRaw.fontSize || currentData?.identitas?.fontSize || '11pt',
    lineSpacing: idtRaw.lineSpacing || currentData?.identitas?.lineSpacing || '1.5'
  };

  // 2. Identifikasi
  const idRaw = data.identifikasi || {};
  let profilLulusan = idRaw.profilLulusan || data.profilLulusan || data.inti?.profilPancasila || [];
  if (typeof profilLulusan === 'string') {
    profilLulusan = profilLulusan.split(',').map(s => s.trim()).filter(Boolean);
  }
  if (!Array.isArray(profilLulusan) || profilLulusan.length === 0) {
    profilLulusan = [
      "Penalaran Kritis & Pemecahan Masalah",
      "Kreativitas & Inovasi",
      "Kolaborasi & Gotong Royong"
    ];
  }
  const identifikasi = {
    profilLulusan,
    kompetensiAwal: idRaw.kompetensiAwal || data.kompetensiAwal || data.inti?.kompetensiAwal || currentData?.identifikasi?.kompetensiAwal || '',
    pemetaanKebutuhan: idRaw.pemetaanKebutuhan || data.pemetaanKebutuhan || data.inti?.pemetaanKebutuhan || currentData?.identifikasi?.pemetaanKebutuhan || ''
  };

  // 3. Desain Pembelajaran
  const dpRaw = data.desainPembelajaran || data.desain_pembelajaran || {};
  const desainPembelajaran = {
    capaianPembelajaran: dpRaw.capaianPembelajaran || data.capaianPembelajaran || data.inti?.capaianPembelajaran || currentData?.desainPembelajaran?.capaianPembelajaran || '',
    tujuanPembelajaran: dpRaw.tujuanPembelajaran || data.tujuanPembelajaran || data.inti?.tujuanPembelajaran || currentData?.desainPembelajaran?.tujuanPembelajaran || '',
    kktp: dpRaw.kktp || data.kktp || data.inti?.kktp || currentData?.desainPembelajaran?.kktp || '',
    kategoriKetercapaian: dpRaw.kategoriKetercapaian || data.kategoriKetercapaian || data.inti?.kategoriKetercapaian || currentData?.desainPembelajaran?.kategoriKetercapaian || ''
  };

  // 4. Pedagogis Deep Learning
  const pdlRaw = data.pedagogisDeepLearning || data.pedagogis || data.praktikPedagogis || {};
  const pedagogisDeepLearning = {
    mindfulLearning: pdlRaw.mindfulLearning || data.mindfulLearning || currentData?.pedagogisDeepLearning?.mindfulLearning || '',
    meaningfulLearning: pdlRaw.meaningfulLearning || data.meaningfulLearning || currentData?.pedagogisDeepLearning?.meaningfulLearning || '',
    joyfulLearning: pdlRaw.joyfulLearning || data.joyfulLearning || currentData?.pedagogisDeepLearning?.joyfulLearning || '',
    modelPembelajaran: pdlRaw.modelPembelajaran || data.modelPembelajaran || data.inti?.modelPembelajaran || currentData?.pedagogisDeepLearning?.modelPembelajaran || 'Problem Based Learning (PBL) terintegrasi Deep Learning Cycle',
    metodePembelajaran: pdlRaw.metodePembelajaran || data.metodePembelajaran || data.inti?.metodePembelajaran || currentData?.pedagogisDeepLearning?.metodePembelajaran || 'Diskusi kelompok kolaboratif, penyelidikan kontekstual, dan refleksi bermakna'
  };

  // 5 & 6. Media & Sarana
  const msRaw = data.mediaSarana || data.media_sarana || {};
  const mediaSarana = {
    mediaPembelajaran: msRaw.mediaPembelajaran || data.mediaPembelajaran || data.inti?.mediaSaranaPrasarana || data.inti?.mediaPembelajaran || currentData?.mediaSarana?.mediaPembelajaran || '',
    saranaPrasarana: msRaw.saranaPrasarana || data.saranaPrasarana || data.inti?.saranaPrasarana || currentData?.mediaSarana?.saranaPrasarana || ''
  };

  // 7 & 8. Pemahaman & Pemantik
  const ppRaw = data.pemahamanPemantik || data.pemahaman_pemantik || {};
  const pemahamanPemantik = {
    pemahamanBermakna: ppRaw.pemahamanBermakna || data.pemahamanBermakna || data.inti?.pemahamanBermakna || currentData?.pemahamanPemantik?.pemahamanBermakna || '',
    pertanyaanPemantik: ppRaw.pertanyaanPemantik || data.pertanyaanPemantik || data.inti?.pertanyaanPemantik || currentData?.pemahamanPemantik?.pertanyaanPemantik || ''
  };

  // Komponen Inti (Format Standar)
  const intiRaw = data.inti || {};
  let profilPancasila = intiRaw.profilPancasila || data.profilPancasila || identifikasi.profilLulusan || [];
  if (typeof profilPancasila === 'string') {
    profilPancasila = profilPancasila.split(',').map(s => s.trim()).filter(Boolean);
  }
  const inti = {
    profilPancasila,
    modelPembelajaran: intiRaw.modelPembelajaran || pedagogisDeepLearning.modelPembelajaran,
    metodePembelajaran: intiRaw.metodePembelajaran || pedagogisDeepLearning.metodePembelajaran,
    mediaSaranaPrasarana: intiRaw.mediaSaranaPrasarana || `${mediaSarana.mediaPembelajaran} ${mediaSarana.saranaPrasarana}`.trim(),
    capaianPembelajaran: intiRaw.capaianPembelajaran || desainPembelajaran.capaianPembelajaran,
    tujuanPembelajaran: intiRaw.tujuanPembelajaran || desainPembelajaran.tujuanPembelajaran,
    pemahamanBermakna: intiRaw.pemahamanBermakna || pemahamanPemantik.pemahamanBermakna,
    pertanyaanPemantik: intiRaw.pertanyaanPemantik || pemahamanPemantik.pertanyaanPemantik
  };

  // 9. Materi & Referensi
  const mrRaw = data.materiReferensi || data.materi_referensi || {};
  const materiReferensi = {
    materi: mrRaw.materi || data.materi || currentData?.materiReferensi?.materi || '',
    referensi: mrRaw.referensi || data.referensi || currentData?.materiReferensi?.referensi || ''
  };

  // 10. Langkah-langkah Pembelajaran
  const lkRaw = data.langkah || data.langkah_pembelajaran || data.langkahPembelajaran || {};
  const normalizeLangkahPhase = (phaseData, defaultDuration, fallbackData) => {
    if (!phaseData && fallbackData) return fallbackData;
    if (!phaseData) return { kegiatan: '', durasi: defaultDuration };
    if (typeof phaseData === 'string') {
      return { kegiatan: phaseData, durasi: defaultDuration };
    }
    return {
      kegiatan: phaseData.kegiatan || phaseData.deskripsi || phaseData.aktivitas || fallbackData?.kegiatan || '',
      durasi: String(phaseData.durasi || defaultDuration)
    };
  };

  const langkah = {
    pendahuluan: normalizeLangkahPhase(lkRaw.pendahuluan, '15', currentData?.langkah?.pendahuluan),
    inti: normalizeLangkahPhase(lkRaw.inti, '60', currentData?.langkah?.inti),
    penutup: normalizeLangkahPhase(lkRaw.penutup, '15', currentData?.langkah?.penutup)
  };

  // 11. Lampiran & Pengesahan
  const lpRaw = data.lampiran || {};
  const lampiran = {
    lkpd: lpRaw.lkpd || data.lkpd || currentData?.lampiran?.lkpd || '',
    asesmen: lpRaw.asesmen || data.asesmen || currentData?.lampiran?.asesmen || '',
    kepalaSekolahNama: lpRaw.kepalaSekolahNama || currentData?.lampiran?.kepalaSekolahNama || '',
    kepalaSekolahNip: lpRaw.kepalaSekolahNip || currentData?.lampiran?.kepalaSekolahNip || '',
    guruMapelNama: lpRaw.guruMapelNama || identitas.penyusun || currentData?.lampiran?.guruMapelNama || '',
    guruMapelNip: lpRaw.guruMapelNip || currentData?.lampiran?.guruMapelNip || '',
    tanggalPengesahan: lpRaw.tanggalPengesahan || currentData?.lampiran?.tanggalPengesahan || getIndonesianDate()
  };

  return {
    formatType: targetFormat,
    identitas,
    identifikasi,
    desainPembelajaran,
    pedagogisDeepLearning,
    mediaSarana,
    pemahamanPemantik,
    inti,
    materiReferensi,
    langkah,
    lampiran
  };
}

// Helper: Bulletproof JSON Parser with Self-Healing
function parseAiJsonResponse(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    throw new Error("Respons teks dari AI kosong.");
  }

  let text = rawText.trim();

  // 1. Strip Markdown fences
  if (text.startsWith('```json')) {
    text = text.replace(/^```json\s*/i, '').replace(/\s*```\s*$/, '');
  } else if (text.startsWith('```')) {
    text = text.replace(/^```\s*/, '').replace(/\s*```\s*$/, '');
  }

  // 2. Extract from first { to last }
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace >= firstBrace) {
    text = text.substring(firstBrace, lastBrace + 1);
  }

  // Attempt 1: Direct JSON.parse
  try {
    return JSON.parse(text);
  } catch (e1) {
    console.warn("Direct JSON.parse failed, attempting repair step 1...", e1);
  }

  // Attempt 2: Clean unescaped control characters
  let step2 = text.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F]/g, ' ');
  try {
    return JSON.parse(step2);
  } catch (e2) {
    console.warn("Repair step 2 failed, attempting HTML quote normalization...", e2);
  }

  // Attempt 3: Replace unescaped double quotes inside HTML attributes (e.g. style="..." or class="...")
  let step3 = step2.replace(/=(["])(.*?)\1/g, "='$2'");
  try {
    return JSON.parse(step3);
  } catch (e3) {
    console.warn("Repair step 3 failed, attempting cutoff healing...", e3);
  }

  // Attempt 4: Cutoff healing (if Gemini was cut off near the end)
  let step4 = step3;
  let inString = false;
  let escaped = false;
  let openBraces = 0;
  let openBrackets = 0;

  for (let i = 0; i < step4.length; i++) {
    const c = step4[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (c === '\\') {
      escaped = true;
      continue;
    }
    if (c === '"') {
      inString = !inString;
      continue;
    }
    if (!inString) {
      if (c === '{') openBraces++;
      else if (c === '}') openBraces = Math.max(0, openBraces - 1);
      else if (c === '[') openBrackets++;
      else if (c === ']') openBrackets = Math.max(0, openBrackets - 1);
    }
  }

  if (inString) {
    step4 += '"';
  }
  while (openBrackets > 0) {
    step4 += ']';
    openBrackets--;
  }
  while (openBraces > 0) {
    step4 += '}';
    openBraces--;
  }

  try {
    return JSON.parse(step4);
  } catch (e4) {
    console.error("All JSON repair attempts failed:", e4);
    throw new Error(`Format JSON dari AI tidak valid: ${e4.message}`);
  }
}

const MGenAiModal = ({ onClose, onGenerate, currentData }) => {
  const [prompt, setPrompt] = useState('');
  const [targetFormat, setTargetFormat] = useState('deep_learning');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [modelType, setModelType] = useState('flash'); // 'flash' (Free)
  const [attachedFile, setAttachedFile] = useState(null);

  useEffect(() => {
    // Keep to flash for free tier
    setModelType('flash');
    if (currentData?.formatType) setTargetFormat(currentData.formatType);
  }, [currentData]);

  useEffect(() => {
    if (!isLoading) return;
    const timer = setInterval(() => {
      setLoadingDots(d => d.length >= 3 ? '' : d + '.');
    }, 400);
    return () => clearInterval(timer);
  }, [isLoading]);

  const handleProClick = () => {
    setShowProModal(true);
  };

  const handleListen = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Browser Anda tidak mendukung input suara. Gunakan Google Chrome.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPrompt(prev => (prev + " " + transcript).trim());
    };
    recognition.onerror = (event) => {
      console.error(event.error);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedFile({
          data: reader.result.split(',')[1],
          mimeType: file.type,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Silakan masukkan topik atau instruksi modul yang ingin dibuat.");
      return;
    }

    setIsLoading(true);

    try {
      const isExplicitRevision = /hanya (revisi|ubah|perbaiki|ganti)|revisi bagian|ubah bagian|hanya pada bagian/i.test(prompt);

      let contextPrompt = '';
      if (targetFormat === 'deep_learning') {
        contextPrompt = `${deepLearningSystemPrompt}\n\n`;
      } else {
        contextPrompt = `${standarSystemPrompt}\n\n`;
      }

      if (isExplicitRevision) {
        contextPrompt += `=== MODE REVISI PARSIAL ===\nPengguna secara spesifik meminta revisi pada bagian tertentu saja.\nPertahankan data bagian lain yang tidak diminta diubah sama seperti data saat ini.\n=== DATA MODUL SAAT INI ===\n${JSON.stringify(currentData, null, 2)}\n===========================\n\nInstruksi Revisi Pengguna: ${prompt}`;
      } else {
        const existingIdentitasHint = currentData?.identitas?.penyusun || currentData?.identitas?.instansi 
          ? `(Gunakan Nama Guru: "${currentData.identitas.penyusun || 'Nama Guru'}", Sekolah: "${currentData.identitas.instansi || 'Nama Sekolah'}")`
          : '';

        contextPrompt += `=== PERINTAH GENERATE MODUL LENGKAP ===
PERINGATAN SANGAT PENTING:
Pengguna meminta Anda membuat MODUL AJAR LENGKAP SECARA TUNTAS.
Anda WAJIB MENGISI SELURUH BAGIAN DARI AWAL SAMPAI AKHIR secara mendalam dan padat!
DILARANG KERAS HANYA MENGISI BAGIAN IDENTITAS!
Bagian yang WAJIB diisi penuh:
1. Identitas Lengkap ${existingIdentitasHint}
2. Identifikasi / Profil Lulusan / Profil Pancasila & Kompetensi Awal & Diferensiasi
3. Desain Pembelajaran (Capaian Pembelajaran, Tujuan Pembelajaran terukur ABCD, KKTP, Kategori Ketercapaian Tabel Interval 4 Baris)
4. Pedagogis / Model Pembelajaran & Metode Pembelajaran
5. Media Pembelajaran & Sarana Prasarana
6. Pemahaman Bermakna & Pertanyaan Pemantik HOTS
7. Materi Pembelajaran (Ringkasan materi inti mendalam) & Referensi Pustaka
8. Langkah Pembelajaran (Pendahuluan, Inti, Penutup beserta rincian menit)
9. Lampiran (LKPD lengkap siap pakai untuk siswa, Instrumen & Rubrik Asesmen lengkap, dan Pengesahan)

DILARANG KERAS MENGOSONGKAN BAGIAN APAPUN ATAU MENGGUNAKAN TANDA TITIK-TITIK '...'.
Kembalikan seluruh kunci JSON terisi lengkap dan mendalam!

Instruksi Pengguna: ${prompt}`;
      }

      let parts = [{ text: contextPrompt }];
      if (attachedFile) {
        parts.push({
          inlineData: { data: attachedFile.data, mimeType: attachedFile.mimeType }
        });
      }

      const payload = {
        contents: [{ parts }],
        generationConfig: {
          responseMimeType: "application/json",
          maxOutputTokens: 8192,
          temperature: 0.7
        }
      };

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelType: 'flash', payload })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errText}`);
      }

      const result = await response.json();
      if (!result.candidates || result.candidates.length === 0) {
        throw new Error("API tidak mengembalikan respons teks.");
      }

      let text = result.candidates[0].content.parts[0].text;
      
      // Self-healing & robust JSON Parser
      let data = parseAiJsonResponse(text);
      
      // Normalize complete response
      const finalData = normalizeAiResponse(data, targetFormat, currentData);

      if (finalData && Object.keys(finalData.identitas).length > 0) {
        onGenerate(finalData);
        onClose();
      } else {
        throw new Error("Struktur data modul tidak lengkap.");
      }
    } catch (error) {
      console.error(error);
      alert("Gagal melakukan generate dengan AI.\n\nPesan: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '640px', height: 'auto', padding: '0', zIndex: 1100, position: 'relative' }}>
        
        {/* Modal Header */}
        <div className="modal-header" style={{ backgroundColor: '#2B579A', color: 'white', borderBottom: 'none' }}>
          <h2 className="flex items-center gap-2" style={{ color: 'white', margin: 0 }}>
            <Sparkles size={20} /> MGen AI Central
          </h2>
          <div className="flex gap-2 items-center">
            <button onClick={() => setShowSettings(!showSettings)} style={{ color: 'white', background: 'transparent', border: 'none', cursor: 'pointer' }} title="Pengaturan AI">
              <Settings size={20} />
            </button>
            <button className="btn btn-icon" onClick={onClose} style={{ color: 'white', background: 'transparent' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Mode Berpikir AI Bar */}
        <div style={{ padding: '0.85rem 1.75rem', backgroundColor: 'var(--bg-card-inner)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="flex justify-between items-center mb-1.5">
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Mode Berpikir AI</label>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'var(--border-color)', padding: '2px 8px', borderRadius: '12px' }}>Akun Gratis Aktif</span>
          </div>

          <div className="flex gap-2">
            {/* Mode Cepat (Active) */}
            <button 
              type="button"
              onClick={() => setModelType('flash')}
              style={{
                flex: 1,
                padding: '0.55rem 0.75rem',
                borderRadius: '6px',
                border: '2px solid var(--accent)',
                backgroundColor: 'rgba(37, 99, 235, 0.12)',
                color: 'var(--accent)',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem'
              }}
            >
              <Zap size={16} color="var(--accent)" /> Respon Cepat
            </button>

            {/* Mode Mendalam (Locked for PRO) */}
            <button 
              type="button"
              onClick={handleProClick}
              style={{
                flex: 1,
                padding: '0.55rem 0.75rem',
                borderRadius: '6px',
                border: '1px dashed var(--border-color)',
                backgroundColor: 'var(--bg-input)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                fontSize: '0.9rem',
                position: 'relative'
              }}
              title="Fitur Khusus Pengguna PRO"
            >
              <Target size={16} color="var(--text-muted)" />
              <span>Pemikiran Mendalam</span>
              <span style={{
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                padding: '1px 6px',
                borderRadius: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px'
              }}>
                <Lock size={10} /> PRO
              </span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
          
          {/* Format Pilihan */}
          <div>
            <label style={{ fontWeight: 'bold', color: 'var(--text-primary)', display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Format Modul Sasaran</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTargetFormat('deep_learning')}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  border: targetFormat === 'deep_learning' ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                  backgroundColor: targetFormat === 'deep_learning' ? 'rgba(37, 99, 235, 0.12)' : 'var(--bg-card-inner)',
                  color: targetFormat === 'deep_learning' ? 'var(--accent)' : 'var(--text-secondary)',
                  fontWeight: targetFormat === 'deep_learning' ? '600' : 'normal',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Brain size={15} /> Deep Learning (10 Kerangka)
              </button>
              <button
                type="button"
                onClick={() => setTargetFormat('standar')}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  border: targetFormat === 'standar' ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                  backgroundColor: targetFormat === 'standar' ? 'rgba(37, 99, 235, 0.12)' : 'var(--bg-card-inner)',
                  color: targetFormat === 'standar' ? 'var(--accent)' : 'var(--text-secondary)',
                  fontWeight: targetFormat === 'standar' ? '600' : 'normal',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <BookOpen size={15} /> Standar Kurikulum Merdeka
              </button>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Instruksi Pembuatan Modul</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <label style={{ cursor: 'pointer', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', padding: '4px 8px', backgroundColor: 'var(--bg-card-inner)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                  <Paperclip size={14} /> Berkas
                  <input type="file" onChange={handleFileUpload} accept="image/*,application/pdf" style={{ display: 'none' }} />
                </label>
                <button type="button" onClick={handleListen} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', padding: '4px 8px', backgroundColor: isListening ? '#ef4444' : 'var(--bg-card-inner)', color: isListening ? 'white' : 'var(--accent)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', transition: '0.2s' }}>
                  {isListening ? <MicOff size={14} /> : <Mic size={14} />} Dikte
                </button>
              </div>
            </div>
            
            {attachedFile && (
              <div style={{ fontSize: '0.85rem', color: 'var(--accent)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📎 {attachedFile.name} 
                <button type="button" onClick={() => setAttachedFile(null)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>✖</button>
              </div>
            )}

            <textarea 
              className="form-control" 
              placeholder="Tuliskan mata pelajaran, topik/materi, fase/kelas, dan instruksi khusus modul yang ingin dibuatkan AI..."
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '6px', resize: 'vertical', fontSize: '0.9rem', backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)' }}
            />
          </div>

          <button 
            className="btn btn-magic" 
            style={{ width: '100%', padding: '0.85rem', justifyContent: 'center', borderRadius: '6px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', cursor: isLoading ? 'not-allowed' : 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? (
              <span style={{ fontFamily: 'monospace', fontSize: '1rem', display: 'flex', alignItems: 'center' }}>
                <Loader2 className="animate-spin" size={18} style={{ marginRight: '8px' }} />
                AI Merancang Modul{loadingDots}
              </span>
            ) : <><Sparkles size={18} /> Generate Modul Lengkap</>}
          </button>
        </div>

        {/* POP UP UPGRADE PRO TERKUNCI */}
        {showProModal && (
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.82)',
            zIndex: 1200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            backdropFilter: 'blur(5px)',
            animation: 'fadeIn 0.2s ease'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              maxWidth: '460px',
              width: '100%',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
              position: 'relative'
            }}>
              <button 
                type="button" 
                onClick={() => setShowProModal(false)}
                style={{ position: 'absolute', top: '12px', right: '12px', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} color="#64748b" />
              </button>

              {/* Icon Crown Glowing */}
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 1rem auto',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
                border: '2px solid #F59E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(245, 158, 11, 0.35)'
              }}>
                <Crown size={32} color="#D97706" />
              </div>

              <span style={{
                background: '#FEF3C7',
                color: '#B45309',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                padding: '3px 10px',
                borderRadius: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Fitur Eksklusif PRO
              </span>

              <h3 style={{ fontSize: '1.25rem', color: '#0F172A', marginTop: '0.75rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Anda Pengguna Akun Gratis
              </h3>

              <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                Mode <strong>Pemikiran Mendalam (Deep Reasoning Pro AI)</strong> hanya tersedia untuk pengguna <strong>Akun PRO</strong>. Silakan lakukan pembayaran atau upgrade akun untuk membuka pemikiran AI tingkat tinggi dan fitur eksklusif lainnya.
              </p>

              {/* Fitur PRO list */}
              <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'left', border: '1px solid #E2E8F0' }}>
                <div className="flex items-center gap-2 mb-2" style={{ fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle size={15} color="#10B981" />
                  <span><strong>AI Gemini 2.5 Pro:</strong> Pemikiran mendalam & analisis kurikulum presisi</span>
                </div>
                <div className="flex items-center gap-2 mb-2" style={{ fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle size={15} color="#10B981" />
                  <span><strong>Generate Tanpa Batas:</strong> Modul 10 kerangka super detail</span>
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle size={15} color="#10B981" />
                  <span><strong>Prioritas Server:</strong> Kecepatan pemrosesan respon prioritas tinggi</span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    alert("Untuk upgrade ke Akun PRO, silakan hubungi Admin / Tim Pengembang via WhatsApp / Email.");
                    setShowProModal(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)'
                  }}
                >
                  <Crown size={18} /> Lakukan Pembayaran PRO Sekarang
                </button>
                <button
                  type="button"
                  onClick={() => setShowProModal(false)}
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    background: 'transparent',
                    color: '#64748B',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Gunakan Akun Gratis (Respon Cepat)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MGenAiModal;
