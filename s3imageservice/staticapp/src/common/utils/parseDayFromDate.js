export default a => {
  const dateObj = a instanceof Date ? a : new Date(a);
  return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
};
