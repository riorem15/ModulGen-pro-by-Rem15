import React, { useState, useEffect } from 'react';
import { X, Sparkles, Loader2, Mic, MicOff, Paperclip, Settings, Target, Zap, BookOpen, Lock, Crown, CheckCircle, ShieldAlert } from 'lucide-react';

const deepLearningSystemPrompt = `Anda adalah MGen AI, pakar perancang Modul Ajar Kurikulum Merdeka dengan Pendekatan DEEP LEARNING (Pembelajaran Mendalam).
Buatkan modul ajar spesifik, komprehensif, dan berkualitas tinggi berdasarkan instruksi pengguna dengan mematuhi 10 KERANGKA DEEP LEARNING.

KERANGKA WAJIB:
1. IDENTITAS: Penyusun, Satuan pendidikan, Mata pelajaran, Kelas/Fase, Semester, Materi pokok, Bab/Subbab, Alokasi waktu, serta pengaturan font (fontFamily, fontSize, lineSpacing) jika diminta pengguna di instruksi (misal TNR -> "Times New Roman", font 12 -> "12pt").
2. IDENTIFIKASI: Profil Lulusan (dimensi karakter & kompetensi), Kompetensi Awal, Pemetaan Kebutuhan Pembelajaran (Diferensiasi: kesiapan, minat, profil belajar).
3. DESAIN PEMBELAJARAN: Capaian Pembelajaran (CP), Tujuan Pembelajaran (TP), KKTP (Kriteria Ketercapaian), Kategori Ketercapaian (Rubrik/Interval kinerja).
4. PRAKTIK PEDAGOGIS DEEP LEARNING: Mindful Learning (sadar penuh/fokus/reflektif), Meaningful Learning (kontekstual dunia nyata), Joyful Learning (menggembirakan/apresiatif/gamifikasi), Model Pembelajaran (PBL/PjBL/Inquiry/Deep Learning Cycle), Metode Pembelajaran.
5. MEDIA PEMBELAJARAN: Media ajar digital, video, alat peraga interaktif.
6. SARANA DAN PRASARANA: Sarana dan prasarana penunjang kelas/lab/sekolah.
7. PEMAHAMAN BERMAKNA: Konsep esensial mendalam yang membekas jangka panjang.
8. PERTANYAAN PEMANTIK: Pertanyaan esensial terbuka (open-ended) yang memantik daya kritis.
9. MATERI PEMBELAJARAN DAN REFERENSI: Uraian ringkasan konsep materi dan daftar referensi/pustaka.
10. LANGKAH-LANGKAH PEMBELAJARAN: Pendahuluan (Mindful & Orientasi), Inti (Sintaks Deep Learning: Memahami, Mengaplikasi, Merefleksi), Penutup (Refleksi Bermakna & Apresiasi Joyful).
11. LAMPIRAN & PENGESAHAN: LKPD mendalam, Asesmen & Rubrik Penilaian, serta Lembar Pengesahan.

ATURAN FORMAT JSON SANGAT KETAT:
- WAJIB hanya gunakan tanda kutip tunggal (') untuk atribut HTML di dalam string JSON (contoh: <table style='width:100%'> atau <div class='card'>).
- JANGAN PERNAH gunakan tanda kutip ganda (") di dalam nilai string JSON.
- TIDAK BOLEH ADA ROOT KEY LAIN. KEMBALIKAN OBJECT JSON LANGSUNG BERIKUT INI:
{
  "formatType": "deep_learning",
  "identitas": {
    "penyusun": "Nama Guru",
    "instansi": "Nama Sekolah",
    "mataPelajaran": "Mata Pelajaran",
    "faseKelas": "Fase F / Kelas 11",
    "semester": "1 (Ganjil)",
    "materiAjar": "Topik Materi",
    "babSubbab": "Bab 1 / Subbab 1.1",
    "alokasiWaktu": "2 x 45 Menit (1 Pertemuan)",
    "fontFamily": "Poppins",
    "fontSize": "11pt",
    "lineSpacing": "1.5"
  },
  "identifikasi": {
    "profilLulusan": ["Penalaran Kritis & Pemecahan Masalah", "Kreativitas & Inovasi", "Kolaborasi & Gotong Royong"],
    "kompetensiAwal": "<p>...</p>",
    "pemetaanKebutuhan": "<ul><li><strong>Kesiapan Belajar:</strong> ...</li><li><strong>Minat:</strong> ...</li><li><strong>Profil Belajar:</strong> ...</li></ul>"
  },
  "desainPembelajaran": {
    "capaianPembelajaran": "<p>...</p>",
    "tujuanPembelajaran": "<ol><li>...</li></ol>",
    "kktp": "<ol><li>...</li></ol>",
    "kategoriKetercapaian": "<table style='width:100%; border-collapse:collapse;'><thead><tr style='background:#f1f5f9;'><th>Kategori</th><th>Interval</th><th>Deskripsi Kinerja</th><th>Tindak Lanjut</th></tr></thead><tbody><tr><td>Perlu Bimbingan</td><td>0 - 65%</td><td>...</td><td>...</td></tr><tr><td>Cukup</td><td>66 - 75%</td><td>...</td><td>...</td></tr><tr><td>Baik</td><td>76 - 88%</td><td>...</td><td>...</td></tr><tr><td>Sangat Baik</td><td>89 - 100%</td><td>...</td><td>...</td></tr></tbody></table>"
  },
  "pedagogisDeepLearning": {
    "mindfulLearning": "<p>...</p>",
    "meaningfulLearning": "<p>...</p>",
    "joyfulLearning": "<p>...</p>",
    "modelPembelajaran": "<p>Problem Based Learning (PBL) terintegrasi Siklus Deep Learning</p>",
    "metodePembelajaran": "<p>Diskusi kelompok kolaboratif, penyelidikan sejarah, dan presentasi apresiatif</p>"
  },
  "mediaSarana": {
    "mediaPembelajaran": "<ul><li>...</li><li>...</li></ul>",
    "saranaPrasarana": "<ul><li>...</li><li>...</li></ul>"
  },
  "pemahamanPemantik": {
    "pemahamanBermakna": "<p>...</p>",
    "pertanyaanPemantik": "<ol><li>...</li><li>...</li></ol>"
  },
  "materiReferensi": {
    "materi": "<p>Ringkasan materi lengkap dengan konsep kunci...</p>",
    "referensi": "<p>Daftar pustaka buku teks & sumber terpercaya...</p>"
  },
  "langkah": {
    "pendahuluan": { "kegiatan": "<ol><li>Guru membuka kelas dengan salam hangat dan mengajak siswa hening sejenak (Mindful Breathing)...</li><li>...</li></ol>", "durasi": "15" },
    "inti": { "kegiatan": "<ol><li><strong>Fase 1 (Orientasi Masalah Bermakna):</strong> ...</li><li><strong>Fase 2 (Eksplorasi Mendalam & Diferensiasi):</strong> ...</li><li><strong>Fase 3 (Pengembangan Karya):</strong> ...</li><li><strong>Fase 4 (Joyful Gallery Walk & Apresiasi):</strong> ...</li></ol>", "durasi": "60" },
    "penutup": { "kegiatan": "<ol><li>Siswa dan guru merefleksikan pengalaman belajar...</li><li>Apresiasi dan doa penutup...</li></ol>", "durasi": "15" }
  },
  "lampiran": {
    "lkpd": "<p>LKPD lengkap...</p>",
    "asesmen": "<p>Rubrik penilaian proses dan hasil...</p>",
    "kepalaSekolahNama": "Nama Kepala Sekolah",
    "kepalaSekolahNip": "NIP Kepala Sekolah",
    "guruMapelNama": "Nama Guru Pengampu",
    "guruMapelNip": "NIP Guru Pengampu",
    "tanggalPengesahan": "Serang, 20 Maret 2026"
  }
}`;

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
      const contextPrompt = `${deepLearningSystemPrompt}

Target Format yang diinginkan: ${targetFormat === 'deep_learning' ? 'MODUL DEEP LEARNING (10 KERANGKA)' : 'MODUL KURIKULUM MERDEKA STANDAR'}

=== DATA MODUL SAAT INI ===
${JSON.stringify(currentData, null, 2)}
===========================

ATURAN REVISI: Jika instruksi pengguna hanya meminta revisi bagian tertentu (misal: "perbaiki Capaian Pembelajaran dan KKTP"), Anda WAJIB mengembalikan seluruh kunci JSON lain sama persis seperti Data Modul Saat Ini (jangan dikosongkan). Hanya ubah bagian yang diminta.

Instruksi Pengguna: ${prompt}`;

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
      
      // Fallback if wrapped inside another key
      if (data.modul_ajar && !data.identitas) {
        data = data.modul_ajar;
      }
      
      const finalData = {
        formatType: targetFormat,
        identitas: {
          ...data.identitas,
          fontFamily: data.identitas?.fontFamily || currentData?.identitas?.fontFamily || 'Poppins',
          fontSize: data.identitas?.fontSize || currentData?.identitas?.fontSize || '11pt',
          lineSpacing: data.identitas?.lineSpacing || currentData?.identitas?.lineSpacing || '1.5'
        },
        identifikasi: data.identifikasi || {
          profilLulusan: data.inti?.profilPancasila || [],
          kompetensiAwal: data.inti?.kompetensiAwal || '',
          pemetaanKebutuhan: data.inti?.pemetaanKebutuhan || ''
        },
        desainPembelajaran: data.desainPembelajaran || {
          capaianPembelajaran: data.inti?.capaianPembelajaran || '',
          tujuanPembelajaran: data.inti?.tujuanPembelajaran || '',
          kktp: data.inti?.kktp || '',
          kategoriKetercapaian: data.inti?.kategoriKetercapaian || ''
        },
        pedagogisDeepLearning: data.pedagogisDeepLearning || {
          mindfulLearning: data.inti?.mindfulLearning || '',
          meaningfulLearning: data.inti?.meaningfulLearning || '',
          joyfulLearning: data.inti?.joyfulLearning || '',
          modelPembelajaran: data.inti?.modelPembelajaran || '',
          metodePembelajaran: data.inti?.metodePembelajaran || ''
        },
        mediaSarana: data.mediaSarana || {
          mediaPembelajaran: data.inti?.mediaPembelajaran || data.inti?.mediaSaranaPrasarana || '',
          saranaPrasarana: data.inti?.saranaPrasarana || ''
        },
        pemahamanPemantik: data.pemahamanPemantik || {
          pemahamanBermakna: data.inti?.pemahamanBermakna || '',
          pertanyaanPemantik: data.inti?.pertanyaanPemantik || ''
        },
        inti: data.inti || {
          capaianPembelajaran: data.desainPembelajaran?.capaianPembelajaran || '',
          tujuanPembelajaran: data.desainPembelajaran?.tujuanPembelajaran || '',
          pemahamanBermakna: data.pemahamanPemantik?.pemahamanBermakna || '',
          pertanyaanPemantik: data.pemahamanPemantik?.pertanyaanPemantik || '',
          modelPembelajaran: data.pedagogisDeepLearning?.modelPembelajaran || '',
          metodePembelajaran: data.pedagogisDeepLearning?.metodePembelajaran || ''
        },
        materiReferensi: data.materiReferensi || data.materi_referensi || {},
        langkah: data.langkah || data.langkah_pembelajaran || {},
        lampiran: data.lampiran || {}
      };

      if (Object.keys(finalData.identitas).length > 0) {
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
                <Sparkles size={15} /> Deep Learning (10 Kerangka)
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
