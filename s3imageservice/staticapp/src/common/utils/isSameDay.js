export default (a, b) => {
  const dateA = a instanceof Date ? a : new Date(a);
  const dateB = b instanceof Date ? b : new Date(b);

  const sameDay = dateA.getDate() === dateB.getDate();
  const sameMonth = dateA.getMonth() === dateB.getMonth();
  const sameYear = dateA.getFullYear() === dateB.getFullYear();

  return sameDay && sameMonth && sameYear;
};
