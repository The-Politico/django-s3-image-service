import getContentByName from 'Common/utils/getContentByName';

export const TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
];

export const SIZE = getContentByName('FILE_MB_LIMIT') * 1000 * 1000;
