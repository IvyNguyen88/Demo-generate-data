import fs from 'fs';
import path from 'path';

export const toFileName = (prompt) =>
  prompt.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '');

export const writeFeatureFile = (fileName, content) => {
  const fullPath = path.join('features', fileName);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(`${fullPath}.feature`, content.trim());
};

export const getTagsFromPrompt = (prompt) => {
  const tags = [];
  if (/invalid/i.test(prompt)) tags.push('@negative');
  if (/expired/i.test(prompt)) tags.push('@security');
  if (/empty/i.test(prompt)) tags.push('@boundary');
  if (/valid/i.test(prompt)) tags.push('@positive');
  return tags.length > 0 ? tags.join(' ') : '@unspecified';
};