import React, { useMemo } from 'react';
import classnames from 'classnames';

import Button from 'Common/components/Button';

import { styles } from './styles.scss';

const Control = (props) => {
  const { label, active, effect, icon, className } = props;

  const onClick = useMemo(() => active ? effect : () => {}, [active, effect]);

  return (
    <div className={classnames('control', styles)}>
      <div className={classnames('inner-wrapper', className, { disabled: !active })}>
        <Button outline onClick={onClick}>
          <span className='button-label'>{label}</span>
          <i className={classnames('fas', icon)} />
        </Button>
      </div>
    </div>
  );
};

export default Control;
