const BREADCRUMB_NAMES = [
  'HOME',
  'ROLE',
  'VERTICAL',
  'EDITION',
];

const getMeta = name => {
  if (document.getElementsByName(name).length > 0 && document.getElementsByName(name)[0] !== 'None') {
    return document.getElementsByName(name)[0];
  } else {
    return null;
  }
};

export default () => BREADCRUMB_NAMES.map(name => {
  const node = getMeta(`BREADCRUMB_${name}`);
  if (!node) { return null; }
  return {
    title: node.content,
    href: node.getAttribute('href'),
  };
}).filter(b => !!b);
