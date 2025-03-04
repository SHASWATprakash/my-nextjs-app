/**
 * Optimized version of fetchDataAndFilter.
 *
 * @param {Array} data - Array of objects to filter. Each object may have a 'title' property.
 * @param {String} keyword - The search keyword (case-insensitive).
 * @returns {Array} - Filtered array of objects.
 */
export default function fetchDataAndFilter(data = [], keyword = '') {
    if (!Array.isArray(data)) return [];
  
    const lowerKeyword = keyword.toLowerCase();
  
    return data.filter(item => {
      if (!item || typeof item.title !== 'string') return false;
      return item.title.toLowerCase().includes(lowerKeyword);
    });
  }
  