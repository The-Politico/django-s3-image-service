import React from 'react';
import classnames from 'classnames';

import { styles } from './styles.scss';

const Tooltip = (props) => (
  <div data-tip={props.children} className={classnames('Tooltip', styles)}>
    <i className='fas fa-question-circle' />
  </div>
);

export default Tooltip;
