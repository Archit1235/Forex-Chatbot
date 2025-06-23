/**
 * Utilities for processing and formatting text content
 */

/**
 * Preprocesses markdown text to ensure better rendering
 * @param {string} text - The raw text content
 * @returns {string} - The processed text
 */
export function preprocessMarkdown(text) {
  if (!text || typeof text !== 'string') return '';

  let processed = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  processed = processed.replace(/^(#{1,6})\s*(.+)$/gm, '$1 $2');

  processed = processed.replace(/^([*+-]|\d+\.)\s*(.+)$/gm, '$1 $2');

  processed = processed.replace(
    /```(\w+)?\n?([\s\S]*?)```/g,
    (match, lang, code) => {
      const cleanCode = code.trim();
      return `\`\`\`${lang || ''}\n${cleanCode}\n\`\`\``;
    }
  );

  processed = processed.replace(/`([^`]+)`/g, '`$1`');

  processed = processed.replace(/\|(.+)\|/g, (match) => {
    return match.replace(/\s*\|\s*/g, ' | ').trim();
  });

  processed = processed.replace(/^>\s*(.+)$/gm, '> $1');

  processed = processed.replace(/\n{3,}/g, '\n\n');

  return processed.trim();
}
