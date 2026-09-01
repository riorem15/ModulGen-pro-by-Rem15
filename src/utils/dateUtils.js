// dateUtils.js - Indonesian Real-time Date Formatting Utilities

const MONTHS_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

/**
 * Returns current or specific date formatted in Indonesian: "1 September 2026"
 * @param {Date|string|number} [date=new Date()]
 * @returns {string} e.g. "1 September 2026"
 */
export const getIndonesianDate = (date = new Date()) => {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) {
    const now = new Date();
    return `${now.getDate()} ${MONTHS_ID[now.getMonth()]} ${now.getFullYear()}`;
  }
  const day = d.getDate();
  const month = MONTHS_ID[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};

/**
 * Resolves the signing date for the preview/document.
 * If user entered custom date, use that.
 * If empty, returns real-time Indonesian date for today.
 * @param {string} [customDate='']
 * @param {string} [defaultPrefix=''] Optional prefix e.g. city
 * @returns {string} e.g. "Bandung, 1 September 2026" or "1 September 2026"
 */
export const getFormattedPengesahanDate = (customDate = '', defaultPrefix = '') => {
  if (customDate && typeof customDate === 'string' && customDate.trim() !== '') {
    return customDate.trim();
  }
  const todayFormatted = getIndonesianDate();
  if (defaultPrefix && defaultPrefix.trim() !== '') {
    return `${defaultPrefix.trim()}, ${todayFormatted}`;
  }
  return todayFormatted;
};
