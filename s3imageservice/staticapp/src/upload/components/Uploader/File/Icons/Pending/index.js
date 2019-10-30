import React from 'react';
import classnames from 'classnames';

import { styles } from './styles.scss';

const Pending = (props) => (
  <div className={classnames('status-pending', styles)}>
    <div />
  </div>
);

export default Pending;
