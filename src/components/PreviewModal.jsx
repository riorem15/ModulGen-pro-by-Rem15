import React, { useRef, useState } from 'react';
import { X, Download, FileText, Loader2, LayoutTemplate } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import './PreviewModal.css';

const PreviewModal = ({ data, onClose }) => {
  const printRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [layoutType, setLayoutType] = useState('kotak');

  const globalStyles = {
    fontFamily: data.identitas.fontFamily || 'Poppins',
    fontSize: data.identitas.fontSize || '12pt',
    lineHeight: data.identitas.lineSpacing || '1.5',
  };

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
    
    // Override centering that causes html2canvas offsets and cutoff
    parentContainer.style.alignItems = 'flex-start';
    modalBody.style.justifyContent = 'flex-start';
    modalBody.style.padding = '0';
    
    window.scrollTo(0, 0);
    element.classList.add('is-exporting');

    try {
      const opt = {
        margin: [25, 25, 25, 30], // Top, Right, Bottom, Left in mm
        filename: `Modul_Ajar_${data.identitas.mataPelajaran || 'Modul'}.pdf`,
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
          avoid: ['tr', 'h3', 'h4', '.doc-sub-section', '.avoid-break', '.layout-table']
        }
      };
      // Short delay to ensure browser repaints the layout change (flex-start) before capturing
      await new Promise(resolve => setTimeout(resolve, 150));
      await html2pdf().set(opt).from(element).toPdf().get('pdf').then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(9);
          pdf.setTextColor(100);
          pdf.text('Page ' + i, 30, pdf.internal.pageSize.getHeight() - 15);
        }
      }).save();
    } catch (err) {
      console.error('Error generating PDF', err);
      // alert('Gagal membuat PDF.');
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
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>Export HTML to Word</title>
          <style>
            @page { margin: 20mm; }
            body { font-family: '${globalStyles.fontFamily}', sans-serif; font-size: ${globalStyles.fontSize}; line-height: ${globalStyles.lineHeight}; }
            table { border-collapse: collapse; width: 100%; border: 1px solid black; }
            th, td { border: 1px solid black; padding: 5px; vertical-align: top; }
            img { max-width: 100%; height: auto; }
            .bordered-box { border: 1px solid black; padding: 12px; margin-bottom: 16px; border-radius: 4px; }
            .bordered-box-title { border-bottom: 1px solid #ccc; padding-bottom: 8px; margin-bottom: 8px; font-weight: bold; }
          </style>
        </head>
        <body>
          ${printRef.current.innerHTML}
        </body>
        </html>
      `;
      const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
      const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(htmlContent);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Modul_Ajar_${data.identitas.mataPelajaran || 'Modul'}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      alert('Gagal membuat Word Document.');
    } finally {
      setIsExporting(false);
    }
  };

  const renderKotakCanvas = () => (
    <>
      <div className="a4-paper page-break-after" style={globalStyles}>
        <div className="doc-header" style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '2px solid black', paddingBottom: '1rem' }}>
          <h1 style={{ fontWeight: 'bold' }}>MODUL AJAR</h1>
          <h2 style={{ fontWeight: 'bold', margin: '0' }}>{data.identitas.mataPelajaran ? data.identitas.mataPelajaran.toUpperCase() : 'MATA PELAJARAN'}</h2>
        </div>

        <div className="doc-section">
          <h3>I. INFORMASI UMUM</h3>
          <table className="doc-table" style={{ border: 'none' }}>
            <tbody>
              <tr><td width="30%" style={{ border: 'none' }}><strong>Nama Penyusun</strong></td><td style={{ border: 'none' }}>: {data.identitas.penyusun}</td></tr>
              <tr><td style={{ border: 'none' }}><strong>Instansi</strong></td><td style={{ border: 'none' }}>: {data.identitas.instansi}</td></tr>
              <tr><td style={{ border: 'none' }}><strong>Mata Pelajaran</strong></td><td style={{ border: 'none' }}>: {data.identitas.mataPelajaran}</td></tr>
              <tr><td style={{ border: 'none' }}><strong>Fase / Kelas</strong></td><td style={{ border: 'none' }}>: {data.identitas.faseKelas}</td></tr>
              <tr><td style={{ border: 'none' }}><strong>Semester</strong></td><td style={{ border: 'none' }}>: {data.identitas.semester}</td></tr>
              <tr><td style={{ border: 'none' }}><strong>Materi Ajar</strong></td><td style={{ border: 'none' }}>: {data.identitas.materiAjar}</td></tr>
              <tr><td style={{ border: 'none' }}><strong>Alokasi Waktu</strong></td><td style={{ border: 'none' }}>: {data.identitas.alokasiWaktu}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="doc-section mt-8">
          <h3>II. KOMPONEN INTI</h3>
          <div className="doc-sub-section mb-4">
            <h4>A. Profil Pelajar Pancasila</h4>
            {data.inti.profilPancasila && data.inti.profilPancasila.length > 0 ? (
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                {data.inti.profilPancasila.map((profil, idx) => (<li key={idx}>{profil}</li>))}
              </ul>
            ) : <p style={{ marginTop: '0.5rem', color: '#666' }}>-</p>}
          </div>
          <div className="doc-sub-section"><h4>B. Model Pembelajaran</h4><div dangerouslySetInnerHTML={{ __html: data.inti.modelPembelajaran || '-' }} /></div>
          <div className="doc-sub-section mt-4"><h4>C. Metode Pembelajaran</h4><div dangerouslySetInnerHTML={{ __html: data.inti.metodePembelajaran || '-' }} /></div>
          <div className="doc-sub-section mt-4"><h4>D. Media, Sarana dan Prasarana</h4><div dangerouslySetInnerHTML={{ __html: data.inti.mediaSaranaPrasarana || '-' }} /></div>
          <div className="doc-sub-section mt-4"><h4>E. Capaian Pembelajaran</h4><div dangerouslySetInnerHTML={{ __html: data.inti.capaianPembelajaran }} /></div>
          <div className="doc-sub-section mt-4"><h4>F. Tujuan Pembelajaran</h4><div dangerouslySetInnerHTML={{ __html: data.inti.tujuanPembelajaran }} /></div>
          <div className="doc-sub-section mt-4"><h4>G. Pemahaman Bermakna</h4><div dangerouslySetInnerHTML={{ __html: data.inti.pemahamanBermakna }} /></div>
          <div className="doc-sub-section mt-4"><h4>H. Pertanyaan Pemantik</h4><div dangerouslySetInnerHTML={{ __html: data.inti.pertanyaanPemantik }} /></div>
        </div>
      </div>

      <div className="a4-paper page-break-after" style={globalStyles}>
        <div className="doc-section mt-6">
          <h3>III. MATERI DAN REFERENSI</h3>
          <div className="doc-sub-section">
            <h4>A. Materi Pembelajaran</h4><div dangerouslySetInnerHTML={{ __html: data.materiReferensi?.materi || '-' }} />
          </div>
          <table className="layout-table" style={{ marginTop: '24px' }}>
            <tbody>
              <tr>
                <td>
                  <div className="doc-sub-section">
                    <h4 style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', marginBottom: '16px' }}>B. Referensi / Daftar Pustaka</h4>
                    <div dangerouslySetInnerHTML={{ __html: data.materiReferensi?.referensi || '-' }} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="a4-paper page-break-after" style={globalStyles}>
        <div className="doc-section mt-6">
          <h3>IV. LANGKAH-LANGKAH PEMBELAJARAN</h3>
          <table className="layout-table"><tbody><tr><td>
            <div className="doc-sub-section">
              <h4 className="bordered-box-title" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', paddingBottom: '8px', marginBottom: '16px' }}>
                <span>1. Kegiatan Pendahuluan</span><span>({data.langkah.pendahuluan.durasi} Menit)</span>
              </h4>
              <div dangerouslySetInnerHTML={{ __html: data.langkah.pendahuluan.kegiatan }} />
            </div>
          </td></tr></tbody></table>

          <table className="layout-table"><tbody><tr><td>
            <div className="doc-sub-section">
              <h4 className="bordered-box-title" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', paddingBottom: '8px', marginBottom: '16px' }}>
                <span>2. Kegiatan Inti</span><span>({data.langkah.inti.durasi} Menit)</span>
              </h4>
              <div dangerouslySetInnerHTML={{ __html: data.langkah.inti.kegiatan }} />
            </div>
          </td></tr></tbody></table>

          <table className="layout-table"><tbody><tr><td>
            <div className="doc-sub-section">
              <h4 className="bordered-box-title" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', paddingBottom: '8px', marginBottom: '16px' }}>
                <span>3. Kegiatan Penutup</span><span>({data.langkah.penutup.durasi} Menit)</span>
              </h4>
              <div dangerouslySetInnerHTML={{ __html: data.langkah.penutup.kegiatan }} />
            </div>
          </td></tr></tbody></table>
        </div>
      </div>

      <div className="a4-paper" style={globalStyles}>
        <div className="doc-section mt-6">
          <h3>V. LAMPIRAN</h3>
          <div className="doc-sub-section mt-4"><h4>A. Lembar Kerja Peserta Didik (LKPD)</h4><div dangerouslySetInnerHTML={{ __html: data.lampiran.lkpd || '-' }} /></div>
          <div className="doc-sub-section mt-8"><h4>B. Rubrik / Instrumen Asesmen</h4><div dangerouslySetInnerHTML={{ __html: data.lampiran.asesmen || '-' }} /></div>
        </div>

        <div className="doc-section mt-12" style={{ marginTop: '4rem', pageBreakInside: 'avoid' }}>
          <table style={{ width: '100%', border: 'none', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ width: '50%', textAlign: 'center', border: 'none', paddingTop: '10px' }}>
                  <p style={{ margin: 0 }}>Mengetahui,</p>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Kepala Sekolah</p><br /><br /><br /><br />
                  <p style={{ margin: 0, textDecoration: 'underline', fontWeight: 'bold' }}>{data.lampiran.kepalaSekolahNama || '________________________'}</p>
                  <p style={{ margin: 0, marginTop: '4px' }}>NIP. {data.lampiran.kepalaSekolahNip || '________________'}</p>
                </td>
                <td style={{ width: '50%', textAlign: 'center', border: 'none', paddingTop: '10px' }}>
                  <p style={{ margin: 0 }}>{data.lampiran.tanggalPengesahan || '.............., .................... 20...'}</p>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Guru Mata Pelajaran</p><br /><br /><br /><br />
                  <p style={{ margin: 0, textDecoration: 'underline', fontWeight: 'bold' }}>{data.lampiran.guruMapelNama || '________________________'}</p>
                  <p style={{ margin: 0, marginTop: '4px' }}>NIP. {data.lampiran.guruMapelNip || '________________'}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderTabelCanvas = () => (
    <>
      <div className="a4-paper page-break-after" style={globalStyles}>
        <div className="doc-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontWeight: 'bold' }}>MODUL AJAR (FORMAT RPP)</h1>
          <h2 style={{ fontWeight: 'bold', margin: '0' }}>{data.identitas.mataPelajaran ? data.identitas.mataPelajaran.toUpperCase() : 'MATA PELAJARAN'}</h2>
        </div>

        <table className="doc-table layout-table table-rpp" style={{ border: '1px solid black', marginBottom: '24px' }}>
          <tbody>
            <tr><th colSpan="2" style={{ backgroundColor: '#f1f5f9', border: '1px solid black', padding: '10px', textAlign: 'left', fontSize: 'inherit' }}>I. INFORMASI UMUM</th></tr>
            <tr><td width="30%" style={{ border: '1px solid black', padding: '10px' }}><strong>Nama Penyusun</strong></td><td style={{ border: '1px solid black', padding: '10px' }}>{data.identitas.penyusun}</td></tr>
            <tr><td style={{ border: '1px solid black', padding: '10px' }}><strong>Instansi</strong></td><td style={{ border: '1px solid black', padding: '10px' }}>{data.identitas.instansi}</td></tr>
            <tr><td style={{ border: '1px solid black', padding: '10px' }}><strong>Mata Pelajaran</strong></td><td style={{ border: '1px solid black', padding: '10px' }}>{data.identitas.mataPelajaran}</td></tr>
            <tr><td style={{ border: '1px solid black', padding: '10px' }}><strong>Fase / Kelas</strong></td><td style={{ border: '1px solid black', padding: '10px' }}>{data.identitas.faseKelas}</td></tr>
            <tr><td style={{ border: '1px solid black', padding: '10px' }}><strong>Semester</strong></td><td style={{ border: '1px solid black', padding: '10px' }}>{data.identitas.semester}</td></tr>
            <tr><td style={{ border: '1px solid black', padding: '10px' }}><strong>Materi Ajar</strong></td><td style={{ border: '1px solid black', padding: '10px' }}>{data.identitas.materiAjar}</td></tr>
            <tr><td style={{ border: '1px solid black', padding: '10px' }}><strong>Alokasi Waktu</strong></td><td style={{ border: '1px solid black', padding: '10px' }}>{data.identitas.alokasiWaktu}</td></tr>
          </tbody>
        </table>

        {/* Tabel: KOMPONEN INTI (Lanjutan) */}
        <table className="doc-table layout-table table-rpp mt-8" style={{ border: '1px solid black', marginBottom: '24px' }}>
          <tbody>
            <tr><th colSpan="2" style={{ backgroundColor: '#f1f5f9', border: '1px solid black', padding: '10px', textAlign: 'left', fontSize: 'inherit' }}>II. KOMPONEN INTI</th></tr>
            <tr>
              <td width="30%" style={{ border: '1px solid black', padding: '10px' }}><strong>A. Profil Pelajar Pancasila</strong></td>
              <td style={{ border: '1px solid black', padding: '10px' }}>
                {data.inti.profilPancasila && data.inti.profilPancasila.length > 0 ? (
                  <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>{data.inti.profilPancasila.map((profil, idx) => (<li key={idx}>{profil}</li>))}</ul>
                ) : '-'}
              </td>
            </tr>
            <tr><td style={{ border: '1px solid black', padding: '10px' }}><strong>B. Model Pembelajaran</strong></td><td style={{ border: '1px solid black', padding: '10px' }}><div dangerouslySetInnerHTML={{ __html: data.inti.modelPembelajaran || '-' }} /></td></tr>
            <tr><td style={{ border: '1px solid black', padding: '10px' }}><strong>C. Metode Pembelajaran</strong></td><td style={{ border: '1px solid black', padding: '10px' }}><div dangerouslySetInnerHTML={{ __html: data.inti.metodePembelajaran || '-' }} /></td></tr>
            <tr><td style={{ border: '1px solid black', padding: '10px' }}><strong>D. Sarana & Prasarana</strong></td><td style={{ border: '1px solid black', padding: '10px' }}><div dangerouslySetInnerHTML={{ __html: data.inti.mediaSaranaPrasarana || '-' }} /></td></tr>
            <tr><td style={{ border: '1px solid black', padding: '10px' }}><strong>E. Capaian Pembelajaran</strong></td><td style={{ border: '1px solid black', padding: '10px' }}><div dangerouslySetInnerHTML={{ __html: data.inti.capaianPembelajaran }} /></td></tr>
            <tr><td style={{ border: '1px solid black', padding: '10px' }}><strong>F. Tujuan Pembelajaran</strong></td><td style={{ border: '1px solid black', padding: '10px' }}><div dangerouslySetInnerHTML={{ __html: data.inti.tujuanPembelajaran }} /></td></tr>
            <tr><td style={{ border: '1px solid black', padding: '10px' }}><strong>G. Pemahaman Bermakna</strong></td><td style={{ border: '1px solid black', padding: '10px' }}><div dangerouslySetInnerHTML={{ __html: data.inti.pemahamanBermakna }} /></td></tr>
            <tr><td style={{ border: '1px solid black', padding: '10px' }}><strong>H. Pertanyaan Pemantik</strong></td><td style={{ border: '1px solid black', padding: '10px' }}><div dangerouslySetInnerHTML={{ __html: data.inti.pertanyaanPemantik }} /></td></tr>
          </tbody>
        </table>
      </div>

      <div className="a4-paper page-break-after" style={globalStyles}>
        <table className="doc-table layout-table table-rpp" style={{ border: '1px solid black', marginBottom: '24px' }}>
          <tbody>
            <tr><th colSpan="2" style={{ backgroundColor: '#f1f5f9', border: '1px solid black', padding: '10px', textAlign: 'left', fontSize: 'inherit' }}>III. MATERI DAN REFERENSI</th></tr>
            <tr><td width="30%" style={{ border: '1px solid black', padding: '10px' }}><strong>A. Materi Pembelajaran</strong></td><td style={{ border: '1px solid black', padding: '10px' }}><div dangerouslySetInnerHTML={{ __html: data.materiReferensi?.materi || '-' }} /></td></tr>
            <tr><td style={{ border: '1px solid black', padding: '10px' }}><strong>B. Daftar Pustaka</strong></td><td style={{ border: '1px solid black', padding: '10px' }}><div dangerouslySetInnerHTML={{ __html: data.materiReferensi?.referensi || '-' }} /></td></tr>
          </tbody>
        </table>

        <table className="doc-table layout-table table-rpp" style={{ border: '1px solid black', marginBottom: '24px' }}>
          <tbody>
            <tr><th colSpan="2" style={{ backgroundColor: '#f1f5f9', border: '1px solid black', padding: '10px', textAlign: 'left', fontSize: 'inherit' }}>IV. LANGKAH-LANGKAH PEMBELAJARAN</th></tr>
            <tr>
              <td width="30%" style={{ border: '1px solid black', padding: '10px' }}><strong>1. Pendahuluan</strong><br/><br/><em>{data.langkah.pendahuluan.durasi} Menit</em></td>
              <td style={{ border: '1px solid black', padding: '10px' }}><div dangerouslySetInnerHTML={{ __html: data.langkah.pendahuluan.kegiatan }} /></td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '10px' }}><strong>2. Kegiatan Inti</strong><br/><br/><em>{data.langkah.inti.durasi} Menit</em></td>
              <td style={{ border: '1px solid black', padding: '10px' }}><div dangerouslySetInnerHTML={{ __html: data.langkah.inti.kegiatan }} /></td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '10px' }}><strong>3. Penutup</strong><br/><br/><em>{data.langkah.penutup.durasi} Menit</em></td>
              <td style={{ border: '1px solid black', padding: '10px' }}><div dangerouslySetInnerHTML={{ __html: data.langkah.penutup.kegiatan }} /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="a4-paper" style={globalStyles}>
        <table className="doc-table layout-table table-rpp" style={{ border: '1px solid black', marginBottom: '24px' }}>
          <tbody>
            <tr><th colSpan="2" style={{ backgroundColor: '#f1f5f9', border: '1px solid black', padding: '10px', textAlign: 'left', fontSize: 'inherit' }}>V. LAMPIRAN</th></tr>
            <tr><td width="30%" style={{ border: '1px solid black', padding: '10px' }}><strong>A. Lembar Kerja Peserta Didik (LKPD)</strong></td><td style={{ border: '1px solid black', padding: '10px' }}><div dangerouslySetInnerHTML={{ __html: data.lampiran.lkpd || '-' }} /></td></tr>
            <tr><td style={{ border: '1px solid black', padding: '10px' }}><strong>B. Rubrik / Instrumen Asesmen</strong></td><td style={{ border: '1px solid black', padding: '10px' }}><div dangerouslySetInnerHTML={{ __html: data.lampiran.asesmen || '-' }} /></td></tr>
          </tbody>
        </table>

        <div className="doc-section mt-12" style={{ marginTop: '4rem', pageBreakInside: 'avoid' }}>
          <table style={{ width: '100%', border: 'none', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ width: '50%', textAlign: 'center', border: 'none', paddingTop: '10px' }}>
                  <p style={{ margin: 0 }}>Mengetahui,</p>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Kepala Sekolah</p><br /><br /><br /><br />
                  <p style={{ margin: 0, textDecoration: 'underline', fontWeight: 'bold' }}>{data.lampiran.kepalaSekolahNama || '________________________'}</p>
                  <p style={{ margin: 0, marginTop: '4px' }}>NIP. {data.lampiran.kepalaSekolahNip || '________________'}</p>
                </td>
                <td style={{ width: '50%', textAlign: 'center', border: 'none', paddingTop: '10px' }}>
                  <p style={{ margin: 0 }}>{data.lampiran.tanggalPengesahan || '.............., .................... 20...'}</p>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Guru Mata Pelajaran</p><br /><br /><br /><br />
                  <p style={{ margin: 0, textDecoration: 'underline', fontWeight: 'bold' }}>{data.lampiran.guruMapelNama || '________________________'}</p>
                  <p style={{ margin: 0, marginTop: '4px' }}>NIP. {data.lampiran.guruMapelNip || '________________'}</p>
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
      <div className="modal-content">
        <div className="modal-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="flex items-center gap-2">
            <FileText /> Pratinjau Dokumen 
          </h2>
          <div className="flex gap-4 items-center flex-wrap">
            <div className="flex items-center gap-2">
              <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Format Canvas:</span>
              <select 
                className="form-control" 
                value={layoutType} 
                onChange={(e) => setLayoutType(e.target.value)}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.9rem', minWidth: '150px' }}
              >
                <option value="kotak">1. Format Kotak</option>
                <option value="tabel">2. Format Tabel RPP</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-primary" onClick={handleDownloadPDF} disabled={isExporting}>
                {isExporting ? <Loader2 className="animate-spin" size={16}/> : <Download size={16} />} Unduh PDF
              </button>
              <button className="btn btn-secondary" onClick={handleDownloadWord} disabled={isExporting} style={{ backgroundColor: '#2B579A', color: 'white', borderColor: '#2B579A' }}>
                {isExporting ? <Loader2 className="animate-spin" size={16}/> : <FileText size={16} />} Unduh Word
              </button>
              <button className="btn btn-icon" onClick={onClose} style={{ marginLeft: '0.5rem', background: '#f1f5f9', borderRadius: '50%', padding: '0.5rem' }}>
                <X size={20} color="#475569" />
              </button>
            </div>
          </div>
        </div>

        <div className="modal-body overflow-y-auto" style={{ backgroundColor: '#e2e8f0', padding: '2rem' }}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div ref={printRef} className="print-root" style={{ width: '210mm', backgroundColor: 'transparent' }}>
              {layoutType === 'kotak' ? renderKotakCanvas() : renderTabelCanvas()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
