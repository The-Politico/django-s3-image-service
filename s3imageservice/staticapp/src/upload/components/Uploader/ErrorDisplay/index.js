import React from 'react';
import classnames from 'classnames';

import { styles } from './styles.scss';

const ErrorDisplay = (props) => {
  const { active, error } = props;
  if (!active || !error) { return null; }

  return (
    <div className={classnames('error-display', styles)}>
      <p>{error}</p>
    </div>
  );
};

export default ErrorDisplay;
