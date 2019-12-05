import getContentByName from 'Common/utils/getContentByName';

export const CMS_DEFAULT_SIZES = getContentByName('CMS_DEFAULT_SIZES');

export default {
  sizes: JSON.parse(CMS_DEFAULT_SIZES),
  compression: true,
  progressive: true,
  convertToJPG: true,
};
