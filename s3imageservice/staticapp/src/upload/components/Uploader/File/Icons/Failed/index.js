import React from 'react';
import classnames from 'classnames';

import { styles } from './styles.scss';

const Failed = (props) => (
  <div className={classnames('status-failed', styles)}>
    <svg className='ex' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 52 52'>
      <circle className='ex__circle' cx='26' cy='26' r='25' fill='none' />
      <path className='ex__ex' fill='none' d='M16 16 36 36 M36 16 16 36' />
    </svg>
  </div>
);

export default Failed;
