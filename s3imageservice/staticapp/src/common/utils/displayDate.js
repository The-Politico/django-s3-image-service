const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default a => {
  const day = a instanceof Date ? a : new Date(a);
  return `${MONTHS[day.getMonth()]} ${day.getDate()}, ${day.getFullYear()}`;
};
