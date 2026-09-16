import React, { useRef, useState } from 'react';
import { X, Download, FileText, Loader2, LayoutTemplate, Sparkles, Palette } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { getFormattedPengesahanDate } from '../utils/dateUtils';
import { exportModulAjarDocx } from '../utils/docxExport';
import './PreviewModal.css';

const colorThemes = [
  {
    id: 'green',
    name: 'Hijau Zamrud (Emerald)',
    primary: '#047857',
    headerBg: '#059669',
    tableHeaderBg: '#d1fae5',
    tableHeaderColor: '#064e3b',
    border: '#10b981',
    subBorder: '#34d399',
    pilarBg: '#ecfdf5',
    badgeBg: '#a7f3d0',
    badgeColor: '#064e3b'
  },
  {
    id: 'blue',
    name: 'Biru Royal (Navy)',
    primary: '#1d4ed8',
    headerBg: '#2563eb',
    tableHeaderBg: '#dbeafe',
    tableHeaderColor: '#1e3a8a',
    border: '#3b82f6',
    subBorder: '#60a5fa',
    pilarBg: '#eff6ff',
    badgeBg: '#bfdbfe',
    badgeColor: '#1e3a8a'
  },
  {
    id: 'teal',
    name: 'Teal Bahari (Cyan)',
    primary: '#0f766e',
    headerBg: '#0d9488',
    tableHeaderBg: '#ccfbf1',
    tableHeaderColor: '#134e4a',
    border: '#14b8a6',
    subBorder: '#2dd4bf',
    pilarBg: '#f0fdfa',
    badgeBg: '#99f6e4',
    badgeColor: '#134e4a'
  },
  {
    id: 'purple',
    name: 'Ungu Violet (Royal)',
    primary: '#6d28d9',
    headerBg: '#7c3aed',
    tableHeaderBg: '#ede9fe',
    tableHeaderColor: '#4c1d95',
    border: '#8b5cf6',
    subBorder: '#a78bfa',
    pilarBg: '#f5f3ff',
    badgeBg: '#ddd6fe',
    badgeColor: '#4c1d95'
  },
  {
    id: 'amber',
    name: 'Amber Terracotta (Warm)',
    primary: '#c2410c',
    headerBg: '#ea580c',
    tableHeaderBg: '#ffedd5',
    tableHeaderColor: '#7c2d12',
    border: '#f97316',
    subBorder: '#fb923c',
    pilarBg: '#fff7ed',
    badgeBg: '#fed7aa',
    badgeColor: '#7c2d12'
  },
  {
    id: 'mono',
    name: 'Monokrom Formal (Klasik)',
    primary: '#1e293b',
    headerBg: '#334155',
    tableHeaderBg: '#f1f5f9',
    tableHeaderColor: '#0f172a',
    border: '#475569',
    subBorder: '#94a3b8',
    pilarBg: '#f8fafc',
    badgeBg: '#e2e8f0',
    badgeColor: '#1e293b'
  }
];

const PreviewModal = ({ data, onClose }) => {
  const printRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [layoutType, setLayoutType] = useState('kotak');
  const [selectedThemeId, setSelectedThemeId] = useState('green'); // Default to Green as requested

  const currentTheme = colorThemes.find(t => t.id === selectedThemeId) || colorThemes[0];

  const globalStyles = {
    fontFamily: data.identitas?.fontFamily || 'Poppins',
    fontSize: data.identitas?.fontSize || '11pt',
    lineHeight: data.identitas?.lineSpacing || '1.5',
    '--theme-primary': currentTheme.primary,
    '--theme-header-bg': currentTheme.headerBg,
    '--theme-table-header-bg': currentTheme.tableHeaderBg,
    '--theme-table-header-color': currentTheme.tableHeaderColor,
    '--theme-border': currentTheme.border,
    '--theme-sub-border': currentTheme.subBorder,
    '--theme-pilar-bg': currentTheme.pilarBg,
    '--theme-badge-bg': currentTheme.badgeBg,
    '--theme-badge-color': currentTheme.badgeColor,
  };

  const isDeepLearning = data.formatType === 'deep_learning' || !!data.identifikasi;

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    const element = printRef.current;
    
    // Get parents to override their centering
    const parentContainer = element.parentElement;
    const modalBody = parentContainer.parentElement;

    // Save original styles
    const origParentAlign = parentContainer.style.alignItems;
    const origModalBodyJustify = modalBody.style.justifyContent;
    const origModalBodyPadding = modalBody.style.padding;
    const originalScrollY = window.scrollY;
    
    parentContainer.style.alignItems = 'flex-start';
    modalBody.style.justifyContent = 'flex-start';
    modalBody.style.padding = '0';
    
    window.scrollTo(0, 0);
    element.classList.add('is-exporting');

    try {
      const opt = {
        margin: [20, 20, 20, 25], // Top, Right, Bottom, Left in mm
        filename: `Modul_Ajar_${data.identitas?.mataPelajaran || 'Deep_Learning'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          windowWidth: document.body.scrollWidth,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { 
          mode: ['css', 'legacy'],
          avoid: ['h3', 'h4', '.avoid-break', '.doc-sub-section']
        }
      };
      
      await new Promise(resolve => setTimeout(resolve, 150));
      await html2pdf().set(opt).from(element).toPdf().get('pdf').then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(8.5);
          pdf.setTextColor(120);
          pdf.text(`Halaman ${i} dari ${totalPages} - ${data.identitas?.mataPelajaran || 'Modul Ajar'}`, 25, pdf.internal.pageSize.getHeight() - 10);
        }
      }).save();
    } catch (err) {
      console.error('Error generating PDF', err);
      alert('Gagal membuat PDF. Silakan coba lagi.');
    } finally {
      element.classList.remove('is-exporting');
      parentContainer.style.alignItems = origParentAlign;
      modalBody.style.justifyContent = origModalBodyJustify;
      modalBody.style.padding = origModalBodyPadding;
      window.scrollTo(0, originalScrollY);
      setIsExporting(false);
    }
  };

  const handleDownloadWord = async () => {
    setIsExporting(true);
    try {
      await exportModulAjarDocx(data, layoutType, currentTheme);
    } catch (err) {
      console.error('Export DOCX error:', err);
      alert('Gagal membuat dokumen Word (.docx): ' + (err.message || 'Terjadi kesalahan sistem.'));
    } finally {
      setIsExporting(false);
    }
  };

  // 1. RENDER FORMAT KOTAK DEEP LEARNING
  const renderKotakCanvas = () => (
    <>
      <div className="a4-paper page-break-after" style={globalStyles}>
        <div className="doc-header" style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: `2.5px solid ${currentTheme.primary}`, paddingBottom: '1rem' }}>
          <h1 style={{ color: currentTheme.primary }}>MODUL AJAR (PENDEKATAN DEEP LEARNING)</h1>
          <h2>{data.identitas?.mataPelajaran ? data.identitas.mataPelajaran.toUpperCase() : 'MATA PELAJARAN'}</h2>
          {data.identitas?.materiAjar && <p style={{ margin: 0, fontStyle: 'italic', fontWeight: 500 }}>Topik: {data.identitas.materiAjar}</p>}
        </div>

        {/* 1. IDENTITAS */}
        <div className="doc-section">
          <h3>1. IDENTITAS MODUL</h3>
          <table className="doc-table" style={{ border: 'none' }}>
            <tbody>
              <tr><td width="32%" style={{ border: 'none' }}><strong>Nama Penyusun</strong></td><td style={{ border: 'none' }}>: {data.identitas?.penyusun || '-'}</td></tr>
              <tr><td style={{ border: 'none' }}><strong>Satuan Pendidikan</strong></td><td style={{ border: 'none' }}>: {data.identitas?.instansi || '-'}</td></tr>
              <tr><td style={{ border: 'none' }}><strong>Mata Pelajaran</strong></td><td style={{ border: 'none' }}>: {data.identitas?.mataPelajaran || '-'}</td></tr>
              <tr><td style={{ border: 'none' }}><strong>Kelas / Fase</strong></td><td style={{ border: 'none' }}>: {data.identitas?.faseKelas || '-'}</td></tr>
              <tr><td style={{ border: 'none' }}><strong>Semester</strong></td><td style={{ border: 'none' }}>: {data.identitas?.semester || '-'}</td></tr>
              <tr><td style={{ border: 'none' }}><strong>Materi Pokok</strong></td><td style={{ border: 'none' }}>: {data.identitas?.materiAjar || '-'}</td></tr>
              <tr><td style={{ border: 'none' }}><strong>Bab / Subbab</strong></td><td style={{ border: 'none' }}>: {data.identitas?.babSubbab || '-'}</td></tr>
              <tr><td style={{ border: 'none' }}><strong>Alokasi Waktu</strong></td><td style={{ border: 'none' }}>: {data.identitas?.alokasiWaktu || '-'}</td></tr>
            </tbody>
          </table>
        </div>

        {/* 2. IDENTIFIKASI */}
        <div className="doc-section mt-6">
          <h3>2. IDENTIFIKASI</h3>
          <div className="doc-sub-section mb-3">
            <h4>A. Profil Lulusan (Dimensi Karakter & Kompetensi)</h4>
            {data.identifikasi?.profilLulusan && data.identifikasi.profilLulusan.length > 0 ? (
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.25rem' }}>
                {data.identifikasi.profilLulusan.map((dim, idx) => (
                  <li key={idx}><strong>{dim}</strong></li>
                ))}
              </ul>
            ) : <p style={{ color: '#666' }}>-</p>}
          </div>

          <div className="doc-sub-section mb-3">
            <h4>B. Kompetensi Awal</h4>
            <div dangerouslySetInnerHTML={{ __html: data.identifikasi?.kompetensiAwal || data.inti?.kompetensiAwal || '-' }} />
          </div>

          <div className="doc-sub-section">
            <h4>C. Pemetaan Kebutuhan Pembelajaran</h4>
            <div dangerouslySetInnerHTML={{ __html: data.identifikasi?.pemetaanKebutuhan || data.inti?.pemetaanKebutuhan || '-' }} />
          </div>
        </div>
      </div>

      {/* PAGE 2: DESAIN & PEDAGOGIS DEEP LEARNING */}
      <div className="a4-paper page-break-after" style={globalStyles}>
        {/* 3. DESAIN PEMBELAJARAN */}
        <div className="doc-section">
          <h3>3. DESAIN PEMBELAJARAN</h3>
          <div className="doc-sub-section mb-3">
            <h4>A. Capaian Pembelajaran (CP)</h4>
            <div dangerouslySetInnerHTML={{ __html: data.desainPembelajaran?.capaianPembelajaran || data.inti?.capaianPembelajaran || '-' }} />
          </div>
          <div className="doc-sub-section mb-3">
            <h4>B. Tujuan Pembelajaran (TP)</h4>
            <div dangerouslySetInnerHTML={{ __html: data.desainPembelajaran?.tujuanPembelajaran || data.inti?.tujuanPembelajaran || '-' }} />
          </div>
          <div className="doc-sub-section mb-3">
            <h4>C. Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)</h4>
            <div dangerouslySetInnerHTML={{ __html: data.desainPembelajaran?.kktp || '-' }} />
          </div>
          <div className="doc-sub-section">
            <h4>D. Kategori Ketercapaian</h4>
            <div dangerouslySetInnerHTML={{ __html: data.desainPembelajaran?.kategoriKetercapaian || '-' }} />
          </div>
        </div>

        {/* 4. PRAKTIK PEDAGOGIS DEEP LEARNING */}
        <div className="doc-section mt-6">
          <h3>4. PRAKTIK PEDAGOGIS DEEP LEARNING</h3>
          <div className="theme-card-banner mb-3">
            <h4>A. Mindful Learning (Pembelajaran Berkesadaran)</h4>
            <div dangerouslySetInnerHTML={{ __html: data.pedagogisDeepLearning?.mindfulLearning || '-' }} />
          </div>
          <div className="theme-card-banner mb-3">
            <h4>B. Meaningful Learning (Pembelajaran Bermakna)</h4>
            <div dangerouslySetInnerHTML={{ __html: data.pedagogisDeepLearning?.meaningfulLearning || '-' }} />
          </div>
          <div className="theme-card-banner mb-3">
            <h4>C. Joyful Learning (Pembelajaran Menggembirakan)</h4>
            <div dangerouslySetInnerHTML={{ __html: data.pedagogisDeepLearning?.joyfulLearning || '-' }} />
          </div>
          <div className="doc-sub-section mb-3">
            <h4>D. Model Pembelajaran</h4>
            <div dangerouslySetInnerHTML={{ __html: data.pedagogisDeepLearning?.modelPembelajaran || data.inti?.modelPembelajaran || '-' }} />
          </div>
          <div className="doc-sub-section">
            <h4>E. Metode Pembelajaran</h4>
            <div dangerouslySetInnerHTML={{ __html: data.pedagogisDeepLearning?.metodePembelajaran || data.inti?.metodePembelajaran || '-' }} />
          </div>
        </div>
      </div>

      {/* PAGE 3: MEDIA, SARANA, PEMAHAMAN, PEMANTIK, MATERI */}
      <div className="a4-paper page-break-after" style={globalStyles}>
        {/* 5. MEDIA PEMBELAJARAN */}
        <div className="doc-section">
          <h3>5. MEDIA PEMBELAJARAN</h3>
          <div dangerouslySetInnerHTML={{ __html: data.mediaSarana?.mediaPembelajaran || data.inti?.mediaSaranaPrasarana || '-' }} />
        </div>

        {/* 6. SARANA DAN PRASARANA */}
        <div className="doc-section mt-6">
          <h3>6. SARANA DAN PRASARANA</h3>
          <div dangerouslySetInnerHTML={{ __html: data.mediaSarana?.saranaPrasarana || '-' }} />
        </div>

        {/* 7. PEMAHAMAN BERMAKNA */}
        <div className="doc-section mt-6">
          <h3>7. PEMAHAMAN BERMAKNA</h3>
          <div dangerouslySetInnerHTML={{ __html: data.pemahamanPemantik?.pemahamanBermakna || data.inti?.pemahamanBermakna || '-' }} />
        </div>

        {/* 8. PERTANYAAN PEMANTIK */}
        <div className="doc-section mt-6">
          <h3>8. PERTANYAAN PEMANTIK</h3>
          <div dangerouslySetInnerHTML={{ __html: data.pemahamanPemantik?.pertanyaanPemantik || data.inti?.pertanyaanPemantik || '-' }} />
        </div>

        {/* 9. MATERI PEMBELAJARAN DAN REFERENSI */}
        <div className="doc-section mt-6">
          <h3>9. MATERI PEMBELAJARAN DAN REFERENSI</h3>
          <div className="doc-sub-section mb-4">
            <h4>A. Materi Pembelajaran</h4>
            <div dangerouslySetInnerHTML={{ __html: data.materiReferensi?.materi || '-' }} />
          </div>
          <div className="doc-sub-section">
            <h4>B. Referensi / Daftar Pustaka</h4>
            <div dangerouslySetInnerHTML={{ __html: data.materiReferensi?.referensi || '-' }} />
          </div>
        </div>
      </div>

      {/* PAGE 4: 10. LANGKAH-LANGKAH PEMBELAJARAN */}
      <div className="a4-paper page-break-after" style={globalStyles}>
        <div className="doc-section">
          <h3>10. LANGKAH-LANGKAH PEMBELAJARAN</h3>
          
          {/* Pendahuluan */}
          <table className="layout-table mb-4">
            <tbody>
              <tr>
                <td>
                  <div className="doc-sub-section">
                    <h4 className="bordered-box-title" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${currentTheme.border}`, paddingBottom: '6px', marginBottom: '12px' }}>
                      <span>1. Kegiatan Pendahuluan (Mindful & Apersepsi)</span>
                      <span>({data.langkah?.pendahuluan?.durasi || '15'} Menit)</span>
                    </h4>
                    <div dangerouslySetInnerHTML={{ __html: data.langkah?.pendahuluan?.kegiatan || '-' }} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Inti */}
          <table className="layout-table mb-4">
            <tbody>
              <tr>
                <td>
                  <div className="doc-sub-section">
                    <h4 className="bordered-box-title" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${currentTheme.border}`, paddingBottom: '6px', marginBottom: '12px' }}>
                      <span>2. Kegiatan Inti (Sintaks Deep Learning: Memahami, Mengaplikasi, Merefleksi)</span>
                      <span>({data.langkah?.inti?.durasi || '60'} Menit)</span>
                    </h4>
                    <div dangerouslySetInnerHTML={{ __html: data.langkah?.inti?.kegiatan || '-' }} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Penutup */}
          <table className="layout-table">
            <tbody>
              <tr>
                <td>
                  <div className="doc-sub-section">
                    <h4 className="bordered-box-title" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${currentTheme.border}`, paddingBottom: '6px', marginBottom: '12px' }}>
                      <span>3. Kegiatan Penutup (Refleksi Bermakna & Apresiasi Joyful)</span>
                      <span>({data.langkah?.penutup?.durasi || '15'} Menit)</span>
                    </h4>
                    <div dangerouslySetInnerHTML={{ __html: data.langkah?.penutup?.kegiatan || '-' }} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGE 5: LAMPIRAN & PENGESAHAN */}
      <div className="a4-paper" style={globalStyles}>
        <div className="doc-section">
          <h3>LAMPIRAN</h3>
          <div className="doc-sub-section mb-6">
            <h4>A. Lembar Kerja Peserta Didik (LKPD)</h4>
            <div dangerouslySetInnerHTML={{ __html: data.lampiran?.lkpd || '-' }} />
          </div>
          <div className="doc-sub-section mb-6">
            <h4>B. Instrumen & Rubrik Asesmen</h4>
            <div dangerouslySetInnerHTML={{ __html: data.lampiran?.asesmen || '-' }} />
          </div>
        </div>

        {/* Pengesahan */}
        <div className="doc-section mt-10" style={{ marginTop: '3rem', pageBreakInside: 'avoid' }}>
          <table style={{ width: '100%', border: 'none', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ width: '50%', textAlign: 'center', border: 'none', paddingTop: '10px' }}>
                  <p style={{ margin: 0 }}>Mengetahui,</p>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Kepala Satuan Pendidikan</p><br /><br /><br /><br />
                  <p style={{ margin: 0, textDecoration: 'underline', fontWeight: 'bold' }}>{data.lampiran?.kepalaSekolahNama || '________________________'}</p>
                  <p style={{ margin: 0, marginTop: '4px' }}>NIP. {data.lampiran?.kepalaSekolahNip || '________________'}</p>
                </td>
                <td style={{ width: '50%', textAlign: 'center', border: 'none', paddingTop: '10px' }}>
                  <p style={{ margin: 0 }}>{getFormattedPengesahanDate(data.lampiran?.tanggalPengesahan)}</p>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Guru Mata Pelajaran</p><br /><br /><br /><br />
                  <p style={{ margin: 0, textDecoration: 'underline', fontWeight: 'bold' }}>{data.lampiran?.guruMapelNama || '________________________'}</p>
                  <p style={{ margin: 0, marginTop: '4px' }}>NIP. {data.lampiran?.guruMapelNip || '________________'}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  // 2. RENDER FORMAT TABEL RPP DEEP LEARNING
  const renderTabelCanvas = () => (
    <>
      <div className="a4-paper page-break-after" style={globalStyles}>
        <div className="doc-header" style={{ textAlign: 'center', marginBottom: '1.5rem', borderBottom: `2.5px solid ${currentTheme.primary}`, paddingBottom: '0.75rem' }}>
          <h1 style={{ fontWeight: 'bold', fontSize: '14pt', color: currentTheme.primary }}>MODUL AJAR PEMBELAJARAN MENDALAM (DEEP LEARNING)</h1>
          <h2 style={{ fontWeight: 'bold', margin: '0', fontSize: '12pt' }}>{data.identitas?.mataPelajaran ? data.identitas.mataPelajaran.toUpperCase() : 'MATA PELAJARAN'}</h2>
        </div>

        {/* 1. Identitas Table */}
        <table className="doc-table layout-table table-rpp" style={{ marginBottom: '16px' }}>
          <tbody>
            <tr><th colSpan="2" className="table-header-styled">1. IDENTITAS</th></tr>
            <tr><td width="30%"><strong>Nama Penyusun</strong></td><td>{data.identitas?.penyusun || '-'}</td></tr>
            <tr><td><strong>Satuan Pendidikan</strong></td><td>{data.identitas?.instansi || '-'}</td></tr>
            <tr><td><strong>Mata Pelajaran</strong></td><td>{data.identitas?.mataPelajaran || '-'}</td></tr>
            <tr><td><strong>Kelas / Fase</strong></td><td>{data.identitas?.faseKelas || '-'}</td></tr>
            <tr><td><strong>Semester</strong></td><td>{data.identitas?.semester || '-'}</td></tr>
            <tr><td><strong>Materi Pokok</strong></td><td>{data.identitas?.materiAjar || '-'}</td></tr>
            <tr><td><strong>Bab / Subbab</strong></td><td>{data.identitas?.babSubbab || '-'}</td></tr>
            <tr><td><strong>Alokasi Waktu</strong></td><td>{data.identitas?.alokasiWaktu || '-'}</td></tr>
          </tbody>
        </table>

        {/* 2. Identifikasi Table */}
        <table className="doc-table layout-table table-rpp" style={{ marginBottom: '16px' }}>
          <tbody>
            <tr><th colSpan="2" className="table-header-styled">2. IDENTIFIKASI</th></tr>
            <tr>
              <td width="30%"><strong>Profil Lulusan</strong></td>
              <td>
                {data.identifikasi?.profilLulusan && data.identifikasi.profilLulusan.length > 0 ? (
                  <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                    {data.identifikasi.profilLulusan.map((dim, idx) => (<li key={idx}><strong>{dim}</strong></li>))}
                  </ul>
                ) : '-'}
              </td>
            </tr>
            <tr><td><strong>Kompetensi Awal</strong></td><td><div dangerouslySetInnerHTML={{ __html: data.identifikasi?.kompetensiAwal || '-' }} /></td></tr>
            <tr><td><strong>Pemetaan Kebutuhan</strong></td><td><div dangerouslySetInnerHTML={{ __html: data.identifikasi?.pemetaanKebutuhan || '-' }} /></td></tr>
          </tbody>
        </table>

        {/* 3. Desain Pembelajaran Table */}
        <table className="doc-table layout-table table-rpp" style={{ marginBottom: '16px' }}>
          <tbody>
            <tr><th colSpan="2" className="table-header-styled">3. DESAIN PEMBELAJARAN</th></tr>
            <tr><td width="30%"><strong>Capaian Pembelajaran (CP)</strong></td><td><div dangerouslySetInnerHTML={{ __html: data.desainPembelajaran?.capaianPembelajaran || data.inti?.capaianPembelajaran || '-' }} /></td></tr>
            <tr><td><strong>Tujuan Pembelajaran (TP)</strong></td><td><div dangerouslySetInnerHTML={{ __html: data.desainPembelajaran?.tujuanPembelajaran || data.inti?.tujuanPembelajaran || '-' }} /></td></tr>
            <tr><td><strong>KKTP</strong></td><td><div dangerouslySetInnerHTML={{ __html: data.desainPembelajaran?.kktp || '-' }} /></td></tr>
            <tr><td><strong>Kategori Ketercapaian</strong></td><td><div dangerouslySetInnerHTML={{ __html: data.desainPembelajaran?.kategoriKetercapaian || '-' }} /></td></tr>
          </tbody>
        </table>
      </div>

      {/* PAGE 2 Table */}
      <div className="a4-paper page-break-after" style={globalStyles}>
        {/* 4. Praktik Pedagogis Deep Learning Table */}
        <table className="doc-table layout-table table-rpp" style={{ marginBottom: '16px' }}>
          <tbody>
            <tr><th colSpan="2" className="table-header-styled">4. PRAKTIK PEDAGOGIS DEEP LEARNING</th></tr>
            <tr><td width="30%"><strong>Mindful Learning</strong></td><td><div dangerouslySetInnerHTML={{ __html: data.pedagogisDeepLearning?.mindfulLearning || '-' }} /></td></tr>
            <tr><td><strong>Meaningful Learning</strong></td><td><div dangerouslySetInnerHTML={{ __html: data.pedagogisDeepLearning?.meaningfulLearning || '-' }} /></td></tr>
            <tr><td><strong>Joyful Learning</strong></td><td><div dangerouslySetInnerHTML={{ __html: data.pedagogisDeepLearning?.joyfulLearning || '-' }} /></td></tr>
            <tr><td><strong>Model Pembelajaran</strong></td><td><div dangerouslySetInnerHTML={{ __html: data.pedagogisDeepLearning?.modelPembelajaran || data.inti?.modelPembelajaran || '-' }} /></td></tr>
            <tr><td><strong>Metode Pembelajaran</strong></td><td><div dangerouslySetInnerHTML={{ __html: data.pedagogisDeepLearning?.metodePembelajaran || data.inti?.metodePembelajaran || '-' }} /></td></tr>
          </tbody>
        </table>

        {/* 5 & 6 Media & Sarana */}
        <table className="doc-table layout-table table-rpp" style={{ marginBottom: '16px' }}>
          <tbody>
            <tr><th colSpan="2" className="table-header-styled">5 & 6. MEDIA, SARANA & PRASARANA</th></tr>
            <tr><td width="30%"><strong>5. Media Pembelajaran</strong></td><td><div dangerouslySetInnerHTML={{ __html: data.mediaSarana?.mediaPembelajaran || '-' }} /></td></tr>
            <tr><td><strong>6. Sarana & Prasarana</strong></td><td><div dangerouslySetInnerHTML={{ __html: data.mediaSarana?.saranaPrasarana || '-' }} /></td></tr>
          </tbody>
        </table>

        {/* 7 & 8 Pemahaman & Pemantik */}
        <table className="doc-table layout-table table-rpp" style={{ marginBottom: '16px' }}>
          <tbody>
            <tr><th colSpan="2" className="table-header-styled">7 & 8. PEMAHAMAN BERMAKNA & PERTANYAAN PEMANTIK</th></tr>
            <tr><td width="30%"><strong>7. Pemahaman Bermakna</strong></td><td><div dangerouslySetInnerHTML={{ __html: data.pemahamanPemantik?.pemahamanBermakna || data.inti?.pemahamanBermakna || '-' }} /></td></tr>
            <tr><td><strong>8. Pertanyaan Pemantik</strong></td><td><div dangerouslySetInnerHTML={{ __html: data.pemahamanPemantik?.pertanyaanPemantik || data.inti?.pertanyaanPemantik || '-' }} /></td></tr>
          </tbody>
        </table>

        {/* 9. Materi dan Referensi Table */}
        <table className="doc-table layout-table table-rpp" style={{ marginBottom: '16px' }}>
          <tbody>
            <tr><th colSpan="2" className="table-header-styled">9. MATERI PEMBELAJARAN DAN REFERENSI</th></tr>
            <tr><td width="30%"><strong>Materi Pembelajaran</strong></td><td><div dangerouslySetInnerHTML={{ __html: data.materiReferensi?.materi || '-' }} /></td></tr>
            <tr><td><strong>Daftar Pustaka</strong></td><td><div dangerouslySetInnerHTML={{ __html: data.materiReferensi?.referensi || '-' }} /></td></tr>
          </tbody>
        </table>
      </div>

      {/* PAGE 3 Table: Langkah & Lampiran */}
      <div className="a4-paper" style={globalStyles}>
        {/* 10. Langkah-Langkah Table */}
        <table className="doc-table layout-table table-rpp" style={{ marginBottom: '16px' }}>
          <tbody>
            <tr><th colSpan="2" className="table-header-styled">10. LANGKAH-LANGKAH PEMBELAJARAN</th></tr>
            <tr>
              <td width="30%"><strong>1. Pendahuluan</strong><br/><br/><em>({data.langkah?.pendahuluan?.durasi || '15'} Menit)</em></td>
              <td><div dangerouslySetInnerHTML={{ __html: data.langkah?.pendahuluan?.kegiatan || '-' }} /></td>
            </tr>
            <tr>
              <td><strong>2. Kegiatan Inti (Deep Learning)</strong><br/><br/><em>({data.langkah?.inti?.durasi || '60'} Menit)</em></td>
              <td><div dangerouslySetInnerHTML={{ __html: data.langkah?.inti?.kegiatan || '-' }} /></td>
            </tr>
            <tr>
              <td><strong>3. Kegiatan Penutup</strong><br/><br/><em>({data.langkah?.penutup?.durasi || '15'} Menit)</em></td>
              <td><div dangerouslySetInnerHTML={{ __html: data.langkah?.penutup?.kegiatan || '-' }} /></td>
            </tr>
          </tbody>
        </table>

        {/* Lampiran Table */}
        <table className="doc-table layout-table table-rpp" style={{ marginBottom: '16px' }}>
          <tbody>
            <tr><th colSpan="2" className="table-header-styled">LAMPIRAN & ASESMEN</th></tr>
            <tr><td width="30%"><strong>A. LKPD</strong></td><td><div dangerouslySetInnerHTML={{ __html: data.lampiran?.lkpd || '-' }} /></td></tr>
            <tr><td><strong>B. Rubrik Asesmen</strong></td><td><div dangerouslySetInnerHTML={{ __html: data.lampiran?.asesmen || '-' }} /></td></tr>
          </tbody>
        </table>

        {/* Pengesahan */}
        <div className="doc-section mt-8" style={{ marginTop: '2.5rem', pageBreakInside: 'avoid' }}>
          <table style={{ width: '100%', border: 'none', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ width: '50%', textAlign: 'center', border: 'none', paddingTop: '10px' }}>
                  <p style={{ margin: 0 }}>Mengetahui,</p>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Kepala Satuan Pendidikan</p><br /><br /><br /><br />
                  <p style={{ margin: 0, textDecoration: 'underline', fontWeight: 'bold' }}>{data.lampiran?.kepalaSekolahNama || '________________________'}</p>
                  <p style={{ margin: 0, marginTop: '4px' }}>NIP. {data.lampiran?.kepalaSekolahNip || '________________'}</p>
                </td>
                <td style={{ width: '50%', textAlign: 'center', border: 'none', paddingTop: '10px' }}>
                  <p style={{ margin: 0 }}>{getFormattedPengesahanDate(data.lampiran?.tanggalPengesahan)}</p>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Guru Mata Pelajaran</p><br /><br /><br /><br />
                  <p style={{ margin: 0, textDecoration: 'underline', fontWeight: 'bold' }}>{data.lampiran?.guruMapelNama || '________________________'}</p>
                  <p style={{ margin: 0, marginTop: '4px' }}>NIP. {data.lampiran?.guruMapelNip || '________________'}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content preview-modal-content">
        {/* Top Header */}
        <div className="preview-header-top">
          <div className="flex items-center gap-2">
            <h2 className="preview-modal-title">
              Pratinjau Modul Ajar
            </h2>
          </div>
          <button className="btn btn-icon preview-close-btn" onClick={onClose} title="Tutup">
            <X size={18} color="#475569" />
          </button>
        </div>

        {/* Toolbar Controls Bar */}
        <div className="preview-toolbar-bar">
          <div className="preview-controls-row">
            {/* Layout Dropdown */}
            <div className="preview-control-item">
              <label className="preview-control-label">
                <LayoutTemplate size={13} /> Layout:
              </label>
              <select 
                className="preview-select" 
                value={layoutType} 
                onChange={(e) => setLayoutType(e.target.value)}
              >
                <option value="kotak">Format Kotak Modern</option>
                <option value="tabel">Format Tabel Matriks RPP</option>
              </select>
            </div>

            {/* Single Compact Theme Dropdown */}
            <div className="preview-control-item">
              <label className="preview-control-label">
                <Palette size={13} /> Tema:
              </label>
              <div className="theme-single-picker">
                <span 
                  className="theme-single-dot" 
                  style={{ backgroundColor: currentTheme.primary }} 
                />
                <select 
                  value={selectedThemeId} 
                  onChange={(e) => setSelectedThemeId(e.target.value)}
                  className="preview-select theme-select"
                >
                  {colorThemes.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Export Action Buttons (Desktop & Tablet) */}
          <div className="preview-actions-row preview-actions-desktop">
            <button 
              className="btn btn-primary preview-btn-export" 
              onClick={handleDownloadPDF} 
              disabled={isExporting} 
              style={{ backgroundColor: currentTheme.primary, borderColor: currentTheme.primary }}
            >
              {isExporting ? <Loader2 className="animate-spin" size={14}/> : <Download size={14} />} Unduh PDF
            </button>
            <button 
              className="btn btn-secondary preview-btn-export" 
              onClick={handleDownloadWord} 
              disabled={isExporting} 
              style={{ backgroundColor: '#2B579A', color: 'white', borderColor: '#2B579A' }}
            >
              {isExporting ? <Loader2 className="animate-spin" size={14}/> : <FileText size={14} />} Unduh Word (.docx)
            </button>
          </div>
        </div>

        <div className="modal-body preview-modal-body">
          <div className="preview-sheet-wrapper">
            <div ref={printRef} className="print-root" style={{ width: '100%', maxWidth: '210mm', backgroundColor: 'transparent', margin: '0 auto', textAlign: 'left', display: 'block' }}>
              {layoutType === 'kotak' ? renderKotakCanvas() : renderTabelCanvas()}
            </div>
          </div>
        </div>

        {/* Mobile Sticky Bottom Download Bar */}
        <div className="preview-mobile-bottom-bar">
          <button 
            className="btn btn-primary preview-mobile-btn" 
            onClick={handleDownloadPDF} 
            disabled={isExporting} 
            style={{ backgroundColor: currentTheme.primary, borderColor: currentTheme.primary }}
          >
            {isExporting ? <Loader2 className="animate-spin" size={15}/> : <Download size={15} />} Unduh PDF
          </button>
          <button 
            className="btn btn-secondary preview-mobile-btn" 
            onClick={handleDownloadWord} 
            disabled={isExporting} 
            style={{ backgroundColor: '#2B579A', color: 'white', borderColor: '#2B579A' }}
          >
            {isExporting ? <Loader2 className="animate-spin" size={15}/> : <FileText size={15} />} Unduh Word (.docx)
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
