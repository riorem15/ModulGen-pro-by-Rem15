import React, { useState, useEffect } from 'react';
import { X, Sparkles, Loader2, KeyRound, Mic, MicOff, Paperclip, Settings, Target, Zap } from 'lucide-react';

const systemPrompt = `Anda adalah MGen AI, asisten penulis Modul Ajar Kurikulum Merdeka. 
Buatkan modul ajar spesifik berdasarkan instruksi pengguna.
TIDAK BOLEH ADA ROOT KEY LAIN. KEMBALIKAN OBJECT JSON YANG LANGSUNG BERISI KEY BERIKUT INI, isi sedetail mungkin menggunakan bahasa Indonesia formal:
{
  "identitas": { "penyusun": "...", "instansi": "...", "mataPelajaran": "...", "faseKelas": "...", "semester": "...", "materiAjar": "...", "alokasiWaktu": "..." },
  "inti": { "profilPancasila": ["...", "..."], "modelPembelajaran": "...", "metodePembelajaran": "...", "mediaSaranaPrasarana": "...", "capaianPembelajaran": "...", "tujuanPembelajaran": "...", "pemahamanBermakna": "...", "pertanyaanPemantik": "..." },
  "materiReferensi": { "materi": "<p>Isi materi pembelajarn (gunakan html p, ul, strong)</p>", "referensi": "<p>Daftar pustaka</p>" },
  "langkah": { 
    "pendahuluan": { "kegiatan": "<ol><li>...</li></ol>", "durasi": "15" }, 
    "inti": { "kegiatan": "<ol><li>...</li></ol>", "durasi": "90" }, 
    "penutup": { "kegiatan": "<ol><li>...</li></ol>", "durasi": "15" } 
  },
  "lampiran": { "lkpd": "<p>Lembar kerja peserta didik</p>", "asesmen": "<p>Rubrik penilaian</p>", "kepalaSekolahNama": "Nama Kepsek", "kepalaSekolahNip": "NIP Kepsek", "guruMapelNama": "Nama Guru", "guruMapelNip": "NIP Guru", "tanggalPengesahan": "Tempat, Tanggal Tahun" }
}`;

const MGenAiModal = ({ onClose, onGenerate, currentData }) => {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [modelType, setModelType] = useState('flash'); // 'flash' or 'pro'
  const [attachedFile, setAttachedFile] = useState(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('mgen_api_key');
    if (savedKey) setApiKey(savedKey);
    const savedModel = localStorage.getItem('mgen_model_type');
    if (savedModel) setModelType(savedModel);
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    const timer = setInterval(() => {
      setLoadingDots(d => d.length >= 3 ? '' : d + '.');
    }, 400);
    return () => clearInterval(timer);
  }, [isLoading]);

  const handleSaveSettings = (k, m) => {
    setApiKey(k);
    setModelType(m);
    localStorage.setItem('mgen_api_key', k);
    localStorage.setItem('mgen_model_type', m);
  };

  const handleListen = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Browser Anda tidak mendukung input suara. Gunakan Chrome.");
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
    if (!apiKey) {
      alert("Masukkan API Key Gemini Anda terlebih dahulu.");
      return;
    }
    if (!prompt.trim()) {
      alert("Masukkan topik modul yang ingin dibuat.");
      return;
    }

    setIsLoading(true);
    localStorage.setItem('mgen_api_key', apiKey);

    try {
      const actualModelName = modelType === 'pro' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${actualModelName}:generateContent?key=${apiKey}`;
      
      const contextPrompt = `${systemPrompt}

=== DATA MODUL SAAT INI ===
${JSON.stringify(currentData, null, 2)}
===========================

ATURAN REVISI: Jika instruksi pengguna hanya meminta revisi bagian tertentu (misal: "perbaiki Capaian Pembelajaran"), Anda WAJIB mengembalikan seluruh kunci JSON lain sama persis seperti Data Modul Saat Ini (jangan dikosongkan). Hanya ubah bagian yang diminta.

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
          responseMimeType: "application/json"
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
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
      
      // Clean markdown block if Gemini ignores instruction
      if (text.startsWith('\`\`\`json')) {
        text = text.replace(/^\`\`\`json\n/, '').replace(/\n\`\`\`$/, '');
      } else if (text.startsWith('\`\`\`')) {
        text = text.replace(/^\`\`\`\n/, '').replace(/\n\`\`\`$/, '');
      }
      
      let data = JSON.parse(text);
      // Fallback if Gemini wraps inside another key
      if (data.modul_ajar && !data.identitas) {
        data = data.modul_ajar;
      }
      
      // Check for deep identitas logic if named identitas_modul
      const finalData = {
        identitas: data.identitas || data.identitas_modul || {},
        inti: data.inti || data.komponen_inti || {},
        materiReferensi: data.materiReferensi || data.materi_referensi || {},
        langkah: data.langkah || data.langkah_pembelajaran || {},
        lampiran: data.lampiran || {}
      };

      if (Object.keys(finalData.identitas).length > 0) {
        onGenerate(finalData);
        onClose();
      } else {
        throw new Error("Struktur JSON tidak valid atau kosong.");
      }
    } catch (error) {
      console.error(error);
      alert("Gagal melakukan generate dengan AI. Pastikan API key benar dan coba lagi.\nError: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px', height: 'auto', padding: '0', zIndex: 1100, position: 'relative' }}>
        <div className="modal-header" style={{ backgroundColor: '#2B579A', color: 'white', borderBottom: 'none' }}>
          <h2 className="flex items-center gap-2" style={{ color: 'white', margin: 0 }}>
            <Sparkles size={20} /> MGen AI Central
          </h2>
          <div className="flex gap-2">
            <button onClick={() => setShowSettings(!showSettings)} style={{ color: 'white', background: 'transparent', border: 'none', cursor: 'pointer' }} title="Pengaturan AI">
              <Settings size={20} />
            </button>
            <button className="btn btn-icon" onClick={onClose} style={{ color: 'white', background: 'transparent' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {showSettings && (
          <div style={{ padding: '1rem', backgroundColor: '#f1f5f9', borderBottom: '1px solid #cbd5e1' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Gemini API Key</label>
              <input 
                type="password" 
                value={apiKey}
                onChange={(e) => handleSaveSettings(e.target.value, modelType)}
                placeholder="AIzaSy..."
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Mode Berpikir AI</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleSaveSettings(apiKey, 'flash')}
                  style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: modelType === 'flash' ? '2px solid #2B579A' : '1px solid #cbd5e1', backgroundColor: modelType === 'flash' ? '#e0e7ff' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <Zap size={16} /> Respon Cepat
                </button>
                <button 
                  onClick={() => handleSaveSettings(apiKey, 'pro')}
                  style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: modelType === 'pro' ? '2px solid #2B579A' : '1px solid #cbd5e1', backgroundColor: modelType === 'pro' ? '#e0e7ff' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <Target size={16} /> Pemikiran Mendalam
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="modal-body" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'white' }}>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ fontWeight: 'bold', color: '#334155' }}>Instruksi Pembuatan Modul</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <label style={{ cursor: 'pointer', color: '#2B579A', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', padding: '4px 8px', backgroundColor: '#f1f5f9', borderRadius: '4px' }}>
                  <Paperclip size={14} /> Berkas
                  <input type="file" onChange={handleFileUpload} accept="image/*,application/pdf" style={{ display: 'none' }} />
                </label>
                <button onClick={handleListen} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', padding: '4px 8px', backgroundColor: isListening ? '#ef4444' : '#f1f5f9', color: isListening ? 'white' : '#2B579A', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: '0.2s' }}>
                  {isListening ? <MicOff size={14} /> : <Mic size={14} />} Dikte
                </button>
              </div>
            </div>
            
            {attachedFile && (
              <div style={{ fontSize: '0.85rem', color: '#2B579A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📎 {attachedFile.name} 
                <button onClick={() => setAttachedFile(null)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>✖</button>
              </div>
            )}

            <textarea 
              className="form-control" 
              placeholder="Contoh: Buatkan modul ajar IPA Kelas 8 tentang Sistem Pencernaan Manusia. Lengkapi dengan LKPD dan Rubrik Penilaian detail."
              rows={5}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px', resize: 'vertical' }}
            />
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '0.85rem', justifyContent: 'center', backgroundColor: '#2B579A', border: 'none', borderRadius: '6px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', cursor: isLoading ? 'not-allowed' : 'pointer' }}
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? (
              <span style={{ fontFamily: 'monospace', fontSize: '1rem', display: 'flex', alignItems: 'center' }}>
                <span className="animate-pulse" style={{ marginRight: '6px', display: 'inline-block', width: '8px', height: '14px', backgroundColor: 'white' }}></span>
                Mengetik{loadingDots}
              </span>
            ) : <><Sparkles size={18} /> Generate Modul Terpusat</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MGenAiModal;
