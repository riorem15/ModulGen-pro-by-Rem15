// docxExport.js - Native OpenXML (.docx) Exporter for ModulGen Pro
// Fully compatible with mobile Microsoft Word (Android / iOS), Google Docs, WPS Office, and Desktop Word.

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  Footer
} from 'docx';
import fileSaver from 'file-saver';
import { getFormattedPengesahanDate } from './dateUtils.js';

const saveAs = fileSaver.saveAs || fileSaver;

// Clean hex colors (remove '#' if present)
const cleanHex = (hex, fallback = '000000') => {
  if (!hex || typeof hex !== 'string') return fallback;
  return hex.replace('#', '').trim();
};

/**
 * Parses inline HTML nodes (b, strong, i, em, u, span, br, text) into docx TextRun instances.
 */
function parseInlineNodes(node, activeStyles = {}, font = 'Calibri', baseFontSize = 22) {
  const runs = [];

  for (const child of node.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent;
      if (text && text.length > 0) {
        runs.push(
          new TextRun({
            text: text,
            bold: activeStyles.bold || false,
            italics: activeStyles.italics || false,
            underline: activeStyles.underline ? {} : undefined,
            color: activeStyles.color || undefined,
            font: font,
            size: baseFontSize
          })
        );
      }
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const tagName = child.tagName.toLowerCase();
      if (tagName === 'br') {
        runs.push(new TextRun({ break: 1, font, size: baseFontSize }));
        continue;
      }

      const nextStyles = { ...activeStyles };
      if (tagName === 'strong' || tagName === 'b') nextStyles.bold = true;
      if (tagName === 'em' || tagName === 'i') nextStyles.italics = true;
      if (tagName === 'u') nextStyles.underline = true;

      // Extract inline style color if specified
      if (child.style && child.style.color) {
        const c = child.style.color.trim();
        if (c.startsWith('#')) {
          nextStyles.color = cleanHex(c);
        }
      }

      const childRuns = parseInlineNodes(child, nextStyles, font, baseFontSize);
      runs.push(...childRuns);
    }
  }

  return runs;
}

/**
 * Parses HTML strings from Tiptap editor into native docx elements (Paragraphs, Tables, Lists).
 */
export function parseHtmlToDocxElements(htmlString, options = {}) {
  const {
    font = 'Calibri',
    baseFontSize = 22,
    themePrimary = '047857',
    themeBorder = '10B981',
    themeHeaderBg = 'D1FAE5',
    themeHeaderColor = '064E3B'
  } = options;

  if (!htmlString || typeof htmlString !== 'string' || !htmlString.trim() || htmlString.trim() === '-') {
    return [
      new Paragraph({
        children: [new TextRun({ text: '-', font, size: baseFontSize })],
        spacing: { after: 100 }
      })
    ];
  }

  // Guard for environments where DOMParser is not available (e.g. Node tests/SSR)
  if (typeof DOMParser === 'undefined') {
    const cleanText = htmlString.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
    return [
      new Paragraph({
        children: [new TextRun({ text: cleanText || '-', font, size: baseFontSize })],
        spacing: { after: 100 }
      })
    ];
  }

  // Use DOMParser in the browser
  const parser = new DOMParser();
  const parsedDoc = parser.parseFromString(`<body>${htmlString}</body>`, 'text/html');
  const body = parsedDoc.body;

  const elements = [];

  for (const child of body.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent.trim();
      if (text) {
        elements.push(
          new Paragraph({
            children: [new TextRun({ text, font, size: baseFontSize })],
            spacing: { after: 100 }
          })
        );
      }
      continue;
    }

    if (child.nodeType !== Node.ELEMENT_NODE) continue;

    const tag = child.tagName.toLowerCase();

    if (tag === 'p' || tag === 'div' || tag === 'blockquote') {
      const runs = parseInlineNodes(child, {}, font, baseFontSize);
      if (runs.length > 0) {
        elements.push(
          new Paragraph({
            children: runs,
            spacing: { after: 100, line: 276 }
          })
        );
      }
    } else if (tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6') {
      const headingSize = tag === 'h1' ? 30 : tag === 'h2' ? 26 : tag === 'h3' ? 24 : 22;
      const runs = parseInlineNodes(child, { bold: true, color: themePrimary }, font, headingSize);
      elements.push(
        new Paragraph({
          children: runs,
          spacing: { before: 140, after: 80 }
        })
      );
    } else if (tag === 'ul') {
      const liElements = child.querySelectorAll(':scope > li');
      for (const li of liElements) {
        const runs = parseInlineNodes(li, {}, font, baseFontSize);
        elements.push(
          new Paragraph({
            bullet: { level: 0 },
            children: runs.length > 0 ? runs : [new TextRun({ text: '-', font, size: baseFontSize })],
            spacing: { before: 30, after: 50, line: 260 }
          })
        );
      }
    } else if (tag === 'ol') {
      const liElements = child.querySelectorAll(':scope > li');
      let idx = 1;
      for (const li of liElements) {
        const runs = parseInlineNodes(li, {}, font, baseFontSize);
        elements.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${idx++}. `, bold: true, font, size: baseFontSize }),
              ...runs
            ],
            spacing: { before: 30, after: 50, line: 260 }
          })
        );
      }
    } else if (tag === 'table') {
      const trs = child.querySelectorAll('tr');
      if (trs.length > 0) {
        const rows = [];
        for (const tr of trs) {
          const cells = [];
          const thsOrTds = tr.querySelectorAll('th, td');
          for (const cell of thsOrTds) {
            const isHeader = cell.tagName.toLowerCase() === 'th';
            const cellElements = [];
            const pTags = cell.querySelectorAll('p');

            if (pTags.length > 0) {
              for (const p of pTags) {
                const runs = parseInlineNodes(p, isHeader ? { bold: true, color: themeHeaderColor } : {}, font, baseFontSize);
                cellElements.push(new Paragraph({ children: runs, spacing: { after: 40 } }));
              }
            } else {
              const runs = parseInlineNodes(cell, isHeader ? { bold: true, color: themeHeaderColor } : {}, font, baseFontSize);
              cellElements.push(new Paragraph({ children: runs, spacing: { after: 40 } }));
            }

            if (cellElements.length === 0) {
              cellElements.push(new Paragraph({ children: [new TextRun({ text: '', font, size: baseFontSize })] }));
            }

            cells.push(
              new TableCell({
                shading: isHeader ? { fill: themeHeaderBg } : undefined,
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 4, color: themeBorder },
                  bottom: { style: BorderStyle.SINGLE, size: 4, color: themeBorder },
                  left: { style: BorderStyle.SINGLE, size: 4, color: themeBorder },
                  right: { style: BorderStyle.SINGLE, size: 4, color: themeBorder }
                },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: cellElements
              })
            );
          }
          if (cells.length > 0) {
            rows.push(new TableRow({ children: cells }));
          }
        }
        if (rows.length > 0) {
          elements.push(
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows
            })
          );
          elements.push(new Paragraph({ spacing: { after: 80 } }));
        }
      }
    }
  }

  if (elements.length === 0) {
    elements.push(
      new Paragraph({
        children: [new TextRun({ text: '-', font, size: baseFontSize })],
        spacing: { after: 100 }
      })
    );
  }

  return elements;
}

/**
 * Creates a section heading (H3 style) with primary theme color and bottom underline
 */
function createSectionHeader(title, primaryHex, font) {
  return new Paragraph({
    spacing: { before: 240, after: 120 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 12, color: primaryHex }
    },
    children: [
      new TextRun({
        text: title,
        bold: true,
        font,
        size: 24, // 12pt
        color: primaryHex
      })
    ]
  });
}

/**
 * Creates a subsection header (H4 style)
 */
function createSubHeader(title, primaryHex, font) {
  return new Paragraph({
    spacing: { before: 140, after: 60 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        font,
        size: 22, // 11pt
        color: primaryHex
      })
    ]
  });
}

/**
 * Creates a callout banner box (for Pilar Deep Learning: Mindful, Meaningful, Joyful)
 */
function createCalloutBox(title, contentElements, pilarBgHex, primaryHex, font) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: pilarBgHex },
            borders: {
              left: { style: BorderStyle.SINGLE, size: 24, color: primaryHex },
              top: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE }
            },
            margins: { top: 120, bottom: 120, left: 160, right: 140 },
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: title,
                    bold: true,
                    font,
                    size: 22,
                    color: primaryHex
                  })
                ]
              }),
              ...contentElements
            ]
          })
        ]
      })
    ]
  });
}

/**
 * Creates a signature block table (Pengesahan)
 */
function createSignaturesTable(lampiran, font) {
  const borderNone = { style: BorderStyle.NONE, size: 0, color: 'auto' };
  const noBorders = { top: borderNone, bottom: borderNone, left: borderNone, right: borderNone };

  const tanggalStr = getFormattedPengesahanDate(lampiran?.tanggalPengesahan);

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: noBorders,
            margins: { top: 160, bottom: 80, left: 60, right: 60 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 40 },
                children: [new TextRun({ text: 'Mengetahui,', font, size: 20 })]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 600 },
                children: [new TextRun({ text: 'Kepala Satuan Pendidikan', bold: true, font, size: 20 })]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 20 },
                children: [
                  new TextRun({
                    text: lampiran?.kepalaSekolahNama || '________________________',
                    bold: true,
                    underline: {},
                    font,
                    size: 20
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `NIP. ${lampiran?.kepalaSekolahNip || '________________'}`,
                    font,
                    size: 18
                  })
                ]
              })
            ]
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: noBorders,
            margins: { top: 160, bottom: 80, left: 60, right: 60 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 40 },
                children: [new TextRun({ text: tanggalStr, font, size: 20 })]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 600 },
                children: [new TextRun({ text: 'Guru Mata Pelajaran', bold: true, font, size: 20 })]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 20 },
                children: [
                  new TextRun({
                    text: lampiran?.guruMapelNama || '________________________',
                    bold: true,
                    underline: {},
                    font,
                    size: 20
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `NIP. ${lampiran?.guruMapelNip || '________________'}`,
                    font,
                    size: 18
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

/**
 * Builds the Format Kotak Modern children
 */
function buildKotakDocumentChildren(data, options) {
  const { font, baseFontSize, primaryHex, borderHex, pilarBgHex, themeHeaderBgHex, themeHeaderColorHex } = options;
  const parseOpts = {
    font,
    baseFontSize,
    themePrimary: primaryHex,
    themeBorder: borderHex,
    themeHeaderBg: themeHeaderBgHex,
    themeHeaderColor: themeHeaderColorHex
  };

  const children = [];

  // 1. Header Doc
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: 'MODUL AJAR (PENDEKATAN DEEP LEARNING)',
          bold: true,
          font,
          size: 28, // 14pt
          color: primaryHex
        })
      ]
    })
  );

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [
        new TextRun({
          text: data.identitas?.mataPelajaran ? data.identitas.mataPelajaran.toUpperCase() : 'MATA PELAJARAN',
          bold: true,
          font,
          size: 24, // 12pt
          color: '1E293B'
        })
      ]
    })
  );

  if (data.identitas?.materiAjar) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: `Topik: ${data.identitas.materiAjar}`,
            italics: true,
            font,
            size: 20,
            color: '475569'
          })
        ]
      })
    );
  }

  // 2. IDENTITAS MODUL
  children.push(createSectionHeader('1. IDENTITAS MODUL', primaryHex, font));

  const borderNone = { style: BorderStyle.NONE, size: 0, color: 'auto' };
  const noBorders = { top: borderNone, bottom: borderNone, left: borderNone, right: borderNone };

  const identitasRows = [
    ['Nama Penyusun', data.identitas?.penyusun || '-'],
    ['Satuan Pendidikan', data.identitas?.instansi || '-'],
    ['Mata Pelajaran', data.identitas?.mataPelajaran || '-'],
    ['Kelas / Fase', data.identitas?.faseKelas || '-'],
    ['Semester', data.identitas?.semester || '-'],
    ['Materi Pokok', data.identitas?.materiAjar || '-'],
    ['Bab / Subbab', data.identitas?.babSubbab || '-'],
    ['Alokasi Waktu', data.identitas?.alokasiWaktu || '-']
  ];

  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: identitasRows.map(([label, val]) =>
        new TableRow({
          children: [
            new TableCell({
              width: { size: 32, type: WidthType.PERCENTAGE },
              borders: noBorders,
              margins: { top: 40, bottom: 40, left: 60, right: 60 },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: label, bold: true, font, size: baseFontSize })]
                })
              ]
            }),
            new TableCell({
              width: { size: 68, type: WidthType.PERCENTAGE },
              borders: noBorders,
              margins: { top: 40, bottom: 40, left: 60, right: 60 },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: `: ${val}`, font, size: baseFontSize })]
                })
              ]
            })
          ]
        })
      )
    })
  );

  // 3. IDENTIFIKASI
  children.push(createSectionHeader('2. IDENTIFIKASI', primaryHex, font));
  children.push(createSubHeader('A. Profil Lulusan (Dimensi Karakter & Kompetensi)', primaryHex, font));
  if (data.identifikasi?.profilLulusan && data.identifikasi.profilLulusan.length > 0) {
    data.identifikasi.profilLulusan.forEach(p => {
      children.push(
        new Paragraph({
          bullet: { level: 0 },
          children: [new TextRun({ text: p, bold: true, font, size: baseFontSize })],
          spacing: { after: 40 }
        })
      );
    });
  } else {
    children.push(new Paragraph({ children: [new TextRun({ text: '-', font, size: baseFontSize })] }));
  }

  children.push(createSubHeader('B. Kompetensi Awal', primaryHex, font));
  children.push(...parseHtmlToDocxElements(data.identifikasi?.kompetensiAwal || data.inti?.kompetensiAwal, parseOpts));

  children.push(createSubHeader('C. Pemetaan Kebutuhan Pembelajaran', primaryHex, font));
  children.push(...parseHtmlToDocxElements(data.identifikasi?.pemetaanKebutuhan || data.inti?.pemetaanKebutuhan, parseOpts));

  // 4. DESAIN PEMBELAJARAN
  children.push(createSectionHeader('3. DESAIN PEMBELAJARAN', primaryHex, font));
  children.push(createSubHeader('A. Capaian Pembelajaran (CP)', primaryHex, font));
  children.push(...parseHtmlToDocxElements(data.desainPembelajaran?.capaianPembelajaran || data.inti?.capaianPembelajaran, parseOpts));

  children.push(createSubHeader('B. Tujuan Pembelajaran (TP)', primaryHex, font));
  children.push(...parseHtmlToDocxElements(data.desainPembelajaran?.tujuanPembelajaran || data.inti?.tujuanPembelajaran, parseOpts));

  children.push(createSubHeader('C. Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)', primaryHex, font));
  children.push(...parseHtmlToDocxElements(data.desainPembelajaran?.kktp, parseOpts));

  children.push(createSubHeader('D. Kategori Ketercapaian', primaryHex, font));
  children.push(...parseHtmlToDocxElements(data.desainPembelajaran?.kategoriKetercapaian, parseOpts));

  // 5. PRAKTIK PEDAGOGIS DEEP LEARNING
  children.push(createSectionHeader('4. PRAKTIK PEDAGOGIS DEEP LEARNING', primaryHex, font));

  children.push(
    createCalloutBox(
      'A. Mindful Learning (Pembelajaran Berkesadaran)',
      parseHtmlToDocxElements(data.pedagogisDeepLearning?.mindfulLearning, parseOpts),
      pilarBgHex,
      primaryHex,
      font
    )
  );
  children.push(new Paragraph({ spacing: { after: 100 } }));

  children.push(
    createCalloutBox(
      'B. Meaningful Learning (Pembelajaran Bermakna)',
      parseHtmlToDocxElements(data.pedagogisDeepLearning?.meaningfulLearning, parseOpts),
      pilarBgHex,
      primaryHex,
      font
    )
  );
  children.push(new Paragraph({ spacing: { after: 100 } }));

  children.push(
    createCalloutBox(
      'C. Joyful Learning (Pembelajaran Menggembirakan)',
      parseHtmlToDocxElements(data.pedagogisDeepLearning?.joyfulLearning, parseOpts),
      pilarBgHex,
      primaryHex,
      font
    )
  );
  children.push(new Paragraph({ spacing: { after: 100 } }));

  children.push(createSubHeader('D. Model Pembelajaran', primaryHex, font));
  children.push(...parseHtmlToDocxElements(data.pedagogisDeepLearning?.modelPembelajaran || data.inti?.modelPembelajaran, parseOpts));

  children.push(createSubHeader('E. Metode Pembelajaran', primaryHex, font));
  children.push(...parseHtmlToDocxElements(data.pedagogisDeepLearning?.metodePembelajaran || data.inti?.metodePembelajaran, parseOpts));

  // 6. MEDIA, SARANA, PEMAHAMAN, PEMANTIK, MATERI
  children.push(createSectionHeader('5. MEDIA PEMBELAJARAN', primaryHex, font));
  children.push(...parseHtmlToDocxElements(data.mediaSarana?.mediaPembelajaran || data.inti?.mediaSaranaPrasarana, parseOpts));

  children.push(createSectionHeader('6. SARANA DAN PRASARANA', primaryHex, font));
  children.push(...parseHtmlToDocxElements(data.mediaSarana?.saranaPrasarana, parseOpts));

  children.push(createSectionHeader('7. PEMAHAMAN BERMAKNA', primaryHex, font));
  children.push(...parseHtmlToDocxElements(data.pemahamanPemantik?.pemahamanBermakna || data.inti?.pemahamanBermakna, parseOpts));

  children.push(createSectionHeader('8. PERTANYAAN PEMANTIK', primaryHex, font));
  children.push(...parseHtmlToDocxElements(data.pemahamanPemantik?.pertanyaanPemantik || data.inti?.pertanyaanPemantik, parseOpts));

  children.push(createSectionHeader('9. MATERI PEMBELAJARAN DAN REFERENSI', primaryHex, font));
  children.push(createSubHeader('A. Materi Pembelajaran', primaryHex, font));
  children.push(...parseHtmlToDocxElements(data.materiReferensi?.materi, parseOpts));

  children.push(createSubHeader('B. Referensi / Daftar Pustaka', primaryHex, font));
  children.push(...parseHtmlToDocxElements(data.materiReferensi?.referensi, parseOpts));

  // 7. LANGKAH-LANGKAH PEMBELAJARAN
  children.push(createSectionHeader('10. LANGKAH-LANGKAH PEMBELAJARAN', primaryHex, font));

  // Pendahuluan Box
  const borderBoxDef = { style: BorderStyle.SINGLE, size: 6, color: borderHex };
  const boxBorders = { top: borderBoxDef, bottom: borderBoxDef, left: borderBoxDef, right: borderBoxDef };

  const langkahItems = [
    {
      title: `1. Kegiatan Pendahuluan (Mindful & Apersepsi) (${data.langkah?.pendahuluan?.durasi || '15'} Menit)`,
      content: data.langkah?.pendahuluan?.kegiatan
    },
    {
      title: `2. Kegiatan Inti (Sintaks Deep Learning: Memahami, Mengaplikasi, Merefleksi) (${data.langkah?.inti?.durasi || '60'} Menit)`,
      content: data.langkah?.inti?.kegiatan
    },
    {
      title: `3. Kegiatan Penutup (Refleksi Bermakna & Apresiasi Joyful) (${data.langkah?.penutup?.durasi || '15'} Menit)`,
      content: data.langkah?.penutup?.kegiatan
    }
  ];

  langkahItems.forEach(item => {
    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: boxBorders,
                margins: { top: 100, bottom: 100, left: 140, right: 140 },
                children: [
                  new Paragraph({
                    spacing: { after: 80 },
                    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: borderHex } },
                    children: [
                      new TextRun({
                        text: item.title,
                        bold: true,
                        font,
                        size: 22,
                        color: primaryHex
                      })
                    ]
                  }),
                  ...parseHtmlToDocxElements(item.content, parseOpts)
                ]
              })
            ]
          })
        ]
      })
    );
    children.push(new Paragraph({ spacing: { after: 100 } }));
  });

  // 8. LAMPIRAN
  children.push(createSectionHeader('LAMPIRAN', primaryHex, font));
  children.push(createSubHeader('A. Lembar Kerja Peserta Didik (LKPD)', primaryHex, font));
  children.push(...parseHtmlToDocxElements(data.lampiran?.lkpd, parseOpts));

  children.push(createSubHeader('B. Instrumen & Rubrik Asesmen', primaryHex, font));
  children.push(...parseHtmlToDocxElements(data.lampiran?.asesmen, parseOpts));

  // 9. PENGESAHAN
  children.push(new Paragraph({ spacing: { before: 200 } }));
  children.push(createSignaturesTable(data.lampiran, font));

  return children;
}

/**
 * Helper to build a styled table for Format Tabel Matriks RPP
 */
function createMatrixTable(title, rowsData, options) {
  const { font, baseFontSize, borderHex, themeHeaderBgHex, themeHeaderColorHex } = options;

  const cellBorder = { style: BorderStyle.SINGLE, size: 6, color: borderHex };
  const borders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };

  const tableRows = [];

  // Header row
  tableRows.push(
    new TableRow({
      children: [
        new TableCell({
          columnSpan: 2,
          shading: { fill: themeHeaderBgHex },
          borders,
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: title,
                  bold: true,
                  font,
                  size: 22,
                  color: themeHeaderColorHex
                })
              ]
            })
          ]
        })
      ]
    })
  );

  // Content rows
  rowsData.forEach(([labelNode, contentElements]) => {
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({
            width: { size: 30, type: WidthType.PERCENTAGE },
            borders,
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: Array.isArray(labelNode)
              ? labelNode
              : [new Paragraph({ children: [new TextRun({ text: labelNode, bold: true, font, size: baseFontSize })] })]
          }),
          new TableCell({
            width: { size: 70, type: WidthType.PERCENTAGE },
            borders,
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: contentElements
          })
        ]
      })
    );
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: tableRows
  });
}

/**
 * Builds the Format Tabel Matriks RPP children
 */
function buildTabelDocumentChildren(data, options) {
  const { font, baseFontSize, primaryHex, borderHex, themeHeaderBgHex, themeHeaderColorHex } = options;
  const parseOpts = {
    font,
    baseFontSize,
    themePrimary: primaryHex,
    themeBorder: borderHex,
    themeHeaderBg: themeHeaderBgHex,
    themeHeaderColor: themeHeaderColorHex
  };

  const children = [];

  // Title Header
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [
        new TextRun({
          text: 'MODUL AJAR PEMBELAJARAN MENDALAM (DEEP LEARNING)',
          bold: true,
          font,
          size: 26,
          color: primaryHex
        })
      ]
    })
  );

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 140 },
      children: [
        new TextRun({
          text: data.identitas?.mataPelajaran ? data.identitas.mataPelajaran.toUpperCase() : 'MATA PELAJARAN',
          bold: true,
          font,
          size: 22,
          color: '1E293B'
        })
      ]
    })
  );

  // 1. Identitas Table
  const identitasData = [
    ['Nama Penyusun', [new Paragraph({ children: [new TextRun({ text: data.identitas?.penyusun || '-', font, size: baseFontSize })] })]],
    ['Satuan Pendidikan', [new Paragraph({ children: [new TextRun({ text: data.identitas?.instansi || '-', font, size: baseFontSize })] })]],
    ['Mata Pelajaran', [new Paragraph({ children: [new TextRun({ text: data.identitas?.mataPelajaran || '-', font, size: baseFontSize })] })]],
    ['Kelas / Fase', [new Paragraph({ children: [new TextRun({ text: data.identitas?.faseKelas || '-', font, size: baseFontSize })] })]],
    ['Semester', [new Paragraph({ children: [new TextRun({ text: data.identitas?.semester || '-', font, size: baseFontSize })] })]],
    ['Materi Pokok', [new Paragraph({ children: [new TextRun({ text: data.identitas?.materiAjar || '-', font, size: baseFontSize })] })]],
    ['Bab / Subbab', [new Paragraph({ children: [new TextRun({ text: data.identitas?.babSubbab || '-', font, size: baseFontSize })] })]],
    ['Alokasi Waktu', [new Paragraph({ children: [new TextRun({ text: data.identitas?.alokasiWaktu || '-', font, size: baseFontSize })] })]]
  ];
  children.push(createMatrixTable('1. IDENTITAS', identitasData, options));
  children.push(new Paragraph({ spacing: { after: 120 } }));

  // 2. Identifikasi Table
  const profilBullets = (data.identifikasi?.profilLulusan || []).map(p =>
    new Paragraph({
      bullet: { level: 0 },
      children: [new TextRun({ text: p, bold: true, font, size: baseFontSize })],
      spacing: { after: 30 }
    })
  );
  const identifikasiData = [
    ['Profil Lulusan', profilBullets.length > 0 ? profilBullets : [new Paragraph({ children: [new TextRun({ text: '-', font, size: baseFontSize })] })]],
    ['Kompetensi Awal', parseHtmlToDocxElements(data.identifikasi?.kompetensiAwal, parseOpts)],
    ['Pemetaan Kebutuhan', parseHtmlToDocxElements(data.identifikasi?.pemetaanKebutuhan, parseOpts)]
  ];
  children.push(createMatrixTable('2. IDENTIFIKASI', identifikasiData, options));
  children.push(new Paragraph({ spacing: { after: 120 } }));

  // 3. Desain Pembelajaran Table
  const desainData = [
    ['Capaian Pembelajaran (CP)', parseHtmlToDocxElements(data.desainPembelajaran?.capaianPembelajaran || data.inti?.capaianPembelajaran, parseOpts)],
    ['Tujuan Pembelajaran (TP)', parseHtmlToDocxElements(data.desainPembelajaran?.tujuanPembelajaran || data.inti?.tujuanPembelajaran, parseOpts)],
    ['KKTP', parseHtmlToDocxElements(data.desainPembelajaran?.kktp, parseOpts)],
    ['Kategori Ketercapaian', parseHtmlToDocxElements(data.desainPembelajaran?.kategoriKetercapaian, parseOpts)]
  ];
  children.push(createMatrixTable('3. DESAIN PEMBELAJARAN', desainData, options));
  children.push(new Paragraph({ spacing: { after: 120 } }));

  // 4. Praktik Pedagogis Deep Learning Table
  const pedagogisData = [
    ['Mindful Learning', parseHtmlToDocxElements(data.pedagogisDeepLearning?.mindfulLearning, parseOpts)],
    ['Meaningful Learning', parseHtmlToDocxElements(data.pedagogisDeepLearning?.meaningfulLearning, parseOpts)],
    ['Joyful Learning', parseHtmlToDocxElements(data.pedagogisDeepLearning?.joyfulLearning, parseOpts)],
    ['Model Pembelajaran', parseHtmlToDocxElements(data.pedagogisDeepLearning?.modelPembelajaran || data.inti?.modelPembelajaran, parseOpts)],
    ['Metode Pembelajaran', parseHtmlToDocxElements(data.pedagogisDeepLearning?.metodePembelajaran || data.inti?.metodePembelajaran, parseOpts)]
  ];
  children.push(createMatrixTable('4. PRAKTIK PEDAGOGIS DEEP LEARNING', pedagogisData, options));
  children.push(new Paragraph({ spacing: { after: 120 } }));

  // 5 & 6. Media & Sarana Table
  const mediaSaranaData = [
    ['5. Media Pembelajaran', parseHtmlToDocxElements(data.mediaSarana?.mediaPembelajaran || data.inti?.mediaSaranaPrasarana, parseOpts)],
    ['6. Sarana & Prasarana', parseHtmlToDocxElements(data.mediaSarana?.saranaPrasarana, parseOpts)]
  ];
  children.push(createMatrixTable('5 & 6. MEDIA, SARANA & PRASARANA', mediaSaranaData, options));
  children.push(new Paragraph({ spacing: { after: 120 } }));

  // 7 & 8. Pemahaman & Pemantik
  const pemahamanData = [
    ['7. Pemahaman Bermakna', parseHtmlToDocxElements(data.pemahamanPemantik?.pemahamanBermakna || data.inti?.pemahamanBermakna, parseOpts)],
    ['8. Pertanyaan Pemantik', parseHtmlToDocxElements(data.pemahamanPemantik?.pertanyaanPemantik || data.inti?.pertanyaanPemantik, parseOpts)]
  ];
  children.push(createMatrixTable('7 & 8. PEMAHAMAN BERMAKNA & PERTANYAAN PEMANTIK', pemahamanData, options));
  children.push(new Paragraph({ spacing: { after: 120 } }));

  // 9. Materi dan Referensi Table
  const materiData = [
    ['Materi Pembelajaran', parseHtmlToDocxElements(data.materiReferensi?.materi, parseOpts)],
    ['Daftar Pustaka', parseHtmlToDocxElements(data.materiReferensi?.referensi, parseOpts)]
  ];
  children.push(createMatrixTable('9. MATERI PEMBELAJARAN DAN REFERENSI', materiData, options));
  children.push(new Paragraph({ spacing: { after: 120 } }));

  // 10. Langkah-Langkah Table
  const langkahData = [
    [
      [
        new Paragraph({ children: [new TextRun({ text: '1. Pendahuluan', bold: true, font, size: baseFontSize })] }),
        new Paragraph({ children: [new TextRun({ text: `(${data.langkah?.pendahuluan?.durasi || '15'} Menit)`, italics: true, font, size: 18 })] })
      ],
      parseHtmlToDocxElements(data.langkah?.pendahuluan?.kegiatan, parseOpts)
    ],
    [
      [
        new Paragraph({ children: [new TextRun({ text: '2. Kegiatan Inti (Deep Learning)', bold: true, font, size: baseFontSize })] }),
        new Paragraph({ children: [new TextRun({ text: `(${data.langkah?.inti?.durasi || '60'} Menit)`, italics: true, font, size: 18 })] })
      ],
      parseHtmlToDocxElements(data.langkah?.inti?.kegiatan, parseOpts)
    ],
    [
      [
        new Paragraph({ children: [new TextRun({ text: '3. Kegiatan Penutup', bold: true, font, size: baseFontSize })] }),
        new Paragraph({ children: [new TextRun({ text: `(${data.langkah?.penutup?.durasi || '15'} Menit)`, italics: true, font, size: 18 })] })
      ],
      parseHtmlToDocxElements(data.langkah?.penutup?.kegiatan, parseOpts)
    ]
  ];
  children.push(createMatrixTable('10. LANGKAH-LANGKAH PEMBELAJARAN', langkahData, options));
  children.push(new Paragraph({ spacing: { after: 120 } }));

  // Lampiran Table
  const lampiranData = [
    ['A. LKPD', parseHtmlToDocxElements(data.lampiran?.lkpd, parseOpts)],
    ['B. Rubrik Asesmen', parseHtmlToDocxElements(data.lampiran?.asesmen, parseOpts)]
  ];
  children.push(createMatrixTable('LAMPIRAN & ASESMEN', lampiranData, options));

  // Pengesahan Table
  children.push(new Paragraph({ spacing: { before: 180 } }));
  children.push(createSignaturesTable(data.lampiran, font));

  return children;
}

/**
 * Main export function: Generates a genuine OpenXML (.docx) document
 * and triggers download via file-saver with .docx extension.
 */
export async function exportModulAjarDocx(data, layoutType = 'kotak', currentTheme = null) {
  const font = data.identitas?.fontFamily || 'Arial';
  const baseFontSize = 22; // 11pt

  const primaryHex = cleanHex(currentTheme?.primary, '047857');
  const borderHex = cleanHex(currentTheme?.border, '10B981');
  const pilarBgHex = cleanHex(currentTheme?.pilarBg, 'ECFDF5');
  const themeHeaderBgHex = cleanHex(currentTheme?.tableHeaderBg, 'D1FAE5');
  const themeHeaderColorHex = cleanHex(currentTheme?.tableHeaderColor, '064E3B');

  const options = {
    font,
    baseFontSize,
    primaryHex,
    borderHex,
    pilarBgHex,
    themeHeaderBgHex,
    themeHeaderColorHex
  };

  const documentChildren =
    layoutType === 'tabel'
      ? buildTabelDocumentChildren(data, options)
      : buildKotakDocumentChildren(data, options);

  const doc = new Document({
    creator: 'MODULGEN PRO by Rem15',
    title: `Modul Ajar - ${data.identitas?.mataPelajaran || 'Deep Learning'}`,
    description: 'Modul Ajar Kurikulum Merdeka & Pendekatan Deep Learning',
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134, // 20mm
              right: 1134, // 20mm
              bottom: 1134, // 20mm
              left: 1417 // 25mm
            }
          }
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: `Modul Ajar Deep Learning - ${data.identitas?.mataPelajaran || 'MODULGEN PRO'}`,
                    font,
                    size: 16, // 8pt
                    italics: true,
                    color: '94A3B8'
                  })
                ]
              })
            ]
          })
        },
        children: documentChildren
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const safeFilename = (data.identitas?.mataPelajaran || 'Deep_Learning')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_+/g, '_');

  saveAs(blob, `Modul_Ajar_${safeFilename}.docx`);
}
