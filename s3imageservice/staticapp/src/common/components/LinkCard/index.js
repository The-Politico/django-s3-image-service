import React from 'react';
import classnames from 'classnames';

import { styles } from './styles.scss';

const LinkCard = (props) => (
  <a {...props} className={classnames('link-card', props.className, styles)}>
    {props.children}
  </a>
);

export default LinkCard;
