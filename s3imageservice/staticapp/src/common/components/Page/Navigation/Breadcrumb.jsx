import React from 'react';

const Breadcrumb = (props) => (
  <a href={props.href} title={props.title} target='_top' className='nav-breadcrumb'>
    <span>/&nbsp;{props.children}&nbsp;</span>
  </a>
);

export default Breadcrumb;
