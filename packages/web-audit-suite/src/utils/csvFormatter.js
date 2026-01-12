// csvFormatter.js

/**
 * Formats data into CSV string.
 * @param {Array} data - The data to format.
 * @param {Array<string>} [headers] - Optional headers for the CSV.
 * @param {string} [delimiter=','] - The delimiter to use (default: comma).
 * @returns {string} The formatted CSV string.
 * @throws {Error} If input is invalid.
 */
export function formatCsv(data, headers, context) {
  if (context && context.logger) {
    context.logger.debug('Formatting CSV data...');
    context.logger.debug(`Data type: ${typeof data}`);
    context.logger.debug(`Data length: ${Array.isArray(data) ? data.length : 'N/A'}`);
  }

  if (!Array.isArray(data)) {
    if (context && context.logger) {
      context.logger.error('formatCsv received non-array data:', data);
    }
    throw new Error('Invalid input: data must be an array');
  }

  let csvContent = headers ? `${headers.join(',')}\n` : '';

  csvContent += data.map((row) => Object.values(row).map((cell) => {
    if (cell === null || cell === undefined) {
      return '""';
    }
    return `"${cell.toString().replace(/"/g, '""')}"`;
  }).join(',')).join('\n');

  if (context && context.logger) {
    context.logger.debug('CSV formatting completed.');
  }
  return csvContent;
}
