export default name => {
  if (document.getElementsByName(name).length > 0 && document.getElementsByName(name)[0] !== 'None') {
    const value = document.getElementsByName(name)[0].content;
    return value === 'None' ? null : value;
  } else {
    return null;
  }
};
